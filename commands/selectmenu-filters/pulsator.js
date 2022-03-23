module.exports = {
 name: "filter-pulsator",
 type: "awaited",
 code: `$setServerVar[filters;Pulsator]
$let[filter;$setFilter[{"apulsator": "1"}]]
$interactionReply[Applyed \`pulsator\`.;;;;;yes]`
}