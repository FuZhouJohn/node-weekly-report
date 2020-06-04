const db = require('../db.js')
const fs = require('fs')
jest.mock('fs')


describe('db', () => {
    it('can read', async () => {
        const data = [{title: '买水', done: false}]
        fs.setReadFileMock('/xxx', null, JSON.stringify(data))
        const list = await db.read('/xxx')
        expect(list).toStrictEqual(data)
    })


    it('can write', () => {

    })
})
