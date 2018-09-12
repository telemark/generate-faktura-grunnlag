const logger = require('../logger')

module.exports = async data => {
  let ids = []
  let duplicates = 0
  let filtered = data.reduce((prev, current) => {
    const fnr = current.Personid || current.Personnr || current.Fnr
    if (!ids.includes(fnr)) {
      ids.push(fnr)
      prev.push(Object.assign({}, current, { fnr: fnr }))
    } else {
      duplicates++
    }
    return prev
  }, [])
  logger('info', ['filter-duplicates', 'duplicates', duplicates, 'uniques', ids.length, 'finished'])
  return filtered
}
