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

//Variables
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
  errorjoin: "\`❌ You're not in a voice channel.\`",
  errorqueue: "\`❌ There no song was playing.\`",
  errorloop: "Only have {amount} song.", //Available {amount}
  erroruser: "{newEmbed:{title:❌ You cant use this command} {color:$getVar[color]}}",
  errorsameuser: "You must same in {voice} to use this command.", //Available {voice}
  customerror: "Something just happened.", //Custom $suppressErrors

  join: "Joined Voice Channel to the {join}.", //Available {join}
  dc: "Disconnected.",
  leftvc: "There no song again on queue.", //Description
  secondleftvc: "Left VC.", //Footer

  //Changing Other
  color: "a09fff",
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
    cacheType: "Memory", //Disk | None | Memory
    directory: "./music/",
    enabled: true
  },
}); 
 
//Callbacks
bot.onMessage()

bot.command({
 name: "play",
 $if: "v4",
 code: `$if[$queueLength<1]
$editMessage[$get[id];{newEmbed:{author:Started Playing:$getVar[customemoji1]} {title:$replaceText[$get[message];Added;;1]} {url:$songInfo[url]} {field:Duration:\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$songInfo[duration];4]];true;$djsEval[new Date($findNumbers[$songInfo[duration]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`:yes} {field:Artist:\`$songInfo[author]\`:yes} {field:Platform:\`$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;YouTube];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;SoundCloud];false;Audio]]\`:yes} {field:Like:\`$songInfo[likes]\`:yes} {field:$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;Listened];false;Views]:\`$numberSeparator[$songInfo[views]]\`:yes} {field:Created:$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;<t:$cropText[$songInfo[createdTimestamp];10]:d>];false;none]:yes} {field:Song:\`$numberSeparator[$queueLength]\`:yes} {field:Requested By:<@$authorID>:yes} {timestamp} {thumbnail:$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;2048]]} {color:$getVar[color]}}]
$editMessage[$get[id];{newEmbed:{title:Started Playing} {description:$replaceText[$get[message];Added;;1]} {color:$getVar[color]}}]
$else
$editMessage[$get[id];{newEmbed:{title:Added to queue} {description:$replaceText[$get[message];Added;;1]} {color:$getVar[color]}}]
$wait[3s]
$editMessage[$get[id];{newEmbed:{field:Queue:$queue[1;5]:no} {timestamp} {color:$getVar[color]}} {newEmbed:{title:Added to queue} {description:$replaceText[$get[message];Added;;1]} {color:$getVar[color]}}]
$endif
$volume[$getGlobalUserVar[vol;$songInfo[user.id]]]
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
$if[$checkContains[$toLowercase[$message];(sc)]==true]
$let[message;$playTrack[soundcloud;$message]]
$else
$let[message;$playTrack[youtube;$message]]
$endif
$endif
$endif
$editMessage[$get[id];{newEmbed:{author:Searching:$getVar[loademoji]} {color:$getVar[color]}}]
$if[$voiceID[$clientID]==]
$joinVC
$endif
$let[id;$sendMessage[{newEmbed:{author:Processing:$getVar[loademoji]} {color:$getVar[color]}};yes]]
$onlyIf[$message[1]!=;What song you want search]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})

bot.command({
 name: "stop",
 code: `$getVar[stop]
$leaveVC
$stop
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})

