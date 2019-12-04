/*
 * @Author: Chris
 * @Date: 2019-12-03 14:47:30
 * @LastEditors: Chris
 * @LastEditTime: 2019-12-04 09:35:20
 * @Descripttion: **
 */
const inquirer = require('inquirer');
const chalk = require('chalk');
const log = data => console.log(chalk.green(data));
const warn = data => console.log(chalk.yellow(data));
const error = data => console.log(chalk.yellow(data));
// const prompt = inquirer.createPromptModule();
const fs = require('fs');

const tplBuilder = require('../template/index.js');
console.log(tplBuilder)
class Creator {
  constructor() {
    this.options = {
      name: 'mycli',
      description: 'mycli',
    };
  }
  // 初始化；
  init() {
    log('mycli init');
    this.ask()
    .then((ansers) => {
      this.options = Object.assign({}, this.options, ansers);
      log(JSON.stringify(ansers))
      log(JSON.stringify(this.options))
      this.write();
    }).catch(err=>{
      error(err)
    });
  }
  // 和命令行交互；
  ask() {
    log('mycli ask');
    const questions = [];
    questions.push({
      type: 'input',
      name: 'name',
      default: this.options.name,
      message: '请输入项目名称',
      validate(input){
        if(!input){
          return chalk.yellow('请输入项目名称')
        }
        if(fs.existsSync(input)){
          return chalk.yellow('项目名重复，请重新输入')
        }
        return true;
      }
    });
    questions.push({
      type: 'input',
      name: 'description',
      default: this.options.description,
      message: '请输入项目描述',
    });
    return inquirer.prompt(questions);
  }
  // 拷贝&写数据；
  write() {
    log('begin writting');
    console.log(tplBuilder)
    tplBuilder.build(this,this.options,()=>{
      chalk('构建完成');
      console.log(chalk.grey(`开始项目:  cd ${this.options.name } && npm install`))
    })
  }
}

module.exports = Creator;