module.exports = {
 name: "filter-deep",
 type: "awaited",
 code: `$setServerVar[filters;Deep]
$let[filter;$setFilter[{"atempo": "1.15", "asetrate": "48000*0.8"}]]
$interactionReply[Applyed \`deep\`.;;;;;yes]`
}