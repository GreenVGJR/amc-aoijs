module.exports = {
 name: "filter-nightcore",
 type: "awaited",
 code: `$setServerVar[filters;Nightcore]
$let[filter;$setFilter[{"atempo": "0.720", "asetrate": "48000*1.3"}]]
$interactionReply[Applyed \`nightcore\`.;;;;;yes]`
}