bot.command({
 name: "skip",
 aliases: ["s"],
 $if: "v4",
 code: `$if[$isNumber[$message[1]]==false]
$title[1;$getVar[skip]]
$addField[1;Duration;\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$songInfo[duration;1];4]];true;$djsEval[new Date($findNumbers[$songInfo[duration;1]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`;yes]
$addField[1;Now Playing;[$songInfo[title;1]]($songInfo[url;1]);yes]
$addTimestamp[1;$dateStamp]
$color[1;$getVar[color]]
$thumbnail[1;$songInfo[thumbnail;1]]
$skip
$else
$title[1;$getVar[skip]]
$addField[1;Duration;\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$songInfo[duration;$message[1]];4]];true;$djsEval[new Date($findNumbers[$songInfo[duration;$message[1]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`;yes]
$addField[1;Now Playing;[$songInfo[title;$message[1]]]($songInfo[url;$message[1]]);yes]
$addTimestamp[1;$dateStamp]
$color[1;$getVar[color]]
$thumbnail[1;$songInfo[thumbnail;$message[1]]]
$skipTo[$message[1]]
$onlyIf[$message[1]<=$queueLength;You cant skip $message[1] song. Only $queueLength]
$endif
$onlyIf[$queueLength!=1;$replaceText[$getVar[errorloop];{amount};$queueLength]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})

bot.command({
 name: "loop",
 aliases: ["l"],
 code: `$loopMode
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})

bot.command({
 name: "filter",
 $if: "v4",
 code: `$if[$message[1]==]
$addField[1;Filter;\`deep, nightcore, tempo, pitch, remove\`;yes]
$addTimestamp[1;$dateStamp]
$footer[1;filter <filter> (value optional)]
$color[1;$getVar[color]]
$elseIf[$toLowercase[$message[1]]==nightcore]
$let[filter;$setFilter[{"atempo": "0.720", "asetrate": "48000*1.3"}]]
$sendMessage[Applyed \`nightcore\`.;no]
$endelseif
$elseIf[$checkContains[$toLowercase[$message[1]];remove;clear;reset]==true]
$let[filter;$resetFilters]
$sendMessage[Reseted filters.;no]
$endelseif
$elseIf[$toLowercase[$message[1]]==tempo]
$let[filter;$setFilter[{"atempo": "$replaceText[$replaceText[$checkCondition[$message[2]==];true;1.05];false;$message[2]]"}]]
$sendMessage[Applyed \`tempo\` with value \`$replaceText[$replaceText[$checkCondition[$message[2]==];true;1.05];false;$message[2]]\`;no]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]==];true;1.05];false;$message[2]]<=4;Max \`4\`]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]==];true;1.05];false;$message[2]]>=0.5;Min \`0.5\`]
$endelseif
$elseIf[$toLowercase[$message[1]]==pitch]
$let[filter;$setFilter[{"asetrate": "48000*$replaceText[$replaceText[$checkCondition[$message[2]==];true;1.05];false;$message[2]]"}]]
$sendMessage[Applyed \`pitch\` with value \`$replaceText[$replaceText[$checkCondition[$message[2]==];true;1.05];false;$message[2]]\`;no]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]==];true;1.05];false;$message[2]]<=2;Max \`2\`]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]==];true;1.05];false;$message[2]]>=0.5;Min \`0.5\`]
$endelseif
$elseIf[$toLowercase[$message[1]]==deep]
$let[filter;$setFilter[{"atempo": "1.15", "asetrate": "48000*0.8"}]]
$sendMessage[Applyed \`deep\`.;no]
$endelseif
$endif
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})

bot.command({
 name: "queue",
 aliases: ["queue"],
 $if: "v4",
 code: `$if[$isNumber[$message[1]]==false]
$author[1;Queue;$getVar[customemoji1]]
$addField[2;($numberSeparator[$queueLength]) Queue | Page 1-$replaceText[$replaceText[$checkCondition[$truncate[$sum[$divide[$queueLength;5];0.4]]==0];true;1];false;$truncate[$sum[$divide[$queueLength;5];0.4]]];$queue[1;5;\`{position} |\` **[{title}]({url})**];no]
$color[2;$getVar[color]]
$thumbnail[1;$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;2048]]]
$thumbnail[2;$getVar[customemoji1]]
$addField[1;Duration;\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$songInfo[duration];4]];true;$djsEval[new Date($findNumbers[$songInfo[duration]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`;yes]
$addField[1;Now Playing;[$songInfo[title]]($songInfo[url] "$advancedTextSplit[$songInfo[title]; ;1] | $replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;YouTube];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;SoundCloud];false;Audio]]");yes]
$color[1;$getVar[color]]
$addTimestamp[2;$dateStamp]
$else
$author[1;Queue;$getVar[customemoji1]]
$addField[2;($numberSeparator[$queueLength]) Queue | Page $filterMessage[$message[1];-]-$replaceText[$replaceText[$checkCondition[$truncate[$sum[$divide[$queueLength;5];0.4]]==0];true;1];false;$truncate[$sum[$divide[$queueLength;5];0.4]]];$queue[$filterMessage[$message[1];-];5;\`{position} |\` **[{title}]({url})**];no]
$color[2;$getVar[color]]
$thumbnail[1;$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;2048]]]
$thumbnail[2;$getVar[customemoji1]]
$addField[1;Duration;\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$songInfo[duration];4]];true;$djsEval[new Date($findNumbers[$songInfo[duration]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`;yes]
$addField[1;Now Playing;[$songInfo[title]]($songInfo[url] "$songInfo[title]");yes]
$color[1;$getVar[color]]
$addTimestamp[2;$dateStamp]
$onlyIf[$filterMessage[$message[1];-]<=$replaceText[$replaceText[$checkCondition[$truncate[$sum[$divide[$queueLength;5];0.4]]==0];true;1];false;$truncate[$sum[$divide[$queueLength;5];0.4]]];]
$onlyIf[$findSpecialChars[$message[1]]==;]
$endif
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})

bot.command({
 name: "seek",
 aliases: ["seekto"],
 code: `$seekTo[$filterMessage[$noMentionMessage[1];-]]
$description[1;Seek to \`$djsEval[new Date($multi[$filterMessage[$noMentionMessage[1];-];1000]).toISOString().substr(11, 8);yes]\`]
$color[1;$getVar[color]]
$onlyIf[$isNumber[$noMentionMessage[1]]!=false;Must number]
$onlyIf[$noMentionMessage[1]!=;Put number to seek song]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})

bot.command({
 name: "nowplaying",
 aliases: ["np", "now"],
 code: `$author[1;Now Playing;$getVar[customemoji1]]
$title[1;$songInfo[title];$songInfo[url]]
$thumbnail[1;$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;2048]]]
$addField[1;URL;[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;YouTube];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;SoundCloud];false;Audio]]]($songInfo[url]);yes]
$addField[1;Song;\`$numberSeparator[$queueLength]\`;yes]
$addField[1;Duration Left;\`$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0];true;LIVE];false;$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$sub[$songInfo[duration];$getCurrentDuration];4]];true;$djsEval[new Date($sub[$songInfo[duration];$getCurrentDuration]).toISOString().substr(11, 8);yes]]]\`;yes]
$addField[1;Duration Now;\`$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0];true;LIVE];false;$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$getCurrentDuration;4]];true;$djsEval[new Date($getCurrentDuration).toISOString().substr(11, 8);yes]]]\`;yes]
$addField[1;Duration;\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$songInfo[duration];4]];true;$djsEval[new Date($findNumbers[$songInfo[duration]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`;yes]
$addField[1;Requested By;<@$songInfo[user.id]>;no]
$addTimestamp[1;$dateStamp]
$color[1;$getVar[color]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})

