module.exports = {
 name: "filter-echo",
 type: "awaited",
 code: `$setServerVar[filters;Echo]
$let[filter;$setFilter[{"aecho": "1.0:0.5:30:0.9"}]]
$interactionReply[Applyed \`echo\`.;;;;;yes]`
}