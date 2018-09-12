const uuid = require('uuid-random')

module.exports = async data => {
  const types = ['images']
  const jobs = data.reduce((prev, curr) => {
    types.forEach(type => {
      prev.push(Object.assign({}, { _id: uuid(), type: type, category: 'agreement', personalId: curr.fnr, organization: curr.Orgnr }, curr))
    })
    return prev
  }, [])
  return jobs
}
