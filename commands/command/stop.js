module.exports = {
  name: "stop",
  cooldown: "3s",
  code: `$deleteMessage[$getUserVar[reactmessageid;$clientID]]
$setServerVar[durationcache;0]
$stopSong
$if[$getGlobalUserVar[controlreact]==0]
$sendMessage[$getVar[stop];no]
$elseIf[$getGlobalUserVar[controlreact]==1]
$addCmdReactions[⏹]
$onlyBotPerms[addreactions;]
$endelseif
$endif
$setServerVar[filters;none]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors`
}
