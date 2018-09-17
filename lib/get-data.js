const axios = require('axios')
const generateSystemToken = require('./generate-system-token')
const logger = require('./logger')

module.exports = async options => {
  axios.defaults.headers.common['Authorization'] = generateSystemToken(options.secret)
  logger('info', ['get-data', options.url, 'start'])
  try {
    const { data } = await axios.post(options.url, options.payload)
    logger('info', ['get-data', options.url, 'success'])
    console.log(data)
    return data
  } catch (error) {
    logger('error', ['get-data', options.url, error])
    return false
  }
}
