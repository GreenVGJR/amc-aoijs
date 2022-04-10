module.exports = {
 name: "options",
 type: "interaction",
 prototype: "slash",
 $if: "v4",
 code: `$if[$replaceText[$replaceText[$checkCondition[$message[2]==];true;$message[1]];false;$message[2]]==off]
$if[$queueLength!=0]
$playerConfig[yes;0s;yes]
$onlyIf[$checkCondition[$voiceID[$interactionData[author.id]]==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID[$interactionData[author.id]]];false;$voiceID[$clientID]]]==true;]
$endif
$if[$replaceText[$replaceText[$checkCondition[$message[2]==];true;$message[1]];false;$message[2]]==off]
$interactionReply[Disabled 24/7.;;;;;yes]
$endif
$setGlobalUserVar[247;0;$interactionData[author.id]]
$elseIf[$replaceText[$replaceText[$checkCondition[$message[2]==];true;$message[1]];false;$message[2]]==on]
$if[$queueLength!=0]
$playerConfig[no;0s;yes]
$onlyIf[$checkCondition[$voiceID[$interactionData[author.id]]==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID[$interactionData[author.id]]];false;$voiceID[$clientID]]]==true;]
$endif
$if[$replaceText[$replaceText[$checkCondition[$message[2]==];true;$message[1]];false;$message[2]]==on]
$interactionReply[Enabled 24/7.;;;;;yes]
$endif
$setGlobalUserVar[247;1;$interactionData[author.id]]
$endelseif
$endif
$if[$replaceText[$replaceText[$checkCondition[$message[2]==];true;$message[1]];false;$message[2]]==off-log]
$setServerVar[logmusic;0]
$if[$replaceText[$replaceText[$checkCondition[$message[2]==];true;on];false;off]==on]
$interactionReply[Disabled.;;;;;yes]
$endif
$onlyPerms[manageserver;{
"content": "Missing Permission, **Manage Server** - User",
"ephemeral": "true",
"options": {
 "interaction": "true"
 }
}]
$elseIf[$replaceText[$replaceText[$checkCondition[$message[2]==];true;$message[1]];false;$message[2]]==on-log]
$setServerVar[logmusic;1]
$if[$replaceText[$replaceText[$checkCondition[$message[2]==];true;on];false;off]==on]
$interactionReply[Enabled.;;;;;yes]
$endif
$onlyPerms[manageserver;{
"content": "Missing Permission, **Manage Server** - User",
"ephemeral": "true",
"options": {
 "interaction": "true"
 }
}]
$endelseif
$endif
$if[$checkCondition[$message[1]==]-$checkCondition[$message[2]==]==false-false]
$interactionReply[Log: $replaceText[$replaceText[$message[2];off-log;Disabled.];on-log;Enabled.]
24/7: $replaceText[$replaceText[$message[1];off;Disabled 24/7.];on;Enabled 24/7.];;;;;yes]
$endif
`
}
