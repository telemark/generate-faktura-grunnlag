(async () => {
  const { readFile } = require('fs').promises
  const saveFile = require('../lib/save-file')
  const shortenName = require('../lib/shorten-name')
  const filePathIn = 'test/directories/done/batch-15-2018-2019.csv'
  const filePathOut = 'test/directories/jobs/batch-15-2018-2019.csv'
  const data = await readFile(filePathIn, 'latin1')

  function fixlongName (line) {
    const list = line.split(';')
    if (list[1].length > 40) {
      console.log(`Shortens ${list[1]}`)
      list[1] = shortenName(list[1])
    }
    return list.join(';')
  }

  const transformed = data.split('\r\n').map(fixlongName)

  await saveFile({
    filePath: filePathOut,
    data: transformed.join('\r\n')
  })

  console.log('Finished')
})()
