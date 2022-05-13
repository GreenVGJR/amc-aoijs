module.exports = {
 name: "previous",
 type: "interaction",
 prototype: "button",
 code: `$skip
$setGlobalUserVar[cacheplay;;$interactionData[author.id]]
$let[message;$playTrack[$replaceText[$replaceText[$checkContains[$getGlobalUserVar[cacheplay;$interactionData[author.id]];youtube.com];true;youtube];false;$replaceText[$replaceText[$checkContains[$getGlobalUserVar[cacheplay;$interactionData[author.id]];soundcloud.com];true;soundcloud];false;url]];$getGlobalUserVar[cacheplay;$interactionData[author.id]]]
$onlyIf[$getGlobalUserVar[cacheplay;$interactionData[author.id]]!=;{
 "content": "Last previous not found",
 "ephemeral": "true",
 "options": {
  "interaction": "true"
 }
}]
$onlyIf[$getServerVar[buttonmusic]!=0;{execute:forcemusicoff}]
$onlyIf[$songInfo[user.id]==$interactionData[author.id];]
$onlyIf[$getServerVar[buttonmusicmessage]!=;]
$onlyIf[$queueLength!=0;]`
}