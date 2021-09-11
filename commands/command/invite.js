module.exports = {
name: "invite",
cooldown: "3s",
code: `$replaceText[$getBotInvite;permissions=0;permissions=$getVar[permission]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$client[ispublic]!=false;Your bot was private!]
$cooldown[$commandInfo[invite;cooldown];Please wait **%time%** before using again.]`
}
