module.exports = {
 name: "shuffle",
 type: "interaction",
 prototype: "button",
 code: `$interactionReply[;{newEmbed:{author:$getVar[shuffle]:$getVar[customemoji1]}
{description:**Queue - $numberSeparator[$queueLength] Song**
$queue[1;5;\`{position} |\` **[{title}]({url})**}
{color:$getVar[color]}
{thumbnail:$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;2048]]}
{timestamp}};;;;yes]
$shuffleQueue
$onlyIf[$getServerVar[buttonmusic]!=0;{execute:forcemusicoff}]
$onlyIf[$songInfo[user.id]==$interactionData[author.id];]
$onlyIf[$getServerVar[buttonmusicmessage]!=;]
$onlyIf[$queueLength!=0;]`
}
