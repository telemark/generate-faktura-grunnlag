module.exports = name => {
  if (name.length > 40 && name.startsWith('Foresatte')) {
    name = name.replace('Foresatte til', 'Foresatte')
  } else if (name.length > 40) {
    const list = name.split(' ')
    list[0] = list[0].substr(0, 1)
    name = list.join(' ')
  }
  return name
}
