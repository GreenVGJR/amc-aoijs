module.exports = {
 name: "filter-reverb",
 type: "awaited",
 code: `$setServerVar[filters;Reverb]
$let[filter;$setFilter[{"aecho": "1.0:0.8:5:0.5"}]]
$interactionReply[Applyed \`reverb\`.;;;;;yes]`
}