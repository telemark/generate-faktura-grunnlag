const uuid = require('uuid-random')
const logger = require('../logger')
const saveFile = require('../save-file')
const config = require('../../config')

module.exports = async data => {
  const filtered = data.reduce((prev, current) => {
    if (['4', '6', '7'].includes(current.recipient['SPES-KD'].toString())) {
      prev.restricted.push(current)
    } else {
      prev.open.push(current)
    }
    return prev
  }, { open: [], restricted: [] })
  if (filtered.restricted.length > 0) {
    logger('warn', ['map-field-names', 'restricted addresses detected'])
    const options = {
      data: JSON.stringify(filtered.restricted, null, 2),
      filePath: `${config.ERRORS_DIRECTORY_PATH}/${uuid()}.json`,
      encoding: 'utf8'
    }
    await saveFile(options)
  }
  return filtered.open
}
