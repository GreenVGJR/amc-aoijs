module.exports = {
  name: "shuffleskip",
  aliases: ["sfs"],
  code: `$skipSong
$if[$getGlobalUserVar[controlreact]==1]
$addCmdReactions[🔀;⏭]
$onlyBotPerms[addreactions;]
$else
$author[$getVar[shuffle]]
$title[$replaceText[$getVar[skip];{song};$songInfo[title]]]
$thumbnail[$songInfo[thumbnail;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]]
$addField[24/7;\`$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247;$songInfo[userID]];0;off];1;off];2;on]\`;yes]
$addField[Loop;\`$replaceText[$replaceText[$checkContains[$loopStatus;song;queue];true;on - $loopStatus];false;off]\`;yes]
$addField[Position;\`$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]\`;yes]
$addField[Duration;\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`;yes]
$addField[Starting Playing;\`$songInfo[title;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]\`;yes]
$addTimestamp
$color[$getVar[color]]
$textSplit[$songInfo[duration;$replaceText[$replaceText[$checkContains[$loopStatus;song];true;0];false;1]]; ]
$endif
$shuffleQueue
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength>1;Only have **$queueLength song**.]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]`
}
