const getData = require('../get-data')
const logger = require('../logger')
const config = require('../../config')

module.exports = async data => {
  return new Promise(async (resolve, reject) => {
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
        const enriched = Object.assign({}, person, { dsfData: dsfData ? dsfData.RESULT : false })
        persons.push(enriched)
        await next()
      } else {
        logger('info', ['lookup-dsf', 'persons', persons.length, 'finished'])
        const filtered = persons.filter(person => person.dsfData)
        logger('info', ['lookup-dsf', 'filtered', filtered.length, 'finished'])
        return resolve(filtered)
      }
    }
    await next()
  })
}