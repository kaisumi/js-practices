
const fs = require('fs')
const readline = require('readline')
const helper = require('./helper')

class Operations {
  static createMemo () {
    const id = Number(fs.readFileSync('id.txt', { encoding: 'utf8' })) + 1
    const reader = readline.createInterface({ input: process.stdin })

    reader.on('line', (line) => {
      fs.appendFile(`data/memo${id}.txt`, `${line}\n`, (err) => {
        if (err) console.error(err)
      })
    })

    reader.on('close', () => {
      fs.writeFile('id.txt', String(id), (err) => {
        if (err) console.error(err)
      })
    })
  }

  static listMemo () {
    helper.readData().forEach((list) => {
      const titles = Object.values(list)
      console.log(titles[0])
    })
    return true
  }

  static readMemo () {
    helper.setPrompt('see').run().then((answer) => {
      const values = Object.values(answer)
      console.log(fs.readFileSync(`data/memo${values[0]}.txt`, { encoding: 'utf8' }).toString())
    })
    return true
  }

  static deleteMemo () {
    helper.setPrompt('delete').run().then((answer) => {
      const values = Object.values(answer)
      fs.unlink(`data/memo${values[0]}.txt`, (err) => {
        if (err) console.error(err)
        console.log('Memo deleted.')
      })
    })
    return true
  }
}
module.exports = Operations
