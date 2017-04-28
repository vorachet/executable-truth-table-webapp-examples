"use strict"

const debug = require('debug')('ttable-colors')
const TTABLE = require('executable-truth-table')

function YELLOW()  { debug('YELLOW()'  )}
function CYAN()    { debug('CYAN()'    )}
function MAGENTA() { debug('MAGENTA()' )}
function WHITE()   { debug('WHITE()'   )}
function RED()     { debug('RED()'     )}
function GREEN()   { debug('GREEN()'   )}
function BLUE()    { debug('BLUE()'    )}
function BLACK()   { debug('BLACK()'   )}

const ttable = new TTABLE()
ttable
  .setCondition({state: "YELLOW",  equation: "(r==1)(g==1)(b==0)"})
  .setCondition({state: "CYAN",    equation: "(r==0)(g==1)(b==1)"})
  .setCondition({state: "MAGENTA", equation: "(r==1)(g==0)(b==1)"})
  .setCondition({state: "WHITE",   equation: "(r==1)(g==1)(b==1)"})
  .setCondition({state: "RED",     equation: "(r==1)(g==0)(b==0)"})
  .setCondition({state: "GREEN",   equation: "(r==0)(g==1)(b==0)"})
  .setCondition({state: "BLUE",    equation: "(r==0)(g==0)(b==1)"})
  .setCondition({state: "BLACK",   equation: "(r==0)(g==0)(b==0)"})
  .setDecision({run: [YELLOW],  if: [{state: "YELLOW",  is: true}]})
  .setDecision({run: [CYAN],    if: [{state: "CYAN",    is: true}]})
  .setDecision({run: [MAGENTA], if: [{state: "MAGENTA", is: true}]})
  .setDecision({run: [RED],     if: [{state: "RED",     is: true}]})
  .setDecision({run: [GREEN],   if: [{state: "GREEN",   is: true}]})
  .setDecision({run: [BLUE],    if: [{state: "BLUE",    is: true}]})
  .setDecision({run: [BLACK],   if: [{state: "BLACK",   is: true}]})
  .setDecision({run: [WHITE],   if: [{state: "WHITE",   is: true}]})

module.exports = {
  getInstance: ttable,
  queryName: 'colors',
  title: 'Colors',
  sampleInput: {r: 0, g: 1, b: 0},
  codeExample:
    "const TTABLE = require('executable-truth-table')\r\n\r\n" +
    "function YELLOW()  { debug('YELLOW()'  )}\r\n" +
    "function CYAN()    { debug('CYAN()'    )}\r\n" +
    "function MAGENTA() { debug('MAGENTA()' )}\r\n" +
    "function WHITE()   { debug('WHITE()'   )}\r\n" +
    "function RED()     { debug('RED()'     )}\r\n" +
    "function GREEN()   { debug('GREEN()'   )}\r\n" +
    "function BLUE()    { debug('BLUE()'    )}\r\n" +
    "function BLACK()   { debug('BLACK()'   )}\r\n" +
    "const ttable = new TTABLE()\r\n" +
    "ttable\r\n" +
    "  .setCondition({state: \"YELLOW\",  equation: \"(r==1)(g==1)(b==0)\"})\r\n" +
    "  .setCondition({state: \"CYAN\",    equation: \"(r==0)(g==1)(b==1)\"})\r\n" +
    "  .setCondition({state: \"MAGENTA\", equation: \"(r==1)(g==0)(b==1)\"})\r\n" +
    "  .setCondition({state: \"WHITE\",   equation: \"(r==1)(g==1)(b==1)\"})\r\n" +
    "  .setCondition({state: \"RED\",     equation: \"(r==1)(g==0)(b==0)\"})\r\n" +
    "  .setCondition({state: \"GREEN\",   equation: \"(r==0)(g==1)(b==0)\"})\r\n" +
    "  .setCondition({state: \"BLUE\",    equation: \"(r==0)(g==0)(b==1)\"})\r\n" +
    "  .setCondition({state: \"BLACK\",   equation: \"(r==0)(g==0)(b==0)\"})\r\n" +
    "  .setDecision({run: [YELLOW],  if: [{state: \"YELLOW\",  is: true}]})\r\n" +
    "  .setDecision({run: [CYAN],    if: [{state: \"CYAN\",    is: true}]})\r\n" +
    "  .setDecision({run: [MAGENTA], if: [{state: \"MAGENTA\", is: true}]})\r\n" +
    "  .setDecision({run: [RED],     if: [{state: \"RED\",     is: true}]})\r\n" +
    "  .setDecision({run: [GREEN],   if: [{state: \"GREEN\",   is: true}]})\r\n" +
    "  .setDecision({run: [BLUE],    if: [{state: \"BLUE\",    is: true}]})\r\n" +
    "  .setDecision({run: [BLACK],   if: [{state: \"BLACK\",   is: true}]})\r\n" +
    "  .setDecision({run: [WHITE],   if: [{state: \"WHITE\",   is: true}]})\r\n"


}