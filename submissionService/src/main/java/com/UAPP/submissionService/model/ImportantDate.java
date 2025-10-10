package com.UAPP.submissionService.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "important_dates")
public class ImportantDate {
    @Id
    private String id;
    private String title;
    private String description;
    private Instant date;
}