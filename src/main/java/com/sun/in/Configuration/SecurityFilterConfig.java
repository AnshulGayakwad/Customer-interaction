package com.sun.in.Configuration;

import org.springframework.context.annotation.Configuration;
import com.sun.in.Security.JwtAuthenticationEntryPoint;
import com.sun.in.Security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;


@Configuration
public class SecurityFilterConfig {
    @Autowired
    private JwtAuthenticationEntryPoint point;
    @Autowired
    private JwtAuthenticationFilter filter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .cors(cors -> cors.disable())
                .authorizeHttpRequests(auth -> auth.requestMatchers("/home/**").authenticated()
                                                .requestMatchers("/auth/**", "/**").permitAll()
//                                                .anyRequest().authenticated()
                )

//                .formLogin(form -> form.loginPage("/").permitAll())
//                        //.defaultSuccessUrl("/home/").permitAll())
//                .logout(form -> form.invalidateHttpSession(true).clearAuthentication(true)
//                    .logoutRequestMatcher(new AntPathRequestMatcher("/"))
//                    .logoutSuccessUrl("/").permitAll())

                .exceptionHandling(ex -> ex.authenticationEntryPoint(point))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


}
