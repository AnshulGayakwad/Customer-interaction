package com.sun.in.MyEntities;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    private String username;
    private String jwtToken;
}
