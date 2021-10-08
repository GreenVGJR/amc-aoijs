module.exports = {
  name: "uptime",
  cooldown: "3s",
  code: `\`\`\`
$client[readytimestamp]
\`\`\`
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$cooldown[$commandInfo[uptime;cooldown];Please wait **%time%** before using again.]`
}
