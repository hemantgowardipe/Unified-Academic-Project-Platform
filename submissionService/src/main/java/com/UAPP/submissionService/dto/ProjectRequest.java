package com.UAPP.submissionService.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectRequest {
    private String title;
    private String description;
    private List<String> students;
    private String guideName;
    private String coGuideName;
    private String email;
    private String url;
    private String githubRepo;
    private LocalDate startDate;
    private LocalDate finalSubmissionDate;
    private String createdBy;
}