#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var index_1 = require("./index");
var package_json_1 = __importDefault(require("./package.json"));
var program = new commander_1.Command();
program
    .name('node-weekly-report')
    .description('A CLI tool to generate weekly report')
    .version(package_json_1.default.version);
program
    .command('add')
    .description('添加一个任务,请输入任务标题：')
    .argument('<title>', '任务标题')
    .action(function (title, options) {
    if (title) {
        index_1.add(title).then(function () {
            console.log('任务添加成功');
        }, function () {
            console.log('任务添加失败');
        });
    }
    else {
        console.log('请输入任务标题');
    }
});
program
    .command('clear')
    .description('删除所有任务')
    .action(function () {
    index_1.clear().then(function () {
        console.log('删除所有任务成功');
    }, function () {
        console.log('删除所有任务失败');
    });
});
if (process.argv.length === 2) {
    void index_1.showAll();
}
else {
    program.parse(process.argv);
}
