"use strict";

const debug = require('debug')('ClimateController');
const TTABLE = require('executable-truth-table')

const shoppingMallVisit = new TTABLE()
shoppingMallVisit.disjunctionMode()
shoppingMallVisit
  .setCondition({state: "VisitFirstTimet",             equation: "monthlyFacebooCheckin == 0"})
  .setCondition({state: "VisitSometime",               equation: "(monthlyFacebooCheckin > 0)(monthlyFacebooCheckin > 10)"})
  .setCondition({state: "VisitOften",                  equation: "monthlyFacebooCheckin >= 10"})
  .setCondition({state: "VisitedFoodCourtToday",       equation: "visitedFoodCourtToday >= 1"})
  .setCondition({state: "VisitedFashionStoreToday",    equation: "visitedFashionStoreToday >= 1"})
  .setCondition({state: "VisitedElectronicStoreToday", equation: "visitedElectronicStoreToday >= 1"})
  .setDecision({if: ["VisitFirstTimet"], run: [
    function WelcomeSMS (ttable) {
      if (ttable.type === 'vip') debug('SMS: Thank you for visiting our shoppingmall. Visit our mall next time get 2 Hours Free Parking')
      else debug('SMS: Thank you for visiting our shoppingmall')
    }]
  })
  .setDecision({if: ["VisitSometime"], run: [
    function WelcomeGoodCustomer (ttable) {
      if (ttable.type === 'vip') debug('SMS: You Got 2 Hours Free Parking Today')
      else debug('SMS: Shop $100 Get Free Membership. More Info @ 5th floor')
    }]
  })
  .setDecision({if: ["VisitOften"], run: [
    function WelcomeBestCustomer (ttable) {
      if (ttable.type === 'vip') debug('SMS: You Got 5 Hours Free Parking Today. Enjoy!')
      else debug('SMS: Discount Starbuck 10% Code 98VC23')
    }]
  })
  .setDecision({if: ["VisitedFoodCourtToday"], run: [
    function IntroduceFoodCourtEvent (ttable) {
      if (ttable.type === 'vip') debug('SMS: Thank you for visiting our food court. You got free drink today. Code DR344')
      else debug('SMS: Thank you for visiting our food court')
    }]
  })
  .setDecision({if: ["VisitedFashionStoreToday"], run: [
    function IntroduceFashionStoreEvent (ttable) {
      if (ttable.type === 'vip') debug('SMS: Thank you for visiting our shop. Redeem your 100 points for free shoes today')
      else debug('SMS: Thank you for visiting our shop. Clearance Shoes, Clothing, Accessories & More Next week!')
    }]
  })
  .setDecision({if: ["VisitedElectronicStoreToday"], run: [
    function IntroduceElectronicStoreEvent (ttable) {
      if (ttable.type === 'vip') debug('SMS: Thank you for visiting our store. Discount iPhone 10% for VIP member')
      else debug('SMS: Thank you for visiting our store')
    }]
  })

const customerScreen = new TTABLE()
customerScreen.conjunctionMode()
customerScreen
  .setCondition({state: "Normal",   equation: "point < 100"})
  .setCondition({state: "VIP", equation: "point >= 100"})
  .setDecision({
    if: ["Normal"],
    run: [
      function NotifyEventSMS (ttable) {
        ttable.inputs.type = 'normal'
        shoppingMallVisit.eval(ttable.inputs)
      }]
  })
  .setDecision({
    if: ["VIP"],
    run: [
      function NotifyVIPEventSMS (ttable) {
        ttable.inputs.type = 'vip'
        shoppingMallVisit.eval(ttable.inputs)
      }]
  })

