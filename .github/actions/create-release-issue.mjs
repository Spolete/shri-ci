import fetch from 'node-fetch';
import * as core from '@actions/core';

const token = process.env.GITHUB_TOKEN;
const repo = process.env.GITHUB_REPOSITORY;
const actor = process.env.GITHUB_ACTOR;
const version = process.env.GITHUB_REF_NAME;
const runId = process.env.GITHUB_RUN_ID;
const changelog = process.env.CHANGELOG;

// The URL to the current workflow run
const workflowURL = `https://github.com/${repo}/actions/runs/${runId}`;
const releaseBranchURL = `https://github.com/${repo}/tree/release/${version}`

const headers = {
  Authorization: `token ${token}`,
  Accept: 'application/vnd.github.v3+json',
};

// Fetch all issues
fetch(`https://api.github.com/repos/${repo}/issues?state=all`, {
  headers,
})
  .then(response => response.json())
  .then((issues) => {
    // Check if release issue already exists
    const releaseIssue = issues.find(issue => issue.title === 'RELEASE' && issue.body.includes(`Version: ${version}`));
    if (releaseIssue) {
      // If it exists, add a comment
      const commentBody = `
        New run of workflow:
        - Author: **${actor}**
        - [Workflow Run](${workflowURL})
      `;
      fetch(`https://api.github.com/repos/${repo}/issues/${releaseIssue.number}/comments`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          body: commentBody,
        }),
      })
        .then(response => response.json())
        .then(() => console.log('Comment added to existing release issue.'))
        .catch(error => core.setFailed(`Action failed with error ${error}`));
    } else {
      // If it doesn't exist, create a new issue
      const issueBody = `
        ## Release Information
        - Author: **${actor}**
        - Release Date: **${new Date().toISOString().slice(0,10)}**
        - Version: **${version}**
        - [Workflow Run](${workflowURL})
        - [Release Branch](${releaseBranchURL})

        ### Changelog
        ${changelog}
      `;

      fetch(`https://api.github.com/repos/${repo}/issues`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: 'RELEASE',
          body: issueBody,
        }),
      })
        .then(response => response.json())
        .then((data) => console.log(`Issue created with number ${data.number}`))
        .catch(error => core.setFailed(`Action failed with error ${error}`));
    }
  });
