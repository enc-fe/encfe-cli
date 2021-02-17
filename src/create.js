'use strict';

const path = require('path');
const fs = require('fs-extra');
const Inquirer = require('inquirer');
const Creator = require('./Creator');

module.exports = async function (projectName, options) {
  console.log(projectName, options);

  const cwd = process.cwd(); // 获取命令执行时的工作目录
  const targetDir = path.join(cwd, projectName); // 目标目录

  // 校验是否存在同名目录
  if (fs.existsSync(targetDir)) {
    // 目录已经存在
    if (options.froce) {
      // 删除现有目录然后创建新的
      await fs.remove(targetDir);
    } else {
      // 提示用户是否需要覆盖
      let { action } = await Inquirer.prompt([ // 配置询问的方式
        {
          name: 'action',
          type: 'list',
          message: `Target directory already exists Pick an action:`,
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite',
            },
            {
              name: 'Cancel',
              value: false,
            },
          ],
        }
      ]);
      console.log(action);
      if (!action) {
        return false;
      } else if (action === 'overwrite') {
        console.log('\r\nRemoving...');
        // 删除现有目录然后创建新的
        await fs.remove(targetDir);
      }
    }
  }
  // 创建项目
  const creator = new Creator(projectName, targetDir);
  creator.create(); // 开始创建项目
}
