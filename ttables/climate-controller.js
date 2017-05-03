"use strict"

const debug = require('debug')('ttable-climate-controller')
const TTABLE = require('executable-truth-table')

function startCooler() { debug('\t startCooler()') }
function stopCooler() { debug('\t stopCooler()') }
function startHumidifier() { debug('\t startHumidifier()') }
function stopHumidifier() { debug('\t stopHumidifier()') }
function startHeater() { debug('\t startHeater()') }
function stopHeater() { debug('\t stopHeater()') }

function CoolOn() {
    debug('CoolOn()')
    startCooler()
    stopHeater()
    stopHumidifier()
}

function HumidOn() {
    debug('HumidOn()')
    startHumidifier()
}

function HeatOn() {
    debug('HeatOn()')
    startHeater()
    stopCooler()
    stopHumidifier()
}

const ttable = new TTABLE()
ttable.disjunctionMode()
ttable
    .setCondition({state: "Cold", equation: "tempSensor < DESIRED_TEMP"})
    .setCondition({state: "Hot", equation: "tempSensor > DESIRED_TEMP"})
    .setCondition({state: "Dry", equation: "humiditySensor < DESIRED_HUMIDITY"})
    .setDecision({run: [CoolOn], if: ["Hot"]})
    .setDecision({run: [HeatOn], if: ["Cold"]})
    .setDecision({run: [HumidOn],if: ["Dry"]})

module.exports = {
  getInstance: ttable,
  queryName: 'climateController',
  title: 'Climate Controller',
  sampleInput: {DESIRED_TEMP: 70, DESIRED_HUMIDITY: 40, tempSensor: 40, humiditySensor: 80},
  codeExample:
    "\"use strict\"\r\n" +
    "const debug = require('debug')('ttable-climate-controller')\r\n" +
    "const TTABLE = require('executable-truth-table')\r\n" +
    "function startCooler() { debug('\\t startCooler()') }\r\n" +
    "function stopCooler() { debug('\\t stopCooler()') }\r\n" +
    "function startHumidifier() { debug('\\t startHumidifier()') }\r\n" +
    "function stopHumidifier() { debug('\\t stopHumidifier()') }\r\n" +
    "function startHeater() { debug('\\t startHeater()') }\r\n" +
    "function stopHeater() { debug('\\t stopHeater()') }\r\n" +
    "function CoolOn() {\r\n" +
    "    debug('CoolOn()')\r\n" +
    "    startCooler()\r\n" +
    "    stopHeater()\r\n" +
    "    stopHumidifier()\r\n" +
    "}\r\n" +
    "function HumidOn() {\r\n" +
    "    debug('HumidOn()')\r\n" +
    "    startHumidifier()\r\n" +
    "}\r\n" +
    "function HeatOn() {\r\n" +
    "    debug('HeatOn()')\r\n" +
    "    startHeater()\r\n" +
    "    stopCooler()\r\n" +
    "    stopHumidifier()\r\n" +
    "}\r\n" +
    "const ttable = new TTABLE()\r\n" +
    "ttable.disjunctionMode()\r\n" +
    "ttable\r\n" +
    "    .setCondition({state: \"Cold\", equation: \"tempSensor < DESIRED_TEMP\"})\r\n" +
    "    .setCondition({state: \"Hot\", equation: \"tempSensor > DESIRED_TEMP\"})\r\n" +
    "    .setCondition({state: \"Dry\", equation: \"humiditySensor < DESIRED_HUMIDITY\"})\r\n" +
    "    .setDecision({run: [CoolOn], if: [\"Hot\"]})\r\n" +
    "    .setDecision({run: [HeatOn], if: [\"Cold\"]})\r\n" +
    "    .setDecision({run: [HumidOn],if: [\"Dry\"]})\r\n"
}