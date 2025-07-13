package com.UAPP.submissionService.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GithubDto {
    private String id;
    private String githubRepoUrl;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getGithubRepoUrl() {
        return githubRepoUrl;
    }

    public void setGithubRepoUrl(String githubRepoUrl) {
        this.githubRepoUrl = githubRepoUrl;
    }
}