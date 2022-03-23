module.exports = {
 name: "filter-clarity",
 type: "awaited",
 code: `$setServerVar[filters;Clarity]
$let[filter;$setFilter[{"aecho": "1.0:0.7:0.1:0.7"}]]
$interactionReply[Applyed \`clarity\`.;;;;;yes]`
}