bot.command({
 name: "invite",
 code: `$getBotInvite&permissions=$getVar[permission]`
})

bot.command({
 name: "uptime",
 code: `\`$uptime\``
})

bot.command({
 name: "stats",
 code: `$color[1;$getVar[color]]
$addField[1;Size Database;> $cropText[$fileSize[$getVar[database];kb];5]KB;yes]
$addField[1;Size Code;> $cropText[$fileSize[$getVar[file];kb];5]KB;yes]
$addField[1;Command;> $numberSeparator[$commandsCount];yes]
$addField[1;Server;> $numberSeparator[$serverCount];yes]
$addField[1;Members;> $numberSeparator[$allMembersCount];yes]
$addField[1;RAM Left;> $cropText[$divide[$sub[$maxRam;$ram];1024];4]GB;yes]
$addField[1;RAM;> $cropText[$divide[$ram;1024];4]GB;yes]
$addField[1;CPU;> $truncate[$cpu]%;yes]
$addField[1;Is Deafen/Mute;> $replaceText[$isDeafened;falseed;false]-$replaceText[$isSelfDeafened[$clientID];null;false] / $replaceText[$isMuted[$clientID];null;false]-$replaceText[$isSelfMuted[$clientID];null;false];yes]
$addField[1;Is Playing;> $checkCondition[$queueLength!=0];yes]
$addField[1;Is Connect;> $checkCondition[$voiceID[$clientID]!=];yes]
$addField[1;API Ping;> $numberSeparator[$messagePing]ms;yes]
$addField[1;DB Ping;> $numberSeparator[$dbPing]ms;yes]
$addField[1;WS Ping;> $numberSeparator[$ping]ms;yes]
$addField[1;Platform;> $djsEval[require ('os').platform();yes] $djsEval[require ('os').arch;yes];yes]
$addField[1;Last Online;> <t:$cropText[$sub[$dateStamp;$djsEval[client.uptime;yes]];10]:R>;yes]
$addField[1;Uptime;> $uptime;yes]
$footer[1;Ver. $packageVersion ($nodeVersion);$userAvatar[$authorID;512]]
$thumbnail[1;$userAvatar[$clientID]]
$addTimestamp[1;$dateStamp]
$cacheMembers[$guildID]`
})

