package com.sun.in.MyControllers;

import com.sun.in.MyEntities.Customer;
import com.sun.in.MyServices.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
public class CustomerController {
    @Autowired
    private CustomerService cService;

    @GetMapping("/index")
    public String index() {
        return "index";
    }

    @PostMapping("/createCustomer")
    public Customer createCustomer(@RequestBody Customer customer){
        return cService.createCustomer(customer);
    }

    // API to update an existing customer
    @PutMapping("/{id}")
    public Customer updateCustomer(@PathVariable Long id, @RequestBody Customer customerDetails){
        return cService.updateCustomer(id, customerDetails);
    }

    // API to delete an existing customer
    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Long id){
        cService.deleteCustomer(id);
    }

    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable Long id){
        return cService.getCustomerById(id);
    }

    @GetMapping
    public Page<Customer> getAllCustomers(@RequestParam (defaultValue = "0") int page,
                                          @RequestParam (defaultValue = "10") int size,
                                          @RequestParam (defaultValue = "firstName") String sortBy,
                                          @RequestParam (defaultValue = "asc") String sortDir){
        Pageable pegeable = PageRequest.of(page, size, Sort.Direction.fromString(sortDir), sortBy);
        return cService.getAllCustomers(pegeable);
    }

    @GetMapping("/search")
    public Page<Customer> searchCustomers(@RequestParam(defaultValue = "firstName") String searchType,
                                          @RequestParam(defaultValue = "") String searchText,
                                          @RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "10") int size) {
        return cService.searchCustomers(searchType, searchText, page, size);
    }


    ////////////////////////////////// JWT //////////////////////////////////
//    @GetMapping("/current-user")
//    public String getLoggedInUser(Principal principal){
//        return principal.getName();
//    }
}
