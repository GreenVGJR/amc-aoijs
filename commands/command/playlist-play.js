module.exports = {
name: "playlist-play",
cooldown: "3s",
code: `$if[$queueLength<1]
$deleteMessage[$get[id]]
$wait[3s]
$editMessage[$get[id];{author:Starting Playing} {title:$get[song]} {color:$getVar[color]} {timestamp}]
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
$let[song;$playSong[$getGlobalUserVar[$message[1]];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;120s];2;7d];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no]]]
$joinVC[$voiceID]
$if[$queueLength<1]
$let[id;$sendMessage[{title:Starting Playing} {author:Loading..:$getVar[loademoji]} {color:$getVar[color]} {timestamp};yes]]
$endif
$botTyping
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$getGlobalUserVar[$message[1]]!=;Nothing song was added on playlist.]
$onlyIf[$checkContains[$message[1];-]!=true;Failed.]
$onlyIf[$message[1]<=10;Only available \`10\` slot.]
$onlyIf[$isNumber[$message[1]]!=false;Must number!]
$onlyBotPerms[connect;Can't connect to the voice channel. - Missing Permission]
$onlyBotPerms[speak;Can't speak on the voice channel. - Missing Permission]
$onlyBotPerms[embedlinks;addreactions;Missing Permission, **Embed Links** n **Add Reactions**]
$cooldown[3s;Please wait **%time%** before using again.]
$argsCheck[1;Usage: \`playlist-play (number playlist)\`]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
}
