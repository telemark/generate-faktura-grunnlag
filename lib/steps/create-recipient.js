const normalizeContact = require('tfk-dsf-normalize-contact')
const filterGuardians = require('../filter-guardians')
const logger = require('../logger')

function getRecipient (person) {
  let recipient = normalizeContact(person.dsfData.HOV)
  if (person.isUnderAge) {
    const guardians = filterGuardians(person.dsfData)
    if (guardians.length > 0) {
      recipient = normalizeContact(guardians[0])
    }
  }
  return recipient
}

module.exports = async data => {
  logger('info', ['create-recipient', 'persons', data.length, 'start'])
  const enriched = data.map(person => Object.assign({}, person, { recipient: getRecipient(person) }))
  logger('info', ['create-recipient', 'persons', data.length, 'finished'])
  return enriched
}
