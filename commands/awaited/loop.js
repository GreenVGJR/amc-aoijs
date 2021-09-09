module.exports = {
type: "awaitedCommand",
name: "loop",
code: `$loop[1;recentplay]
$if[$loopStatus==none]
$let[a;$loopSong]
$elseIf[$loopStatus==song]
$let[b;$loopQueue]
$let[a;$loopSong]
$endelseif
$elseIf[$loopStatus==queue]
$let[b;$loopQueue]
$endelseif
$else
$endif
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$voiceID!=;]
$suppressErrors`
}
