module.exports = {
name: "playlist-add",
cooldown: "3s",
code: `$setGlobalUserVar[$message[1];$message[2]]
$title[Your song has added on $message[1]]
$footer[Status: $replaceText[$replaceText[$checkCondition[$getGlobalUserVar[$message[1]]==];true;Add];false;Replace]]
$color[$getVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$checkContains[$message[2];https://youtu.be/;https://m.youtube.com/watch?v=;https://www.youtube.com/watch?v=;https://youtube.com/watch?v=;playlist?;https://soundcloud.com/]!=false;Failed.]
$onlyIf[$checkContains[$message[1];-]!=true;Failed.]
$onlyIf[$message[1]<=10;Only available \`10\` slot.]
$onlyIf[$isNumber[$message[1]]!=false;Must number!]
$cooldown[$commandInfo[playlist-add;cooldown];Please wait **%time%** before using again.]
$argsCheck[2;Usage: \`playlist-add (number playlist) (song)\`]
$suppressErrors[something just happened.]`
}
