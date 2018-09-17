const getNextFromQueue = require('./lib/steps/get-next-from-queue')
const filterDuplicates = require('./lib/steps/filter-duplicates')
const addInvoiceData = require('./lib/steps/add-invoice-data')
const setupData = require('./lib/steps/setup-data')
const lookupDsf = require('./lib/steps/lookup-dsf')
const mapFieldNames = require('./lib/steps/map-field-names')
const saveToCsv = require('./lib/steps/save-to-csv')
const logger = require('./lib/logger')

logger('info', ['index', 'start'])

getNextFromQueue()
  .then(filterDuplicates)
  .then(addInvoiceData)
  .then(setupData)
  .then(lookupDsf)
  .then(mapFieldNames)
  .then(saveToCsv)
  .then(data => {
    logger('info', ['index', 'jobs', 'finished'])
    process.exit(0)
  })
  .catch(error => {
    logger('error', ['index', 'error', JSON.stringify(error)])
    process.exit(1)
  })
