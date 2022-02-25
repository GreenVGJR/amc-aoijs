module.exports = [{
 name: "play",
 $if: "v4",
 code: `$if[$queueLength<1]
$deleteMessage[$get[id]]
$editMessage[$get[id];{newEmbed:{title:Started Playing} {description:$replaceText[$get[message];Added;;1]} {color:$getVar[color]}}]
$volume[$getGlobalUserVar[vol;$songInfo[user.id]]]
$else
$editMessage[$get[id];{newEmbed:{title:Added to queue} {description:$replaceText[$get[message];Added;;1]} {color:$getVar[color]}}]
$wait[2s]
$editMessage[$get[id];{newEmbed:{field:Queue:$queue[1;5]:no} {timestamp} {color:$getVar[color]}} {newEmbed:{title:Added to queue} {description:$replaceText[$get[message];Added;;1]} {color:$getVar[color]}}]
$endif
$playerConfig[yes;0s]
$if[$checkContains[$message[1];youtu.be;m.youtube;youtube.com]==true]
$let[message;$playTrack[youtube;$message]]
$elseIf[$checkContains[$message[1];soundcloud.com;app.goo.gl]==true]
$onlyIf[$get[message]!=Added 0;Track not found]
$let[message;$playTrack[soundcloud;$message]]
$endelseif
$elseIf[$checkContains[$message[1];open.spotify.com/track]==true]
$let[message;$playTrack[youtube;$advancedTextSplit[$get[url];data: ';2;"og:description" content=";2; ·;1] - $advancedTextSplit[$get[url];data: ';2;"og:title" content=";2;";1]]]
$let[url;$djsEval[require('axios').get('$message[1]');yes]]
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
$joinVc[$voiceID;no;yes;yes]
$endif
$let[id;$sendMessage[{newEmbed:{author:Processing:$getVar[loademoji]} {color:$getVar[color]}};yes]]
$onlyIf[$message[1]!=;What song you want search]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$onlyBotPerms[speak;Missing Permission, **Speak** - Bot]
$onlyBotPerms[connect;Missing Permission, **Connect** - Bot]`
},
 {
 name: "stop",
 code: `$reply[$messageID;no]
$getVar[stop]
$leaveVC
$stop
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
},
 {
 name: "skip",
 aliases: ["s"],
 $if: "v4",
 code: `$reply[$messageID;no]
$if[$isNumber[$message[1]]==false]
$title[1;$getVar[skip]]
$addField[1;Duration;\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$songInfo[duration;1];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url;1];youtube.com;soundcloud.com];false;0];true;$findNumbers[$songInfo[duration;1]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`;yes]
$addField[1;Now Playing;[$songInfo[title;1]]($songInfo[url;1]);yes]
$addTimestamp[1;$dateStamp]
$color[1;$getVar[color]]
$thumbnail[1;$replaceText[$songInfo[thumbnail;1];undefined;$userAvatar[$clientID]]]
$skip
$else
$title[1;$getVar[skip]]
$addField[1;Duration;\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$songInfo[duration;$message[1]];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url;$message[1]];youtube.com;soundcloud.com];false;0];true;$findNumbers[$songInfo[duration;$message[1]]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`;yes]
$addField[1;Now Playing;[$songInfo[title;$message[1]]]($songInfo[url;$message[1]]);yes]
$addTimestamp[1;$dateStamp]
$color[1;$getVar[color]]
$thumbnail[1;$replaceText[$songInfo[thumbnail;$message[1]];undefined;$userAvatar[$clientID]]]
$skipTo[$message[1]]
$onlyIf[$message[1]<=$queueLength;You cant skip $message[1] song. Only $queueLength]
$endif
$onlyIf[$queueLength!=1;$replaceText[$getVar[errorloop];{amount};$queueLength]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
},
 {
 name: "loop",
 aliases: ["l"],
 $if: "v4",
 code: `$reply[$messageID;no]
$if[$checkContains[$toLowercase[$message[1]];song;track;music]==true]
$loopMode[song]
Loop mode \`song\`
$endif
$if[$checkContains[$toLowercase[$message[1]];queue]==true]
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
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
},
 {
 name: "filter",
 $if: "v4",
 code: `$if[$message[1]==]
$reply[$messageID;no]
$addField[1;Filter;\`bassonly, deep, nightcore, phaser, phone, tempo, pitch, remove, vibrato\`;yes]
$addTimestamp[1;$dateStamp]
$footer[1;filter <filter> (value optional)]
$color[1;$getVar[color]]
$elseIf[$toLowercase[$message[1]]==nightcore]
$seekTo[$get[cduration]]
$let[filter;$setFilter[{"atempo": "0.720", "asetrate": "48000*1.3"}]]
$sendMessage[Applyed \`nightcore\`.;no]
$endelseif
$elseIf[$checkContains[$toLowercase[$message[1]];remove;clear;reset]==true]
$seekTo[$get[cduration]]
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
$seekTo[$get[cduration]]
$let[filter;$setFilter[{"atempo": "1.15", "asetrate": "48000*0.8"}]]
$sendMessage[Applyed \`deep\`.;no]
$endelseif
$elseIf[$toLowercase[$message[1]]==bassonly]
$seekTo[$get[cduration]]
$let[filter;$setFilter[{"aresample": "1000"}]]
$sendMessage[Applyed \`bassonly\`.;no]
$endelseif
$elseIf[$toLowercase[$message[1]]==phone]
$seekTo[$get[cduration]]
$let[filter;$setFilter[{"aresample": "8000"}]]
$sendMessage[Applyed \`phone\`.;no]
$endelseif
$elseIf[$toLowercase[$message[1]]==vibrato]
$seekTo[$get[cduration]]
$let[filter;$setFilter[{"vibrato": "4"}]]
$sendMessage[Applyed \`vibrato\`.;no]
$endelseif
$elseIf[$toLowercase[$message[1]]==phaser]
$seekTo[$get[cduration]]
$let[filter;$setFilter[{"aphaser": "1"}]]
$sendMessage[Applyed \`phaser\`.;no]
$endelseif
$endif
$if[$queueLength!=0]
$let[cduration;$getCurrentDuration]
$endif
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
},
 {
 name: "queue",
 aliases: ["queue"],
 $if: "v4",
 code: `$if[$isNumber[$message[1]]==false]
$reply[$messageID;no]
$author[1;Queue;$getVar[customemoji1]]
$addField[2;($numberSeparator[$queueLength]) Queue | Page 1-$replaceText[$replaceText[$checkCondition[$truncate[$sum[$divide[$queueLength;5];0.4]]==0];true;1];false;$truncate[$sum[$divide[$queueLength;5];0.4]]];$queue[1;5;\`{position} |\` **[{title}]({url})**];no]
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
$addField[2;($numberSeparator[$queueLength]) Queue | Page $filterMessage[$message[1];-]-$replaceText[$replaceText[$checkCondition[$truncate[$sum[$divide[$queueLength;5];0.4]]==0];true;1];false;$truncate[$sum[$divide[$queueLength;5];0.4]]];$queue[$filterMessage[$message[1];-];5;\`{position} |\` **[{title}]({url})**];no]
$color[2;$getVar[color]]
$thumbnail[1;$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;2048]]]
$thumbnail[2;$getVar[customemoji1]]
$addField[1;Duration;\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$songInfo[duration];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;0];true;$findNumbers[$songInfo[duration]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`;yes]
$addField[1;Now Playing;[$songInfo[title]]($songInfo[url] "$songInfo[title]");yes]
$color[1;$getVar[color]]
$addTimestamp[2;$dateStamp]
$onlyIf[$filterMessage[$message[1];-]<=$replaceText[$replaceText[$checkCondition[$truncate[$sum[$divide[$queueLength;5];0.4]]==0];true;1];false;$truncate[$sum[$divide[$queueLength;5];0.4]]];]
$onlyIf[$findSpecialChars[$message[1]]==;]
$endif
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
`
},
 {
 name: "seek",
 aliases: ["seekto"],
 code: `$reply[$messageID;no]
$seekTo[$multi[$filterMessage[$noMentionMessage[1];-];1000]]
$description[1;Seek to \`$djsEval[new Date($multi[$filterMessage[$noMentionMessage[1];-];1000]).toISOString().substr(11, 8);yes]\`]
$color[1;$getVar[color]]
$onlyIf[$checkCondition[$multi[$noMentionMessage[1];1000]>=$songInfo[duration]]!=true;You cant seek more \`$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;0];true;$findNumbers[$songInfo[duration]]]).toISOString().substr(11, 8);yes]\`]
$onlyIf[$isNumber[$noMentionMessage[1]]!=false;Must number]
$onlyIf[$noMentionMessage[1]!=;Put number to seek song]
$onlyIf[$songInfo[duration]!=0;This song was \`LIVE\`]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
},
 {
 name: "nowplaying",
 aliases: ["np", "now"],
 code: `$reply[$messageID;no]
$author[1;Now Playing;$getVar[customemoji1]]
$title[1;$songInfo[title];$songInfo[url]]
$thumbnail[1;$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;2048]]]
$addField[1;Volume;\`$volume%\`;yes]
$addField[1;URL;[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;YouTube];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;SoundCloud];false;Audio]]]($songInfo[url]);yes]
$addField[1;Song;\`$numberSeparator[$queueLength]\`;yes]
$addField[1;Duration Left;\`$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0];true;LIVE];false;$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$sub[$songInfo[duration];$getCurrentDuration];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;0];true;$sub[$songInfo[duration];$getCurrentDuration]]).toISOString().substr(11, 8);yes]]]\`;yes]
$addField[1;Duration Now;\`$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0];true;LIVE];false;$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$getCurrentDuration;4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;0];true;$getCurrentDuration]).toISOString().substr(11, 8);yes]]]\`;yes]
$addField[1;Duration;\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$songInfo[duration];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;0];true;$findNumbers[$songInfo[duration]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`;yes]
$addField[1;Requested By;<@$songInfo[user.id]>;no]
$addTimestamp[1;$dateStamp]
$color[1;$getVar[color]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
`
},
 {
 name: "invite",
 code: `$reply[$messageID;no]
$getBotInvite&permissions=$getVar[permission]`
},
 {
 name: "uptime",
 code: `$reply[$messageID;no]
\`$uptime\``
},
 {
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
$addField[1;CPU;> $truncate[$cpu]%;yes]
$addField[1;Is Stable;> $checkCondition[$botPing<1000];yes]
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
},
 {
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
$let[yt;$isValidLink[https://youtube.com/]]
`
},
 {
 name: "help",
 code: `$reply[$messageID;no]
$addField[1;Guide;\`YouTube/SoundCloud/Spotify\`
> <prefix>play <name/url>
> <prefix>play (sc) <name>
\`URL\`
> <prefix>play <url-music>;no]
$addField[1;Music;\`play, nowplaying, skip, loop, seek, volume, stop, filter, queue, join, disconnect\`;no]
$addField[1;Basic;\`check, stats, uptime, invite\`;no]
$color[1;$getVar[color]]
$addTimestamp[1;$dateStamp]`
},
 {
 name: "volume",
 aliases: ["vol"],
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
},
 {
 name: "join",
 aliases: ["j"],
 $if: "v4",
 code: `$reply[$messageID;no]
$if[$voiceID[$clientID]==]
$joinVC
$sendMessage[$replaceText[$getVar[join];{join};<#$voiceID>];no]
$elseif[$voiceID[$clientID]!=]
$joinVC
$leaveVC
$sendMessage[$replaceText[$getVar[join];{join};<#$voiceID>];no]
$endelseif
$endif
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
},
 {
 name: "disconnect",
 $if: "v4",
 aliases: ["dc"],
 code: `$reply[$messageID;no]
$if[$voiceID[$clientID]!=]
$leaveVC
$sendMessage[$getVar[dc];no]
$else
Already disconnect!
$endif
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
}]
