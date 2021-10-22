module.exports = [{
  name: "volume",
  aliases: ["v", "vol"],
  code: `$editMessage[$get[id];{title:Reaction Expired} {field:Volume:\`$volume%\`:yes} {field:Max Volume:\`$getServerVar[maxvol]%\`:yes} {color:$getVar[color]} {timestamp} {delete:5s}]
$wait[1m]
$createVar[awaitvolume-$authorID:$get[id]]
$reactionCollector[$get[id];$authorID;1m;🔉,🔊,🔇;voldown,volup,volmute;yes]
$let[id;$sendMessage[{field:Volume:\`$volume%\`:yes} {field:Max Volume:\`$getServerVar[maxvol]%\`:yes} {color:$getVar[color]} {timestamp};yes]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyBotPerms[addreactions;Missing Permission, **Add Reactions** - User]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
},
 {
 type: "awaitedCommand",
 name: "voldown",
 code: `$editMessage[$getMessageVar[awaitvolume-$authorID];{field:Volume:\`$volume%\`:yes} {field:Max Volume:\`$getServerVar[maxvol]%\`:yes} {color:$getVar[color]} {timestamp}]
$volume[$sub[$volume;10]]
$setGlobalUserVar[vol;$sub[$volume;10];$authorID]
$onlyIf[$sub[$volume;10]>=10;Already minimum {delete:3s}]
$onlyIf[$volume!=0;React '🔇' to active]
$onlyIf[$queueLength!=0;]
$onlyIf[$voiceID!=;]`
},
 {
type: "awaitedCommand",
 name: "volup",
 code: `$editMessage[$getMessageVar[awaitvolume-$authorID];{field:Volume:\`$volume%\`:yes} {field:Max Volume:\`$getServerVar[maxvol]%\`:yes} {color:$getVar[color]} {timestamp}]
$volume[$sum[$volume;10]]
$setGlobalUserVar[vol;$sum[$volume;10];$authorID]
$onlyIf[$sum[$volume;10]<=$getServerVar[maxvol];Already maximum {delete:3s}]
$onlyIf[$volume!=0;React '🔇' to active]
$onlyIf[$queueLength!=0;]
$onlyIf[$voiceID!=;]`
 },
 {
type: "awaitedCommand",
 name: "volmute",
 code: `$if[$volume==0]
$editMessage[$getMessageVar[awaitvolume-$authorID];{field:Volume:\`$volume%\`:yes} {field:Max Volume:\`$getServerVar[maxvol]%\`:yes} {color:$getVar[color]} {timestamp}]
$volume[$getGlobalUserVar[vol]]
$else
$editMessage[$getMessageVar[awaitvolume-$authorID];{field:Volume:\`$volume%\`:yes} {field:Max Volume:\`$getServerVar[maxvol]%\`:yes} {color:$getVar[color]} {timestamp}]
$volume[0]
$endif
$onlyIf[$queueLength!=0;]
$onlyIf[$voiceID!=;]`
}]
