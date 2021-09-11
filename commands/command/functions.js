module.exports = {
  name: "funcs",
  code: `$if[$noMentionMessage==$getGlobalUserVar[cachemessage]]
$author[$getGlobalUserVar[cachedescs]$getGlobalUserVar[cacheerrors]]
Usage: \`$getGlobalUserVar[cachefuncs]\`
$color[$getVar[color]]
$addTimestamp
$else
$setGlobalUserVar[cachemessage;$noMentionMessage]
$setGlobalUserVar[cacheerrors;$getObjectProperty[message]]
$setGlobalUserVar[cachedescs;$getObjectProperty[data[0].desc]]
$setGlobalUserVar[cachefuncs;$getObjectProperty[data[0].usage]]
$wait[1s]
$author[$getObjectProperty[data[0].desc]$getObjectProperty[message]]
Usage: \`$getObjectProperty[data[0].usage]\`
$createObject[$jsonRequest[https://api.leref.ga/functions/$message;;Functions \`$message\` not found.]]
$color[$getVar[color]]
$addTimestamp
$endif
$argsCheck[>1;Functions?]
$onlyIf[$checkContains[$botOwnerID;$authorID]!=false;]`
}
