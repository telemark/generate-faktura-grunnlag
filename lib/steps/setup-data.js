const getAge = require('get-age')
const dateFromPersonalId = require('birthdate-from-id')

module.exports = async data => {
  const persons = data.map(person => Object.assign({}, person, { isUnderAge: getAge(dateFromPersonalId(person.Personnr)) < 18 }))
  return persons
}
