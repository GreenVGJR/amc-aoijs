module.exports = {
  name: "stats",
  cooldown: "3s",
  code: `$color[$getVar[color]]
$addField[Size Database;> $cropText[$fileSize[$getVar[database];kb];5]KB;yes]
$addField[Size Server;> $cropText[$numberSeparator[$multi[$get[sizeserver];8];.];5]KB;yes]
$addField[Size Code;> $cropText[$fileSize[$getVar[file];kb];5]KB;yes]
$addField[Command;> $numberSeparator[$commandsCount];yes]
$addField[Server;> $numberSeparator[$serverCount];yes]
$addField[Members;> $numberSeparator[$allMembersCount];yes]
$addField[RAM Left;> $cropText[$divide[$sub[$maxRam;$ram];1024];4]GB;yes]
$addField[RAM;> $cropText[$divide[$ram;1024];4]GB;yes]
$addField[CPU;> $cropText[$cpu;4]%;yes]
$addField[Is Deafen/Mute;> $replaceText[$isDeafened[$clientID];null;false] / $replaceText[$isMuted[$clientID];null;false];yes]
$addField[Is Playing;> $checkCondition[$queueLength!=0];yes]
$addField[Is Connect;> $checkCondition[$voiceID[$clientID]!=];yes]
$addField[API Ping;> $numberSeparator[$botPing]ms;yes]
$addField[DB Ping;> $numberSeparator[$dbPing]ms;yes]
$addField[WS Ping;> $numberSeparator[$ping]ms;yes]
$addField[Platform;> $djsEval[require ('os').platform();yes];yes]
$addField[Last Online;> <t:$cropText[$getVar[last];10]:R>;yes]
$addField[Uptime;> $client[readytimestamp];yes]
$footer[Ver. $packageVersion ($nodeVersion);$userAvatar[$authorID;512]]
$thumbnail[$userAvatar[$clientID]]
$addTimestamp
$let[sizeserver;$charCount[$serverNames[]]]
$cacheMembers
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$cooldown[$commandInfo[stats;cooldown];Please wait **%time%** before using again.]`
}
