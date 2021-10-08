const Aoijs = require("aoi.js")
 
const bot = new Aoijs.Bot({
token: "TOKEN", 
prefix: "whatever",  //<- Change whatever with your prefix//
mobile: true,
connectedBots: true
})

//You can delete it, if already have it//
bot.status({
  text: "Music",
  type: "LISTENING",
  time: 3
})

//Callbacks//
bot.onMessage()
bot.onInteractionCreate()

//Handlers//
bot.variables(require(`./handlers/variables.js`))
bot.loadCommands(`./commands`)
