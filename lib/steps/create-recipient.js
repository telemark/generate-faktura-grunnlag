const normalizeContact = require('tfk-dsf-normalize-contact')
const filterGuardians = require('../filter-guardians')
const logger = require('../logger')

function getRecipient (person) {
  let recipient = Object.assign({}, normalizeContact(person.dsfData.HOV), { 'SPES-KD': person.dsfData.HOV['SPES-KD'] })
  if (person.isUnderAge) {
    const guardians = filterGuardians(person.dsfData)
    if (guardians.length > 0) {
      recipient = Object.assign({}, normalizeContact(guardians[0]), { 'SPES-KD': guardians[0]['SPES-KD'] })
    } else {
      recipient.fullName = `Foresatte til ${recipient.fullName}`
    }
  }
  return recipient
}

module.exports = async data => {
  logger('info', ['create-recipient', 'persons', data.length, 'start'])
  const enriched = data.map(person => Object.assign({}, person, { recipient: getRecipient(person) }))
  logger('info', ['create-recipient', 'persons', enriched.length, 'finished'])
  return enriched
}
