package com.sun.in.MyServices;

import com.sun.in.MyEntities.AllUsers;
import com.sun.in.MyEntities.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.sun.in.MyRepositories.CustomerRepo;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepo cRepo;
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
        return cRepo.save(customer);
    }

    public Customer updateCustomer(Long id, Customer customerDetails) {
        Customer customer = cRepo.findById(id).orElseThrow(() -> new RuntimeException("Customer not found"));

        customer.setFirstName(customerDetails.getFirstName());
        customer.setLastName(customerDetails.getLastName());
        customer.setStreet(customerDetails.getStreet());
        customer.setAddress(customerDetails.getAddress());
        customer.setCity(customerDetails.getCity());
        customer.setState(customerDetails.getState());
        customer.setEmail(customerDetails.getEmail());
        customer.setPhone(customerDetails.getPhone());

        return cRepo.save(customer);
    }

    public void deleteCustomer(Long id) {
        Customer customer = cRepo.findById(id).orElseThrow(() -> new RuntimeException("Customer not found"));
        cRepo.delete(customer);
    }

    public Customer getCustomerById(Long id) {
        return cRepo.findById(id).orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    public Page<Customer> getAllCustomers(Pageable pageable) {
        return cRepo.findAll(pageable);
    }

    public Page<Customer> searchCustomers(String searchType, String searchText, int page, int size) {
        return cRepo.findByFirstNameContainingOrCityContainingOrEmailContainingOrPhoneContaining(
                searchText, searchText, searchText, searchText, PageRequest.of(page, size, Sort.by(searchType)));
    }
}
