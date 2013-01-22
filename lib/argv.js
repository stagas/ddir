module.exports = argv

function argv (s, desc, fn) {
  fn = fn || function () { return true }
  var n = 2
  var rest = []
  while (n <= process.argv.length) {
    var a = process.argv[n++] || ''
    if ('-' != a[0]) {
      if (a[0]) rest.push(a)
      continue
    }
    while ('-' == a[0]) a = a.substr(1)
    if (a && s && s.substr(0, a.length) == a) {
      console.error(desc, process.argv.slice(n, n + fn.length).join(' '))
      argv[s] = fn.apply(this, process.argv.slice(n, n + fn.length))
      break
    }
  }
  if (!s) return rest.join(' ')
  var args = fn.length
    ? fn
      .toString()
      .split('\n')[0]
      .split('(')[1]
      .split(')')[0]
      .replace(/[, ]{1,}/g, ' ')
    : ''
  argv.help = argv.help || ''
  argv.help += '\n  --' + s + ' ' + args + '\t\t' + desc
  return argv[s]
}
