const db = require('../db.js')


const fs = require('fs')
jest.mock('fs')

describe('db', () => {
    afterEach(() => {
        fs.clearMocks()
    })
    it('can read', async () => {
        const data = [{title: '买水', done: false}]
        const path = '/xxx'
        fs.setReadFileMock(path, null, JSON.stringify(data))
        const list = await db.read(path)
        expect(list).toStrictEqual(data)
    })


    it('can write', async () => {
        let fakeFile = undefined
        const path = '/yyy'
        fs.setWriteFileMock(path, (path, data, callback) => {
            fakeFile = data
            callback(null)
        })

        const list = [{title: '买水', done: false}]
        await db.write(list, path)
        expect(fakeFile).toBe(JSON.stringify(list))
    })
})
