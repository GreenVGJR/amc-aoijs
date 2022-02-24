module.exports = {
 name: "eval",
 $if: "v4",
 code: `$eval[$message]
$onlyIf[$botOwnerID==$authorID;]`
}
