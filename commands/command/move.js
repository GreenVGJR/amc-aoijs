module.exports = {
  name: "move", 
  cooldown: "3s",
  code: `$if[$messageExists[$channelID;$getUserVar[reactmessageid;$clientID]]==true]
$deleteMessage[$getUserVar[reactmessageid;$clientID]]
$endif
$moveUser[$authorID;$findChannel[$message]]
$moveUser[$clientID;$findChannel[$message]]
$addCmdReactions[✅]
$onlyIf[$findChannel[$message[1]]!=$voiceID;]
$onlyIf[$voiceID[$clientID]!=;<@$clientID> not on voice channel.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$argsCheck[>1;What channel do you want move bot and you]
$cooldown[$commandInfo[move;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyBotPerms[movemembers;**Move Members** Missing Permission - Bot]
$suppressErrors[something just happened.]`
}
