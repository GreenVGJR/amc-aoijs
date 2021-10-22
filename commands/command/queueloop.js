module.exports = {
  name: "qloop",
  aliases: ["ql", "loopqueue"],
  code: `$if[$getGlobalUserVar[controlreact]==1]
$let[let you down;$loopQueue]
$addCmdReactions[🔁]
$onlyBotPerms[addreactions;]
$else
$description[$replaceText[$replaceText[$checkCondition[$loopQueue==true];true;Queue Loop now **on**];false;Queue Loop now **off**]]
$color[$getVar[color]]
$addTimestamp
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$loopStatus!=song;You currently active **song loop.**]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[]`
}
