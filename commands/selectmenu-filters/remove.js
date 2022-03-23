module.exports = {
 name: "filter-remove",
 type: "awaited",
 code: `$setServerVar[filters;$getVar[filters]]
$let[filter;$resetFilters]
$interactionReply[Reseted filters.;;;;;yes]`
}