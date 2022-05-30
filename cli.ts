#!/usr/bin/env node

import {Command} from 'commander';
import {add, clear, showAll} from './index';
import pkg from './package.json';

const program = new Command();

program
    .name('node-weekly-report')
    .description('A CLI tool to generate weekly report')
    .version(pkg.version);

program
    .command('add')
    .description('添加一个任务,请输入任务标题：')
    .argument('<title>', '任务标题')
    .action((title, options) => {
        if (title) {
            add(title).then(() => {
                console.log('任务添加成功');
            }, () => {
                console.log('任务添加失败');
            });
        } else {
            console.log('请输入任务标题');
        }
    });

program
    .command('clear')
    .description('删除所有任务')
    .action(() => {
        clear().then(() => {
            console.log('删除所有任务成功');
        }, () => {
            console.log('删除所有任务失败');
        });
    });

if (process.argv.length === 2) {
    void showAll();
} else {
    program.parse(process.argv);
}


