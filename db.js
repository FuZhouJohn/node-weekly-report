const fs = require('fs')
const homedir = require('os').homedir();
const home = process.env.HOME || homedir
const p = require('path')
const dbPath = p.join(home, '.todo')

module.exports = {
    read(path = dbPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, {flag: 'a+'}, (error, data) => {
                if (error) {
                    console.log(error)
                    return reject(error)
                }
                let list
                try {
                    list = JSON.parse(data.toString())
                } catch (e) {
                    list = []
                }
                resolve(list)
            })
        })
    },
    write(data, path = dbPath) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, data, error => {
                if (error) return reject(error)
                resolve()
            })
        })
    }
}
