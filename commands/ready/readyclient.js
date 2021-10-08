module.exports = [{
    type: "readyCommand",
    channel: "$getVar[channelstatus]",
    code: `$log[Filter reseted.]
$editIn[2ms;Reseted.;Reseted. **$serverCount Servers**]
$forEachGuild[massfilter]
Reseting Filter..
$setVar[last;$dateStamp]
$sendMessage[\`Ready on client $userTag[$clientID]\` (\`$packageVersion\`);no]`
},
 {
type: "awaitedCommand",
name: "massfilter",
code: `$setUserVar[reactmessageid;;$clientID]
$resetServerVar[durationcache]
$resetServerVar[filters]
$suppressErrors`
}]
