module.exports = {
 name: "filter-tremolo",
 type: "awaited",
 code: `$setServerVar[filters;Tremolo]
$let[filter;$setFilter[{"tremolo": "2"}]]
$interactionReply[Applyed \`tremolo\`.;;;;;yes]`
}