module.exports = [{
 name: "volmute",
 type: "interaction",
 prototype: "button",
 $if: "v4",
 code: `$loop[1;{};controlmusic]
$if[$volume$suppressErrors==0]
$volume[$getGlobalUserVar[vol;$songInfo[user.id]]]
$else
$volume[0]
$endif
$onlyIf[$getServerVar[buttonmusic]!=0;{execute:forcemusicoff}]
$onlyIf[$interactionData[message.id]==$getServerVar[buttonmusicmessage];]
$onlyIf[$songInfo[user.id]==$interactionData[author.id];]
$onlyIf[$getServerVar[buttonmusicmessage]!=;]
$onlyIf[$queueLength!=0;]`
},
 {
 name: "voldown",
 type: "interaction",
 prototype: "button",
 code: `$loop[1;{};controlmusic]
$volume[$replaceText[$replaceText[$checkCondition[$get[vol]<=9];true;0];false;$get[vol]]]
$setGlobalUserVar[vol;$replaceText[$replaceText[$checkCondition[$get[vol]<=9];true;0];false;$get[vol]];$songInfo[user.id]]
$let[vol;$truncate[$sub[$volume;10]]]
$onlyIf[$noMentionMessage[1]<=$getServerVar[maxvol];Max. **$getServerVar[maxvol]%**]
$onlyIf[$getServerVar[buttonmusic]!=0;{execute:forcemusicoff}]
$onlyIf[$interactionData[message.id]==$getServerVar[buttonmusicmessage];]
$onlyIf[$songInfo[user.id]==$interactionData[author.id];]
$onlyIf[$getServerVar[buttonmusicmessage]!=;]
$onlyIf[$queueLength!=0;]`
},
 {
 name: "volup",
 type: "interaction",
 prototype: "button",
 code: `$loop[1;{};controlmusic]
$volume[$replaceText[$replaceText[$checkCondition[$get[vol]>=$getServerVar[maxvol]];true;$getServerVar[maxvol]];false;$get[vol]]]
$setGlobalUserVar[vol;$replaceText[$replaceText[$checkCondition[$get[vol]>=$getServerVar[maxvol]];true;$getServerVar[maxvol]];false;$get[vol]];$songInfo[user.id]]
$let[vol;$truncate[$sum[$volume;10]]]
$onlyIf[$noMentionMessage[1]<=$getServerVar[maxvol];Max. **$getServerVar[maxvol]%**]
$onlyIf[$getServerVar[buttonmusic]!=0;{execute:forcemusicoff}]
$onlyIf[$interactionData[message.id]==$getServerVar[buttonmusicmessage];]
$onlyIf[$songInfo[user.id]==$interactionData[author.id];]
$onlyIf[$getServerVar[buttonmusicmessage]!=;]
$onlyIf[$queueLength!=0;]`
}]
