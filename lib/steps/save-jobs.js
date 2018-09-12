const saveFile = require('../save-file')
const logger = require('../logger')
const { JOBS_DIRECTORY_PATH } = require('../../config')

module.exports = async data => {
  const next = async () => {
    if (data.length > 0) {
      const student = data.pop()
      await saveFile({ filePath: `${JOBS_DIRECTORY_PATH}/${student._id}.json`, data: student })
      await next()
    } else {
      logger('info', ['save-jobs', 'finished'])
      return data
    }
  }
  await next()
}
