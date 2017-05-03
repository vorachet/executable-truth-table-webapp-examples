"use strict";

const debug = require('debug')('ClimateController');
const TTABLE = require('executable-truth-table')

function LifetimeFreeBusService() {
    debug('LifetimeFreeBusService()')
}

function DaytimeFreeBusService() {
    debug('DaytimeFreeBusService()')
}

function FreeLunchSevice() {
    debug('FreeLunchSevice()')
}

function FiftyPercentDiscountBusServiceOnWeekend() {
    debug('FiftyPercentDiscountBusServiceOnWeekend()')
}

const ttable = new TTABLE()
ttable.disjunctionMode()
ttable
    .setCondition({state: "VETERAN", equation: "isVeteran  > 0"})
    .setCondition({state: "POOR", equation: "monthlyWage  <= 6000"})
    .setCondition({state: "MIDDLE_CLASS", equation: "(monthlyWage  > 6000)(monthlyWage < 15000)"})
    .setCondition({state: "UPPER_MIDDLE_CLASS", equation: "monthlyWage  >= 15000"})
    .setDecision({run: [LifetimeFreeBusService], if: ["VETERAN"]})
    .setDecision({run: [DaytimeFreeBusService, FreeLunchSevice], if: ["POOR"]})
    .setDecision({run: [FiftyPercentDiscountBusServiceOnWeekend], if: ["MIDDLE_CLASS"]})

module.exports = {
  getInstance: ttable,
  queryName: 'smartcity',
  title: 'Smartcity',
  sampleInput: {monthlyWage: 5000, isVeteran: 1},
  codeExample:
     "\"use strict\";\r\n" +
    "const debug = require('debug')('ClimateController');\r\n" +
    "const TTABLE = require('executable-truth-table')\r\n" +
    "function LifetimeFreeBusService() {\r\n" +
    "    debug('LifetimeFreeBusService()')\r\n" +
    "}\r\n" +
    "function DaytimeFreeBusService() {\r\n" +
    "    debug('DaytimeFreeBusService()')\r\n" +
    "}\r\n" +
    "function FreeLunchSevice() {\r\n" +
    "    debug('FreeLunchSevice()')\r\n" +
    "}\r\n" +
    "function FiftyPercentDiscountBusServiceOnWeekend() {\r\n" +
    "    debug('FiftyPercentDiscountBusServiceOnWeekend()')\r\n" +
    "}\r\n" +
    "const ttable = new TTABLE()\r\n" +
    "ttable.disjunctionMode()\r\n" +
    "ttable\r\n" +
    "    .setCondition({state: \"VETERAN\", equation: \"isVeteran  > 0\"})\r\n" +
    "    .setCondition({state: \"POOR\", equation: \"monthlyWage  <= 6000\"})\r\n" +
    "    .setCondition({state: \"MIDDLE_CLASS\", equation: \"(monthlyWage  > 6000)(monthlyWage < 15000)\"})\r\n" +
    "    .setCondition({state: \"UPPER_MIDDLE_CLASS\", equation: \"monthlyWage  >= 15000\"})\r\n" +
    "    .setDecision({run: [LifetimeFreeBusService], if: [\"VETERAN\"]})\r\n" +
    "    .setDecision({run: [DaytimeFreeBusService, FreeLunchSevice], if: [\"POOR\"]})\r\n" +
    "    .setDecision({run: [FiftyPercentDiscountBusServiceOnWeekend], if: [\"MIDDLE_CLASS\"]})\r\n"
}