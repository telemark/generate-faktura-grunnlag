(async () => {
  const { readFile } = require('fs').promises
  const filePath = 'test/directories/done/batch-15-2018-2019.csv'
  const data = await readFile(filePath, 'latin1')
  data.split('\r\n').forEach(line => {
    const list = line.split(';')
    if (list[1].length > 40) {
      console.log(list[1])
    }
  })
})()
