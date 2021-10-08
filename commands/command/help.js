module.exports = {
  name: "help",
  cooldown: "3s",
  code: `$if[$checkContains[$botOwnerID;$authorID]==true]
__Owner Command__
\`reboot, eval, funcs\`
$endif
$title[Command List]
$addField[> Control;\`\`\`
- playskip 
- pause
- resume
- stop
- nowplaying
- loop
- shuffle
- shuffleskip
- pruning
- skip
- clearqueue 
- queue
- qloop
- seek
- remove
- volume
- filter
- musicsettings
\`\`\`;no]
$addField[> Playlist;\`\`\`
- playlist
- playlist-add
- playlist-remove
- playlist-play
\`\`\`;yes]
$addField[> Slash;
\`\`\`
- /filter
- /play
- /pause
- /resume
- /stop
\`\`\`;yes]
$addField[> Aliases;\`\`\`
- join
(j, summon)
- disconnect
(dc, bye, leave)
- play
(p, youtube, yt)
- playskip
(ps)
- soundcloud
(sc)
- nowplaying
(np)
- loop
(l, loopsong, loopmusic)
- shuffle
(sf)
- skip
(s)
- clearqueue
(cq)
- shuffleskip
(sfs)
- remove
(r)
- qloop
(ql, loopqueue)
- queue
(q)
- volume
(v)
- musicsettings
(musicsetting, musicset)
\`\`\`;no]
$addField[> Misc;\`\`\`
- ping
- uptime
- stats
- invite
- check
- user-info
- top
- download (--refresh)
\`\`\`;yes]
$addField[> Music Player;\`\`\`
- play
- soundcloud
\`\`\`;yes]
$addField[> Main;\`\`\`
- join
- rejoin
- disconnect
- slash
- user
- user-disable
\`\`\`;yes]
$addTimestamp
$footer[Ping: $pingms - API: $botpingms - DB: $dbPingms]
$thumbnail[$userAvatar[$clientID]]
$color[$getVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$cooldown[$commandInfo[help;cooldown];Please wait **%time%** before using again.]`
}
