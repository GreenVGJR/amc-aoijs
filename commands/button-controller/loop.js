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
