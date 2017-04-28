"use strict";

process.env.DEBUG = 'webapp,ttable*';

const debug = require('debug')('webapp')
const express = require('express')
const engine = require('ejs-locals')
const app = express()
const bodyParser = require('body-parser')
const ClimateDemo = require('./ttables/climate-controller')
const ColorsDemo = require('./ttables/colors')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('views', __dirname + '/views')
app.engine('ejs', engine)
app.set('view engine', 'ejs')

// List of TTABLE demo
const _climateDemo = ClimateDemo.getInstance
const _colorsDemo = ColorsDemo.getInstance

var CONFIG = {}
CONFIG[ClimateDemo.queryName] = {
  codeExample: ClimateDemo.codeExample,
  title: ClimateDemo.title,
  sampleInput: ClimateDemo.sampleInput
}
CONFIG[ColorsDemo.queryName] = {
  codeExample: ColorsDemo.codeExample,
  title: ColorsDemo.title,
  sampleInput: ColorsDemo.sampleInput
}

var ttable = {}

app.get('/', function (req, res) {
  const tableCssClass = 'table';
  res.render('index')
})

// view?ttable=<queryName>
app.get('/view', function (req, res) {
  if (req.query.ttable === ClimateDemo.queryName) ttable = _climateDemo
  else if (req.query.ttable === ColorsDemo.queryName) ttable = _colorsDemo
  else res.status(404).send('Not found <a href="/">Back<a>')

  res.render('main', {
    title: CONFIG[req.query.ttable].title,
    sampleInput: JSON.stringify(CONFIG[req.query.ttable].sampleInput),
    codeExample: CONFIG[req.query.ttable].codeExample,
    queryName: req.query.ttable,
    statistics: JSON.stringify(ttable.statistics, null, 2),
    specHTMLTable: ttable.exportSpecAsHTML('table'),
    statisticsHTMLTable: ttable.exportStatAsHTML('table')
  })
})

// execute?ttable=<queryName>
app.post('/execute', function (req, res) {
  if (req.query.ttable === ClimateDemo.queryName) ttable = _climateDemo
  else if (req.query.ttable === ColorsDemo.queryName) ttable = _colorsDemo
  else res.status(404).send('Not found <a href="/">Back<a>')

  const data = JSON.parse(req.body.data)

  ttable.read(data)

  res.redirect('/view?ttable=' + req.query.ttable)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})