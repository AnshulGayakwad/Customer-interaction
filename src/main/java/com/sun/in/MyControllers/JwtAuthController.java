package com.sun.in.MyControllers;

import com.sun.in.MyEntities.AllUsers;
import com.sun.in.MyEntities.JwtRequest;
import com.sun.in.MyEntities.JwtResponse;
import com.sun.in.MyRepositories.UserRepo;
import com.sun.in.MyServices.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.sun.in.Security.JwtHelper;

@RestController
@RequestMapping("/auth")
public class JwtAuthController {
//    @Autowired
//    private UserService userDetailsService;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private AuthenticationManager manager;
    @Autowired
    private JwtHelper helper;
    @Autowired
    private UserRepo userRepo;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request){
        //doAuthenticate(request.getUsername(), request.getPassword());

        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        if(userDetails == null){
            return new ResponseEntity<>(new JwtResponse(), HttpStatus.NOT_FOUND);
        }
        final String token = helper.generateToken(userDetails);

        JwtResponse response = JwtResponse.builder()
                .jwtToken(token)
                .username(userDetails.getUsername()).build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    private void doAuthenticate(String username, String password) {
//        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, password);
//        try {
//            manager.authenticate(authentication);
//        }
//        catch (BadCredentialsException e) {
//            throw new BadCredentialsException(" Invalid Username or Password  !!" + e.getMessage());
//        }
//    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody JwtRequest jwtRequest){
        if(userRepo.findByUsername(jwtRequest.getUsername()).isPresent()){
            return new ResponseEntity<>("Username already exists!", HttpStatus.CONFLICT);
        }
        AllUsers user = AllUsers.builder().username(jwtRequest.getUsername()).password(jwtRequest.getPassword()).build();
        userRepo.save(user);
        return new ResponseEntity<>("User registered successfully!", HttpStatus.OK);
    }
}
