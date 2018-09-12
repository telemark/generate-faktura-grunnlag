const { readdir } = require('fs').promises
const csv = require('csvtojson')
const { QUEUE_DIRECTORY_PATH } = require('../../config')
const logger = require('../logger')
const isJob = file => file.includes('.job.')

module.exports = async () => {
  const files = await readdir(QUEUE_DIRECTORY_PATH)
  const file = files.filter(isJob)[0]
  if (file) {
    const fileName = `${QUEUE_DIRECTORY_PATH}/${file}`
    const data = await csv().fromFile(fileName)
    return data
  } else {
    logger('info', ['get-next-from-queue', 'no jobs found'])
    process.exit(0)
  }
}
