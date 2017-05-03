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
ttable.conjunctionMode()
ttable
  .setCondition({state: "YELLOW",  equation: "(r==1)(g==1)(b==0)"})
  .setCondition({state: "CYAN",    equation: "(r==0)(g==1)(b==1)"})
  .setCondition({state: "MAGENTA", equation: "(r==1)(g==0)(b==1)"})
  .setCondition({state: "WHITE",   equation: "(r==1)(g==1)(b==1)"})
  .setCondition({state: "RED",     equation: "(r==1)(g==0)(b==0)"})
  .setCondition({state: "GREEN",   equation: "(r==0)(g==1)(b==0)"})
  .setCondition({state: "BLUE",    equation: "(r==0)(g==0)(b==1)"})
  .setCondition({state: "BLACK",   equation: "(r==0)(g==0)(b==0)"})
  .setDecision({run: [YELLOW],  if: ["YELLOW"]})
  .setDecision({run: [CYAN],    if: ["CYAN"]})
  .setDecision({run: [MAGENTA], if: ["MAGENTA"]})
  .setDecision({run: [RED],     if: ["RED"]})
  .setDecision({run: [GREEN],   if: ["GREEN"]})
  .setDecision({run: [BLUE],    if: ["BLUE"]})
  .setDecision({run: [BLACK],   if: ["BLACK"]})
  .setDecision({run: [WHITE],   if: ["WHITE"]})

module.exports = {
  getInstance: ttable,
  queryName: 'colors',
  title: 'Colors',
  sampleInput: {r: 0, g: 1, b: 0},
  codeExample:
    "\"use strict\"\r\n" +
    "const debug = require('debug')('ttable-colors')\r\n" +
    "const TTABLE = require('executable-truth-table')\r\n" +
    "function YELLOW()  { debug('YELLOW()'  )}\r\n" +
    "function CYAN()    { debug('CYAN()'    )}\r\n" +
    "function MAGENTA() { debug('MAGENTA()' )}\r\n" +
    "function WHITE()   { debug('WHITE()'   )}\r\n" +
    "function RED()     { debug('RED()'     )}\r\n" +
    "function GREEN()   { debug('GREEN()'   )}\r\n" +
    "function BLUE()    { debug('BLUE()'    )}\r\n" +
    "function BLACK()   { debug('BLACK()'   )}\r\n" +
    "const ttable = new TTABLE()\r\n" +
    "ttable.conjunctionMode()\r\n" +
    "ttable\r\n" +
    "  .setCondition({state: \"YELLOW\",  equation: \"(r==1)(g==1)(b==0)\"})\r\n" +
    "  .setCondition({state: \"CYAN\",    equation: \"(r==0)(g==1)(b==1)\"})\r\n" +
    "  .setCondition({state: \"MAGENTA\", equation: \"(r==1)(g==0)(b==1)\"})\r\n" +
    "  .setCondition({state: \"WHITE\",   equation: \"(r==1)(g==1)(b==1)\"})\r\n" +
    "  .setCondition({state: \"RED\",     equation: \"(r==1)(g==0)(b==0)\"})\r\n" +
    "  .setCondition({state: \"GREEN\",   equation: \"(r==0)(g==1)(b==0)\"})\r\n" +
    "  .setCondition({state: \"BLUE\",    equation: \"(r==0)(g==0)(b==1)\"})\r\n" +
    "  .setCondition({state: \"BLACK\",   equation: \"(r==0)(g==0)(b==0)\"})\r\n" +
    "  .setDecision({run: [YELLOW],  if: [\"YELLOW\"]})\r\n" +
    "  .setDecision({run: [CYAN],    if: [\"CYAN\"]})\r\n" +
    "  .setDecision({run: [MAGENTA], if: [\"MAGENTA\"]})\r\n" +
    "  .setDecision({run: [RED],     if: [\"RED\"]})\r\n" +
    "  .setDecision({run: [GREEN],   if: [\"GREEN\"]})\r\n" +
    "  .setDecision({run: [BLUE],    if: [\"BLUE\"]})\r\n" +
    "  .setDecision({run: [BLACK],   if: [\"BLACK\"]})\r\n" +
    "  .setDecision({run: [WHITE],   if: [\"WHITE\"]})\r\n"
}