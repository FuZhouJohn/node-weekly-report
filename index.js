const db = require('./db.js')
const inquirer = require('inquirer')

module.exports.add = async (title) => {
    const list = await db.read()

    list.push({title, done: false})

    await db.write(list)
}

module.exports.clear = async () => {
    await db.write([])
}

function askForCreateTask(list) {
    inquirer.prompt({
        type: 'input',
        name: 'title',
        message: '请输入任务标题'
    }).then(answer => {
        list.push({
            title: answer.title,
            done: false
        })
        db.write(list)
    });
}

function maskAsDone(list, index) {
    list[index].done = true
    db.write(list)
}

function maskAsUndone(list, index) {
    list[index].done = false
    db.write(list)
}

function remove(list, index) {
    list.splice(index, 1)
    db.write(list)
}

function updateTitle(list, index) {
    inquirer.prompt({
        type: 'input',
        name: 'title',
        message: '请输入新的标题',
        default: list[index].title
    }).then(answer3 => {
        list[index].title = answer3.title
        db.write(list)
    });
}


function askForAction(list, index) {
    inquirer
        .prompt({
            type: 'list',
            name: 'action',
            message: '请选择你要进行操作',
            choices: [
                {name: '退出', value: 'quit'},
                {name: '已完成', value: 'maskAsDone'},
                {name: '未完成', value: 'maskAsUndone'},
                {name: '删除', value: 'remove'},
                {name: '修改标题', value: 'updateTitle'},
            ]
        })
        .then(answer => {
            const actions = {
                maskAsDone,
                maskAsUndone,
                remove,
                updateTitle
            }

            actions[answer.action] && actions[answer.action](list, index)
        });
}

function printAllTasks(list) {
    inquirer
        .prompt({
            type: 'list',
            name: 'index',
            message: '请选择你想操作的任务',
            choices: [{name: '创建任务', value: '-1'}, {name: '退出', value: '-2'}, ...list.map((task, index) => {
                return {name: `${task.done ? '[x]' : '[ ]'} ${index + 1} - ${task.title}`, value: index.toString()}
            })]
        })
        .then(answer => {
            const index = parseInt(answer.index)
            if (index === -1) {
                askForCreateTask(list)
            } else if (index >= 0) {
                askForAction(list, index)
            }
        });
}

module.exports.showAll = async () => {
    const list = await db.read()

    printAllTasks(list)
}
