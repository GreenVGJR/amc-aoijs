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
$onlyIf[$interactionData[message.id]==$getServerVar[buttonmusicmessage];]
$if[$getServerVar[openpublicbutton]-$getServerVar[forceusebutton]==1-0]
$onlyIf[$checkContains[$usersInChannel[$replaceText[$replaceText[$checkCondition[$voiceID[$interactionData[author.id]]==];true;$voiceID[$clientID]];false;$voiceID[$interactionData[author.id]]]];$clientID]==true;]
$elseIf[$getServerVar[forceusebutton]==1]
$endelseif
$else
$onlyIf[$songInfo[user.id]==$interactionData[author.id];]
$endif
$onlyIf[$getServerVar[buttonmusicmessage]!=;]
$onlyIf[$hasPlayer!=false;]`
}
