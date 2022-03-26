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
$log[$forEachGuild[0.01s;{};resetfilter]]
$log[Reseting Filter..]
$log[$replaceText[$replaceText[$checkContains[$get[update];up to date];true;No update found.];false;$get[update]]] //remove this, if you get error when starting server
$let[update;$exec[npm i https://github.com/akaruidevelopment/music#main]] //remove this, if you get error when starting server
$log[Checking Music Package..]
$log[____________________________________________

YouTube    : $replaceText[$replaceText[$isValidLink[https://youtube.com/];true;✅];false;❌]
SoundCloud : $replaceText[$replaceText[$isValidLink[https://soundcloud.com/];true;✅];false;❌]
Spotify    : $replaceText[$replaceText[$isValidLink[https://spotify.com/];true;✅];false;❌]
____________________________________________

IPV4       : $advancedTextSplit[$httpRequest[https://ip-fast.com/api/ip/];";2]
Load       : $numberSeparator[$divide[$sub[$dateStamp;$get[time]];10]]s
____________________________________________]
$let[time;$dateStamp]
$suppressErrors`
})

bot.awaitedCommand({
 name: "resetfilter",
 code: `$log[Successful reseted.]
$resetServerVar[filters]
$suppressErrors`
})

//Variables
bot.variables({
  //System
  file: "server.js", //For stats
  database: "./database/main/main_scheme_1.sql", //For stats

  //Customize Property For Message
  pause: "⏸️ Paused.",
  resume: "▶️ Resumed!",
  skip: "⏩ Skipped!",  //Available {song}
  stop: "⏹ Stopped.",  
  remove: "Removed song on {d-amount}.", //Available {d-amount}

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
  deafenclient: "1", //Server Deafen Client, 0 = false | 1 = true
  defaultspotify: "youtube", //YouTube/SoundCloud
  multiseek: "1000",
  userid: "default",
  logmusic: "1", //0 = off | 1 = on
  247: "0", //0 = off | 1 = stay 24/7
  last: "null",
  linkdownload: "",
  filters: "none",
  cachemessageid: "",
  cacheplay: "",
  listfilters: "\`bassonly, clarity, echo, flanger, deep, haas, gate, nightcore, phaser, pitch, phone, pulsator, reverb, tempo, tremolo, remove, subboost, vaporwave, vibrato\`",

  //Emoji
  customemoji1: "https://cdn.discordapp.com/emojis/852434440668184615.png?size=4096",
  customemoji2: "https://cdn.discordapp.com/emojis/951749233919279125.png?size=4096",
  ytemoji: "https://cdn.discordapp.com/emojis/852432148207108110.png?size=4096",
  scemoji: "https://cdn.discordapp.com/emojis/852432173758676993.png?size=4096",
  loademoji: "https://cdn.discordapp.com/emojis/951749045787959337.gif?size=4096",
 
  listenuser: "0",
  listenserver: "0",
  listenglobal: "0"
})

const voice = new Aoijs.Voice(bot, {
  soundcloud: {
    clientId: "your clientid",
  },
  cache: {
    cacheType: "Memory", //Disk | None | Memory
    directory: "./music/", //Only for "Disk"
    enabled: true
  },
  youtube: {
 fetchAuthor: true
 },
}); 
 
//Events
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
$if[$getCurrentDuration==0]
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
$playerConfig[$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[user.id]];0;yes];1;no];0s;yes]
$volume[$getGlobalUserVar[vol;$songInfo[user.id]]]
$setGlobalUserVar[cacheplay;$songInfo[url];$songInfo[user.id]]
$setGlobalUserVar[listenuser;$sum[$getGlobalUserVar[listenuser;$songInfo[user.id]];1];$songInfo[user.id]]
$setServerVar[listenserver;$sum[$getServerVar[listenserver];1]]
$setVar[listenglobal;$sum[$getVar[listenglobal];1]]
$else
$volume[$getGlobalUserVar[vol;$songInfo[user.id]]]
$endif`
})

voice.onTrackEnd()

voice.trackEndCommand({
 channel: "$channelID",
 $if: "v4",
 code: `$if[$queueLength==0]
$setServerVar[filters;$getVar[filters]]
$endif`
})

bot.command({
 name: "eval",
 $if: "v4",
 code: `$eval[$message]
 $onlyIf[$botOwnerID==$authorID;]`
})

bot.command({
 name: "play",
 $if: "v4",
 code: `$if[$checkContains[$message[1];soundcloud.com/discover/sets/;youtube.com/playlist?list=]==true]
$deleteMessage[$get[id]]
$sendMessage[{newEmbed:{author:Added to queue:$getVar[customemoji1]} {footer:$queueLength Song} {description:$replaceText[$get[message];Added;;1] Song from Playlist.} {color:$getVar[color]}};no]
$else
$if[$queueLength<1]
$if[$getServerVar[logmusic]==1]
$deleteMessage[$get[id]]
$endif
$editMessage[$get[id];{newEmbed:{title:Started Playing} {description:$replaceText[$get[message];Added;;1]} {color:$getVar[color]}}]
$else
$editMessage[$get[id];{newEmbed:{author:Added to queue:$getVar[customemoji1]} {footer:$queueLength Song} {description:$replaceText[$get[message];Added;;1]} {color:$getVar[color]}}]
$endif
$endif
$if[$checkContains[$message[1];youtu.be;m.youtube;youtube.com]==true]
$let[message;$playTrack[youtube;$message]]
$elseIf[$checkContains[$message[1];soundcloud.com;app.goo.gl]==true]
$onlyIf[$get[message]!=Added 0;Track not found]
$let[message;$playTrack[soundcloud;$message]]
$endelseif
$elseIf[$checkContains[$message[1];open.spotify.com/track]==true]
$if[$toLowercase[$getVar[defaultspotify]]==youtube]
$let[message;$playTrack[youtube;$advancedTextSplit[$get[url];data: ';2;"og:description" content=";2; ·;1] - $advancedTextSplit[$get[url];data: ';2;"og:title" content=";2;";1]]]
$let[url;$djsEval[require('axios').get('$message[1]');yes]]
$elseif[$toLowercase[$getVar[defaultspotify]]==soundcloud]
$let[message;$playTrack[soundcloud;$advancedTextSplit[$get[url];data: ';2;"og:description" content=";2; ·;1] - $advancedTextSplit[$get[url];data: ';2;"og:title" content=";2;";1]]]
$let[url;$djsEval[require('axios').get('$message[1]');yes]]
$endelseif
$endif
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
$if[$checkContains[$message[1];soundcloud.com/discover/sets/;youtube.com/playlist?list=]==true]
$editMessage[$get[id];{newEmbed:{author:Adding to Queue:$getVar[customemoji2]} {footer:This can take long time.} {color:$getVar[color]}}]
$editMessage[$get[id];{newEmbed:{author:Searching:$getVar[loademoji]} {color:$getVar[color]}}]
$else
$editMessage[$get[id];{newEmbed:{author:Searching:$getVar[loademoji]} {color:$getVar[color]}}]
$endif
$if[$voiceID[$clientID]==]
$joinVc[$voiceID;no;yes;yes]
$endif
$let[id;$sendMessage[{newEmbed:{author:Processing:$getVar[loademoji]} {color:$getVar[color]}};yes]]
$onlyIf[$message[1]!=;What song you want search]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$onlyBotPerms[speak;Missing Permission, **Speak** - Bot]
$onlyBotPerms[connect;Missing Permission, **Connect** - Bot]`
})

bot.command({
 name: "stop",
 $if: "v4",
 code: `$reply[$messageID;no]
$getVar[stop]
$if[$getGlobalUserVar[247]==0]
$leaveVC
$endif
$stop
$resetPlayer
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})

bot.command({
 name: "skip",
 aliases: ["s"],
 $if: "v4",
 code: `$reply[$messageID;no]
$if[$isNumber[$message[1]]==false]
$title[1;$getVar[skip]]
$addField[1;Duration;\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url;1];youtube.com;soundcloud.com];false;$humanizeMS[$songInfo[duration;1];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url;1];youtube.com;soundcloud.com];false;0];true;$findNumbers[$songInfo[duration;1]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`;yes]
$addField[1;Now Playing;[$songInfo[title;1]]($songInfo[url;1]);yes]
$addTimestamp[1;$dateStamp]
$color[1;$getVar[color]]
$thumbnail[1;$replaceText[$songInfo[thumbnail;1];undefined;$userAvatar[$clientID]]]
$skip
$else
$skip
$skipTo[$sub[$message[1];2]]
$title[1;$getVar[skip]]
$addField[1;Duration;\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url;$sub[$message[1];1]];youtube.com;soundcloud.com];false;$humanizeMS[$songInfo[duration;$sub[$message[1];1]];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url;$sub[$message[1];1]];youtube.com;soundcloud.com];false;0];true;$findNumbers[$songInfo[duration;$sub[$message[1];1]]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`;yes]
$addField[1;Now Playing;[$songInfo[title;$sub[$message[1];1]]]($songInfo[url;$sub[$message[1];1]]);yes]
$addTimestamp[1;$dateStamp]
$color[1;$getVar[color]]
$thumbnail[1;$replaceText[$songInfo[thumbnail;$sub[$message[1];1]];undefined;$userAvatar[$clientID]]]
$onlyIf[$message[1]>0;You cant skip $message[1] song. Only $sub[$queueLength;1]]
$onlyIf[$message[1]<=$queueLength;You cant skip $message[1] song. Only $sub[$queueLength;1]]
$onlyIf[$findSpecialChars[$message[1]]==;]
$endif
$onlyIf[$queueLength!=1;$replaceText[$getVar[errorloop];{amount};$queueLength]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})

bot.command({
 name: "previous",
 aliases: ["pr"],
 $if: "v4",
 code: `$if[$queueLength<1]
$deleteMessage[$get[id]]
$editMessage[$get[id];{newEmbed:{title:Started Playing} {description:$replaceText[$get[message];Added;;1]} {color:$getVar[color]}}]
$else
$editMessage[$get[id];{newEmbed:{author:Added to queue:$getVar[customemoji1]} {footer:$queueLength Song} {description:$replaceText[$get[message];Added;;1]} {color:$getVar[color]}}]
$endif
$if[$checkContains[$getGlobalUserVar[cacheplay];youtube.com]==true]
$setGlobalUserVar[cacheplay;]
$let[message;$playTrack[youtube;$getGlobalUserVar[cacheplay]]]
$elseif[$checkContains[$getGlobalUserVar[cacheplay];soundcloud.com]==true]
$setGlobalUserVar[cacheplay;]
$onlyIf[$get[message]!=Added 0;Track not found]
$let[message;$playTrack[soundcloud;$getGlobalUserVar[cacheplay]]]
$endelseif
$else
$setGlobalUserVar[cacheplay;]
$let[message;$playTrack[url;$getGlobalUserVar[cacheplay]]]
$endif
$if[$voiceID[$clientID]==]
$joinVc[$voiceID;no;yes;yes]
$endif
$let[id;$sendMessage[{newEmbed:{author:Processing:$getVar[loademoji]} {color:$getVar[color]}};yes]]
$onlyIf[$getGlobalUserVar[cacheplay]!=;Last previous not found]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})

bot.command({
 name: "listen-info",
 aliases: ["track-info", "music-info", "song-info", "listen"],
 code: `$title[1;Listened]
$addField[1;Global;\`$numberSeparator[$getVar[listenglobal]]\`;yes]
$addField[1;Server;\`$numberSeparator[$getServerVar[listenserver]]\`;yes]
$addField[1;User;\`$numberSeparator[$getGlobalUserVar[listenuser]]\`;yes]
$addTimestamp[1]
$color[1;$getVar[color]]`
})

bot.command({
 name: "loop",
 aliases: ["l"],
 $if: "v4",
 code: `$reply[$messageID;no]
$if[$checkCondition[$message[1]==]-$loopStatus$suppressErrors==true-none]
$loopMode[song]
Loop mode \`song\`
$elseIf[$checkCondition[$message[1]==]-$loopStatus$suppressErrors==true-song]
$loopMode[queue]
Loop mode \`queue\`
$endelseif
$elseIf[$checkCondition[$message[1]==]-$loopStatus$suppressErrors==true-queue]
Disable loop.
$loopMode[none]
$endelseif
$else
$if[$checkContains[$toLowercase[$message[1]];song;track;music;s]==true]
$loopMode[song]
Loop mode \`song\`
$endif
$if[$checkContains[$toLowercase[$message[1]];queue;q]==true]
Loop mode \`queue\`
$loopMode[queue]
$endif
$if[$checkContains[$toLowercase[$message[1]];clear;reset;remove;off]==true]
Disable loop.
$loopMode[none]
$else
$if[$message[1]==]
$loopMode[song]
Loop mode \`song\`
$endif
$endif
$endif
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})

bot.command({
 name: "filter",
 aliases: ["filters", "effect", "effects"], 
 $if: "v4",
 code: `$if[$message[1]==]
$reply[$messageID;no]
$addField[1;Filters;\`$getServerVar[filters]\`;no]
$addField[1;Filter;$getVar[listfilters];yes]
$addTimestamp[1;$dateStamp]
$footer[1;filter <filter> (value optional) / selectmenu]
$color[1;$getVar[color]]
$addSelectMenu[1;filter;List Filters;1;1;no;Remove:Remove Filter Applyed:off:no;Bass-only:Apply Bass-only Filter:bassonly:no;Clarity:Apply Clarity Filter:clarity:no;Echo:Apply Echo Filter:echo:no;Flanger:Apply Flanger Filter:flanger:no;Deep:Apply Haas Filter:haas:no;Gate:Apply Gate Filter:gate:no;Nightcore:Apply Nightcore Filter:nightcore:no;Phaser:Apply Phaser Filter:phaser:no;Phone:Apply Phone Filter:phone:no;Pulsator:Apply Pulsator Filter:pulsator:no;Reverb:Apply Reverb Filter:reverb:no;Tremolo:Apply Tremolo Filter:tremolo:no;Subboost:Apply Subboost Filter:subboost:no;Vaporwave:Apply Vaporwave Filter:vaporwave:no;Vibrato:Apply Vibrato Filter:vibrato:no]
$elseIf[$toLowercase[$message[1]]==nightcore]
$setServerVar[filters;Nightcore]
$let[filter;$setFilter[{"atempo": "0.720", "asetrate": "48000*1.3"}]]
$sendMessage[Applyed \`nightcore\`.;no]
$endelseif
$elseIf[$checkContains[$toLowercase[$message[1]];remove;clear;reset;off]==true]
$setServerVar[filters;$getVar[filters]]
$let[filter;$resetFilters]
$sendMessage[Reseted filters.;no]
$endelseif
$elseIf[$toLowercase[$message[1]]==tempo]
$setServerVar[filters;Tempo | $replaceText[$replaceText[$checkCondition[$message[2]==];true;1.05];false;$message[2]]]
$let[filter;$setFilter[{"atempo": "$replaceText[$replaceText[$checkCondition[$message[2]==];true;1.05];false;$message[2]]"}]]
$sendMessage[Applyed \`tempo\` with value \`$replaceText[$replaceText[$checkCondition[$message[2]==];true;1.05];false;$message[2]]\`;no]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]==];true;1.05];false;$message[2]]<=4;Max \`4\`]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]==];true;1.05];false;$message[2]]>=0.5;Min \`0.5\`]
$endelseif
$elseIf[$toLowercase[$message[1]]==pitch]
$setServerVar[filters;Pitch | $replaceText[$replaceText[$checkCondition[$message[2]==];true;1.05];false;$message[2]]]
$let[filter;$setFilter[{"asetrate": "48000*$replaceText[$replaceText[$checkCondition[$message[2]==];true;1.05];false;$message[2]]"}]]
$sendMessage[Applyed \`pitch\` with value \`$replaceText[$replaceText[$checkCondition[$message[2]==];true;1.05];false;$message[2]]\`;no]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]==];true;1.05];false;$message[2]]<=2;Max \`2\`]
$onlyIf[$replaceText[$replaceText[$checkCondition[$message[2]==];true;1.05];false;$message[2]]>=0.5;Min \`0.5\`]
$endelseif
$elseIf[$toLowercase[$message[1]]==deep]
$setServerVar[filters;Deep]
$let[filter;$setFilter[{"atempo": "1.15", "asetrate": "48000*0.8"}]]
$sendMessage[Applyed \`deep\`.;no]
$endelseif
$elseIf[$toLowercase[$message[1]]==bassonly]
$setServerVar[filters;Bass-only]
$let[filter;$setFilter[{"aresample": "1000"}]]
$sendMessage[Applyed \`bassonly\`.;no]
$endelseif
$elseIf[$toLowercase[$message[1]]==phone]
$setServerVar[filters;Phone]
$let[filter;$setFilter[{"aresample": "8000"}]]
$sendMessage[Applyed \`phone\`.;no]
$endelseif
$elseIf[$toLowercase[$message[1]]==vibrato]
$setServerVar[filters;Vibrato]
$let[filter;$setFilter[{"vibrato": "4"}]]
$sendMessage[Applyed \`vibrato\`.;no]
$endelseif
$elseIf[$toLowercase[$message[1]]==flanger]
$setServerVar[filters;Flanger]
$let[filter;$setFilter[{"flanger": "1"}]]
$sendMessage[Applyed \`flanger\`.;no]
$endelseif
$elseIf[$toLowercase[$message[1]]==echo]
$setServerVar[filters;Echo]
$let[filter;$setFilter[{"aecho": "1.0:0.5:30:0.9"}]]
$sendMessage[Applyed \`echo\`.;no]
$endelseif
$elseIf[$toLowercase[$message[1]]==reverb]
$setServerVar[filters;Reverb]
$let[filter;$setFilter[{"aecho": "1.0:0.8:5:0.5"}]]
$sendMessage[Applyed \`reverb\`.;no]
$endelseif
$elseIf[$toLowercase[$message[1]]==tremolo]
$setServerVar[filters;Tremolo]
$let[filter;$setFilter[{"tremolo": "2"}]]
$sendMessage[Applyed \`tremolo\`.;no]
$endelseif
$elseIf[$toLowercase[$message[1]]==haas]
$setServerVar[filters;Haas]
$let[filter;$setFilter[{"haas": "1"}]]
$sendMessage[Applyed \`haas\`.;no]
$endelseif
$elseIf[$toLowercase[$message[1]]==subboost]
$setServerVar[filters;Subboost]
$let[filter;$setFilter[{"asubboost": "0.75"}]]
$sendMessage[Applyed \`subboost\`.;no]
$endelseif
$elseIf[$toLowercase[$message[1]]==clarity]
$setServerVar[filters;Clarity]
$let[filter;$setFilter[{"aecho": "1.0:0.7:0.1:0.7"}]]
$sendMessage[Applyed \`clarity\`.;no]
$endelseif
$elseIf[$toLowercase[$message[1]]==vaporwave]
$setServerVar[filters;Vaporwave]
$let[filter;$setFilter[{"asetrate": "48000*0.8"}]]
$sendMessage[Applyed \`vaporwave\`.;no]
$endelseif
$elseIf[$toLowercase[$message[1]]==phaser]
$setServerVar[filters;Phaser]
$let[filter;$setFilter[{"aphaser": "1"}]]
$sendMessage[Applyed \`phaser\`.;no]
$endelseif
$elseIf[$toLowercase[$message[1]]==pulsator]
$setServerVar[filters;Pulsator]
$let[filter;$setFilter[{"apulsator": "1"}]]
$sendMessage[Applyed \`pulsator\`.;no]
$endelseif
$elseIf[$toLowercase[$message[1]]==gate]
$setServerVar[filters;Gate]
$let[filter;$setFilter[{"agate": "1"}]]
$sendMessage[Applyed \`gate\`.;no]
$endelseif
$endif
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})

bot.interactionCommand({
 name: "filter",
 prototype: "selectMenu",
 code: `$if[$interactionData[values[0]]==nightcore;{execute:filter-nightcore};]
$if[$checkContains[$interactionData[values[0]];remove;clear;reset;off]==true;{execute:filter-remove};]
$if[$interactionData[values[0]]==deep;{execute:filter-deep};]
$if[$interactionData[values[0]]==bassonly;{execute:filter-bassonly};]
$if[$interactionData[values[0]]==phone;{execute:filter-phone};]
$if[$interactionData[values[0]]==vibrato;{execute:filter-vibrato};]
$if[$interactionData[values[0]]==flanger;{execute:filter-flanger};]
$if[$interactionData[values[0]]==echo;{execute:filter-echo};]
$if[$interactionData[values[0]]==reverb;{execute:filter-reverb};]
$if[$interactionData[values[0]]==tremolo;{execute:filter-tremolo};]
$if[$interactionData[values[0]]==haas;{execute:filter-haas};]
$if[$interactionData[values[0]]==subboost;{execute:filter-subboost};]
$if[$interactionData[values[0]]==clarity;{execute:filter-clarity};]
$if[$interactionData[values[0]]==vaporwave;{execute:filter-vaporwave};]
$if[$interactionData[values[0]]==phaser;{execute:filter-phaser};]
$if[$interactionData[values[0]]==pulsator;{execute:filter-pulsator};]
$if[$interactionData[values[0]]==gate;{execute:filter-gate};]
$onlyIf[$checkCondition[$voiceID[$interactionData[author.id]]==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID[$interactionData[author.id]]];false;$voiceID[$clientID]]]==true;]
$onlyIf[$queueLength!=0;]
$onlyIf[$voiceID[$interactionData[author.id]]!=;]`
})

bot.awaitedCommand({
 name: "filter-bassonly",
 code: `$setServerVar[filters;Bass-only]
$let[filter;$setFilter[{"aresample": "1000"}]]
$interactionReply[Applyed \`bassonly\`.;;;;;yes]`
})

bot.awaitedCommand({
 name: "filter-clarity",
 code: `$setServerVar[filters;Clarity]
$let[filter;$setFilter[{"aecho": "1.0:0.7:0.1:0.7"}]]
$interactionReply[Applyed \`clarity\`.;;;;;yes]`
})

bot.awaitedCommand({
 name: "filter-deep",
 code: `$setServerVar[filters;Deep]
$let[filter;$setFilter[{"atempo": "1.15", "asetrate": "48000*0.8"}]]
$interactionReply[Applyed \`deep\`.;;;;;yes]`
})

bot.awaitedCommand({
 name: "filter-echo",
 code: `$setServerVar[filters;Echo]
$let[filter;$setFilter[{"aecho": "1.0:0.5:30:0.9"}]]
$interactionReply[Applyed \`echo\`.;;;;;yes]`
})

bot.awaitedCommand({
 name: "filter-flanger",
 code: `$setServerVar[filters;Flanger]
$let[filter;$setFilter[{"flanger": "1"}]]
$interactionReply[Applyed \`flanger\`.;;;;;yes]`
})

bot.awaitedCommand({
 name: "filter-gate",
 code: `$setServerVar[filters;Gate]
$let[filter;$setFilter[{"agate": "1"}]]
$interactionReply[Applyed \`gate\`.;;;;;yes]`
})

bot.awaitedCommand({
 name: "filter-haas",
 code: `$setServerVar[filters;Haas]
$let[filter;$setFilter[{"haas": "1"}]]
$interactionReply[Applyed \`haas\`.;;;;;yes]`
})

bot.awaitedCommand({
 name: "filter-nightcore",
 code: `$setServerVar[filters;Nightcore]
$let[filter;$setFilter[{"atempo": "0.720", "asetrate": "48000*1.3"}]]
$interactionReply[Applyed \`nightcore\`.;;;;;yes]`
})

bot.awaitedCommand({
 name: "filter-phaser",
 code: `$setServerVar[filters;Phaser]
$let[filter;$setFilter[{"aphaser": "1"}]]
$interactionReply[Applyed \`phaser\`.;;;;;yes]`
})

bot.awaitedCommand({
 name: "filter-phone",
 code: `$setServerVar[filters;Phone]
$let[filter;$setFilter[{"aresample": "8000"}]]
$interactionReply[Applyed \`phone\`.;;;;;yes]`
})

bot.awaitedCommand({
 name: "filter-remove",
 code: `$setServerVar[filters;$getVar[filters]]
$let[filter;$resetFilters]
$interactionReply[Reseted filters.;;;;;yes]`
})

bot.awaitedCommand({
 name: "filter-reverb",
 code: `$setServerVar[filters;Reverb]
$let[filter;$setFilter[{"aecho": "1.0:0.8:5:0.5"}]]
$interactionReply[Applyed \`reverb\`.;;;;;yes]`
})

bot.awaitedCommand({
 name: "filter-subboost",
 code: `$setServerVar[filters;Subboost]
$let[filter;$setFilter[{"asubboost": "0.75"}]]
$interactionReply[Applyed \`subboost\`.;;;;;yes]`
})

bot.awaitedCommand({
 name: "filter-tremolo",
 code: `$setServerVar[filters;Tremolo]
$let[filter;$setFilter[{"tremolo": "2"}]]
$interactionReply[Applyed \`tremolo\`.;;;;;yes]`
})

bot.awaitedCommand({
 name: "filter-vaporwave",
 code: `$setServerVar[filters;Vaporwave]
$let[filter;$setFilter[{"asetrate": "48000*0.8"}]]
$interactionReply[Applyed \`vaporwave\`.;;;;;yes]`
})

bot.awaitedCommand({
 name: "filter-vibrato",
 code: `$setServerVar[filters;Vibrato]
$let[filter;$setFilter[{"vibrato": "4"}]]
$interactionReply[Applyed \`vibrato\`.;;;;;yes]`
})

bot.command({
 name: "queue",
 aliases: ["q"],
 $if: "v4",
 code: `$if[$isNumber[$message[1]]==false]
$reply[$messageID;no]
$author[1;Queue;$getVar[customemoji1]]
$description[2;**($numberSeparator[$queueLength]) Queue | Page 1-$replaceText[$replaceText[$checkCondition[$truncate[$sum[$divide[$queueLength;5];0.4]]==0];true;1];false;$truncate[$sum[$divide[$queueLength;5];0.4]]]**
$queue[1;5;\`{position} |\` **[{title}]({url})**]]
$color[2;$getVar[color]]
$thumbnail[1;$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;2048]]]
$thumbnail[2;$getVar[customemoji1]]
$addField[1;Duration;\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$songInfo[duration];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;0];true;$findNumbers[$songInfo[duration]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`;yes]
$addField[1;Now Playing;[$songInfo[title]]($songInfo[url] "$advancedTextSplit[$songInfo[title]; ;1] | $replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;YouTube];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;SoundCloud];false;Audio]]");yes]
$color[1;$getVar[color]]
$addTimestamp[2;$dateStamp]
$else
$reply[$messageID;no]
$author[1;Queue;$getVar[customemoji1]]
$description[2;**($numberSeparator[$queueLength]) Queue | Page $filterMessage[$message[1];-]-$replaceText[$replaceText[$checkCondition[$truncate[$sum[$divide[$queueLength;5];0.4]]==0];true;1];false;$truncate[$sum[$divide[$queueLength;5];0.4]]**
$queue[$filterMessage[$message[1];-];5;\`{position} |\` **[{title}]({url})**]]
$color[2;$getVar[color]]
$thumbnail[1;$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;2048]]]
$thumbnail[2;$getVar[customemoji1]]
$addField[1;Duration;\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$songInfo[duration];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;0];true;$findNumbers[$songInfo[duration]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`;yes]
$addField[1;Now Playing;[$songInfo[title]]($songInfo[url] "$songInfo[title]");yes]
$color[1;$getVar[color]]
$addTimestamp[2;$dateStamp]
$onlyIf[$filterMessage[$message[1];-]!=0;]
$onlyIf[$filterMessage[$message[1];-]<=$replaceText[$replaceText[$checkCondition[$truncate[$sum[$divide[$queueLength;5];0.4]]==0];true;1];false;$truncate[$sum[$divide[$queueLength;5];0.4]]];]
$onlyIf[$findSpecialChars[$message[1]]==;]
$endif
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})

bot.command({
 name: "seek",
 aliases: ["seekto"],
 $if: "v4",
 code: `$reply[$messageID;no]
$if[$checkContains[$noMentionMessage[1];:]==true]
$if[$advancedTextSplit[$noMentionMessage[1];:;3]==]
$if[$getServerVar[filters]!=none]
$setServerVar[filters;$getVar[filters]]
$let[filter;$resetFilters]
$sendMessage[{newEmbed:{description:Due ffmpeg not stable, filter will remove before seek music.} {color:$getVar[color]} {timestamp} {delete:3s}};no]
$endif
$seekTo[$multi[$filterMessage[$get[number];-];$getVar[multiseek]]]
$description[1;Seek to \`$djsEval[new Date($multi[$filterMessage[$get[number];-];1000]).toISOString().substr(11, 8);yes]\`]
$color[1;$getVar[color]]
$onlyIf[$checkCondition[$multi[$get[number];1000]>=$songInfo[duration]]!=true;You cant seek more \`$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;0];true;$findNumbers[$songInfo[duration]]]).toISOString().substr(11, 8);yes]\`]
$let[number;$sum[$multi[$advancedTextSplit[$noMentionMessage[1];:;1];60];$advancedTextSplit[$noMentionMessage[1];:;2]]]
$onlyIf[$filterMessage[$advancedTextSplit[$noMentionMessage[1];:;2];-]<=59;Max. 59 at \`:$advancedTextSplit[$noMentionMessage[1];:;2]\`]
$onlyIf[$filterMessage[$advancedTextSplit[$noMentionMessage[1];:;1];-]<=59;Max. 59 at \`$advancedTextSplit[$noMentionMessage[1];:;1]:\`]
$onlyIf[$isNumber[$advancedTextSplit[$noMentionMessage[1];:;2]]!=false;Must number]
$onlyIf[$isNumber[$advancedTextSplit[$noMentionMessage[1];:;1]]!=false;Must number]
$else
$if[$getServerVar[filters]!=none]
$setServerVar[filters;$getVar[filters]]
$let[filter;$resetFilters]
$sendMessage[{newEmbed:{description:Due ffmpeg not stable, filter will remove before seek music.} {color:$getVar[color]} {timestamp} {delete:3s}};no]
$endif
$seekTo[$multi[$filterMessage[$get[number];-];$getVar[multiseek]]]
$description[1;Seek to \`$djsEval[new Date($multi[$filterMessage[$get[number];-];1000]).toISOString().substr(11, 8);yes]\`]
$color[1;$getVar[color]]
$onlyIf[$checkCondition[$multi[$get[number];1000]>=$songInfo[duration]]!=true;You cant seek more \`$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;0];true;$findNumbers[$songInfo[duration]]]).toISOString().substr(11, 8);yes]\`]
$let[number;$sum[$multi[$advancedTextSplit[$noMentionMessage[1];:;1];3600];$multi[$advancedTextSplit[$noMentionMessage[1];:;2];60];$advancedTextSplit[$noMentionMessage[1];:;2]]]
$onlyIf[$filterMessage[$advancedTextSplit[$noMentionMessage[1];:;3];-]<=59;Max. 59 at \`:$advancedTextSplit[$noMentionMessage[1];:;3]\`]
$onlyIf[$filterMessage[$advancedTextSplit[$noMentionMessage[1];:;2];-]<=59;Max. 59 at \`:$advancedTextSplit[$noMentionMessage[1];:;2]:\`]
$onlyIf[$filterMessage[$advancedTextSplit[$noMentionMessage[1];:;1];-]<=23;Max. 23 at \`$advancedTextSplit[$noMentionMessage[1];:;1]:\`]
$onlyIf[$isNumber[$advancedTextSplit[$noMentionMessage[1];:;3]]!=false;Must number]
$onlyIf[$isNumber[$advancedTextSplit[$noMentionMessage[1];:;2]]!=false;Must number]
$onlyIf[$isNumber[$advancedTextSplit[$noMentionMessage[1];:;1]]!=false;Must number]
$endif
$else
$seekTo[$multi[$filterMessage[$noMentionMessage[1];-];$getVar[multiseek]]]
$if[$getServerVar[filters]!=none]
$setServerVar[filters;$getVar[filters]]
$let[filter;$resetFilters]
$sendMessage[{newEmbed:{description:Due ffmpeg not stable, filter will remove before seek music.} {color:$getVar[color]} {timestamp} {delete:3s}};no]
$endif
$description[1;Seek to \`$djsEval[new Date($multi[$filterMessage[$noMentionMessage[1];-];1000]).toISOString().substr(11, 8);yes]\`]
$color[1;$getVar[color]]
$onlyIf[$checkCondition[$multi[$noMentionMessage[1];1000]>=$songInfo[duration]]!=true;You cant seek more \`$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;0];true;$findNumbers[$songInfo[duration]]]).toISOString().substr(11, 8);yes]\`]
$onlyIf[$isNumber[$noMentionMessage[1]]!=false;Must number]
$endif
$onlyIf[$noMentionMessage[1]!=;Put number to seek song]
$onlyIf[$songInfo[duration]!=0;This song was \`LIVE\`]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})

bot.command({
 name: "nowplaying",
 aliases: ["np", "now"],
 code: `$reply[$messageID;no]
$author[1;Now Playing;$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;$getVar[ytemoji]];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;$getVar[scemoji]];false;$getVar[customemoji1]]]]
$title[1;$songInfo[title];$songInfo[url]]
$thumbnail[1;$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;2048]]]
$addField[1;Filters;\`$getServerVar[filters]\`;no]
$addField[1;URL;[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;YouTube];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;SoundCloud];false;Audio]]]($songInfo[url] "$songInfo[url]") [- Thumbnail]($replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;2048]] "$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;2048]]");yes]
$addField[1;24/7;$replaceText[$replaceText[$getGlobalUserVar[247];0;\`❌\`];1;\`✅\`];yes]
$addField[1;Loop;\`$replaceText[$replaceText[$checkCondition[$loopStatus==none];true;off];false;on - $loopStatus]\`;yes]
$addField[1;Volume;\`$volume%\`;yes]
$addField[1;Song;\`$numberSeparator[$queueLength]\`;yes]
$addField[1;Duration Left;\`$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0];true;LIVE];false;$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$sub[$songInfo[duration];$getCurrentDuration];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;0];true;$sub[$songInfo[duration];$getCurrentDuration]]).toISOString().substr(11, 8);yes]]]\`;yes]
$addField[1;Duration Now;\`$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0];true;LIVE];false;$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$getCurrentDuration;4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;0];true;$getCurrentDuration]).toISOString().substr(11, 8);yes]]]\`;yes]
$addField[1;Duration;\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$songInfo[duration];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;0];true;$findNumbers[$songInfo[duration]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`;yes]
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
 name: "ping",
 code: `$reply[$messageID;no]
$editMessage[$get[id];{newEmbed:{color:$getVar[color]} {timestamp} {footer:$userTag} {field:Websocket Ping:\`$numberSeparator[$get[ping]]ms\`:yes} {field:API Ping:\`$numberSeparator[$get[messageping]]ms\`:yes} {field:Database Ping:\`$numberSeparator[$get[dbping]]ms\`:yes} {field:Voice Ping:\`$numberSeparator[$get[voiceping]]ms\`:yes} {field:Shard Ping:\`$numberSeparator[$get[shardping]]ms\`:yes} {field:Message Ping:\`$numberSeparator[$sub[$dateStamp;$get[secondping]]]ms\`:no}}]
$let[id;$sendMessage[{newEmbed:{color:$getVar[color]} {timestamp} {footer:$userTag} {field:Websocket Ping:\`Checking\`:yes} {field:API Ping:\`Checking\`:yes} {field:Database Ping:\`Checking\`:yes} {field:Voice Ping:\`Checking\`:yes} {field:Shard Ping:\`Checking\`:yes} {field:Message Ping:\`Checking\`:no}};yes]]
$let[secondping;$dateStamp]
$let[shardping;$shardPing]
$let[ping;$ping]
$if[$voiceID[$clientID]==]
$let[voiceping;0]
$else
$let[voiceping;$voicePing]
$endif
$let[dbping;$dbPing]
$let[messageping;$messagePing]`
})

bot.command({
 name: "stats",
 code: `$reply[$messageID;no]
$color[1;$getVar[color]]
$addField[1;Size Database;> $cropText[$fileSize[$getVar[database];kb];5]KB;yes]
$addField[1;Size Code;> $cropText[$fileSize[$getVar[file];kb];5]KB;yes]
$addField[1;Command;> $numberSeparator[$commandsCount];yes]
$addField[1;Server;> $numberSeparator[$serverCount];yes]
$addField[1;Members;> $numberSeparator[$allMembersCount];yes]
$addField[1;RAM Left;> $cropText[$divide[$sub[$maxRam;$ram];1024];4]GB;yes]
$addField[1;RAM;> $cropText[$divide[$ram;1024];4]GB;yes]
$addField[1;CPU;> $cropText[$cpu;5]%;yes]
$addField[1;API Ping;> $numberSeparator[$messagePing]ms;yes]
$addField[1;DB Ping;> $numberSeparator[$dbPing]ms;yes]
$addField[1;WS Ping;> $numberSeparator[$ping]ms;yes]
$addField[1;Platform;> $djsEval[require ('os').platform();yes] | $djsEval[require ('os').arch;yes];yes]
$addField[1;Last Online;> <t:$cropText[$readyTimestamp;10]:R>;yes]
$addField[1;Uptime;> $uptime;yes]
$footer[1;Ver. $packageVersion ($nodeVersion);$userAvatar[$authorID;512]]
$thumbnail[1;$userAvatar[$clientID]]
$addTimestamp[1;$dateStamp]
$let[cache;$cacheMembers[$guildID]]
$suppressErrors`
})

bot.command({
 name: "check",
 code: `$reply[$messageID;no]
$title[1;Check]
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
Log Music      : $replaceText[$replaceText[$checkContains[$getServerVar[logmusic];1];true;✅];false;❌]
24/7           : $replaceText[$replaceText[$getGlobalUserVar[247];1;✅];0;❌]

Max Volume     : $getServerVar[maxvol]%
User Volume    : $getGlobalUserVar[vol]%

1) Emoji       : $replaceText[$replaceText[$checkCondition[$getVar[customemoji1]!=];true;✅];false;❌]
2) Emoji       : $replaceText[$replaceText[$checkCondition[$getVar[ytemoji]!=];true;✅];false;❌]
3) Emoji       : $replaceText[$replaceText[$checkCondition[$getVar[scemoji]!=];true;✅];false;❌]
4) Emoji       : $replaceText[$replaceText[$checkCondition[$getVar[loademoji]!=];true;✅];false;❌]
5) Emoji       : $replaceText[$replaceText[$checkCondition[$getVar[customemoji2]!=];true;✅];false;❌]

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

YouTube        : $replaceText[$replaceText[$get[yt];true;✅];false;❌] ($sub[$dateStamp;$get[time1]]ms)
SoundCloud     : $replaceText[$replaceText[$get[sc];true;✅];false;❌] ($sub[$dateStamp;$get[time2]]ms)
Spotify        : $replaceText[$replaceText[$get[st];true;✅];false;❌] ($sub[$dateStamp;$get[time3]]ms) 
\`\`\`] 
$color[1;$getVar[color]]
$addTimestamp[1]
$let[yt;$isValidLink[https://youtube.com/]]
$let[time3;$dateStamp]
$let[sc;$isValidLink[https://soundcloud.com/]]
$let[time2;$dateStamp]
$let[st;$isValidLink[https://spotify.com/]]
$let[time1;$dateStamp]
$footer[1;Color: $getVar[color]
Latency: $numberSeparator[$messagePing]ms]`
})

bot.command({
 name: "help",
 aliases: ["command", "commands"],
 code: `$reply[$messageID;no]
$thumbnail[1;$userAvatar[$clientID;2048]]
$addField[1;Guide;\`YouTube/SoundCloud/Spotify\`
> <prefix>play <name/url> | All
> <prefix>play (sc) <name> | SoundCloud
\`URL\`
> <prefix>play <url-music>;no]
$addField[1;Music;\`24/7, play, pause, resume, nowplaying, previous, skip, shuffle, loop, seek, volume, volume-max, stop, filter, queue, join, disconnect\`;no]
$addField[1;Basic;\`check, stats, uptime, invite, ping, log, listen-info\`;no]
$color[1;$getVar[color]]
$addTimestamp[1;$dateStamp]`
})

bot.command({
 name: "volume",
 aliases: ["vol", "v"],
 $if: "v4",
 code: `$reply[$messageID;no]
$color[1;$getVar[color]]
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

bot.command({
 name: "volume-max",
 aliases: ["vol-max", "v-max"],
 $if: "v4",
 code: `$reply[$messageID;no]
$color[1;$getVar[color]]
$addField[1;Requested/Changed By;$replaceText[$replaceText[$checkCondition[$songInfo[user.id]==$authorID];true;<@$songInfo[user.id]>];false;<@$authorID> (Requested)\n<@$songInfo[user.id]> (Changed)];yes]
$addField[1;Max Volume;\`$getServerVar[maxvol]%\`;yes]
$addField[1;Volume;\`$volume%\`;yes]
$addTimestamp[1;$dateStamp]
$
$setServerVar[maxvol;$truncate[$noMentionMessage[1]]]
$onlyIf[$noMentionMessage[1]<=1000;Max. **1000%**]
$onlyIf[$noMentionMessage[1]>=10;Min. **10%**]
$onlyIf[$isNumber[$noMentionMessage[1]]!=false;Must number]
$onlyIf[$noMentionMessage[1]!=;Put the number]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})

bot.command({
 name: "join",
 aliases: ["j"],
 $if: "v4",
 code: `$reply[$messageID;no]
$if[$voiceID[$clientID]==]
$joinVC
$replaceText[$getVar[join];{join};<#$voiceID>]
$elseif[$voiceID[$clientID]!=]
$joinVC
$replaceText[$getVar[join];{join};<#$voiceID>]
$leaveVC
$endelseif
$endif
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$onlyBotPerms[speak;Missing Permission, **Speak** - Bot]
$onlyBotPerms[connect;Missing Permission, **Connect** - Bot]`
})

bot.command({
 name: "disconnect",
 $if: "v4",
 aliases: ["dc"],
 code: `$reply[$messageID;no]
$if[$voiceID[$clientID]!=]
$getVar[dc]
$leaveVC
$else
Already disconnect!
$endif
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})

bot.command({
 name: "pause",
 code: `$reply[$messageID;no]
$description[1;$getVar[pause]]
$color[1;$getVar[color]]
$addTimestamp[1]
$pauseTrack
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})

bot.command({
 name: "resume",
 code: `$reply[$messageID;no]
$description[1;$getVar[resume]]
$color[1;$getVar[color]]
$addTimestamp[1]
$resumeTrack
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})

bot.command({
 name: "24/7",
 aliases: ["247", "24-7"],
 $if: "v4",
 code: `$if[$getGlobalUserVar[247]==0]
$if[$queueLength!=0]
$playerConfig[no;0s;yes]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;]
$endif
Enabled 24/7.
$setGlobalUserVar[247;1]
$else
$if[$queueLength!=0]
$playerConfig[yes;0s;yes]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;]
$endif
Disabled 24/7.
$setGlobalUserVar[247;0]
$endif`
})

bot.command({
 name: "shuffle",
 aliases: ["sf"],
 code: `$author[1;$getVar[shuffle];$getVar[customemoji1]]
$addField[1;Requested By;<@$authorID>;yes]
$description[1;**Queue - $numberSeparator[$queueLength] Song**
$queue[1;5;\`{position} |\` **[{title}]({url})**]
$color[1;$getVar[color]]
$addTimestamp[1]
$thumbnail[1;$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;2048]]]
$shuffleQueue
$onlyIf[$queueLength!=1;$replaceText[$getVar[errorloop];{amount};$queueLength]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
})

bot.command({
 name: "log",
 aliases: ["logmusic", "log-music"],
 $if: "v4",
 code: `$reply[$messageID;no]
$if[$getServerVar[logmusic]==0]
$setServerVar[logmusic;1]
Enabled.
$else
$setServerVar[logmusic;0]
Disabled.
$endif
$onlyPerms[manageserver;Missing Permission, **Manage Server** - User]`
})
