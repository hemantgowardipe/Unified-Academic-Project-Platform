package com.UAPP.submissionService.service;

import com.UAPP.submissionService.model.ImportantDate;
import com.UAPP.submissionService.repository.ImportantDateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ImportantDateService {
    @Autowired
    private final ImportantDateRepository repo;

    public ImportantDateService() {
        repo = null;
    }

    public ImportantDate addDate(ImportantDate date) {
        return repo.save(date);
    }

    public void deleteDate(String id) {
        repo.deleteById(id);
    }

    public List<ImportantDate> getUpcomingDates() {
        return repo.findByDateAfter(Instant.now()); // auto-skip past dates
    }
}