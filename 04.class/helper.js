
const fs = require('fs')

class Helper {
  static readData () {
    const list = []
    const files = fs.readdirSync('data/')
    for (let i in files) {
      if (files[i] === 'id.txt') continue
      const memoLines =
        fs.readFileSync(`data/${files[i]}`, { encoding: 'utf8' })
          .toString().split('\n')
      const index = parseInt(files[i].replace(/memo(\d+).txt/, '$1'))
      list.push({ name: memoLines[0], value: index })
    }
    return list
  }

  static setPrompt (operate) {
    const list = this.readData()
    const { Select } = require('enquirer')
    const prompt = new Select({
      name: 'memo',
      message: `Choose a note you want to ${operate}:`,
      choices: list,
      result (names) {
        return this.map(names)
      }
    })
    return prompt
  }
}
module.exports = Helper
