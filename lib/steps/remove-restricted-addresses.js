const uuid = require('uuid-random')
const logger = require('../logger')
const saveFile = require('../save-file')
const config = require('../../config')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    const filtered = await Promise.all(data.reduce(async (prev, current) => {
      if (!['4', '6', '7'].includes(current.recipient['SPES-KD'].toString())) {
        logger('warn', ['map-field-names', 'restricted address detected'])
        const options = {
          data: JSON.stringify(current, null, 2),
          filePath: `${config.ERROR_DIRECTORY_PATH}/${uuid()}.json`,
          encoding: 'utf8'
        }
        await saveFile(options)
      } else {
        prev.push(current)
      }
      return prev
    }, []))
    resolve(filtered)
  })
}
