import fetch from 'node-fetch';
import * as core from '@actions/core';

const token = process.env.GITHUB_TOKEN;
const repo = process.env.GITHUB_REPOSITORY;
const version = process.env.GITHUB_REF_NAME;
const testResult = process.env.TEST_RESULT;

const headers = {
  Authorization: `token ${token}`,
  Accept: 'application/vnd.github.v3+json',
};

fetch(`https://api.github.com/repos/${repo}/issues?state=all`, {
  headers,
})
  .then(response => response.json())
  .then((issues) => {
    // Check if release issue already exists
    const releaseIssue = issues.find(issue => issue.title === 'RELEASE' && issue.body.includes(`Version: ${version}`));
    if (!releaseIssue) return;

    const commentBody = testResult ? `
Tests have failed.
` : `
Tests have been completed successfully.
`;
    fetch(`https://api.github.com/repos/${repo}/issues/${releaseIssue.number}/comments`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        body: commentBody,
      }),
    })
      .then(response => response.json())
      .then(() => console.log('Comment added about test completion.'))
      .catch(error => core.setFailed(`Action failed with error ${error}`));
  });

