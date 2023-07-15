"use strict";
exports.__esModule = true;
var node_fetch_1 = require("node-fetch");
var core = require("@actions/core");
var token = core.getInput('github_token');
var repo = core.getInput('github_repo');
var actor = core.getInput('github_actor');
var version = core.getInput('github_ref_name');
var headers = {
    Authorization: "token ".concat(token),
    Accept: 'application/vnd.github.v3+json'
};
var date = new Date().toISOString().slice(0, 10);
var body = "Release Information:\n\n- Author: ".concat(actor, "\n- Release Date: ").concat(date, "\n- Version: ").concat(version, "\n- Changelog: <Insert Changelog Here>");
(0, node_fetch_1["default"])("https://api.github.com/repos/".concat(repo, "/issues"), {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
        title: 'RELEASE',
        body: body
    })
})
    .then(function (response) { return response.json(); })
    .then(function (data) { return console.log("Issue created with number ".concat(data.number)); })["catch"](function (error) { return core.setFailed("Action failed with error ".concat(error)); });
