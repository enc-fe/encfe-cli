'use strict';

const { fetchRepoList, fetchTagList } = require('./require');
const Inquirer = require('inquirer');
const downloadGitRepo = require('download-git-repo');
const { wrapLoading } = require('./utils');
const util = require('util');

class Creator {
  constructor(projectName, targetDir) {
    // new的时候调用构造函数
    this.name = projectName;
    this.target = targetDir;
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  async fetchRepo() {
    let repos = await wrapLoading(fetchRepoList, 'waiting fetch template.');
    if (!repos) return false;
    repos = repos.map(item => item.name);

    let repo = await Inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: 'please choose a template to create project',
    });

    return repo;
  }

  async fetchTag(repo) {
    let tags = await utils.wrapLoading(fetchTagList, 'waiting fetch tag.');
    if (!tags) return false;
    tags = tags.filter(item => item.name.includes('template')).map(item => item.name);

    let tag = await Inquirer.prompt({
      name: 'tag',
      type: 'list',
      choices: tags,
      message: 'please choose a tag to create project',
    });

    return tag;
  }

  async download(repo, tag) {
    // 拼接下载路径
    let requestUrl = `enc-fe/${repo}${tag?'#'+tag:''}`
    // 下载到目标目录
    await this.downloadGitRepo(requestUrl, this.target);

    return this.target;
  }

  async create() {
    // 真实开始创建

    // 采用远程拉去方式创建模板，使用github

    // 拉取当前组织下的模板
    let repo = await this.fetchRepo();

    // 通过模板，找版本号
    let tag = await this.fetchTag();

    // 下载
    let downloadUrl = await this.download(repo, tag);

    // 编译
  }

}

module.exports = Creator;
