module.exports = [{
type: "musicStartCommand",
  channel: "$channelID",
  code: `$if[$getGlobalUserVar[saveseek;$songInfo[userID]]!=0]
$setGlobalUserVar[saveseek;0;$songInfo[userID]]
$sendMessage[{description:Seek recently to $humanizeMS[$multi[$getGlobalUserVar[saveseek;$songInfo[userID]];1000];10]} {color:$getVar[color]} {timestamp};no]
$seekTo[$getGlobalUserVar[saveseek;$songInfo[userID]]]
$endif
$if[$getGlobalUserVar[vol;$songInfo[userID]]>=$sum[$getServerVar[maxvol];1]]]
$setGlobalUserVar[vol;50;$songInfo[userID]]
$volume[50]
$sendMessage[{title:Volume User was change to 50%.} {footer:Bypass limit Max Volume Server} {color:$getVar[color]} {delete:5s};no]
$endif
$suppressErrors`
},
  {
type: "musicStartCommand",
  channel: "$channelID",
  code: `$if[$isDeafened[$clientID]==true]
$deafenUser[$clientID;yes]
$onlyBotPerms[deafenmembers;]
$else
$endif
$if[$isSelfDeafened[$clientID]==false]
$title[Non-self-Deafened]
$description[<@$clientID> Failed to self-deafen.]
$color[$getVar[color]]
$addTimestamp
$deleteIn[2s]
$onlyIf[$isDeafened[$clientID]==true;]
$endif
$if[$checkContains[$songInfo[url];https://youtube.com/]==true]
$setServerVar[linkdownload;https://api.vevioz.com/?v=$replaceText[$songInfo[url];https://youtube.com/watch?v=;]&type=mp3&bitrate=320]
$else
$setServerVar[linkdownload;$jsonRequest[$jsonRequest[https://api.leref.ga/soundcloud?url=$songInfo[url];songInfo.trackURL]?client_id=$getVar[clientidsoundcloud];url]]
$wait[1s]
$onlyIf[$getVar[clientidsoundcloud]!=;]
$endif
$if[$getUserVar[nontrigger;$clientID]==1]
$setUserVar[nontrigger;0;$clientID]
$endif
$suppressErrors`
},
  {
type: "musicEndCommand",
  channel: "$channelID",
  code: `$if[$messageExists[$channelID;$getUserVar[reactmessageid;$clientID]]==true]
$deleteMessage[$getUserVar[reactmessageid;$clientID]]
$endif
$setServerVar[filters;none]
$title[There no song again on queue.]
$footer[Left VC.]
$color[$getVar[color]]`
},
 {
  type: "musicStartCommand",
  channel: "$channelID",
  code: `$if[$checkContains[$getGlobalUserVar[logmusic;$songInfo[userID]];0;1]-$hasPerms[$clientID;addreactions]==true-true]
$if[$messageExists[$channelID;$getUserVar[reactmessageid;$clientID]]==true]
$deleteMessage[$getUserVar[reactmessageid;$clientID]]
$endif
$author[Started Playing;$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$getVar[ytemoji]];false;$getVar[scemoji]]]
$title[$songInfo[title]]
$addField[Filters;\`$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[3];(];)]==00:00:00];true;none];false;$getServerVar[filters]]\`;no]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[24/7;\`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[userID]];0;off];1;off];2;on]\`;yes]
$addField[ID;\`$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$replaceText[$replaceText[$songInfo[url];https://youtube.com/watch?v=;];https://www.youtube.com/watch?v=;]];false;undefined]\`;yes]
$addField[Song;\`$queueLength\`;yes]
$addField[Ping;\`$dbPingms\`;yes]
$addField[Playing;$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;[YouTube](https://www.youtube.com/)];false;[Soundcloud](https://soundcloud.com/)];yes]
$addField[URL;[Song]($songInfo[url] "$songInfo[title]");yes] 
$addField[Volume;\`$volume%\`;yes]
$addField[Duration;\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`;yes]
$addField[$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds (00:00:00)];true;Streaming];false;Uploaded] By;[$songInfo[publisher]]($songInfo[publisher_url]);yes]
$addField[Running At;$replaceText[$replaceText[$checkContains[$status[$songInfo[userID]];online;idle;dnd];true;\`$toUppercase[$platform[$songInfo[userID]]]\`];false;null];yes]
$addField[Requested By;<@$songInfo[userID]>;yes]
$textSplit[$songInfo[duration]; ]
$addTimestamp
$thumbnail[$songInfo[thumbnail]]
$color[$getVar[color]]
$elseIf[$checkContains[$getGlobalUserVar[logmusic;$songInfo[userID]];0;1]-$hasPerms[$clientID;addreactions]==false-true]
$setUserVar[reactmessageid;$get[a];$clientID]
$reactionCollector[$get[a];$songInfo[userID];1d;🔄,⏯,⏹,⏭,🔁,🔀;clearqueueyes,resume-pause,stop,skip,loop,recentshuffle;yes]
$wait[$ping]
$let[a;$sendMessage[{author:Started Playing:$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$getVar[ytemoji]];false;$getVar[scemoji]]}
{title:$songInfo[title]}
{field:Requested By:<@$songInfo[userID]>:yes}
{field:Running At:$replaceText[$replaceText[$checkContains[$status[$songInfo[userID]];online;idle;dnd];true;\`$toUppercase[$platform[$songInfo[userID]]]\`];false;null]:yes}
{field:$replaceText[$replaceText[$checkCondition[$songInfo[duration]==0 Seconds (00:00:00)];true;Streaming];false;Uploaded] By:[$songInfo[publisher]]($songInfo[publisher_url]):yes}
{field:Duration:\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`:yes}
{field:Volume:\`$volume%\`:yes}
{field:URL:[Song]($songInfo[url] "$songInfo[title]"):yes}
{field:Playing:$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;[YouTube](https://www.youtube.com/)];false;[Soundcloud](https://soundcloud.com/)]:yes}
{field:Ping:\`$dbPingms\`:yes}
{field:Song:\`$queueLength\`:yes}
{field:ID:\`$replaceText[$replaceText[$checkContains[$songInfo[url];https://youtube.com/watch?v=;https://www.youtube.com/watch?v=];true;$replaceText[$replaceText[$songInfo[url];https://youtube.com/watch?v=;];https://www.youtube.com/watch?v=;]];false;undefined]\`:yes}
{field:24/7:\`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[userID]];0;off];1;off];2;on]\`:yes}
{field:Loop:\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`:yes}
{field:Filters:\`$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[3];(];)]==00:00:00];true;none];false;$getServerVar[filters]]\`:no}
{timestamp}
{thumbnail:$songInfo[thumbnail]}
{color:$getVar[color]};yes]]
$textSplit[$songInfo[duration]; ]
$onlyIf[$messageExists[$channelID;$getUserVar[reactmessageid;$clientID]]==false;{execute:recentskipplay}]
$endelseif
$endif
$onlyIf[$getGlobalUserVar[logmusic;$songInfo[userID]]!=1;]
$volume[$getGlobalUserVar[vol;$songInfo[userID]]]
$setGlobalUserVar[userused;$sum[$getGlobalUserVar[userused;$songInfo[userID]];1];$songInfo[userID]]`
}]
