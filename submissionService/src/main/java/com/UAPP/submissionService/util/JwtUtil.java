package com.UAPP.submissionService.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;

@Component
public class JwtUtil {

    @Value("${JWT_KEY}")
    private String jwtSecret;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String extractRole(String token) {
        try {
            Object role = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .get("role"); // role claim if available
            return role != null ? role.toString() : null;
        } catch (JwtException e) {
            return null;
        }
    }

    public boolean isAdmin(String token) {
        String role = extractRole(token);
        if (role != null) {
            return "ADMIN".equalsIgnoreCase(role);
        }
        // Fallback if role not present — treat hardcoded admin username as ADMIN
        String username = extractUsername(token);
        return "admin".equalsIgnoreCase(username);
    }
}
