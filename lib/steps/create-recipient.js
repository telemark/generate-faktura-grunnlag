const normalizeContact = require('tfk-dsf-normalize-contact')
const filterGuardians = require('../filter-guardians')

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
  const enriched = data.map(person => Object.assign({}, person, { recipient: getRecipient(person) }))
  return enriched
}
