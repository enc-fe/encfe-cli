'use strict';

const program = require('commander');
const chalk = require('chalk');

// parseOption 格式化命令参数
const parseOption = (cmd) => {
  const args = {};
  cmd.options.forEach((option) => {
    const key = option.long.slice(2);
    if (cmd[key]) args[key] = cmd[key];
  });
  return args;
}

// 创建项目
program
  .command('create <app-name>')
  .description('create a new project')
  .option('-f, --force', 'overwrite target directory if it exists')
  .action((name, cmd) => {
    console.log(name, parseOption(cmd));
    // 调用create模块
    require('./create')(name, parseOption(cmd));
  });

program
  .version(`cli@${require('../package.json').version}`)
  .usage(`<command> [option]`);

program.on('--help', function () {
  console.log();
  console.log(`Run ${chalk.yellow('cli <command> --help')} show details`);
  console.log();
});

// 用于解析用户执行命令时传入的参数
program.parse(process.argv);
