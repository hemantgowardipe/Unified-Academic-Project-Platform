package com.UAPP.submissionService.controller;

import com.UAPP.submissionService.model.ImportantDate;
import com.UAPP.submissionService.service.ImportantDateService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/important-dates")
@RequiredArgsConstructor
public class ImportantDateController {
    @Autowired
    private final ImportantDateService service;

    public ImportantDateController() {
        service = null;
    }

    @PostMapping
    public ResponseEntity<ImportantDate> addDate(@RequestBody ImportantDate date) {
        return ResponseEntity.ok(service.addDate(date));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDate(@PathVariable String id) {
        service.deleteDate(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<ImportantDate>> getDates() {
        return ResponseEntity.ok(service.getUpcomingDates());
    }
}