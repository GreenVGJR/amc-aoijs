module.exports = {
  name: "pruning",
  code: `$description[$replaceText[$replaceText[$checkCondition[$pruneMusic==true];true;Pruning: **on**];false;Pruning: **off**]]
$color[$getVar[color]]
$addTimestamp
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$getGlobalUserVar[logmusic]!=2;You currently active reaction control.]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors`
}
