const getData = require('../get-data')
const config = require('../../config')

module.exports = async data => {
  let persons = []
  const next = async () => {
    if (data.length > 0) {
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
      persons.push(Object.assign({}, person, { dsfData: dsfData }))
      await next()
    } else {
      const filtered = persons.filter(person => person.dsfData)
      return filtered
    }
  }
  await next()
}
