module.exports = {
 name: "previous",
 type: "interaction",
 prototype: "button",
 $if: "v4",
 code: `$skip
$setGlobalUserVar[cacheplay;;$interactionData[author.id]]
$let[message;$playTrack[$replaceText[$replaceText[$checkContains[$getGlobalUserVar[cacheplay;$interactionData[author.id]];youtube.com];true;youtube];false;$replaceText[$replaceText[$checkContains[$getGlobalUserVar[cacheplay;$interactionData[author.id]];soundcloud.com];true;soundcloud];false;$replaceText[$replaceText[$checkContains[$getGlobalUserVar[cacheplay;$interactionData[author.id]];open.spotify.com];true;spotify];false;url]]];$getGlobalUserVar[cacheplay;$interactionData[author.id]]]
$loop[1;{};controlmusic]
$onlyIf[$getGlobalUserVar[cacheplay;$interactionData[author.id]]!=;{
 "content": "Last previous not found",
 "ephemeral": "true",
 "options": {
  "interaction": "true"
 }
}]
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
