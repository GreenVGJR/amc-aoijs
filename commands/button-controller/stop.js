module.exports = {
 name: "stop",
 type: "interaction",
 prototype: "button",
 $if: "v4",
 code: `$leaveVC
$onlyIf[$getGlobalUserVar[247;$interactionData[author.id]]!=1;]
$stop
$resetPlayer
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
