const axios = require('axios')
const generateSystemToken = require('./generate-system-token')
const logger = require('./logger')

module.exports = options => {
  return new Promise(async (resolve, reject) => {
    axios.defaults.headers.common['Authorization'] = generateSystemToken(options.secret)
    logger('info', ['get-data', options.url, 'start'])
    axios.post(options.url, options.payload)
      .then(result => {
        logger('info', ['get-data', options.url, 'success'])
        resolve(result.data)
      })
      .catch(error => {
        logger('error', ['get-data', options.url, error])
        resolve(false)
      })
  })
}
