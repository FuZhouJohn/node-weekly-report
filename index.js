const db = require('./db.js')

module.exports.add = async (title) => {
    const list = await db.read()

    list.push({title, done: false})
    const string = JSON.stringify(list)

    await db.write(string)
}

module.exports.clear = async () => {
    await db.write('[]')
}

module.exports.showAll = async () => {
    const list = await db.read()
    list.forEach((task, index) => {
        console.log(`${task.done?'[x]':'[ ]'} ${index + 1} - ${task.title}`)
    })
}
