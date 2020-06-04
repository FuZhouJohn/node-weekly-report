#!/usr/bin/env node
const {program} = require('commander');
const api = require('./index.js')
const pkg = require('./package.json')

program
    .command('add')
    .version(pkg.version)
    .description('添加一个任务,请输入任务标题：')
    .action((commander, words) => {
        if (words) {
            const title = words.join(' ')
            api.add(title).then(() => {
                console.log('任务添加成功')
            }, () => {
                console.log('任务添加失败')
            })
        } else {
            console.log('请输入任务标题')
        }
    });

program
    .command('clear')
    .description('删除所有任务')
    .action(() => {
        api.clear().then(()=>{
            console.log('删除所有任务成功')
        },()=>{
            console.log('删除所有任务失败')
        })
    });

if(process.argv.length === 2){
    void api.showAll()
}else{
    program.parse(process.argv)
}


