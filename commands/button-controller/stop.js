module.exports = {
 name: "stop",
 type: "interaction",
 prototype: "button",
 code: `$leaveVC
$onlyIf[$getGlobalUserVar[247;$interactionData[author.id]]!=1;]
$stop
$resetPlayer
$onlyIf[$getServerVar[buttonmusic]!=0;{execute:forcemusicoff}]
$onlyIf[$interactionData[message.id]==$getServerVar[buttonmusicmessage];]
$onlyIf[$songInfo[user.id]==$interactionData[author.id];]
$onlyIf[$getServerVar[buttonmusicmessage]!=;]
$onlyIf[$queueLength!=0;]`
}
