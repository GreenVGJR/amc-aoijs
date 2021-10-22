module.exports = {
  name: "user-info",
  code: `$author[$username[$findUser[$message;yes]]#$discriminator[$findUser[$message;yes]];$userAvatar[$findUser[$message;yes]]]
$addField[Command Used;\`$numberSeparator[$getGlobalUserVar[commanduserused;$findUser[$message;yes]];.]\`;yes]
$addField[Song Played;\`$numberSeparator[$getGlobalUserVar[userused;$findUser[$message;yes]];.]\`;yes]
$addField[Created At; \`$creationDate[$findUser[$message;yes];date]\`;yes]
$color[$getVar[color]]
$addTimestamp
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$isBot[$findUser[$message;yes]]!=true;{description:\`❌ Oops.. looks like we cant collect data user.\`} {color:$getVar[color]}]`
}
