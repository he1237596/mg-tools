/*
 * @Author: Chris
 * @Date: 2019-12-03 18:11:13
 * @LastEditors: Chris
 * @LastEditTime: 2019-12-03 18:54:53
 * @Descripttion: **
 */
const fs = require('fs')
const path = require('path');
const Tpl = (creator, options, callback) => {
  const { name, description } = options;
  const cwd = process.cwd();
  const projectPath = path.join(cwd, name);
  const buildPath = path.join(projectPath, 'build');
  const pagePath = path.join(projectPath, 'page');
  const srcPath = path.join(projectPath, 'src');
  fs.mkdirSync(projectPath);
  fs.mkdirSync(buildPath);
  fs.mkdirSync(pagePath);
  fs.mkdirSync(srcPath);
  callback();
}
module.exports = {
  build: Tpl
}