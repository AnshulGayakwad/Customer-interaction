package com.sun.in.MyServices;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.in.MyEntities.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import com.sun.in.MyRepositories.CustomerRepo;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private RestTemplate restTemplate;
//////////////////////////////////// Extra ////////////////////////////////////////////////////////////
//    private final PasswordEncoder passwordEncoder; // Encoder to hash user passwords
//    private final AuthenticationManager authenticationManager; // Manages authentication processes
//
//    public CustomerService(AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
//        this.authenticationManager = authenticationManager;
//        this.passwordEncoder = passwordEncoder;
//    }
//
//    public Customer authenticate(AllUsers input) {
//        // Perform authentication using the provided email and password
//        authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        input.getUsername(),
//                        input.getPassword()
//                )
//        );
//        // Retrieve the authenticated user from the database based on the email
//        // If the user is not found, throw an exception
//        return cRepo.findByUserName(input.getUsername())
//                .orElseThrow();
//    }
////////////////////////////////////////////////////////////////////////////////////////////////

    // Method to create a new customer
    public Customer createCustomer (Customer customer) {
        return customerRepo.save(customer);
    }

    public Customer updateCustomer(Long id, Customer customerDetails) {
        Customer customer = customerRepo.findById(id).orElseThrow(() -> new RuntimeException("Customer not found"));

        customer.setFirstName(customerDetails.getFirstName());
        customer.setLastName(customerDetails.getLastName());
        customer.setStreet(customerDetails.getStreet());
        customer.setAddress(customerDetails.getAddress());
        customer.setCity(customerDetails.getCity());
        customer.setState(customerDetails.getState());
        customer.setEmail(customerDetails.getEmail());
        customer.setPhone(customerDetails.getPhone());

        return customerRepo.save(customer);
    }

    public void deleteCustomer(Long id) {
        Customer customer = customerRepo.findById(id).orElseThrow(() -> new RuntimeException("Customer not found"));
        customerRepo.delete(customer);
    }

    public Customer getCustomerById(Long id) {
        return customerRepo.findById(id).orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    public Page<Customer> getAllCustomers(Pageable pageable) {
        return customerRepo.findAll(pageable);
    }

    public Page<Customer> searchCustomers(String searchType, String searchText, int page, int size) {
        return customerRepo.findByFirstNameContainingOrCityContainingOrEmailContainingOrPhoneContaining(
                searchText, searchText, searchText, searchText, PageRequest.of(page, size, Sort.by(searchType)));
    }

    //////////////////////////////////////////// SYNC COUSTOMERS //////////////////////////////////////////

    public String syncCustomers() {
        try {
            // Step 1: Authenticate and get Bearer Token
            String authUrl = "https://qa.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp";
            String customerUrl = "https://qa.sunbasedata.com/sunbase/portal/api/assignment.jsp";

            // Request Body for Authentication
            Map<String, String> authRequestBody = new HashMap<>();
            authRequestBody.put("login_id", "test@sunbasedata.com");
            authRequestBody.put("password", "Test@123");

            // Make Authentication Request
            HttpHeaders authHeaders = new HttpHeaders();
            authHeaders.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, String>> authRequest = new HttpEntity<>(authRequestBody, authHeaders);
            ResponseEntity<String> authResponse = restTemplate.postForEntity(authUrl, authRequest, String.class);

            if (authResponse.getStatusCode() != HttpStatus.OK) {
                return "Failed to authenticate";
            }

            // Convert the response body to a Map
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> authResponseBody = objectMapper.readValue(authResponse.getBody(), Map.class);

            if (!authResponseBody.containsKey("access_token")) {
                return "Failed to retrieve token";
            }

            String token = (String) authResponseBody.get("access_token");

            // Step 2: Get Customer List
            HttpHeaders customerHeaders = new HttpHeaders();
            customerHeaders.setBearerAuth(token);
            HttpEntity<Void> customerRequest = new HttpEntity<>(customerHeaders);

            ResponseEntity<Customer[]> customerResponse = restTemplate.exchange(
                    customerUrl + "?cmd=get_customer_list",
                    HttpMethod.GET,
                    customerRequest,
                    Customer[].class
            );

            if (customerResponse.getStatusCode() != HttpStatus.OK || customerResponse.getBody() == null) {
                return "Failed to retrieve token";
            }

            // Step 3: Save or Update Customers in Database
            Customer[] customers = customerResponse.getBody();
            for (Customer customer : customers) {
                Optional<Customer> existingCustomer = customerRepo.findByUuid(customer.getUuid());

                if (existingCustomer.isPresent()) {
                    // Update existing customer
                    Customer updatedCustomer = existingCustomer.get();
                    updatedCustomer.setFirstName(customer.getFirstName());
                    updatedCustomer.setLastName(customer.getLastName());
                    updatedCustomer.setStreet(customer.getStreet());
                    updatedCustomer.setAddress(customer.getAddress());
                    updatedCustomer.setCity(customer.getCity());
                    updatedCustomer.setState(customer.getState());
                    updatedCustomer.setEmail(customer.getEmail());
                    updatedCustomer.setPhone(customer.getPhone());

                    // Save the updated customer
                    customerRepo.save(updatedCustomer);
                    System.out.println("Updated customer with UUID: " + customer.getUuid());
                } else {
                    // Save new customer
                    customerRepo.save(customer);
                    System.out.println("Saved new customer with UUID: " + customer.getUuid());
                }
            }

            return "Sync Completed";
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception
            return "Failed to sync customers: " + e.getMessage();
        }
    }
}
