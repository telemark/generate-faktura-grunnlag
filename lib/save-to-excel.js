const xlsx = require('xlsx-writestream')
const logger = require('./logger')

module.exports = options => {
  return new Promise((resolve, reject) => {
    logger('info', ['save-to-excel', options.filePath, 'start'])
    xlsx.write(options.filePath, options.data, error => {
      if (error) {
        logger('error', ['save-to-excel', options.filePath, error])
        reject(error)
      } else {
        logger('info', ['save-to-excel', options.filePath, 'finished'])
        resolve({ success: true })
      }
    })
  })
}
