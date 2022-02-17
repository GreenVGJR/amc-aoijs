module.exports = {
 name: "update",
 code: `Updated **$commandsCount** Commands
Status: $replaceText[$replaceText[$checkCondition[$get[a]==$commandsCount];true;none];false;$replaceText[$replaceText[$checkCondition[$get[a]<=$commandsCount];true;Added **$filterMessage[$sub[$get[a];$commandsCount];-]** Commands];false;Removed **$filterMessage[$sub[$get[a];$commandsCount];-]** Commands]]
$updateCommands
$let[a;$commandsCount]
$onlyIf[$botOwnerID==$authorID;]`
}
