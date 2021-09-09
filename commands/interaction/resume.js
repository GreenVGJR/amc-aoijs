module.exports = {
type: "interactionCommand",
name: "resume",
code: `$if[$getServerVar[durationcache]==0]
$resumeSong
$else
$setServerVar[durationcache;0]
$seekTo[$getServerVar[durationcache]]
$resumeSong
$endif
$if[$getGlobalUserVar[controlreact]==0]
$title[$getVar[resume]]
$color[$getVar[color]]
$addTimestamp
$elseif[$getGlobalUserVar[controlreact]==1]
$addCmdReactions[▶]
$onlyBotPerms[addreactions;]
$endelseif
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[$commandInfo[resume;cooldown];Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$interactionReply[\`$userTag[$authorID]\` using slash.]`
}
