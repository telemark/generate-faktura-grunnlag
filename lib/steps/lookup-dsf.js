const getData = require('../get-data')
const logger = require('../logger')
const config = require('../../config')

module.exports = async data => {
  logger('info', ['lookup-dsf', 'persons', data.length, 'start'])
  let persons = []
  const next = async () => {
    if (data.length > 0) {
      logger('info', ['lookup-dsf', 'persons', data.length, 'to go'])
      const person = data.pop()
      const options = {
        secret: config.DSF_SERVICE_JWT,
        url: `${config.DSF_SERVICE_URL}/${person.isUnderAge ? 'hentForeldre' : 'hentDetaljer'}`,
        payload: {
          saksref: 'avtale-faktura',
          foedselsnr: person.Personnr
        }
      }
      const dsfData = await getData(options)
      console.log(dsfData)
      persons.push(Object.assign({}, person, { dsfData: dsfData }))
      await next()
    } else {
      logger('info', ['lookup-dsf', 'persons', persons.length, 'finished'])
      const filtered = persons.filter(person => person.dsfData)
      logger('info', ['lookup-dsf', 'filtered', filtered.length, 'finished'])
      return filtered
    }
  }
  await next()
}
