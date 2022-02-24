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

//Callbacks
bot.onMessage()

const voice = new Aoijs.Voice(bot, {
  soundcloud: {
    clientId: "your clientid",
  },
  cache: {
    cacheType: "Memory", //Disk | None | Memory
    directory: "./music/",
    enabled: true
  },
  youtube: {
 fetchAuthor: true
 },
},true); //Prune

//Events
voice.onTrackStart()

voice.trackStartCommand({
 channel: "$channelID",
 $if: "v4",
 code: `$if[$getCurrentDuration==0]
$author[1;Started Playing;$getVar[customemoji1]] 
$title[1;$songInfo[title];$songInfo[url]]
$addField[1;Song;\`$numberSeparator[$queueLength]\`;yes]
$addfield[1;Create;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;<t:$cropText[$songInfo[createdTimestamp];10]:d>];false;none];yes] 
$addField[1;Like;\`$numberSeparator[$replaceText[$songInfo[likes];null;0]]\`;yes]
$addField[1;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;Listened];false;Views];\`$numberSeparator[$songInfo[views]]\`;yes] 
$addField[1;Artist;\`$songInfo[author]\`;yes] $addField[1;Platform;\`$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;YouTube];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;SoundCloud];false;Audio]]\`;yes]
$addField[1;Duration;\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$songInfo[duration];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;0];true;$findNumbers[$songInfo[duration]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`;yes]
$addField[1;Requested By;<@$songInfo[user.id]>;no]
$addTimestamp[1;$dateStamp] 
$thumbnail[1;$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;2048]] 
$color[1;$getVar[color]]
$volume[$getGlobalUserVar[vol;$songInfo[user.id]]]
$else
$volume[$getGlobalUserVar[vol;$songInfo[user.id]]]
$endif
`

bot.variables(require(`./variables/variables.js`))

const loader = new Aoijs.LoadCommands(bot)
 loader.load(bot.cmd,"./commands/")
