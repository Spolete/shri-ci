import fetch from 'node-fetch';
import * as core from '@actions/core';

interface GithubIssueResponse {
    number: number;
}

const token = core.getInput('github_token');
const repo = core.getInput('github_repo');
const actor = core.getInput('github_actor');
const version = core.getInput('github_ref_name');

const headers = {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github.v3+json',
};

const date = new Date().toISOString().slice(0,10);
const body = `Release Information:\n\n- Author: ${actor}\n- Release Date: ${date}\n- Version: ${version}\n- Changelog: <Insert Changelog Here>`;

fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
        title: 'RELEASE',
        body,
    }),
})
    .then(response => response.json())
    .then((data: GithubIssueResponse) => console.log(`Issue created with number ${data.number}`))
    .catch(error => core.setFailed(`Action failed with error ${error}`));
