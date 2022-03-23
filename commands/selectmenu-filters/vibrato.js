module.exports = {
 name: "filter-vibrato",
 type: "awaited",
 code: `$setServerVar[filters;Vibrato]
$let[filter;$setFilter[{"vibrato": "4"}]]
$interactionReply[Applyed \`vibrato\`.;;;;;yes]`
}