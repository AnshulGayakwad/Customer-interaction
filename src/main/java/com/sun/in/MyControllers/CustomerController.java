package com.sun.in.MyControllers;

import com.sun.in.MyEntities.Customer;
import com.sun.in.MyServices.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/home")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

//    @GetMapping("/index")
//    public String index() {
//        return "index";
//    }

    @PostMapping("/createCustomer") // New customer Added by Admin
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer){
        Customer cust = customerService.createCustomer(customer);
        return new ResponseEntity<>(cust, HttpStatus.CREATED);
    }

    // API to update an existing customer
    @PutMapping("/updateCustomer/{id}")    // Update Customer by ID
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @RequestBody Customer customerDetails){
        Customer cust = customerService.updateCustomer(id, customerDetails);
        return new ResponseEntity<>(cust, HttpStatus.OK);
    }

    // API to delete an existing customer
    @DeleteMapping("/deleteCustomer/{id}")
    public ResponseEntity deleteCustomer(@PathVariable Long id){
        customerService.deleteCustomer(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //Get customer by ID
    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable Long id){
        return customerService.getCustomerById(id);
    }

    //Get All customers without any filters
    @GetMapping("/getAllCustomers")
    public ResponseEntity<List<Customer>> getAllCustomers(
                                          @RequestParam (defaultValue = "0") int page,
                                          @RequestParam (defaultValue = "10") int size,
                                          @RequestParam (defaultValue = "firstName") String sortBy,
                                          @RequestParam (defaultValue = "asc") String sortDir){
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.fromString(sortDir), sortBy);
        Page<Customer> customerList = customerService.getAllCustomers(pageable);
        return new ResponseEntity<>(customerList.getContent(), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Customer>> searchCustomers(
                                          @RequestParam(defaultValue = "firstName") String searchType,
                                          @RequestParam(defaultValue = "") String searchText,
                                          @RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "10") int size) {
        Page<Customer> customerList = customerService.searchCustomers(searchType, searchText, page, size);
        return new ResponseEntity<>(customerList.getContent(), HttpStatus.OK);
    }

//    @GetMapping("/sync-customers")
//    public ResponseEntity<String> syncCustomers() {
//
//        String result = syncapiService.authenticateFetchAndSyncCustomerList();
//        return new ResponseEntity<>(result, HttpStatus.OK);
//    }

    ////////////////////////////////// JWT //////////////////////////////////
//    @GetMapping("/current-user")
//    public String getLoggedInUser(Principal principal){
//        return principal.getName();
//    }
}
