package com.UAPP.auth_service.config;

import com.UAPP.auth_service.model.Role;
import com.UAPP.auth_service.model.User;
import com.UAPP.auth_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class AdminInitializer {

    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;

    // read from application.properties which in turn maps env vars
    @Value("${app.admin.username:}")
    private String adminUsername;

    @Value("${app.admin.password:}")
    private String adminPassword;

    @PostConstruct
    public void ensureAdmin() {
        try {
            // If there is already an ADMIN user in DB, do nothing.
            boolean adminExists = userRepository.findAll().stream()
                    .anyMatch(u -> u.getRole() == Role.ADMIN);

            if (adminExists) {
                log.info("Admin user already present in DB — skipping admin seed.");
                return;
            }

            // If no admin exists, require env vars to be set.
            if (adminUsername == null || adminUsername.isBlank() ||
                    adminPassword == null || adminPassword.isBlank()) {
                log.warn("No admin user found and ADMIN_USERNAME/ADMIN_PASSWORD not provided. " +
                        "Create an admin user manually or set environment variables.");
                return;
            }

            // If username already exists (maybe as student), avoid overwrite.
            Optional<User> existing = userRepository.findByUsername(adminUsername);
            if (existing.isPresent()) {
                log.warn("A user with username '{}' already exists. Not creating admin to avoid overwrite.", adminUsername);
                return;
            }

            User admin = User.builder()
                    .username(adminUsername)
                    .password(passwordEncoder.encode(adminPassword))
                    .role(Role.ADMIN)
                    .build();

            userRepository.save(admin);
            log.info("Admin user created from environment variable: username={}", adminUsername);
        } catch (Exception e) {
            log.error("Failed to initialize admin user", e);
        }
    }
}
