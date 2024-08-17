package com.sun.in.MyRepositories;

import com.sun.in.MyEntities.AllUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<AllUsers, Long> {
    Optional<AllUsers> findByUsernameAndPassword(String username, String password);
    Optional<AllUsers> findByUsername(String username);
}
