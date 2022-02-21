const argv = require('minimist')(process.argv.slice(2))
const DAYS_OF_A_WEEK = 7
const firstDay = new Date()
firstDay.setDate(1)

if (argv.y) {
  firstDay.setFullYear(argv.y)
}
if (argv.m) {
  firstDay.setMonth(argv.m - 1)
  if (argv._[0]) {
    firstDay.setFullYear(argv._[0])
  }
}

const y = firstDay.getFullYear(); const m = firstDay.getMonth()
const lastDay = new Date(y, m + 1, 0)

console.log('      ' + ('  ' + (m + 1)).slice(-2) + '月 ' + y)
console.log('日 月 火 水 木 金 土')

let week = ''
for (let j = 1; j <= firstDay.getDay(); j++) {
  week += '   '
}
for (let i = 1; i <= lastDay.getDate(); i++) {
  week += ('  ' + i).slice(-2)
  if (i % DAYS_OF_A_WEEK === (firstDay.getDay() === 0 ? 0 : DAYS_OF_A_WEEK - firstDay.getDay())) {
    console.log(week)
    week = ''
  } else {
    week += ' '
  }
}
if (week !== '') {
  console.log(week)
}
