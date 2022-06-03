module.exports = [{
 name: "downseek",
 type: "interaction",
 prototype: "button",
 code: `$loop[1;{};controlmusic]
$seekTo[$replaceText[$replaceText[$checkCondition[$getCurrentDuration>=10000];false;0];true;$sub[$getCurrentDuration;10000]]]
$onlyIf[$songInfo[duration]!=0;{
 "content": "This song was \`LIVE\`",
 "ephemeral": "true",
 "options": {
  "interaction": "true"
 }
}]
$onlyIf[$getServerVar[buttonmusic]!=0;{execute:forcemusicoff}]
$onlyIf[$songInfo[user.id]==$interactionData[author.id];]
$onlyIf[$getServerVar[buttonmusicmessage]!=;]
$onlyIf[$queueLength!=0;]`
},
 {
 name: "fastseek",
 type: "interaction",
 prototype: "button",
 code: `$loop[1;{};controlmusic]
$seekTo[$sum[$getCurrentDuration;10000]]
$onlyIf[$songInfo[duration]!=0;{
 "content": "This song was \`LIVE\`",
 "ephemeral": "true",
 "options": {
  "interaction": "true"
 }
}]
$onlyIf[$getServerVar[buttonmusic]!=0;{execute:forcemusicoff}]
$onlyIf[$songInfo[user.id]==$interactionData[author.id];]
$onlyIf[$getServerVar[buttonmusicmessage]!=;]
$onlyIf[$queueLength!=0;]`
}]
