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

bot.variables({
  //System
  file: "server.js", //For reboot and stats
  database: "./database/main/main_scheme_1.sql", //For stats

  //Customize Property For Message
  pause: "⏸️ Paused.",
  resume: "▶️ Resumed!",
  skip: "⏩ Skipped!",  //Available {song}
  stop: "⏹ Stopped.",  
  remove: "Removed song on {d-amount}.", //Available {d-amount}
  filterapply: "Applyed.",

  shuffle: "Shuffle Queue.",
  errorjoin: "{newEmbed:{title:❌ You're not in a voice channel.} {color:FFFF00}}",
  errorqueue: "{newEmbed:{title:❌ There no song was playing.} {color:FF0000}}",
  errorloop: "Only have {amount} song.", //Available {amount}
  erroruser: "{newEmbed:{title:❌ You cant use this command} {color:$getVar[color]}}",
  customerror: "Something just happened.", //Custom $suppressErrors

  join: "Joined Voice Channel to the {join}.", //Available {join}
  dc: "Disconnected.",
  leftvc: "There no song again on queue.", //Description
  secondleftvc: "Left VC.", //Footer

  //Changing Other
  color: "000001",
  channelstatus: "", //Optional (channelid), for send ready message
  vol: "50", //Default Volume
  maxvol: "150", //Max Volume

  //Changing Other - Advance
  permission: "2176183360",
  userid: "default",
  logmusic: "0",
  247: "0", //0 = off | 1 = on stay 2 minutes | 2 = stay 24/7
  last: "null",
  linkdownload: "",
  filters: "none",

  //Emoji
  customemoji1: "https://cdn.discordapp.com/emojis/852434440668184615.png?size=4096",
  ytemoji: "https://cdn.discordapp.com/emojis/852432148207108110.png?size=4096",
  scemoji: "https://cdn.discordapp.com/emojis/852432173758676993.png?size=4096",
  loademoji: "https://cdn.discordapp.com/emojis/895505960427196426.gif?size=4096",
 
  userused: "0",
  commanduserused: "0"
})

const voice = new aoijs.Voice(bot, {
  soundcloud: {
    clientId: "your clientid",
  },
  cache: {
    cacheType: "Memory",//Disk | None | Memory
    enabled: true //directory: "(path file)"
  },
}); 

//Callbacks
bot.onMessage()

bot.command({
name: "play",
 $if: "v4",
 code: `$if[$queueLength!=1]
$editMessage[$get[id];{newEmbed:{author:Started Playing:$getVar[customemoji1]} {title:$replaceText[$get[message];Added;;1]} {url:$songInfo[url]} {field:Duration:\`$djsEval[new Date($findNumbers[$songInfo[duration]]).toISOString().substr(11, 8);yes]\`:yes} {field:Artist:\`$songInfo[author]\`:yes} {field:Platform:\`$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;YouTube];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;SoundCloud];false;Audio]]\`:yes} {field:Like:\`$songInfo[likes]\`:yes} {field:$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;Listened];false;Views]:\`$numberSeparator[$songInfo[views]]\`:yes} {field:Created:$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;<t:$cropText[$songInfo[createdTimestamp];10]:d>];false;none]:yes} {timestamp} {thumbnail:$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;2048]]} {color:$getVar[color]}}]
$editMessage[$get[id];{newEmbed:{title:Started Playing} {description:$replaceText[$get[message];Added;;1]} {color:$getVar[color]}}]
$else
$editMessage[$get[id];{newEmbed:{title:Added to queue} {description:$replaceText[$get[message];Added;;1]} {color:$getVar[color]}}]
$wait[3s]
$editMessage[$get[id];{newEmbed:{field:Queue:$queue:no} {timestamp} {color:$getVar[color]}} {newEmbed:{title:Added to queue} {description:$replaceText[$get[message];Added;;1]} {color:$getVar[color]}}]
$endif
$if[$checkContains[$message[1];youtu.be;m.youtube;youtube.com]==true]
$let[message;$playTrack[youtube;$message]]
$elseIf[$checkContains[$message[1];soundcloud.com;app.goo.gl]==true]
$onlyIf[$get[message]!=Added 0;Track not found]
$let[message;$playTrack[soundcloud;$message]]
$endelseif
$else
$if[$isValidLink[$message[1]]==true]
$let[message;$playTrack[url;$message]]
$else
$let[message;$playTrack[youtube;$message]]
$endif
$endif
$editMessage[$get[id];{newEmbed:{author:Searching:$getVar[loademoji]} {color:$getVar[color]}}]
$if[$voiceID[$clientID]==]
$joinVC
$endif
$let[id;$sendMessage[{newEmbed:{author:Processing:$getVar[loademoji]} {color:$getVar[color]}};yes]]
$onlyIf[$message[1]!=;What song you want search]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})

bot.command({
  name: "stop",
 code: `$getVar[stop]
$leaveVC
$stop
$onlyIf[$queueLength!=0;Already stop]`
})

bot.command({
 name: "skip",
 $if: "v4",
 code: `$if[$isNumber[$message[1]]==false]
$title[1;$getVar[skip]]
$addField[1;Duration;\`$djsEval[new Date($findNumbers[$songInfo[duration;1]]).toISOString().substr(11, 8);yes]\`;yes]
$addField[1;Now Playing;\`$songInfo[title;1]\`;yes]
$addTimestamp[1;$dateStamp]
$color[1;$getVar[color]]
$thumbnail[1;$songInfo[thumbnail;1]]
$skip
$else
$title[1;$getVar[skip]]
$addField[1;Duration;\`$djsEval[new Date($findNumbers[$songInfo[duration;$message[1]]]).toISOString().substr(11, 8);yes]\`;yes]
$addField[1;Now Playing;\`$songInfo[title;$message[1]]\`;yes]
$addTimestamp[1;$dateStamp]
$color[1;$getVar[color]]
$thumbnail[1;$songInfo[thumbnail;$message[1]]]
$skipTo[$message[1]]
$onlyIf[$message[1]<$queueLength;You cant skip $message[1] song. Only $queueLength]
$endif
$onlyIf[$queueLength!=1;Only have 1 song.]
$onlyIf[$queueLength!=0;]`
})

bot.command({
 name: "loop",
 code: `$loopMode`
})
