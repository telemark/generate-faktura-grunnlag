const uuid = require('uuid-random')
const { parse } = require('json2csv')
const saveFile = require('../save-file')
const logger = require('../logger')
const config = require('../../config')

const parseOptions = {
  header: false,
  fields: [
    'id',
    'name',
    'address1',
    'addresse2',
    'zip',
    'city',
    'amount',
    'qty',
    'notes1',
    'notes2'
  ]
}

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    const filePath = `${config.JOBS_DIRECTORY_PATH}/${uuid()}-${config.VALID_LINES.join('-')}.csv`
    const csv = parse(data, parseOptions)
    logger('info', ['save-to-csv', filePath, 'start'])
    try {
      await saveFile({ filePath: filePath, data: csv })
      logger('info', ['save-to-csv', filePath, 'finished'])
      resolve(data)
    } catch (error) {
      logger('error', ['save-to-csv', filePath, error])
      reject(error)
    }
  })
}
