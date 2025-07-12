package com.UAPP.auth_service.dto;

import lombok.*;

@Data
public class AuthResponse {
    private String token;
    private String role;

    public AuthResponse() {}

    public AuthResponse(String token, String role) {
        this.token = token;
        this.role = role;
    }

    // Getters and setters...

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}