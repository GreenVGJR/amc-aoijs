const Aoijs = require("aoi.js")
 
const bot = new Aoijs.Bot({
token: "TOKEN", 
prefix: "whatever", //<- Change whatever with your prefix//
intents: "all",
mobilePlatform: true
})

bot.status({
  text: "Music",
  type: "LISTENING",
  time: 3
})

const voice = new Aoijs.Voice(bot, {
  soundcloud: {
    clientId: "your clientid",
  },
  cache: {
    cacheType: "Memory", //Disk | None | Memory
    directory: "./music/",
    enabled: true
  },
}); 
 
//Callbacks
bot.onMessage()

bot.variables(require(`./variables/variables.js`))

const loader = new Aoijs.LoadCommands(bot)
 loader.load(bot.cmd,"./commands/")
