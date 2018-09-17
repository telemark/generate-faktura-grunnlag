const config = require('../../config')

module.exports = async data => {
  const enriched = data.map(line => Object.assign({}, line, { invoice: config.fakturaLinjer[line['PC-kode']] }))
  const filtered = enriched.filter(line => line.invoice)
  return filtered
}
