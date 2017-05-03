"use strict";

process.env.DEBUG = 'webapp,ttable*';

const debug = require('debug')('webapp')
const express = require('express')
const engine = require('ejs-locals')
const app = express()
const bodyParser = require('body-parser')
const ClimateDemo = require('./ttables/climate-controller')
const SmartcityDemo = require('./ttables/smartcity')
const WiredDemo = require('./ttables/wired')
const ColorsDemo = require('./ttables/colors')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('views', __dirname + '/views')
app.engine('ejs', engine)
app.set('view engine', 'ejs')

const _climateDemo = ClimateDemo.getInstance
const _smartcityDemo = SmartcityDemo.getInstance
const _wiredDemo = WiredDemo.getInstance
const _colorsDemo = ColorsDemo.getInstance

var CONFIG = {
  MAX_FEED: 10
}

CONFIG[ClimateDemo.queryName] = {
  codeExample: ClimateDemo.codeExample,
  title: ClimateDemo.title,
  sampleInput: ClimateDemo.sampleInput
}

CONFIG[SmartcityDemo.queryName] = {
  codeExample: SmartcityDemo.codeExample,
  title: SmartcityDemo.title,
  sampleInput: SmartcityDemo.sampleInput
}

CONFIG[WiredDemo.queryName] = {
  codeExample: WiredDemo.codeExample,
  title: WiredDemo.title,
  sampleInput: WiredDemo.sampleInput
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
  else if (req.query.ttable === SmartcityDemo.queryName) ttable = _smartcityDemo
  else if (req.query.ttable === WiredDemo.queryName) ttable = _wiredDemo
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
  else if (req.query.ttable === SmartcityDemo.queryName) ttable = _smartcityDemo
  else if (req.query.ttable === WiredDemo.queryName) ttable = _wiredDemo
  else if (req.query.ttable === ColorsDemo.queryName) ttable = _colorsDemo
  else res.status(404).send('Not found <a href="/">Back<a>')

  const data = JSON.parse(req.body.data)

  ttable.eval(data)

  if (ttable.statistics.performed.length > CONFIG.MAX_FEED) ttable.statistics.performed = []

  res.redirect('/view?ttable=' + req.query.ttable)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})