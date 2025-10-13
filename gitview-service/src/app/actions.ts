'use server';

import { rewriteCommitMessage } from '@/ai/flows/rewrite-commit-message';

const GITHUB_API_BASE = 'https://api.github.com';

const getAuthHeaders = () => {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

export async function fetchCommits(owner: string, repo: string) {
  let allCommits: any[] = [];
  let page = 1;
  const perPage = 100; // Fetch 100 commits per page
  let hasMore = true;

  try {
    while (hasMore) {
      const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/commits?per_page=${perPage}&page=${page}`, {
        headers: getAuthHeaders(),
        next: {
          revalidate: 3600 // Revalidate once an hour
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          return { error: 'Repository not found. Please check the URL.' };
        }
        if (response.status === 403) {
          const rateLimitInfo = await response.json();
          const message = rateLimitInfo.message.includes('rate limit exceeded')
            ? 'GitHub API rate limit exceeded. Please add a GITHUB_TOKEN to your .env file or try again later.'
            : rateLimitInfo.message;
          return { error: message };
        }
        const errorData = await response.json();
        return { error: errorData.message || `Failed to fetch commits (status: ${response.status}).` };
      }

      const commits = await response.json();
      
      if (commits.length < perPage) {
        hasMore = false;
      }

      allCommits = allCommits.concat(commits);
      page++;
    }
    return { commits: allCommits };
  } catch (error) {
    console.error('Fetch commits error:', error);
    return { error: 'An unexpected network error occurred.' };
  }
}

export async function rewriteCommitWithAI(owner: string, repo: string, sha: string) {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/commits/${sha}`, {
      headers: getAuthHeaders(),
       next: {
        revalidate: 3600 * 24 // Revalidate once a day
      }
    });

    if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.message || `Failed to fetch commit details (status: ${response.status}).` };
    }

    const commitDetails = await response.json();
    const originalMessage = commitDetails.commit.message;
    // The 'patch' field (diff) isn't always present on the commit details endpoint for merge commits.
    // We will handle cases where diff might be empty or null.
    const diff = commitDetails.files?.map((file: any) => file.patch || '').join('\n') || '';

    if (!diff && commitDetails.parents.length > 1) {
       return { rewrittenMessage: `This is a merge commit. No file changes to analyze.

Original message:
${originalMessage}`, originalMessage };
    }
    
    if (!diff) {
        return { error: 'Could not retrieve diff for this commit. It might be an empty commit with no file changes.' };
    }


    const result = await rewriteCommitMessage({
      commitMessage: originalMessage,
      diff: diff,
    });
    
    return { rewrittenMessage: result.rewrittenMessage, originalMessage };
  } catch (error: any) {
    console.error('Rewrite commit error:', error);
    if (error.message.includes('SAFETY')) {
        return { error: 'The AI model refused to generate a response due to safety concerns.' };
    }
    return { error: 'An unexpected error occurred during AI rewrite.' };
  }
}
