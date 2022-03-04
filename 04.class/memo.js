const operation = require('./operations')

switch (process.argv[2]) {
  case '-l':
    operation.listMemo()
    break
  case '-r':
    operation.readMemo()
    break
  case '-d':
    operation.deleteMemo()
    break
  default:
    operation.createMemo()
}
