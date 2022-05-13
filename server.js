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
bot.onInteractionCreate()

bot.readyCommand({
 channel: "$getVar[channelstatus]",
 $if: "v4",
 code: `$if[$getVar[channelstatus]==]
$log[$userTag[$clientID] active at $formatDate[$dateStamp;LLLL]]
$else
$sendMessage[<@$clientID> active at <t:$cropText[$dateStamp;10]:F>;no]
$endif
$log[$replaceText[$replaceText[$checkContains[$get[update];up to date];true;No update found.];false;$get[update]]]
$let[update;$exec[npm i https://github.com/akaruidevelopment/music#main]]
$log[Checking Music Package..]
$log[____________________________________________

YouTube    : $get[youtube]
SoundCloud : $get[soundcloud]
Spotify    : $get[spotify]
____________________________________________

IPV4       : $get[ipv4]
Load       : $numberSeparator[$divide[$sub[$dateStamp;$get[time]];1000]]s
____________________________________________]
$let[youtube;$replaceText[$replaceText[$isValidLink[https://youtube.com/];true;✅];false;❌]]
$let[soundcloud;$replaceText[$replaceText[$isValidLink[https://soundcloud.com/];true;✅];false;❌]]
$let[spotify;$replaceText[$replaceText[$isValidLink[https://spotify.com/];true;✅];false;❌]]
$let[ipv4;$advancedTextSplit[$httpRequest[https://ip-fast.com/api/ip/?location=True];";2;";1]]
$resetServerVar[buttonmusichannel]
$resetServerVar[buttonmusicmessage]
$resetServerVar[filters]
$let[time;$dateStamp]
$suppressErrors`
})

const voice = new Aoijs.Voice(bot, {
  cache: {
    cacheType: "Memory", //Disk | None | Memory
    directory: "./music/", //Only for "Disk"
    enabled: true
  },
  soundcloud: {
    clientId: "your clientid",
    likeTrackLimit: 200
  },
  youtube: {
 fetchAuthor: true
 },
  playerOptions: {
 trackInfoInterval: 150
},
}); 

voice.onTrackStart()

