
var jsondiffpatch = require('./src/main.js')
var assert = require('assert')

// sample data
var country = {
  name: 'Argentina',
  capital: 'Buenos Aires',
  independence: new Date(1816, 6, 9),
  unasur: true
}

// clone country, using dateReviver for Date objects
var country2 = JSON.parse(JSON.stringify(country), jsondiffpatch.dateReviver)

// make some changes
country2.name = 'Republica Argentina'
country2.population = 41324992
delete country2.capital

var delta = jsondiffpatch.diff(country, country2)

console.log('delta is', delta, {
  'name': ['Argentina', 'Republica Argentina'], // old value, new value
  'population': ['41324992'], // new value
  'capital': ['Buenos Aires', 0, 0] // deleted
})

// patch original
jsondiffpatch.patch(country, delta)
console.log('patched country', JSON.stringify(country))

// reverse diff
var reverseDelta = jsondiffpatch.reverse(delta)
// also country2 can be return to original value with: jsondiffpatch.unpatch(country2, delta)

console.log('reverse delta', JSON.stringify(reverseDelta))

console.log('unpatch country2', JSON.stringify(jsondiffpatch.unpatch(country2, delta)))


var delta2 = jsondiffpatch.diff(country, country2)
console.log(delta2, delta2 === undefined)
// undefined => no difference


