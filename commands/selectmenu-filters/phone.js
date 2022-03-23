module.exports = {
 name: "filter-phone",
 type: "awaited",
 code: `$setServerVar[filters;Phone]
$let[filter;$setFilter[{"aresample": "8000"}]]
$interactionReply[Applyed \`phone\`.;;;;;yes]`
}