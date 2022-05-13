module.exports = {
 name: "play",
 type: "interaction",
 prototype: "button",
 $if: "v4",
 code: `$if[$playerStatus$suppressErrors==playing]
$pauseTrack
$elseIf[$playerStatus$suppressErrors==paused]
$resumeTrack
$endelseif
$endif
$loop[1;{};controlmusic]
$onlyIf[$getServerVar[buttonmusic]!=0;{execute:forcemusicoff}]
$onlyIf[$songInfo[user.id]==$interactionData[author.id];]
$onlyIf[$getServerVar[buttonmusicmessage]!=;]
$onlyIf[$queueLength!=0;]`
}