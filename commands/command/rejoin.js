module.exports = {
  name: "rejoin",
  aliases: ["reconnect"],
  code: `$if[$messageExists[$channelID;$getUserVar[reactmessageid;$clientID]]==true]
$deleteMessage[$getUserVar[reactmessageid;$clientID]]
$endif
$if[$voiceID[$clientID]==]
$joinVC[$voiceID]
$else
$joinVC[$voiceID]
$wait[$multi[$botPing;2]]
$leaveVC
$setServerVar[filters;none]
$endif
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
}
