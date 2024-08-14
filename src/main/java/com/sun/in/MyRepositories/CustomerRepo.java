package com.sun.in.MyRepositories;

import com.sun.in.MyEntities.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, Long> {
    Page<Customer> findByFirstNameContainingOrCityContainingOrEmailContainingOrPhoneContaining(
            String firstName, String city, String email, String phone, Pageable pageable);
}
