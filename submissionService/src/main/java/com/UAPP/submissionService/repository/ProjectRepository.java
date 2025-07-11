package com.UAPP.submissionService.repository;

import com.UAPP.submissionService.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ProjectRepository extends MongoRepository<Project, String> {
    Optional<Project> findById(String id);
}
