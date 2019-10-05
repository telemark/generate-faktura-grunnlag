const getSchoolInfo = require('tfk-schools-info')
const shortenName = require('../shorten-name')
const logger = require('../logger')

function generateNote (data) {
  const recipient = data.recipient
  const school = getSchoolInfo({ shortName: data.Enhet })[0]
  const message = []
  if (data.isUnderAge) {
    message.push(recipient.originalRecipient.fullName)
  }
  if (school) {
    message.push(school.officialName)
    message.push(school.phoneNumber)
  }
  return message.join(' - ')
}

function mapFieldNames (data) {
  const recipient = data.recipient
  return {
    id: recipient.personalIdNumber,
    name: shortenName(recipient.fullName),
    address1: shortenName(recipient.address),
    addresse2: '',
    zip: recipient.zip,
    city: recipient.city,
    mobile: recipient.mobile || '',
    email: recipient.email || '',
    partNumber: data.invoice.partNumber,
    amount: data.invoice.amount,
    qty: 1,
    notes1: data.invoice.note || '',
    notes2: generateNote(data)
  }
}

module.exports = async data => {
  logger('info', ['map-field-names', 'persons', data.length, 'start'])
  const mapped = data.map(mapFieldNames)
  logger('info', ['map-field-names', 'persons', data.length, 'finished'])
  return mapped
}
