module.exports = {
name: "invite",
code: `$replaceText[$getBotInvite;permissions=0;permissions=$getVar[permission]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$client[ispublic]!=false;Your bot was private]
$cooldown[3s;Please wait **%time%** before using again.]`
}
