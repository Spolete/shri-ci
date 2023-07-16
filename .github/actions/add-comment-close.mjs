import fetch from 'node-fetch';
import * as core from '@actions/core';

const token = process.env.GITHUB_TOKEN;
const repo = process.env.GITHUB_REPOSITORY;
const issueNumber = process.env.GITHUB_ISSUE_NUMBER;

const headers = {
  Authorization: `token ${token}`,
  Accept: 'application/vnd.github.v3+json',
};

const commentBody = "Deploy has been completed successfully.";

fetch(`https://api.github.com/repos/${repo}/issues/${issueNumber}/comments`, {
  method: 'POST',
  headers,
  body: JSON.stringify({
    body: commentBody,
  }),
})
  .then(response => response.json())
  .then(() => console.log('Comment added about deploy close.'))
  .catch(error => core.setFailed(`Action failed with error ${error}`));

