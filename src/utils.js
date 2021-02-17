'use strict';

const ora = require('ora');

async function sleep(n) {
  return new Promise((resolve, reject) => setTimeout(resolve, n));
}
// 制作一个失败后自动拉取的方法
async function wrapLoading(fn, message, ...args) {
  const spinner = ora(message);
  spinner.start();
  try {
    let repos = await fn(...args);
    spinner.succeed();
    return repos;
  } catch (e) {
    spinner.fail('request failed, refetch ...');
    sleep(1000);
    return wrapLoading(fn, message, ...args);
  }
}

module.exports = {
  wrapLoading,
}
