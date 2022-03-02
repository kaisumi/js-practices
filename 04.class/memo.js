
const fs = require('fs')
let id

id = Number(fs.readFileSync('id.txt', { encoding: 'utf8' }))
id++

if (process.argv[2] === '-l') {
  const list = []
  for (let i = 1; i < id; i++) {
    if (fs.existsSync(`data/memo${i}.txt`)) {
      const memoLines =
        fs.readFileSync(`data/memo${i}.txt`, { encoding: 'utf8' })
          .toString()
          .split('\n')
      list.push({ name: memoLines[0], value: i })
    }
  }
  list.forEach((list) => {
    const titles = Object.values(list)
    console.log(titles[0])
  })
} else if (process.argv[2] === '-r') {
  const list = []
  for (let i = 1; i < id; i++) {
    if (fs.existsSync(`data/memo${i}.txt`)) {
      const memoLines =
        fs.readFileSync(`data/memo${i}.txt`, { encoding: 'utf8' })
          .toString()
          .split('\n')
      list.push({ name: memoLines[0], value: i })
    }
  }
  const { Select } = require('enquirer')
  const prompt = new Select({
    name: 'memo',
    message: 'Choose a note you want to see:',
    choices: list,
    result (names) {
      return this.map(names)
    }
  })
  prompt.run().then((answer) => {
    const values = Object.values(answer)
    console.log(fs.readFileSync(`data/memo${values[0]}.txt`, { encoding: 'utf8' }).toString())
  })
} else if (process.argv[2] === '-d') {
  const list = []
  for (let i = 1; i < id; i++) {
    if (fs.existsSync(`data/memo${i}.txt`)) {
      const memoLines =
        fs.readFileSync(`data/memo${i}.txt`, { encoding: 'utf8' })
          .toString()
          .split('\n')
      list.push({ name: memoLines[0], value: i })
    }
  }
  const { Select } = require('enquirer')
  const prompt = new Select({
    name: 'memo',
    message: 'Choose a note you want to delete:',
    choices: list,
    result (names) {
      return this.map(names)
    }
  })
  prompt.run().then((answer) => {
    const values = Object.values(answer)
    fs.unlink(`data/memo${values[0]}.txt`, (err) => {
      if (err) {
        console.error(err)
      }
      console.log('file deleted.')
    })
  })
} else {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')

  const reader = require('readline').createInterface({
    input: process.stdin
  })
  reader.on('line', (line) => {
    fs.appendFile(`data/memo${id}.txt`, `${line}\n`, (err) => {
      if (err) console.error(err)
    })
  })

  reader.on('close', () => {
    fs.writeFile('id.txt', String(id), (err) => {
      if (err) {
        console.error(err)
      }
      console.log('writeId(id) successful.')
    })
  })
}
