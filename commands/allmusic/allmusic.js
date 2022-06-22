module.exports = [{
 name: "play",
 $if: "v4",
 code: `$if[$checkContains[$message[1];soundcloud.com/discover/sets/;youtube.com/playlist?list=;open.spotify.com/playlist]==true]
$deleteMessage[$get[id]]
$sendMessage[{newEmbed:{author:Added to queue:$getVar[customemoji1]} {footer:$queueLength Song} {description:\`$replaceText[$get[message];Added ;;1]\` Song from Playlist.} {color:$getVar[color]}};no]
$else
$deleteMessage[$get[id]]
$onlyIf[$queueLength==1;]
$editMessage[$get[id];{newEmbed:{author:$replaceText[$replaceText[$checkCondition[$queueLength==1];true;Started Playing];false;Added to Queue]:$getVar[customemoji1]} {footer:$replaceText[$replaceText[$checkCondition[$queueLength==1];true;];false;$queueLength Song]} {description:\`$replaceText[$get[message];Added ;;1]\`} {color:$getVar[color]}}]
$endif
$onlyIf[$hasPlayer!=false;]
$onlyIf[$checkCondition[$get[message]==Added 0]==false;Track not found]
$if[$checkContains[$message[1];youtu.be;m.youtube;youtube.com]==true]
$let[message;$playTrack[youtube;$message]]
$elseIf[$checkContains[$message[1];soundcloud.com;app.goo.gl]==true]
$let[message;$playTrack[soundcloud;$message]]
$endelseif
$elseIf[$checkContains[$message[1];open.spotify.com/track]==true]
$if[$toLowercase[$getVar[defaultspotify]]==youtube]
$let[message;$playTrack[youtube;$advancedTextSplit[$get[url];data: ';2;"og:description" content=";2; ·;1] - $advancedTextSplit[$get[url];data: ';2;"og:title" content=";2;";1]]]
$editMessage[$get[id];{newEmbed:{author:Searching:$getVar[loademoji]} {footer:Converting to YouTube} {color:$getVar[color]}}]
$let[url;$djsEval[require('axios').get('$message[1]');yes]]
$elseif[$toLowercase[$getVar[defaultspotify]]==soundcloud]
$let[message;$playTrack[soundcloud;$advancedTextSplit[$get[url];data: ';2;"og:description" content=";2; ·;1] - $advancedTextSplit[$get[url];data: ';2;"og:title" content=";2;";1]]]
$editMessage[$get[id];{newEmbed:{author:Searching:$getVar[loademoji]} {footer:Converting to SoundCloud} {color:$getVar[color]}}]
$endelseif
$endif
$endelseif
$elseIf[$checkContains[$message[1];open.spotify.com/playlist]==true]
$let[message;$playTrack[spotify;$message[1]]]
$endelseif
$else
$if[$replaceText[$replaceText[$checkContains[$message[1];youtu.be;m.youtube;youtube.com;soundcloud.com;app.goo.gl;soundcloud.com/discover/sets/;youtube.com/playlist?list=;open.spotify.com/playlist;open.spotify.com/track];true;];false;$isValidLink[$message[1]]]==true]
$let[message;$playTrack[url;$message]]
$else
$if[$checkContains[$toLowercase[$message];(sc)]==true]
$let[message;$playTrack[soundcloud;$message]]
$elseif[$checkContains[$toLowercase[$message];(st)]==true]
$let[message;$playTrack[spotify;$advancedTextSplit[$message;(st);2]]]
$onlyIf[$isValidLink[$advancedTextSplit[$message;(st);2]]!=false;URL not valid]
$onlyIf[$checkContains[$advancedTextSplit[$message;(st);2];open.spotify.com/track;open.spotify.com/playlist]!=false;URL not valid]
$endelseif
$else
$let[message;$playTrack[youtube;$message]]
$endif
$endif
$endif
$if[$checkContains[$message[1];soundcloud.com/discover/sets/;youtube.com/playlist?list=;open.spotify.com/playlist]==true]
$editMessage[$get[id];{newEmbed:{author:Adding to Queue:$getVar[customemoji2]} {footer:This can take long time.} {color:$getVar[color]}}]
$editMessage[$get[id];{newEmbed:{author:Searching:$getVar[loademoji]} {color:$getVar[color]}}]
$else
$editMessage[$get[id];{newEmbed:{author:Searching:$getVar[loademoji]} {color:$getVar[color]}}]
$endif
$onlyIf[$checkContains[$message[1];open.spotify.com/artist;open.spotify.com/album;open.spotify.com/episode]!=true;Not support]
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
 $if: "v4",
 code: `$reply[$messageID;no]
$getVar[stop]
$if[$getGlobalUserVar[247]==0]
$leaveVC
$endif
$stop
$resetPlayer
$onlyIf[$hasPlayer!=false;$getVar[errorqueue]]
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
$addField[1;Duration;\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url;1];youtube.com;soundcloud.com];false;$humanizeMS[$songInfo[duration;1];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url;1];youtube.com;soundcloud.com];false;0];true;$findNumbers[$songInfo[duration;1]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`;yes]
$addField[1;Now Playing;[$songInfo[title;1]]($songInfo[url;1]);yes]
$addTimestamp[1;$dateStamp]
$color[1;$getVar[color]]
$thumbnail[1;$replaceText[$songInfo[thumbnail;1];undefined;$userAvatar[$clientID]]]
$loopMode[$get[loop]]
$skip
$loopMode[none]
$let[loop;$loopStatus]
$else
$loopMode[$get[loop]]
$skipTo[$sub[$message[1];2]]
$loopMode[none]
$let[loop;$loopStatus]
$title[1;$getVar[skip]]
$addField[1;Duration;\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url;$sub[$message[1];1]];youtube.com;soundcloud.com];false;$humanizeMS[$songInfo[duration;$sub[$message[1];1]];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url;$sub[$message[1];1]];youtube.com;soundcloud.com];false;0];true;$findNumbers[$songInfo[duration;$sub[$message[1];1]]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`;yes]
$addField[1;Now Playing;[$songInfo[title;$sub[$message[1];1]]]($songInfo[url;$sub[$message[1];1]]);yes]
$addTimestamp[1;$dateStamp]
$color[1;$getVar[color]]
$thumbnail[1;$replaceText[$songInfo[thumbnail;$sub[$message[1];1]];undefined;$userAvatar[$clientID]]]
$onlyIf[$message[1]>0;You cant skip \`$message[1]\` song. Only \`$queueLength\`]
$onlyIf[$message[1]<=$queueLength;You cant skip \`$message[1]\` song. Only \`$queueLength\`]
$onlyIf[$findSpecialChars[$message[1]]==;]
$endif
$onlyIf[$queueLength!=1;$replaceText[$getVar[errorloop];{amount};$queueLength]]
$onlyIf[$hasPlayer!=false;$getVar[errorqueue]]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
},
 {
 name: "previous",
 aliases: ["pr", "back"],
 $if: "v4",
 code: `$deleteMessage[$get[id]]
$onlyIf[$queueLength==1;]
$editMessage[$get[id];{newEmbed:{author:$replaceText[$replaceText[$checkCondition[$queueLength==1];true;Started Playing];false;Added to Queue]:$getVar[customemoji1]} {footer:$replaceText[$replaceText[$checkCondition[$queueLength==1];true;];false;$queueLength Song]} {description:\`$replaceText[$get[message];Added ;;1]\`} {color:$getVar[color]}}]
$if[$checkContains[$getGlobalUserVar[cacheplay];youtube.com]==true]
$setGlobalUserVar[cacheplay;]
$let[message;$playTrack[youtube;$getGlobalUserVar[cacheplay]]]
$elseif[$checkContains[$getGlobalUserVar[cacheplay];soundcloud.com]==true]
$setGlobalUserVar[cacheplay;]
$onlyIf[$checkCondition[$get[message]==Added 0]==false;Track not found]
$let[message;$playTrack[soundcloud;$getGlobalUserVar[cacheplay]]]
$endelseif
$elseif[$checkContains[$getGlobalUserVar[cacheplay];open.spotify.com]==true]
$setGlobalUserVar[cacheplay;]
$let[message;$playTrack[spotify;$getGlobalUserVar[cacheplay]]]
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
},
 {
 name: "listen-info",
 aliases: ["track-info", "music-info", "song-info", "listen"],
 code: `$title[1;Listened]
$addField[1;Global;\`$numberSeparator[$getVar[listenglobal]]\`;yes]
$addField[1;Server;\`$numberSeparator[$getServerVar[listenserver]]\`;yes]
$addField[1;User;\`$numberSeparator[$getGlobalUserVar[listenuser]]\`;yes]
$addTimestamp[1]
$color[1;$getVar[color]]`
},
 {
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
$onlyIf[$hasPlayer!=false;$getVar[errorqueue]]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
},
 {
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
$addSelectMenu[1;filter;List Filters;1;1;no;Remove:Remove Filter Applyed:off:no;Bass-only:Apply Bass-only Filter:bassonly:no;Clarity:Apply Clarity Filter:clarity:no;Echo:Apply Echo Filter:echo:no;Flanger:Apply Flanger Filter:flanger:no;Deep:Apply Deep Filter:deep:no;Gate:Apply Gate Filter:gate:no;Haas:Apply Haas Filter:haas:no;Nightcore:Apply Nightcore Filter:nightcore:no;Phaser:Apply Phaser Filter:phaser:no;Phone:Apply Phone Filter:phone:no;Pulsator:Apply Pulsator Filter:pulsator:no;Reverb:Apply Reverb Filter:reverb:no;Tremolo:Apply Tremolo Filter:tremolo:no;Subboost:Apply Subboost Filter:subboost:no;Vaporwave:Apply Vaporwave Filter:vaporwave:no;Vibrato:Apply Vibrato Filter:vibrato:no]
$elseIf[$toLowercase[$message[1]]==nightcore]
$setServerVar[filters;Nightcore]
$let[filter;$setFilter[{"atempo": "0.720", "asetrate": "48000*1.3"}]]
$sendMessage[Applyed \`nightcore\`.;no]
$endelseif
$elseIf[$checkContains[$toLowercase[$message[1]];remove;clear;reset;off;0]==true]
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
$setServerVar[ratetime;0]
$onlyIf[$hasPlayer!=false;$getVar[errorqueue]]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
},
 {
 name: "filter",
 type: "interaction",
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
$setServerVar[ratetime;0]
$onlyIf[$checkCondition[$voiceID[$interactionData[author.id]]==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID[$interactionData[author.id]]];false;$voiceID[$clientID]]]==true;]
$onlyIf[$hasPlayer!=false;]
$onlyIf[$voiceID[$interactionData[author.id]]!=;]`
},
 {
 name: "queue",
 aliases: ["q"],
 $if: "v4",
 code: `$if[$isNumber[$message[1]]==false]
$reply[$messageID;no]
$author[1;Queue;$getVar[customemoji1]]
$description[2;**($numberSeparator[$queueLength]) Queue | Page 1-$replaceText[$replaceText[$checkCondition[$truncate[$sum[$divide[$queueLength;5];0.9]]==0];true;1];false;$truncate[$sum[$divide[$queueLength;5];0.9]]]**
$queue[1;5;\`{position} |\` **[{title}]({url})**]]
$color[2;$getVar[color]]
$thumbnail[1;$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;2048]]]
$thumbnail[2;$getVar[customemoji1]]
$addField[1;Duration;\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$songInfo[duration];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;0];true;$findNumbers[$songInfo[duration]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`;yes]
$addField[1;Now Playing;[$songInfo[title]]($songInfo[url] "$advancedTextSplit[$songInfo[title]; ;1] | $replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;YouTube];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;SoundCloud];false;Audio]]");yes]
$color[1;$getVar[color]]
$addTimestamp[2;$dateStamp]
$addButton[1;Next;2;nextqueue;$replaceText[$replaceText[$checkCondition[$truncate[$sum[$divide[$queueLength;5];0.9]]==1];true;yes];false;no];⏩]
$addButton[1;Close;1;closequeue;no;⏹]
$addButton[1;Back;2;previousqueue;yes;⏪]
$else
$reply[$messageID;no]
$author[1;Queue;$getVar[customemoji1]]
$description[2;**($numberSeparator[$queueLength]) Queue | Page $filterMessage[$message[1];-]-$replaceText[$replaceText[$checkCondition[$truncate[$sum[$divide[$queueLength;5];0.9]]==0];true;1];false;$truncate[$sum[$divide[$queueLength;5];0.9]]**
$queue[$filterMessage[$message[1];-];5;\`{position} |\` **[{title}]({url})**]]
$color[2;$getVar[color]]
$thumbnail[1;$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;2048]]]
$thumbnail[2;$getVar[customemoji1]]
$addField[1;Duration;\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$songInfo[duration];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;0];true;$findNumbers[$songInfo[duration]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`;yes]
$addField[1;Now Playing;[$songInfo[title]]($songInfo[url] "$songInfo[title]");yes]
$color[1;$getVar[color]]
$addTimestamp[2;$dateStamp]
$onlyIf[$filterMessage[$message[1];-]!=0;]
$onlyIf[$filterMessage[$message[1];-]<=$replaceText[$replaceText[$checkCondition[$truncate[$sum[$divide[$queueLength;5];0.9]]==0];true;1];false;$truncate[$sum[$divide[$queueLength;5];0.9]]];]
$onlyIf[$findSpecialChars[$message[1]]==;]
$endif
$onlyIf[$hasPlayer!=false;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
`
},
 {
 name: "previousqueue",
 type: "interaction",
 prototype: "button",
 code: `$interactionUpdate[;{newEmbed:{author:Queue:$getVar[customemoji1]}
{field:Now Playing:[$songInfo[title]]($songInfo[url] "$advancedTextSplit[$songInfo[title]; ;1] | $replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;YouTube];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;SoundCloud];false;Audio]]"):yes}
{field:Duration:\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$songInfo[duration];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;0];true;$findNumbers[$songInfo[duration]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`:yes}
{color:$getVar[color]}
{thumbnail:$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;2048]]}}
{newEmbed:{description:**($numberSeparator[$queueLength]) Queue | Page $get[page]-$replaceText[$replaceText[$checkCondition[$truncate[$sum[$divide[$queueLength;5];0.9]]==0];true;1];false;$truncate[$sum[$divide[$queueLength;5];0.9]]]**
$queue[$get[page];5;\`{position} |\` **[{title}]({url})**]}
{thumbnail:$getVar[customemoji1]}
{color:$getVar[color]}
{timestamp}};{actionRow:{button:Back:2:previousqueue:$replaceText[$replaceText[$checkCondition[$get[page]==1];true;yes];false;$replaceText[$replaceText[$checkCondition[$get[page]>$truncate[$sum[$divide[$queueLength;5];0.9]]];true;yes];false;no]]:⏪} {button:Close:1:closequeue:no:⏹} {button:Next:2:nextqueue:$replaceText[$replaceText[$checkCondition[$truncate[$sum[$divide[$queueLength;5];0.9]]==1];true;yes];false;$replaceText[$replaceText[$checkCondition[$get[page]==$truncate[$sum[$divide[$queueLength;5];0.9]]];true;yes];false;no]]:⏩} }]
$let[page;$replaceText[$replaceText[$checkCondition[$get[firstpage]<=$replaceText[$replaceText[$checkCondition[$truncate[$sum[$divide[$queueLength;5];0.9]]==0];true;1];false;$truncate[$sum[$divide[$queueLength;5];0.9]]]];true;$get[firstpage]];false;$replaceText[$replaceText[$checkCondition[$truncate[$sum[$divide[$queueLength;5];0.9]]==0];true;1];false;$truncate[$sum[$divide[$queueLength;5];0.9]]]]]
$let[firstpage;$sub[$advancedTextSplit[$getEmbed[$channelID;$interactionData[message.id];2;description];Queue | Page ;2;-;1];1]]
$onlyIf[$checkContains[$usersInChannel[$replaceText[$replaceText[$checkCondition[$voiceID[$interactionData[author.id]]==];true;$voiceID[$clientID]];false;$voiceID[$interactionData[author.id]]]];$clientID]==true;]
$onlyIf[$hasPlayer!=false;]`
},
 {
 name: "closequeue",
 type: "interaction",
 prototype: "button",
 code: `$deleteMessage[$interactionData[message.id]]
$onlyIf[$checkContains[$usersInChannel[$replaceText[$replaceText[$checkCondition[$voiceID[$interactionData[author.id]]==];true;$voiceID[$clientID]];false;$voiceID[$interactionData[author.id]]]];$clientID]==true;]
$onlyIf[$hasPlayer!=false;]`
},
 {
 name: "nextqueue",
 type: "interaction",
 prototype: "button",
 code: `$interactionUpdate[;{newEmbed:{author:Queue:$getVar[customemoji1]}
{field:Now Playing:[$songInfo[title]]($songInfo[url] "$advancedTextSplit[$songInfo[title]; ;1] | $replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;YouTube];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;SoundCloud];false;Audio]]"):yes}
{field:Duration:\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;$humanizeMS[$songInfo[duration];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;0];true;$findNumbers[$songInfo[duration]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`:yes}
{color:$getVar[color]}
{thumbnail:$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;2048]]}}
{newEmbed:{description:**($numberSeparator[$queueLength]) Queue | Page $get[page]-$replaceText[$replaceText[$checkCondition[$truncate[$sum[$divide[$queueLength;5];0.9]]==0];true;1];false;$truncate[$sum[$divide[$queueLength;5];0.9]]]**
$queue[$get[page];5;\`{position} |\` **[{title}]({url})**]}
{thumbnail:$getVar[customemoji1]}
{color:$getVar[color]}
{timestamp}};{actionRow:{button:Back:2:previousqueue:$replaceText[$replaceText[$checkCondition[$get[page]==1];true;yes];false;$replaceText[$replaceText[$checkCondition[$get[page]>$truncate[$sum[$divide[$queueLength;5];0.9]]];true;yes];false;no]]:⏪} {button:Close:1:closequeue:no:⏹} {button:Next:2:nextqueue:$replaceText[$replaceText[$checkCondition[$truncate[$sum[$divide[$queueLength;5];0.9]]==1];true;yes];false;$replaceText[$replaceText[$checkCondition[$get[page]==$truncate[$sum[$divide[$queueLength;5];0.9]]];true;yes];false;no]]:⏩} }]
$let[page;$replaceText[$replaceText[$checkCondition[$get[firstpage]<=$replaceText[$replaceText[$checkCondition[$truncate[$sum[$divide[$queueLength;5];0.9]]==0];true;1];false;$truncate[$sum[$divide[$queueLength;5];0.9]]]];true;$get[firstpage]];false;$replaceText[$replaceText[$checkCondition[$truncate[$sum[$divide[$queueLength;5];0.9]]==0];true;1];false;$truncate[$sum[$divide[$queueLength;5];0.9]]]]]
$let[firstpage;$sum[$advancedTextSplit[$getEmbed[$channelID;$interactionData[message.id];2;description];Queue | Page ;2;-;1];1]]
$onlyIf[$checkContains[$usersInChannel[$replaceText[$replaceText[$checkCondition[$voiceID[$interactionData[author.id]]==];true;$voiceID[$clientID]];false;$voiceID[$interactionData[author.id]]]];$clientID]==true;]
$onlyIf[$hasPlayer!=false;]`
},
{
 name: "seek",
 aliases: ["seekto"],
 $if: "v4",
 code: `$reply[$messageID;no]
$if[$checkContains[$noMentionMessage[1];:]==true]
$if[$advancedTextSplit[$noMentionMessage[1];:;3]==]
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
$description[1;Seek to \`$djsEval[new Date($multi[$filterMessage[$noMentionMessage[1];-];1000]).toISOString().substr(11, 8);yes]\`]
$color[1;$getVar[color]]
$onlyIf[$checkCondition[$multi[$noMentionMessage[1];1000]>=$songInfo[duration]]!=true;You cant seek more \`$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com];false;0];true;$findNumbers[$songInfo[duration]]]).toISOString().substr(11, 8);yes]\`]
$onlyIf[$isNumber[$noMentionMessage[1]]!=false;Must number]
$endif
$onlyIf[$noMentionMessage[1]!=;Put number to seek song]
$onlyIf[$songInfo[duration]!=0;This song was \`LIVE\`]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$hasPlayer!=false;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
},
 {
 name: "nowplaying",
 aliases: ["np", "now"],
 code: `$reply[$messageID;no]
$author[1;Now Playing;$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;$getVar[ytemoji]];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;$getVar[scemoji]];false;$getVar[customemoji1]]]]
$title[1;$songInfo[title];$songInfo[url]]
$thumbnail[1;$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;2048]]]
$addField[1;Filters;\`$getServerVar[filters]\`;no]
$addField[1;URL;[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;YouTube];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;SoundCloud];false;$replaceText[$replaceText[$checkContains[$songInfo[url];open.spotify.com];true;Spotify];false;Audio]]]]($songInfo[url] "$songInfo[url]") [- Thumbnail]($replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;2048]] "$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;2048]]");yes]
$addField[1;24/7;$replaceText[$replaceText[$getGlobalUserVar[247];0;\`❌\`];1;\`✅\`];yes]
$addField[1;Loop;\`$replaceText[$replaceText[$checkCondition[$loopStatus==none];true;off];false;on - $loopStatus]\`;yes]
$addField[1;Volume;\`$truncate[$volume]%\`;yes]
$addField[1;Song;\`$numberSeparator[$queueLength]\`;yes]
$addField[1;Duration Left;\`$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0];true;LIVE];false;$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com;open.spotify.com];false;$humanizeMS[$sub[$songInfo[duration];$getCurrentDuration];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com;open.spotify.com];false;0];true;$sub[$songInfo[duration];$getCurrentDuration]]).toISOString().substr(11, 8);yes]]]\`;yes]
$addField[1;Duration Now;\`$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0];true;LIVE];false;$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com;open.spotify.com];false;$humanizeMS[$getCurrentDuration;4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com;open.spotify.com];false;0];true;$getCurrentDuration]).toISOString().substr(11, 8);yes]]]\`;yes]
$addField[1;Duration;\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com;open.spotify.com];false;$humanizeMS[$songInfo[duration];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com;open.spotify.com];false;0];true;$findNumbers[$songInfo[duration]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\`;yes]
$addField[1;Requested By;<@$songInfo[user.id]>;no]
$addTimestamp[1;$dateStamp]
$color[1;$getVar[color]]
$onlyIf[$hasPlayer!=false;$getVar[errorqueue]]
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
\`$uptime\` / <t:$cropText[$readyTimestamp;10]:R>`
},
 {
 name: "ping",
 $if: "v4",
 code: `$reply[$messageID;no]
$editMessage[$get[id];{newEmbed:{color:$getVar[color]} {timestamp} {footer:$userTag} {field:Websocket Ping:\`$numberSeparator[$get[ping]]ms\`:yes} {field:API Ping:\`$numberSeparator[$get[messageping]]ms\`:yes} {field:Database Ping:\`$numberSeparator[$get[dbping]]ms\`:yes} {field:Voice Ping:\`$numberSeparator[$get[voiceping]]ms\`:yes} {field:Message Ping:\`$numberSeparator[$sub[$dateStamp;$get[secondping]]]ms\`:yes} {field:Edited Ping:\`$filterMessage[$numberSeparator[$sub[$sub[$dateStamp;$get[secondping]];$get[messageping]]];-]ms\`:yes}}]
$let[id;$sendMessage[{
 "embeds": "{newEmbed:{color:$getVar[color]} {timestamp} {footer:$userTag} {field:Websocket Ping:\`Checking\`:yes} {field:API Ping:\`Checking\`:yes} {field:Database Ping:\`Checking\`:yes} {field:Voice Ping:\`Checking\`:yes} {field:Message Ping:\`Checking\`:yes} {field:Edited Ping:\`Checking\`:yes}}",
 "reply": {
  "messageReference": "$messageID"
 },
  "allowedMentions": {
   "repliedUser": "false"
 }
};yes]]
$let[secondping;$dateStamp]
$let[ping;$ping]
$if[$checkCondition[$voiceID[$clientID]==]-$hasPlayer==false-false]
$let[voiceping;0]
$elseIf[$checkCondition[$voiceID[$clientID]==]==true]
$let[voiceping;0]
$endelseif
$else
$let[voiceping;$voicePing]
$endif
$let[dbping;$dbPing]
$let[messageping;$messagePing]`
},
 {
 name: "stats",
 code: `$reply[$messageID;no]
$color[1;$getVar[color]]
$addField[1;Commands;> $numberSeparator[$commandsCount];yes]
$addField[1;Servers;> $numberSeparator[$serverCount];yes]
$addField[1;Members;> $numberSeparator[$allMembersCount];yes]
$addField[1;RAM Left;> $cropText[$divide[$sub[$maxRam;$ram];1024];4]GB;yes]
$addField[1;RAM;> $cropText[$divide[$ram;1024];4]GB;yes]
$addField[1;CPU;> $cropText[$cpu;5]%;yes]
$addField[1;API Ping;> $numberSeparator[$messagePing]ms;yes]
$addField[1;DB Ping;> $numberSeparator[$dbPing]ms;yes]
$addField[1;WS Ping;> $numberSeparator[$ping]ms;yes]
$addField[1;Platform;> $djsEval[require ('os').platform();yes] | $djsEval[require ('os').arch;yes]
> $advancedTextSplit[$djsEval[require('os').cpus()[0].model;yes]; ;1];yes]
$addField[1;Last Online;> <t:$cropText[$readyTimestamp;10]:R>;yes]
$addField[1;Uptime;> $uptime;yes]
$footer[1;Ver. $packageVersion ($nodeVersion);$userAvatar[$authorID;512]]
$thumbnail[1;$userAvatar[$clientID]]
$addTimestamp[1;$dateStamp]
$let[cache;$cacheMembers[$guildID]]
$suppressErrors`
},
 {
 name: "check",
 code: `$editMessage[$get[id];{newEmbed:{title:Check}
{description:\`\`\`
Pause          #COLON# $replaceText[$replaceText[$checkCondition[$getVar[pause]!=];true;✅];false;❌]
Resume         #COLON# $replaceText[$replaceText[$checkCondition[$getVar[resume]!=];true;✅];false;❌]
Skip           #COLON# $replaceText[$replaceText[$checkCondition[$getVar[skip]!=];true;✅];false;❌]
Stop           #COLON# $replaceText[$replaceText[$checkCondition[$getVar[stop]!=];true;✅];false;❌]
Shuffle        #COLON# $replaceText[$replaceText[$checkCondition[$getVar[shuffle]!=];true;✅];false;❌]
Join           #COLON# $replaceText[$replaceText[$checkCondition[$getVar[join]!=];true;✅];false;❌]
Disconnect     #COLON# $replaceText[$replaceText[$checkCondition[$getVar[dc]!=];true;✅];false;❌]
Play           #COLON# $replaceText[$replaceText[$checkCondition[$getVar[errorjoin]!=];true;✅];false;❌]
UserID         #COLON# $replaceText[$replaceText[$checkCondition[$getServerVar[userid]!=default];true;✅];false;❌]
Log Music      #COLON# $replaceText[$replaceText[$checkContains[$getServerVar[logmusic];1];true;✅];false;❌]
24/7           #COLON# $replaceText[$replaceText[$getGlobalUserVar[247];1;✅];0;❌]
Playlist       #COLON# $replaceText[$replaceText[$checkCondition[1>=$getGlobalUserVar[playlistusercount]];false;✅];true;❌]
Controller     #COLON# $replaceText[$replaceText[$checkContains[$getServerVar[buttonmusic];1];true;✅];false;❌] • $replaceText[$replaceText[$checkContains[$getServerVar[openpublicbutton];1];true;✅];false;❌] • $replaceText[$replaceText[$checkContains[$getServerVar[forceusebutton];1];true;✅];false;❌]

Max Volume     #COLON# $getServerVar[maxvol]%
User Volume    #COLON# $getGlobalUserVar[vol]%

1) Emoji       #COLON# $replaceText[$replaceText[$checkCondition[$isValidImageLink[$getVar[customemoji1]]==true];true;✅];false;❌]
2) Emoji       #COLON# $replaceText[$replaceText[$checkCondition[$isValidImageLink[$getVar[ytemoji]]==true];true;✅];false;❌]
3) Emoji       #COLON# $replaceText[$replaceText[$checkCondition[$isValidImageLink[$getVar[scemoji]]==true];true;✅];false;❌]
4) Emoji       #COLON# $replaceText[$replaceText[$checkCondition[$isValidImageLink[$getVar[loademoji]]==true];true;✅];false;❌]
5) Emoji       #COLON# $replaceText[$replaceText[$checkCondition[$isValidImageLink[$getVar[customemoji2]]==true];true;✅];false;❌]

Connect        #COLON# $replaceText[$replaceText[$checkCondition[$hasPerms[$guildID;$clientID;connect]==true];true;✅];false;❌]
Speak          #COLON# $replaceText[$replaceText[$checkCondition[$hasPerms[$guildID;$clientID;speak]==true];true;✅];false;❌]
Deafen         #COLON# $replaceText[$replaceText[$checkCondition[$hasPerms[$guildID;$clientID;deafenmembers]==true];true;✅];false;❌]
Reactions      #COLON# $replaceText[$replaceText[$checkCondition[$hasPerms[$guildID;$clientID;addreactions]==true];true;✅];false;❌]
Messages       #COLON# $replaceText[$replaceText[$checkCondition[$hasPerms[$guildID;$clientID;managemessages]==true];true;✅];false;❌]
Embed Links    #COLON# $replaceText[$replaceText[$checkCondition[$hasPerms[$guildID;$clientID;embedlinks]==true];true;✅];false;❌]
Attach Files   #COLON# $replaceText[$replaceText[$checkCondition[$hasPerms[$guildID;$clientID;attachfiles]==true];true;✅];false;❌]
Move Members   #COLON# $replaceText[$replaceText[$checkCondition[$hasPerms[$guildID;$clientID;movemembers]==true];true;✅];false;❌]
Public Thread  #COLON# $replaceText[$replaceText[$checkCondition[$hasPerms[$guildID;$clientID;usepublicthreads]==true];true;✅];false;❌]
Private Thread #COLON# $replaceText[$replaceText[$checkCondition[$hasPerms[$guildID;$clientID;useprivatethreads]==true];true;✅];false;❌]
Slash          #COLON# $replaceText[$replaceText[$checkCondition[$hasPerms[$guildID;$clientID;useappcmds]==true];true;✅];false;❌]

YouTube        #COLON# $replaceText[$replaceText[$get[yt];true;✅];false;❌] ($sub[$dateStamp;$get[time1]]ms)
SoundCloud     #COLON# $replaceText[$replaceText[$get[sc];true;✅];false;❌] ($sub[$dateStamp;$get[time2]]ms)
Spotify        #COLON# $replaceText[$replaceText[$get[st];true;✅];false;❌] ($sub[$dateStamp;$get[time3]]ms) 
\`\`\`}
{color:$getVar[color]}
{footer:Latency#COLON# $get[ping]}
{timestamp}}]
$let[yt;$checkContains[$exec[curl -o /dev/null -s -w "%{http_code}" https://youtube.com];200;301;302;102]]
$let[time3;$dateStamp]
$let[sc;$checkContains[$exec[curl -o /dev/null -s -w "%{http_code}" https://soundcloud.com];200;301;302;102]]
$let[time2;$dateStamp]
$let[st;$checkContains[$exec[curl -o /dev/null -s -w "%{http_code}" https://open.spotify.com];200;301;302;102]]
$let[time1;$dateStamp]
$let[id;$sendMessage[{
 "embeds": "{newEmbed:{author:Getting Info:$getVar[loademoji]} {title:Check} {footer:Latency#COLON# checking} {color:$getVar[color]} {timestamp}}",
 "reply": {
  "messageReference": "$messageID"
 },
  "allowedMentions": {
   "repliedUser": "false"
 }
};yes]
$let[ping;$numberSeparator[$messagePing]ms]
`
},
 {
 name: "help",
 aliases: ["command", "commands"],
 $if: "v4",
 code: `$reply[$messageID;no]
$if[$checkContains[$botOwnerID;$authorID]==true]
$addButton[2;Update (Handler);1;author-2;yes]
$addButton[2;Eval;1;author-1;yes]
$addButton[1;Owner Command;3;author-0;yes;⤵]
$endif
$thumbnail[1;$userAvatar[$clientID;2048]]
$addField[1;Guide;\`YouTube/SoundCloud/Spotify\`
> <prefix>play <name/url> | All
> <prefix>play (sc) <name> | SoundCloud
> <prefix>play (st) <url> | Spotify
\`URL\`
> <prefix>play <url-music/hls>;no]
$addField[1;Playlist;\`playlist, playlist-add, playlist-play\`;no]
$addField[1;Music;\`24/7, play, pause, resume, nowplaying, previous, skip, shuffle, loop, seek, volume, volume-max, stop, filter, queue, join, disconnect\`;no]
$addField[1;Basic;\`check, stats, uptime, invite, ping, controller, log, listen-info, slash\`;no]
$color[1;$getVar[color]]
$addTimestamp[1;$dateStamp]`
},
 {
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
},
 {
 name: "volume-max",
 aliases: ["vol-max", "v-max"],
 $if: "v4",
 code: `$reply[$messageID;no]
$color[1;$getVar[color]]
$addField[1;Requested/Changed By;$replaceText[$replaceText[$checkCondition[$songInfo[user.id]==$authorID];true;<@$songInfo[user.id]>];false;<@$authorID> (Requested)\n<@$songInfo[user.id]> (Changed)];yes]
$addField[1;Max Volume;\`$getServerVar[maxvol]%\`;yes]
$addField[1;Volume;\`$volume%\`;yes]
$addTimestamp[1;$dateStamp]
$setServerVar[maxvol;$truncate[$noMentionMessage[1]]]
$onlyIf[$noMentionMessage[1]<=1000;Max. **1000%**]
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
},
 {
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
},
 {
 name: "pause",
 code: `$reply[$messageID;no]
$description[1;$getVar[pause]]
$color[1;$getVar[color]]
$addTimestamp[1]
$pauseTrack
$onlyIf[$playerStatus!=paused;Already paused!]
$onlyIf[$hasPlayer!=false;$getVar[errorqueue]]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
},
 {
 name: "resume",
 code: `$reply[$messageID;no]
$description[1;$getVar[resume]]
$color[1;$getVar[color]]
$addTimestamp[1]
$resumeTrack
$onlyIf[$playerStatus!=playing;Already resumed!]
$onlyIf[$hasPlayer!=false;$getVar[errorqueue]]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
},
 {
 name: "24/7",
 aliases: ["247", "24-7"],
 $if: "v4",
 code: `$reply[$messageID;no]
$if[$getGlobalUserVar[247]==0]
$if[$hasPlayer!=false]
$playerConfig[no;0s;yes]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;]
$endif
Enabled 24/7.
$setGlobalUserVar[247;1]
$else
$if[$hasPlayer!=false]
$playerConfig[yes;0s;yes]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;]
$endif
Disabled 24/7.
$setGlobalUserVar[247;0]
$endif
`
},
 {
 name: "shuffle",
 aliases: ["sf"],
 code: `$reply[$messageID;no]
$author[1;$getVar[shuffle];$getVar[customemoji1]]
$addField[1;Requested By;<@$authorID>;yes]
$description[1;**Queue - $numberSeparator[$queueLength] Song**
$queue[1;5;\`{position} |\` **[{title}]({url})**]
$color[1;$getVar[color]]
$addTimestamp[1]
$thumbnail[1;$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;2048]]]
$shuffleQueue
$onlyIf[$queueLength!=1;$replaceText[$getVar[errorloop];{amount};$queueLength]]
$onlyIf[$hasPlayer!=false;$getVar[errorqueue]]
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
},
 {
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
$onlyPerms[manageserver;Missing Permission, **Manage Server** - User]
`
},
{
 name: "controller",
 aliases: ["controlmusic"],
 $if: "v4",
 code: `$reply[$messageID;no]
$if[$message[1]==]
$addField[1;Force Use\n\`(Non-Inside VC)\`;\`$replaceText[$replaceText[$getServerVar[forceusebutton];0;off];1;on]\`;yes]
$addField[1;Open Public\n\`(Inside VC)\`;\`$replaceText[$replaceText[$getServerVar[openpublicbutton];0;off];1;on]\`;yes]
$addField[1;Controller;\`$replaceText[$replaceText[$getServerVar[buttonmusic];0;off];1;on]\`;no]
$setServerVar[buttonmusic;$replaceText[$replaceText[$checkCondition[$getServerVar[buttonmusic]==0];true;1];false;0]]
$footer[1;controller op | controller fs]
$color[1;$getVar[color]]
$elseIf[$toLowercase[$message[1]]==op]
$addField[1;Force Use\n\`(Non-Inside VC)\`;\`$replaceText[$replaceText[$getServerVar[forceusebutton];0;off];1;on]\`;yes]
$addField[1;Open Public\n\`(Inside VC)\`;\`$replaceText[$replaceText[$getServerVar[openpublicbutton];0;off];1;on]\`;yes]
$addField[1;Controller;\`$replaceText[$replaceText[$getServerVar[buttonmusic];0;off];1;on]\`;no]
$setServerVar[openpublicbutton;$replaceText[$replaceText[$checkCondition[$getServerVar[openpublicbutton]==0];true;1];false;0]]
$footer[1;Using Open Public]
$color[1;$getVar[color]]
$endelseif
$elseIf[$toLowercase[$message[1]]==fs]
$addField[1;Force Use\n\`(Non-Inside VC)\`;\`$replaceText[$replaceText[$getServerVar[forceusebutton];0;off];1;on]\`;yes]
$addField[1;Open Public\n\`(Inside VC)\`;\`$replaceText[$replaceText[$getServerVar[openpublicbutton];0;off];1;on]\`;yes]
$addField[1;Controller;\`$replaceText[$replaceText[$getServerVar[buttonmusic];0;off];1;on]\`;no]
$setServerVar[forceusebutton;$replaceText[$replaceText[$checkCondition[$getServerVar[forceusebutton]==0];true;1];false;0]]
$footer[1;Using Force Use]
$color[1;$getVar[color]]
$endelseif
$endif
$onlyPerms[manageserver;Missing Permission, **Manage Server** - User]`
},
 {
 name: "controlmusic",
 type: "awaited",
 code: `$interactionUpdate[;{newEmbed:{author:Started Playing:$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;$getVar[ytemoji]];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;$getVar[scemoji]];false;$getVar[customemoji1]]]}
{title:$songInfo[title]}
{url:$songInfo[url]}
{field:Requested By:<@$songInfo[user.id]>:no}
{field:Duration:\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com;open.spotify.com];false;$humanizeMS[$songInfo[duration];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com;open.spotify.com];false;0];true;$findNumbers[$songInfo[duration]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\` - \`$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0];true;LIVE];false;$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com;open.spotify.com];false;$humanizeMS[$getCurrentDuration;4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com;open.spotify.com];false;0];true;$getCurrentDuration]).toISOString().substr(11, 8);yes]]]\`:yes}
{field:Artist:\`$songInfo[author]\`:yes}
{field:Platform:\`$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;YouTube];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;SoundCloud];false;$replaceText[$replaceText[$checkContains[$songInfo[url];open.spotify.com];true;Spotify];false;Audio]]]\`:yes}
{field:$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com;open.spotify.com];true;Listened];false;Views]:\`$numberSeparator[$replaceText[$songInfo[views];null;0]]\`:yes}
{field:Likes:\`$numberSeparator[$replaceText[$songInfo[likes];null;0]]\`:yes}
{field:Create:$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;<t:$cropText[$songInfo[createdTimestamp];10]:d>];false;\`none\`]:yes}
{field:Song:\`$numberSeparator[$queueLength]\`:yes}
{field:24/7:$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[user.id]];0;\`❌\`];1;\`✅\`]:yes}
{field:Loop:\`$replaceText[$replaceText[$checkCondition[$loopStatus==none];true;off];false;on - $loopStatus]\`:yes}
{field:Filters:\`$getServerVar[filters]\`:no}
{timestamp}
{thumbnail:$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;1024]]}
{color:$getVar[color]}};{actionRow:{button::1:queue:no:⏏} {button::3:previous:no:⏮} {button::3:play:no:⏯} {button::3:next:no:⏭} {button::1:stop:no:⏹}} {actionRow:{button:$replaceText[$replaceText[$checkCondition[$loopStatus==none];true;Off];false;$toLocaleUppercase[$loopStatus]]:1:loop:no:🔁} {button:-10s:2:downseek:no:⏪} {button:+10s:2:fastseek:no:⏩} {button::1:shuffle:no:🔀}} {actionRow:{button:$truncate[$volume]%:1:volmute:no:🔈} {button:-10%:2:voldown:no:🔉} {button:+10%:2:volup:no:🔊}}]
$onlyIf[$getServerVar[buttonmusicmessage]!=;]
$onlyIf[$hasPlayer!=false;]`
},
 {
 name: "autocontrolmusic",
 type: "awaited",
 code: `$loop[1;{};autocontrolmusic]
$editMessage[$getServerVar[buttonmusicmessage];{newEmbed:{author:Started Playing:$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;$getVar[ytemoji]];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;$getVar[scemoji]];false;$getVar[customemoji1]]]}
{title:$songInfo[title]}
{url:$songInfo[url]}
{field:Requested By:<@$songInfo[user.id]>:no}
{field:Duration:\`$replaceText[$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com;open.spotify.com];false;$humanizeMS[$songInfo[duration];4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com;open.spotify.com];false;0];true;$findNumbers[$songInfo[duration]]]).toISOString().substr(11, 8);yes]];00:00:00;LIVE]\` - \`$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0];true;LIVE];false;$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com;open.spotify.com];false;$humanizeMS[$getCurrentDuration;4]];true;$djsEval[new Date($replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com;soundcloud.com;open.spotify.com];false;0];true;$getCurrentDuration]).toISOString().substr(11, 8);yes]]]\`:yes}
{field:Artist:\`$songInfo[author]\`:yes}
{field:Platform:\`$replaceText[$replaceText[$checkContains[$songInfo[url];youtube.com];true;YouTube];false;$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;SoundCloud];false;$replaceText[$replaceText[$checkContains[$songInfo[url];open.spotify.com];true;Spotify];false;Audio]]]\`:yes}
{field:$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com;open.spotify.com];true;Listened];false;Views]:\`$numberSeparator[$replaceText[$songInfo[views];null;0]]\`:yes}
{field:Likes:\`$numberSeparator[$replaceText[$songInfo[likes];null;0]]\`:yes}
{field:Create:$replaceText[$replaceText[$checkContains[$songInfo[url];soundcloud.com];true;<t:$cropText[$songInfo[createdTimestamp];10]:d>];false;\`none\`]:yes}
{field:Song:\`$numberSeparator[$queueLength]\`:yes}
{field:24/7:$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[user.id]];0;\`❌\`];1;\`✅\`]:yes}
{field:Loop:\`$replaceText[$replaceText[$checkCondition[$loopStatus==none];true;off];false;on - $loopStatus]\`:yes}
{field:Filters:\`$getServerVar[filters]\`:no}
{timestamp}
{thumbnail:$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;1024]]}
{color:$getVar[color]}}]
$wait[$getVar[timechangemessage]]
$onlyIf[$getVar[timechangemessage]!=0;]
$onlyIf[$getServerVar[buttonmusicmessage]!=;]
$onlyIf[$hasPlayer!=false;]
$suppressErrors`
}]
