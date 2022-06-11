module.exports = [{
 name: "downseek",
 type: "interaction",
 prototype: "button",
 code: `$seekTo[$replaceText[$replaceText[$checkCondition[$getCurrentDuration>=10000];false;0];true;$sub[$getCurrentDuration;10000]]]
$loop[1;{};controlmusic]
$onlyIf[$songInfo[duration]!=0;{
 "content": "This song was \`LIVE\`",
 "ephemeral": "true",
 "options": {
  "interaction": "true"
 }
}]
$onlyIf[$getServerVar[buttonmusic]!=0;{execute:forcemusicoff}]
$onlyIf[$interactionData[message.id]==$getServerVar[buttonmusicmessage];]
$onlyIf[$songInfo[user.id]==$interactionData[author.id];]
$onlyIf[$getServerVar[buttonmusicmessage]!=;]
$onlyIf[$queueLength!=0;]`
},
 {
 name: "fastseek",
 type: "interaction",
 prototype: "button",
 code: `$seekTo[$sum[$getCurrentDuration;10000]]
$loop[1;{};controlmusic]
$onlyIf[$songInfo[duration]!=0;{
 "content": "This song was \`LIVE\`",
 "ephemeral": "true",
 "options": {
  "interaction": "true"
 }
}]
$onlyIf[$getServerVar[buttonmusic]!=0;{execute:forcemusicoff}]
$onlyIf[$interactionData[message.id]==$getServerVar[buttonmusicmessage];]
$onlyIf[$songInfo[user.id]==$interactionData[author.id];]
$onlyIf[$getServerVar[buttonmusicmessage]!=;]
$onlyIf[$queueLength!=0;]`
}]