module.exports = {
  getInstance: customerScreen,
  queryName: 'wired',
  title: 'Wired',
  sampleInput: {point: 50, monthlyFacebooCheckin: 0, visitedFoodCourtToday: 1, visitedFashionStoreToday: 0, visitedElectronicStoreToday: 0},
  codeExample:
    "\"use strict\";\r\n" +
    "const debug = require('debug')('ClimateController');\r\n" +
    "const TTABLE = require('executable-truth-table')\r\n" +
    "const shoppingMallVisit = new TTABLE()\r\n" +
    "shoppingMallVisit.disjunctionMode()\r\n" +
    "shoppingMallVisit\r\n" +
    "  .setCondition({state: \"VisitFirstTimet\",             equation: \"monthlyFacebooCheckin == 0\"})\r\n" +
    "  .setCondition({state: \"VisitSometime\",               equation: \"(monthlyFacebooCheckin > 0)(monthlyFacebooCheckin > 10)\"})\r\n" +
    "  .setCondition({state: \"VisitOften\",                  equation: \"monthlyFacebooCheckin >= 10\"})\r\n" +
    "  .setCondition({state: \"VisitedFoodCourtToday\",       equation: \"visitedFoodCourtToday >= 1\"})\r\n" +
    "  .setCondition({state: \"VisitedFashionStoreToday\",    equation: \"visitedFashionStoreToday >= 1\"})\r\n" +
    "  .setCondition({state: \"VisitedElectronicStoreToday\", equation: \"visitedElectronicStoreToday >= 1\"})\r\n" +
    "  .setDecision({if: [\"VisitFirstTimet\"], run: [\r\n" +
    "    function WelcomeSMS (ttable) {\r\n" +
    "      if (ttable.type === 'vip') debug('SMS: Thank you for visiting our shoppingmall. Visit our mall next time get 2 Hours Free Parking')\r\n" +
    "      else debug('SMS: Thank you for visiting our shoppingmall')\r\n" +
    "    }]\r\n" +
    "  })\r\n" +
    "  .setDecision({if: [\"VisitSometime\"], run: [\r\n" +
    "    function WelcomeGoodCustomer (ttable) {\r\n" +
    "      if (ttable.type === 'vip') debug('SMS: You Got 2 Hours Free Parking Today')\r\n" +
    "      else debug('SMS: Shop $100 Get Free Membership. More Info @ 5th floor')\r\n" +
    "    }]\r\n" +
    "  })\r\n" +
    "  .setDecision({if: [\"VisitOften\"], run: [\r\n" +
    "    function WelcomeBestCustomer (ttable) {\r\n" +
    "      if (ttable.type === 'vip') debug('SMS: You Got 5 Hours Free Parking Today. Enjoy!')\r\n" +
    "      else debug('SMS: Discount Starbuck 10% Code 98VC23')\r\n" +
    "    }]\r\n" +
    "  })\r\n" +
    "  .setDecision({if: [\"VisitedFoodCourtToday\"], run: [\r\n" +
    "    function IntroduceFoodCourtEvent (ttable) {\r\n" +
    "      if (ttable.type === 'vip') debug('SMS: Thank you for visiting our food court. You got free drink today. Code DR344')\r\n" +
    "      else debug('SMS: Thank you for visiting our food court')\r\n" +
    "    }]\r\n" +
    "  })\r\n" +
    "  .setDecision({if: [\"VisitedFashionStoreToday\"], run: [\r\n" +
    "    function IntroduceFashionStoreEvent (ttable) {\r\n" +
    "      if (ttable.type === 'vip') debug('SMS: Thank you for visiting our shop. Redeem your 100 points for free shoes today')\r\n" +
    "      else debug('SMS: Thank you for visiting our shop. Clearance Shoes, Clothing, Accessories & More Next week!')\r\n" +
    "    }]\r\n" +
    "  })\r\n" +
    "  .setDecision({if: [\"VisitedElectronicStoreToday\"], run: [\r\n" +
    "    function IntroduceElectronicStoreEvent (ttable) {\r\n" +
    "      if (ttable.type === 'vip') debug('SMS: Thank you for visiting our store. Discount iPhone 10% for VIP member')\r\n" +
    "      else debug('SMS: Thank you for visiting our store')\r\n" +
    "    }]\r\n" +
    "  })\r\n" +
    "const customerScreen = new TTABLE()\r\n" +
    "customerScreen.conjunctionMode()\r\n" +
    "customerScreen\r\n" +
    "  .setCondition({state: \"Normal\",   equation: \"point < 100\"})\r\n" +
    "  .setCondition({state: \"VIP\", equation: \"point >= 100\"})\r\n" +
    "  .setDecision({\r\n" +
    "    if: [\"Normal\"],\r\n" +
    "    run: [\r\n" +
    "      function NotifyEventSMS (ttable) {\r\n" +
    "        ttable.inputs.type = 'normal'\r\n" +
    "        shoppingMallVisit.eval(ttable.inputs)\r\n" +
    "      }]\r\n" +
    "  })\r\n" +
    "  .setDecision({\r\n" +
    "    if: [\"VIP\"],\r\n" +
    "    run: [\r\n" +
    "      function NotifyVIPEventSMS (ttable) {\r\n" +
    "        ttable.inputs.type = 'vip'\r\n" +
    "        shoppingMallVisit.eval(ttable.inputs)\r\n" +
    "      }]\r\n" +
    "  })\r\n"
}