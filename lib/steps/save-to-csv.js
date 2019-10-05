const uuid = require('uuid-random')
const { parse } = require('json2csv')
const saveFile = require('../save-file')
const logger = require('../logger')
const config = require('../../config')

const parseOptions = {
  header: false,
  quote: '',
  delimiter: ';',
  eol: '\r\n',
  fields: [
    'id',
    'name',
    'address1',
    'addresse2',
    'zip',
    'city',
    'mobile',
    'email',
    'partNumber',
    'amount',
    'qty',
    'notes1',
    'notes2'
  ]
}

module.exports = async data => {
  const filePath = `${config.JOBS_DIRECTORY_PATH}/${uuid()}-${config.VALID_LINES.join('-')}.csv`
  const csv = parse(data, parseOptions)
  logger('info', ['save-to-csv', filePath, 'start'])
  try {
    await saveFile({ filePath: filePath, data: csv })
    logger('info', ['save-to-csv', filePath, 'finished'])
    return data
  } catch (error) {
    logger('error', ['save-to-csv', filePath, error])
    throw error
  }
}