bot.command({
 name: "check",
 code: `$title[1;Check]
$description[1;\`\`\`
Pause          : $replaceText[$replaceText[$checkCondition[$getVar[pause]!=];true;✅];false;❌]
Resume         : $replaceText[$replaceText[$checkCondition[$getVar[resume]!=];true;✅];false;❌]
Skip           : $replaceText[$replaceText[$checkCondition[$getVar[skip]!=];true;✅];false;❌]
Stop           : $replaceText[$replaceText[$checkCondition[$getVar[stop]!=];true;✅];false;❌]
Shuffle        : $replaceText[$replaceText[$checkCondition[$getVar[shuffle]!=];true;✅];false;❌]
Join           : $replaceText[$replaceText[$checkCondition[$getVar[join]!=];true;✅];false;❌]
Disconnect     : $replaceText[$replaceText[$checkCondition[$getVar[dc]!=];true;✅];false;❌]
Play           : $replaceText[$replaceText[$checkCondition[$getVar[errorjoin]!=];true;✅];false;❌]
UserID         : $replaceText[$replaceText[$checkCondition[$getServerVar[userid]!=default];true;✅];false;❌]
Log Music      : $replaceText[$replaceText[$checkContains[$getGlobalUserVar[logmusic];0;2];true;✅];false;❌]

Max Volume     : $getServerVar[maxvol]%
User Volume    : $getGlobalUserVar[vol]%

1) Emoji       : $replaceText[$replaceText[$checkCondition[$getVar[customemoji1]!=];true;✅];false;❌]
2) Emoji       : $replaceText[$replaceText[$checkCondition[$getVar[ytemoji]!=];true;✅];false;❌]
3) Emoji       : $replaceText[$replaceText[$checkCondition[$getVar[scemoji]!=];true;✅];false;❌]
4) Emoji       : $replaceText[$replaceText[$checkCondition[$getVar[loademoji]!=];true;✅];false;❌]

Connect        : $replaceText[$replaceText[$checkCondition[$hasPerms[$guildID;$clientID;connect]==true];true;✅];false;❌]
Speak          : $replaceText[$replaceText[$checkCondition[$hasPerms[$guildID;$clientID;speak]==true];true;✅];false;❌]
Deafen         : $replaceText[$replaceText[$checkCondition[$hasPerms[$guildID;$clientID;deafenmembers]==true];true;✅];false;❌]
Reactions      : $replaceText[$replaceText[$checkCondition[$hasPerms[$guildID;$clientID;addreactions]==true];true;✅];false;❌]
Messages       : $replaceText[$replaceText[$checkCondition[$hasPerms[$guildID;$clientID;managemessages]==true];true;✅];false;❌]
Embed Links    : $replaceText[$replaceText[$checkCondition[$hasPerms[$guildID;$clientID;embedlinks]==true];true;✅];false;❌]
Attach Files   : $replaceText[$replaceText[$checkCondition[$hasPerms[$guildID;$clientID;attachfiles]==true];true;✅];false;❌]
Move Members   : $replaceText[$replaceText[$checkCondition[$hasPerms[$guildID;$clientID;movemembers]==true];true;✅];false;❌]
Public Thread  : $replaceText[$replaceText[$checkCondition[$hasPerms[$guildID;$clientID;usepublicthreads]==true];true;✅];false;❌]
Private Thread : $replaceText[$replaceText[$checkCondition[$hasPerms[$guildID;$clientID;useprivatethreads]==true];true;✅];false;❌]
Slash          : $replaceText[$replaceText[$checkCondition[$hasPerms[$guildID;$clientID;useappcmds]==true];true;✅];false;❌]

YouTube        : $replaceText[$replaceText[$get[yt];true;✅];false;❌]
SoundCloud     : $replaceText[$replaceText[$get[sc];true;✅];false;❌]
\`\`\`] 
$color[1;$getVar[color]]
$footer[1;Color: $getVar[color]
Latency: $numberSeparator[$messagePing]ms]
$addTimestamp[1]
$let[sc;$isValidLink[https://soundcloud.com/]]
$let[yt;$isValidLink[https://youtube.com/]]`
})

bot.command({
 name: "help",
 code: `$addField[1;Music;\`play, nowplaying, skip, loop, seek, volume, stop, filter, queue\`;no]
$addField[1;Basic;\`check, stats, uptime, invite\`;no]
$color[1;$getVar[color]]
$addTimestamp[1;$dateStamp]`
})

bot.command({
 name: "volume",
 aliases: ["vol"],
 $if: "v4",
 code: `$color[1;$getVar[color]]
$addField[1;Requested/Changed By;$replaceText[$replaceText[$checkCondition[$songInfo[user.id]==$authorID];true;<@$songInfo[user.id]>];false;<@$authorID> (Requested)\n<@$songInfo[user.id]> (Changed)];yes]
$addField[1;Max Volume;\`$getServerVar[maxvol]%\`;yes]
$addField[1;Volume;\`$volume%\`;yes]
$addTimestamp[1;$dateStamp]
$volume[$noMentionMessage[1]]
$setGlobalUserVar[vol;$noMentionMessage[1];$songInfo[user.id]]
$onlyIf[$noMentionMessage[1]<=$getServerVar[maxvol];Max. **$getServerVar[maxvol]%**]
$onlyIf[$noMentionMessage[1]>=10;Min. **10%**]
$onlyIf[$isNumber[$noMentionMessage[1]]!=false;Must number]
$onlyIf[$noMentionMessage[1]!=;Put the number]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})
