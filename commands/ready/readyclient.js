module.exports = [{
    type: "readyCommand",
    channel: "$getVar[channelstatus]",
    code: `$editIn[$botPing;Reseted.;Reseted. **$serverCount Servers**]
$forEachGuild[massfilter]
Reseting Filter..
$setVar[last;$dateStamp]
$sendMessage[\`Ready on client $userTag[$clientID]\` | Running at \`$packageVersion ( "aoi.js": "^$packageVersion" )\`;no]`
},
 {
type: "awaitedCommand",
name: "massfilter",
code: `$setUserVar[reactmessageid;;$clientID]
$resetServerVar[durationcache]
$resetServerVar[filters]
$suppressErrors`
}]
