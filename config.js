if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

function getValidLines () {
  let lines = ['PC17', 'PC17x', 'PC17-KJØPx2', 'PC18']
  if (process.env.VALID_LINES) {
    lines = process.env.VALID_LINES.split(',')
  }
  return lines
}

module.exports = {
  DONE_DIRECTORY_PATH: process.env.DONE_DIRECTORY_PATH || 'test/directories/done',
  JOBS_DIRECTORY_PATH: process.env.JOBS_DIRECTORY_PATH || 'test/directories/jobs',
  QUEUE_DIRECTORY_PATH: process.env.QUEUE_DIRECTORY_PATH || 'test/directories/queue',
  DSF_SERVICE_URL: process.env.DSF_SERVICE_URL || 'https://dsf.service.io',
  DSF_SERVICE_JWT: process.env.DSF_SERVICE_JWT || 'Louie Louie oh no I got to go Louie Louie oh no I got to go',
  KOR_SERVICE_URL: process.env.KOR_SERVICE_URL || 'https://kor.service.io',
  KOR_SERVICE_JWT: process.env.KOR_SERVICE_JWT || 'Louie Louie oh no I got to go Louie Louie oh no I got to go',
  PAPERTRAIL_HOSTNAME: process.env.PAPERTRAIL_HOSTNAME || 'avtale-generator',
  PAPERTRAIL_HOST: process.env.PAPERTRAIL_HOST || 'logs.papertrailapp.com',
  PAPERTRAIL_PORT: process.env.PAPERTRAIL_PORT || 12345,
  VALID_LINES: getValidLines(),
  FILE_ENCODING: process.env.FILE_ENCODING || 'utf8',
  fakturaLinjer: {
    PC17: {
      partNumber: 103,
      amount: 1032,
      note: 'Leasing elev-PC skoleåret 2018-2019'
    },
    'PC17-KJØPx2': {
      partNumber: 105,
      amount: 2064,
      note: 'Kjøp av elev-PC'
    },
    PC17x: {
      partNumber: 104,
      amount: 2046,
      note: 'Leie av elev-PC skoleåret 2017-2018\nLeasing elev-PC skoleåret 2018-2019'
    },
    PC18: {
      partNumber: 103,
      amount: 1032,
      note: 'Leasing elev-PC skoleåret 2018-2019'
    }
  }
}
