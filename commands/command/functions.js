module.exports = {
  name: "funcs",
  code: `$author[$getObjectProperty[data[0].desc]$getObjectProperty[message]]
Usage: \`$getObjectProperty[data[0].usage]\`
$createObject[$jsonRequest[https://api.leref.ga/functions/$message;;Functions \`$message\` not found.]]
$color[$getVar[color]]
$addTimestamp
$endif
$argsCheck[>1;Functions?]
$onlyIf[$checkContains[$botOwnerID;$authorID]!=false;]`
}
