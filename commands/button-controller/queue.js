module.exports = {
 name: "queue",
 type: "interaction",
 prototype: "button",
 $if: "v4",
 code: `$interactionReply[;{newEmbed:{author:Queue - $numberSeparator[$queueLength]:$getVar[customemoji1]}
{description:$queue[1;20;\`{position} |\` \`{title}\`]}
{thumbnail:$replaceText[$songInfo[thumbnail];undefined;$userAvatar[$clientID;2048]]}
{color:$getVar[color]}
{timestamp}};;;;yes]
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
