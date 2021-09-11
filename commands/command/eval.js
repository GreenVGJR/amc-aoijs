module.exports = {
  name: "eval",
  code: `$eval[$message]
$onlyIf[$checkContains[$botOwnerID;$authorID]!=false;]
$argsCheck[>1;what]`
}
