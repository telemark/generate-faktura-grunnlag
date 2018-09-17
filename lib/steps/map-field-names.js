function mapFieldNames (data) {
  return {
    id: data.Personnr,
    name: '',
    address1: '',
    addresse2: '',
    zip: '',
    city: '',
    amount: data.invoice.amount,
    qty: 1,
    notes1: '',
    notes2: ''
  }
}

module.exports = async data => {
  const mapped = data.map(mapFieldNames)
  return mapped
}
