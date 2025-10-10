package com.UAPP.submissionService.repository;


import com.UAPP.submissionService.model.ImportantDate;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.Instant;
import java.util.List;

public interface ImportantDateRepository extends MongoRepository<ImportantDate, String> {
    List<ImportantDate> findByDateAfter(Instant now); // upcoming only
}