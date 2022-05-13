module.exports = {
 name: "loop",
 type: "interaction",
 prototype: "button",
 $if: "v4",
 code: `$loop[1;{};controlmusic]
$if[$loopStatus$suppressErrors==none]
$loopMode[song]
$elseIf[$loopStatus$suppressErrors==song]
$loopMode[queue]
$endelseif
$elseIf[$loopStatus$suppressErrors==queue]
$loopMode[none]
$endelseif
$endif
$onlyIf[$getServerVar[buttonmusic]!=0;{execute:forcemusicoff}]
$onlyIf[$songInfo[user.id]==$interactionData[author.id];]
$onlyIf[$getServerVar[buttonmusicmessage]!=;]
$onlyIf[$queueLength!=0;]`
}