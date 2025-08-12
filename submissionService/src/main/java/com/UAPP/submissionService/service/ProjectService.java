package com.UAPP.submissionService.service;

import com.UAPP.submissionService.dto.ProjectRequest;
import com.UAPP.submissionService.model.Project;
import com.UAPP.submissionService.repository.ProjectRepository;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Project createProject(ProjectRequest request, byte[] pdfBytes, String username) {

        Project project = Project.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .students(request.getStudents())
                .guideName(request.getGuideName())
                .githubRepo(request.getGithubRepo())
                .startDate(request.getStartDate())
                .finalSubmissionDate(request.getFinalSubmissionDate())
                .projectSummaryPdf(new Binary(BsonBinarySubType.BINARY, pdfBytes))
                .createdBy(username) // ✅ SET THIS
                .build();

        return projectRepository.save(project);
    }


    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public List<Project> getProjectsByStudent(String username) {
        return projectRepository.findByCreatedBy(username); // preferred
    }

    public Optional<Project> getProjectById(String id) {
        return projectRepository.findById(id); //unused
    }
}