const config = require('../../config')

module.exports = async data => {
  const enriched = data.map(line => Object.assign({}, line, { invoice: config.VALID_LINES.includes(line['PC-kode']) ? config.fakturaLinjer[line['PC-kode']] : false }))
  const filtered = enriched.filter(line => line.invoice)
  return filtered
}
