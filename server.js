const Aoijs = require("aoi.js")
 
const bot = new Aoijs.Bot({
token: "TOKEN", 
prefix: "whatever",  //<- Change whatever with your prefix//
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
bot.readyCommand()

//Handlers//
bot.variables(require(`./handlers/variable`))
bot.loadCommands(`./commands`)
