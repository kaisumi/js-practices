
const fs = require('fs')

class Helper {
  static readData () {
    const id = Number(fs.readFileSync('id.txt', { encoding: 'utf8' })) + 1
    const list = []
    for (let i = 1; i < id; i++) {
      if (fs.existsSync(`data/memo${i}.txt`)) {
        const memoLines =
          fs.readFileSync(`data/memo${i}.txt`, { encoding: 'utf8' })
            .toString().split('\n')
        list.push({ name: memoLines[0], value: i })
      }
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
