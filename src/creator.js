/*
 * @Author: Chris
 * @Date: 2019-12-03 14:47:30
 * @LastEditors: Chris
 * @LastEditTime: 2019-12-09 20:14:49
 * @Descripttion: **
 */
const program = require('commander')
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs-extra');
const download = require('download-git-repo');
const config = require('../package');//package.json

const log = data => console.log(chalk.green(data));
const warn = data => console.log(chalk.yellow(data));
const error = data => console.log(chalk.yellow(data));
// const prompt = inquirer.createPromptModule();

const tplBuilder = require('../template/index.js');

class Creator {
  constructor(projectName) {
    this.options = {
      name: projectName,
      version: '1.0.0',
      description: '*',
    };
  }
  // 初始化；
  init() {
    log(`${config.name} ${config.version}`);
    this.ask()
      .then((ansers) => {
        this.options = Object.assign({}, this.options, ansers);
        // log(JSON.stringify(ansers))
        // log(JSON.stringify(this.options))
        this.write(ansers);

      }).catch(err => {
        error(err)
      });
  }
  // 和命令行交互；
  ask() {
    const questions = [];
    questions.push({
      type: 'input',
      name: 'name',
      default: this.options.name,
      message: 'package name：',
      validate(input) {
        if (fs.existsSync(input)) {
          return chalk.yellow('项目名重复，请重新输入')
        }
        return true;
      }
    });
    questions.push({
      type: 'input',
      name: 'version',
      default: this.options.version,
      message: 'version：'
    });
    questions.push({
      type: 'input',
      name: 'description',
      default: this.options.description,
      message: 'description：',
    });

    return inquirer.prompt(questions);
  }
  // 拷贝&写数据；
  write(ansers) {
    const { name } = ansers;
    const spinner = ora("Downloading...");
    spinner.start();
    download('he1237596/taro-wx#master', name, {}, (err) => {
      if (err) {
        spinner.fail();
        console.log(chalk.red(`Downloading failed. ${err}`))
        return;
      }

      // 结束加载图标
      spinner.succeed();
      console.log(chalk.green('\n Downloading completed! \n'))
      const spinner1 = ora("配置初始化...");
      spinner1.start();
      fs.readJson(`${process.cwd()}/${name}/package.json`).then(option => {
        const data = {
          ...option,
          name: ansers.name,
          description: ansers.description,
          version: ansers.version,
        }
        fs.writeFile(`${process.cwd()}/${name}/package.json`, JSON.stringify(data, null, 2)).then(() => {
          if (err) {
            spinner.fail();
            console.log(chalk.red(`Downloading failed. ${err}`))
            return;
          }
          spinner1.succeed();
          console.log(chalk.green('\n init completed!'))
          console.log('\n To get started')
          console.log(`\n cd ${name}`)
          console.log(`\n npm install`)
          console.log(`\n npm run xxx 更多参考Taro框架 \n`)
        });
      })
    });

    // log('begin writting');
    // console.log(tplBuilder)
    // tplBuilder.build(this,this.options,()=>{
    //   chalk('构建完成');
    //   console.log(chalk.grey(`开始项目:  cd ${this.options.name } && npm install`))
    // })
  }
}

module.exports = Creator;