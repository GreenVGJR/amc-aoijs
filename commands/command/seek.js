module.exports = {
  name: "seek",
  cooldown: "3s",
  code: `$if[$toLowercase[$message[2]]==save]
$addField[Seek to \`$replaceText[$replaceText[$checkCondition[$humanizeMS[$multi[$message[1];1000];10]!=];false;0 second];true;$humanizeMS[$multi[$message[1];1000];10]]\`;one-time use saving seek.]
$footer[Value: $message[1]]
$color[$getVar[color]]
$setGlobalUserVar[saveseek;$message[1]]
$seekTo[$message[1]]
$onlyIf[$message[1]!=0;You cant.]
$else
$description[Seek to \`$replaceText[$replaceText[$checkCondition[$humanizeMS[$multi[$noMentionMessage;1000];10]!=];false;0 second];true;$humanizeMS[$multi[$noMentionMessage;1000];10]]\`]
$footer[Value: $noMentionMessage]
$color[$getVar[color]]
$wait[$sum[$multi[$botPing;1;2;3];$dbPing]]
$seekTo[$noMentionMessage]
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$checkContains[$message[1];-]!=true;You cant seek negative.]
$onlyIf[$isNumber[$message[1]]!=false;Must number!]
$argsCheck[>1;Usage: \`seek (number)\`]
$onlyIf[$songInfo[duration]!=0 Seconds (00:00:00);\`This track was LIVE\`]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[$commandInfo[seek;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors`
}
