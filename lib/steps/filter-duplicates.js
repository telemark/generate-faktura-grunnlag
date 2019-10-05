const logger = require('../logger')

module.exports = async data => {
  const ids = []
  let duplicates = 0
  const filtered = data.reduce((prev, current) => {
    const fnr = current.Personid || current.PersonID || current.Personnr || current.Fnr
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
