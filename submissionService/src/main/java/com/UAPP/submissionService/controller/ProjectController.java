package com.UAPP.submissionService.controller;

import com.UAPP.submissionService.dto.AddRemarkRequest;
import com.UAPP.submissionService.dto.ProjectRequest;
import com.UAPP.submissionService.model.Project;
import com.UAPP.submissionService.model.Remark;
import com.UAPP.submissionService.repository.ProjectRepository;
import com.UAPP.submissionService.service.EmailService;
import com.UAPP.submissionService.service.ProjectService;
import com.UAPP.submissionService.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:3000",
    "https://unified-academic-project-platform.vercel.app"
})
public class ProjectController {

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private ProjectService projectService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Project> addProject(
            @RequestPart("project") ProjectRequest request,
            @RequestPart("file") MultipartFile file,
            @RequestHeader("Authorization") String token) throws IOException {

        String username = jwtUtil.extractUsername(token.substring(7));
        byte[] pdfBytes = file.getBytes();

        Project project = projectService.createProject(request, pdfBytes, username);

        return ResponseEntity.ok(project);
    }

    @GetMapping("/my")
    public ResponseEntity<List<Project>> getMyProjects(@RequestHeader("Authorization") String token) {
        String jwt = token.substring(7); // remove "Bearer "
        String username = jwtUtil.extractUsername(jwt);

        // If the logged-in user is the hardcoded admin
        if ("admin".equalsIgnoreCase(username)) {
            return ResponseEntity.ok(projectService.getAllProjects());
        }

        // For students, show only their own
        return ResponseEntity.ok(projectService.getProjectsByStudent(username));
    }
    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(
            @PathVariable String id,
            @RequestPart("project") ProjectRequest request,
            @RequestPart(value = "file", required = false) MultipartFile file) {

        byte[] pdfBytes = null;
        if (file != null && !file.isEmpty()) {
            try {
                pdfBytes = file.getBytes();
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        Project updatedProject = projectService.updateProject(id, request, pdfBytes);
        return ResponseEntity.ok(updatedProject);
    }

    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> getPdf(@PathVariable String id) {
        Project project = projectRepository.findById(id).orElse(null);

        if (project == null || project.getProjectSummaryPdf() == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=summary.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(project.getProjectSummaryPdf().getData());
    }



    @GetMapping("/{projectId}")
    public ResponseEntity<Project> getProjectById(@PathVariable String projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        return ResponseEntity.ok(project);
    }


    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/admin")
    public ResponseEntity<List<Project>> getAllProjectsForAdmin(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        if (!jwtUtil.isAdmin(token)) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable String id, @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String username = jwtUtil.extractUsername(token);

        Project project = projectService.getProjectById(id).orElse(null);
        if (project == null) return ResponseEntity.notFound().build();

        // Allow delete only if creator matches
        if (!project.getCreatedBy().equals(username)) {
            return ResponseEntity.status(403).build();
        }

        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/remarks")
    public ResponseEntity<Project> addRemark(
            @PathVariable String id,
            @RequestBody AddRemarkRequest req,
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.substring(7);
        if (!jwtUtil.isAdmin(token)) return ResponseEntity.status(403).build();

        Project p = projectService.getProjectById(id).orElse(null);
        if (p == null) return ResponseEntity.notFound().build();

        Remark r = Remark.builder()
                .text(req.getText())
                .author("admin")
                .createdAt(Instant.now())
                .build();

        p.getRemarks().add(r);
        Project saved = projectService.save(p);

        if (p.getEmail() != null && !p.getEmail().isEmpty()) {
            emailService.sendRemarkNotification(p.getEmail(), p.getTitle(), req.getText());
        }

        return ResponseEntity.ok(saved);
    }

}
