'use strict';

// 通过axios来获取结果

const axios = require('axios');

axios.interceptors.response.use(res => {
  return res.data;
});

async function fetchRepoList() {
  return axios.get('https://api.github.com/orgs/enc-fe/repos');
}

async function fetchTagList(repo) {
  return axios.get(`https://api.github.com/orgs/enc-fe/${repo}/tags`);
}

module.exports = {
  fetchRepoList,
  fetchTagList,
}
