module.exports = {
name: "playlist-add",
code: `$setGlobalUserVar[$message[1];$messageSlice[1]]
$title[Your song has added on $message[1]]
$footer[Status: $replaceText[$replaceText[$checkCondition[$getGlobalUserVar[$message[1]]==];true;Add];false;Replace]]
$color[$getVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$replaceText[$message[1];-;]<=10;Only available \`10\` slot.]
$onlyIf[$isNumber[$message[1]]!=false;Must number!]
$cooldown[3s;Please wait **%time%** before using again.]
$argsCheck[>2;Usage: \`playlist-add (number playlist) (song)\`]
$suppressErrors[something just happened.]`
}
