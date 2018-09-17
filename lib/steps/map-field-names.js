const logger = require('../logger')

function mapFieldNames (data) {
  const recipient = data.recipient
  return {
    id: recipient.personalId,
    name: recipient.fullName,
    address1: recipient.address,
    addresse2: '',
    zip: recipient.zip,
    city: recipient.city,
    amount: data.invoice.amount,
    qty: 1,
    notes1: '',
    notes2: ''
  }
}

module.exports = async data => {
  logger('info', ['map-field-names', 'persons', data.length, 'start'])
  const mapped = data.map(mapFieldNames)
  logger('info', ['map-field-names', 'persons', data.length, 'finished'])
  return mapped
}
