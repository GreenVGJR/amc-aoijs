module.exports = {
  name: "remove",
  aliases: ["r"],
  code: `$moveSong[$sum[$message[1];1];]
$title[$replaceText[$getVar[remove];{d-amount};$replaceText[$message[1];-;]]]
$color[$getVar[color]]
$addTimestamp
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$message[1]<=$sub[$queueLength;1];Only have **$queueLength song**.]
$onlyIf[$message[1]>1;You cant remove at first song.]
$onlyIf[$isNumber[$message[1]]!=false;Must number!]
$cooldown[3s;Please wait **%time%** before using again.]
$argsCheck[1;Usage: \`remove (numnber song on queue)\`]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
}
