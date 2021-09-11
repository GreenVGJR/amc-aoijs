module.exports = {
  name: "play",
  aliases: ["youtube", "p", "yt"],
  cooldown: "3s",
  code: `$if[$queueLength<1]
$else
$author[Added to queue;$getVar[customemoji1]
$title[$songInfo[title;$sub[$queueLength;1]];$songInfo[url;$sub[$queueLength;1]]]
$thumbnail[$songInfo[thumbnail;$sub[$queueLength;1]]]
$addField[Filters;\`$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[3];(];)]==00:00:00];true;none];false;$getServerVar[filters]]\`;no]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[Volume;\`$volume% - $getServerVar[maxvol]%\`;yes]
$addField[Duration;\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`;yes]
$addField[Requested By;<@$songInfo[userID;$sub[$queueLength;1]]>;no]
$color[$getVar[color]]
$textSplit[$songInfo[duration;$sub[$queueLength;1]]; ]
$endif
$if[$checkContains[$message;https://cdn.discordapp.com/attachments/]==true]
$let[song;$playSong[$uri[decode;$splitText[7]];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;120s];2;7d];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no];No result.]]
$textSplit[$message;/]
$elseIf[$checkContains[$message;https://soundcloud.com/]==true]
$let[song;$playSoundcloud[$message;$getVar[clientidsoundcloud];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;120s];2;7d];yes;$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no];No result.]]
$endelseif
$else
$let[song;$playSong[$message;$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;120s];2;7d];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no];No result.]]
$endif
$joinVC[$voiceID]
$botTyping
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyBotPerms[connect;Can't connect to the voice channel. - Missing Permission]
$onlyBotPerms[speak;Can't speak on the voice channel. - Missing Permission]
$onlyBotPerms[embedlinks;addreactions;Missing Permission, **Embed Links** n **Add Reactions**]
$cooldown[$commandInfo[play;cooldown];Please wait **%time%** before using again.]
$argsCheck[>1;Please write name of song or put link video.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors`
}
