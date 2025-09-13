package com.UAPP.submissionService.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Remark {
    private String text;
    private String author;
    @CreatedDate
    private Instant createdAt;
}