voice.trackStartCommand({
 channel: "$channelID",
 $if: "v4",
 code: `$if[$getServerVar[maxvol]<=$volume]
$volume[$getServerVar[maxvol]]
$endif
$if[$hasPerms[$guildID;$clientID;deafenmembers]-$getVar[deafenclient]==true-1]
$deafenUser[$clientID;yes]
$endif
$if[$getCurrentDuration$suppressErrors==0]
$if[$getServerVar[buttonmusic]==0]
$author[1;Started Playing;$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;$getVar[ytemoji]];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;$getVar[scemoji]];false;$getVar[customemoji1]]]] 
$title[1;$songInfo[title];$songInfo[url]]
$addField[1;Filters;\`$getServerVar[filters]\`;no]
$addField[1;Loop;\`$replaceText[$replaceText[$checkCondition[$loopStatus==none];true;off];false;on - $loopStatus]\`;yes]
$addField[1;24/7;$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[user.id]];0;\`❌\`];1;\`✅\`];yes]
$addField[1;Song;\`$numberSeparator[$queueLength]\`;yes]
$addfield[1;Create;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;<t:$cropText[$songInfo[createdTimestamp];10]:d>];false;\`none\`];yes] 
$addField[1;Like;\`$numberSeparator[$replaceText[$songInfo[likes];null;0]]\`;yes]
$addField[1;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;Listened];false;Views];\`$numberSeparator[$songInfo[views]]\`;yes] 
$addField[1;Platform;\`$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;YouTube];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;SoundCloud];false;Audio]]\`;yes]
$addField[1;Artist;\`$songInfo[author]\`;yes] $addField[1;Duration;\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$songInfo[duration];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;0];true;$findNumbers[$songInfo[duration]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`;yes]
$addField[1;Requested By;<@$songInfo[user.id]>;no]
$addTimestamp[1;$dateStamp] 
$thumbnail[1;$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;1024]]]
$color[1;$getVar[color]]
$onlyIf[$checkCondition[$getServerVar[logmusic]==1]==true;]
$else
$if[$getServerVar[buttonmusicmessage]==]
$setServerVar[buttonmusichannel;$channelID]
$setServerVar[buttonmusicmessage;$get[id]]
$let[id;$sendMessage[{
 "embeds": "{newEmbed:{author:Started Playing:$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;$getVar[ytemoji]];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;$getVar[scemoji]];false;$getVar[customemoji1]]]}
{title:$songInfo[title]}
{url:$songInfo[url]}
{field:Requested By:<@$songInfo[user.id]>:no}
{field:Duration:\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$songInfo[duration];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;0];true;$findNumbers[$songInfo[duration]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`:yes}
{field:Artist:\`$songInfo[author]\`:yes}
{field:Platform:\`$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;YouTube];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;SoundCloud];false;Audio]]\`:yes}
{field:$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;Listened];false;Views]:\`$numberSeparator[$songInfo[views]]\`:yes}
{field:Like:\`$numberSeparator[$replaceText[$songInfo[likes];null;0]]\`:yes}
{field:Create:$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;<t:$cropText[$songInfo[createdTimestamp];10]:d>];false;\`none\`]:yes}
{field:Song:\`$numberSeparator[$queueLength]\`:yes}
{field:24/7:$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[user.id]];0;\`❌\`];1;\`✅\`]:yes}
{field:Loop:\`$replaceText[$replaceText[$checkCondition[$loopStatus==none];true;off];false;on - $loopStatus]\`:yes}
{field:Filters:\`$getServerVar[filters]\`:no}
{timestamp}
{thumbnail:$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;1024]]}
{color:$getVar[color]}}",
 "components": "{actionRow:{button::1:queue:no:⏏} {button::3:previous:no:⏮} {button::3:play:no:⏯} {button::3:next:no:⏭} {button::1:stop:no:⏹}} {actionRow:{button:$replaceText[$replaceText[$checkCondition[$loopStatus==none];true;Off];false;$toLocaleUppercase[$loopStatus]]:1:loop:no:🔁} {button:-10s:2:downseek:no:⏪} {button:+10s:2:fastseek:no:⏩}}"
};yes]]
$else
$editMessage[$getServerVar[buttonmusicmessage];{newEmbed:{author:Started Playing:$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;$getVar[ytemoji]];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;$getVar[scemoji]];false;$getVar[customemoji1]]]}
{title:$songInfo[title]}
{url:$songInfo[url]}
{field:Requested By:<@$songInfo[user.id]>:no}
{field:Duration:\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$songInfo[duration];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;0];true;$findNumbers[$songInfo[duration]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`:yes}
{field:Artist:\`$songInfo[author]\`:yes}
{field:Platform:\`$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;YouTube];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;SoundCloud];false;Audio]]\`:yes}
{field:$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;Listened];false;Views]:\`$numberSeparator[$songInfo[views]]\`:yes}
{field:Like:\`$numberSeparator[$replaceText[$songInfo[likes];null;0]]\`:yes}
{field:Create:$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;<t:$cropText[$songInfo[createdTimestamp];10]:d>];false;\`none\`]:yes}
{field:Song:\`$numberSeparator[$queueLength]\`:yes}
{field:24/7:$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[user.id]];0;\`❌\`];1;\`✅\`]:yes}
{field:Loop:\`$replaceText[$replaceText[$checkCondition[$loopStatus==none];true;off];false;on - $loopStatus]\`:yes}
{field:Filters:\`$getServerVar[filters]\`:no}
{timestamp}
{thumbnail:$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;1024]]}
{color:$getVar[color]}}]
$endif
$endif
$playerConfig[$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[user.id]];0;yes];1;no];0s;yes]
$volume[$getGlobalUserVar[vol;$songInfo[user.id]]]
$setGlobalUserVar[cacheplay;$songInfo[url];$songInfo[user.id]]
$setGlobalUserVar[listenuser;$sum[$getGlobalUserVar[listenuser;$songInfo[user.id]];1];$songInfo[user.id]]
$setServerVar[listenserver;$sum[$getServerVar[listenserver];1]]
$setVar[listenglobal;$sum[$getVar[listenglobal];1]]
$setServerVar[ratetime;$sum[$dateStamp;$getVar[customratetime]]]
$else
$volume[$getGlobalUserVar[vol;$songInfo[user.id]]]
$endif
$suppressErrors
$onlyIf[$getServerVar[ratetime]<$dateStamp;{execute:forcestop}]`
})

voice.trackStartCommand({
 channel: "$channelID",
 $if: "v4",
 code: `$if[$getCurrentDuration$suppressErrors<2000]
$setGlobalUserVar[playlistusercount;$sum[$getGlobalUserVar[playlistusercount;$songInfo[user.id]];1];$songInfo[user.id]]
$setGlobalUserVar[playlistuser;$getGlobalUserVar[playlistuser;$songInfo[user.id]],
"name$getGlobalUserVar[playlistusercount;$songInfo[user.id]]": "[$songInfo[title]]($songInfo[url])";$songInfo[user.id]]
$onlyIf[$checkContains[$songInfo[url];youtube.com;soundcloud.com;cdn.discordapp.com]==true;]
$onlyIf[$checkContains[$getGlobalUserVar[playlistuser;$songInfo[user.id]];$songInfo[url]]==false;]
$onlyIf[$getGlobalUserVar[playlistuserauto;$songInfo[user.id]]!=off;]
$endif`
})

bot.awaitedCommand({
 name: "forcestop",
 $if: "v4",
 code: `$if[$getGlobalUserVar[247;$songInfo[user.id]]$suppressErrors==0]
$log[Rate Limited Detected, when playing song at $formatDate[$dateStamp;LLLL]]
$sendMessage[{newEmbed:{title:Rate Limited Detected} {description:Force stop active.} {color:ff0000} {timestamp}};no]
$leaveVC
$else
$log[Rate Limited Detected, when playing song at $formatDate[$dateStamp;LLLL]]
$sendMessage[{newEmbed:{title:Rate Limited Detected} {description:Force stop active.} {color:ff0000} {timestamp}};no]
$stop
$endif
$suppressErrors`
})

voice.onTrackEnd()

voice.trackEndCommand({
 channel: "$channelID",
 $if: "v4",
 code: `$if[$queueLength==0]
$if[$getServerVar[buttonmusic]==1]
$deleteMessage[$get[musicmessage];$get[musichannel]]
$endif
$setServerVar[buttonmusichannel;]
$setServerVar[buttonmusicmessage;]
$let[musichannel;$getServerVar[buttonmusichannel]]
$let[musicmessage;$getServerVar[buttonmusicmessage]]
$endif
$if[$queueLength==0]
$setServerVar[filters;$getVar[filters]]
$endif
$suppressErrors`
})

voice.onQueueEnd()

voice.queueEndCommand({
 channel: "$channelID",
 $if: "v4",
 code: `$if[$queueLength>=1]
$if[$getServerVar[buttonmusic]==1]
$deleteMessage[$get[musicmessage];$get[musichannel]]
$endif
$sendMessage[{newEmbed:{title:Error} {description:Failed playing song.} {timestamp} {color:ff0000}};no]
$setServerVar[buttonmusichannel;]
$setServerVar[buttonmusicmessage;]
$let[musichannel;$getServerVar[buttonmusichannel]]
$let[musicmessage;$getServerVar[buttonmusicmessage]]
$setServerVar[filters;$getVar[filters]]
$endif
$suppressErrors`
})

bot.variables(require(`./variables/variables.js`))

const loader = new Aoijs.LoadCommands(bot)
 loader.load(bot.cmd,"./commands/")
