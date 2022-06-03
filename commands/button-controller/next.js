module.exports = {
 name: "next",
 type: "interaction",
 prototype: "button",
 $if: "v4",
 code: `$if[$queueLength==1]
$interactionReply[Only have \`1\` song.;;;;;yes]
$else
$skip
$endif
$loop[1;{};controlmusic]
$onlyIf[$getServerVar[buttonmusic]!=0;{execute:forcemusicoff}]
$onlyIf[$songInfo[user.id]==$interactionData[author.id];]
$onlyIf[$getServerVar[buttonmusicmessage]!=;]
$onlyIf[$queueLength!=0;]`
}
