module.exports = {
  name: "disconnect",
  aliases: ["dc", "bye", "leave"],
  code: `$if[$messageExists[$channelID;$getUserVar[reactmessageid;$clientID]]==true]
$deleteMessage[$getUserVar[reactmessageid;$clientID]]
$endif
$if[$hasPerms[$clientID;movemembers]==true]
$moveUser[$authorID]
$endif
$leaveVC
$setServerVar[filters;none]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$if[$getGlobalUserVar[controlreact]==1]
$addCmdReactions[✔]
$onlyBotPerms[addreactions;]
$else
$getVar[dc]
$endif
$onlyIf[$voiceID[$clientID]!=;Already disconnected!]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
}
