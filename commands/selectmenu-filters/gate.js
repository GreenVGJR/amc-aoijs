module.exports = {
 name: "filter-gate",
 type: "awaited",
 code: `$setServerVar[filters;Gate]
$let[filter;$setFilter[{"agate": "1"}]]
$interactionReply[Applyed \`gate\`.;;;;;yes]`
}