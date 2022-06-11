module.exports = {
 name: "next",
 type: "interaction",
 prototype: "button",
 $if: "v4",
 code: `$if[$queueLength==1]
$interactionReply[Only have \`1\` song.;;;;;yes]
$else
$loop[1;{};controlmusic]
$skip
$endif
$onlyIf[$getServerVar[buttonmusic]!=0;{execute:forcemusicoff}]
$onlyIf[$interactionData[message.id]==$getServerVar[buttonmusicmessage];]
$onlyIf[$songInfo[user.id]==$interactionData[author.id];]
$onlyIf[$getServerVar[buttonmusicmessage]!=;]
$onlyIf[$queueLength!=0;]`
}
