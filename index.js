/*
 * @Author: Chris
 * @Date: 2019-11-26 20:07:12
 * @LastEditors: Chris
 * @LastEditTime: 2019-11-26 20:38:32
 * @Descripttion: **
 */
var lib = require( './lib/lib.js' );
function hello(name){
  console.log("hello "+ name);
}
module.exports = {
  ...lib,
  hello
}; //暴露模块