module.exports = {
 name: "queue",
 type: "interaction",
 prototype: "button",
 code: `$interactionReply[;{newEmbed:{author:Queue - $numberSeparator[$queueLength]:$getVar[customemoji1]}
{description:$queue[1;20;\`{position} |\` \`{title}\`]}
{thumbnail:$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;2048]]}
{color:$getVar[color]}
{timestamp}};;;;yes]
$onlyIf[$getServerVar[buttonmusic]!=0;{execute:forcemusicoff}]
$onlyIf[$interactionData[message.id]==$getServerVar[buttonmusicmessage];]
$onlyIf[$songInfo[user.id]==$interactionData[author.id];]
$onlyIf[$getServerVar[buttonmusicmessage]!=;]
$onlyIf[$queueLength!=0;]`
}
