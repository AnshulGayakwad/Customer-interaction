package com.sun.in.Security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.PrintWriter;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        // Set HTTP status to 401 (Unauthorized)
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        // Set the 'refresh' header for a 2-second delay before redirecting to the home page
        response.setHeader("Refresh", "5;URL=" + request.getContextPath() + "/");

        // Write the message to the response body
        response.setContentType("text/plain");
        response.getWriter().write("Access Denied: " + authException.getMessage() + "\nRedirecting to home page in 5 seconds...");

    }
}
