module.exports = {
  name: "playskip",
  aliases: ["ps"],
  code: `$if[$checkContains[$getGlobalUserVar[logmusic];0;1]==false]
$deleteMessage[$getUserVar[reactmessageid;$clientID]]
$endif
$skipTo[$sub[$queueLength;1]]
$replaceText[$replaceText[$checkCondition[$queueLength>1];false;];true;$replaceText[$replaceText[$checkContains[$getGlobalUserVar[logmusic];0;2];true;Starting Playing: \`$playSong[$message;$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;0s];1;120s];2;7d];$replaceText[$replaceText[$replaceText[$getGlobalUserVar[247];0;yes];1;yes];2;no];No result.]\`];false;]]
$botTyping
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$onlyBotPerms[connect;Can't connect to the voice channel. - Missing Permission]
$onlyBotPerms[speak;Can't speak on the voice channel. - Missing Permission]
$onlyBotPerms[embedlinks;addreactions;Missing Permission, **Embed Links** n **Add Reactions**]
$cooldown[3s;Please wait **%time%** before using again.]
$argsCheck[>1;Please write name of song or put link video.]
$onlyIf[$queueLength>=1;Require **1 song** to run it.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors`
}
