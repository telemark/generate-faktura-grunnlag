const getData = require('../get-data')
const logger = require('../logger')
const config = require('../../config')

module.exports = async data => {
  logger('info', ['lookup-kor', 'persons', data.length, 'start'])
  const persons = []
  const next = async () => {
    if (data.length > 0) {
      logger('info', ['lookup-kor', 'persons', data.length, 'to go'])
      let kor = false
      const person = data.pop()
      const options = {
        secret: config.KOR_SERVICE_JWT,
        url: config.KOR_SERVICE_URL,
        payload: [person.recipient.personalIdNumber]
      }
      const korData = await getData(options)
      if (korData) {
        kor = korData.personer[0]
      }
      if (kor && kor.reservasjon === 'NEI' && kor.status === 'AKTIV') {
        person.kor = true
        person.recipient.email = kor.kontaktinformasjon.epostadresse
        person.recipient.mobile = kor.kontaktinformasjon.mobiltelefonnummer
      } else {
        person.kor = false
      }
      persons.push(person)
      await next()
    } else {
      logger('info', ['lookup-kor', 'persons', persons.length, 'finished'])
      return persons
    }
  }
  await next()
}
