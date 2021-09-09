module.exports = {
type: "awaitedComamnd",
name: "recentshuffle",
code: `$loop[1;recentplay]
$wait[2s]
$editMessage[$getUserVar[reactmessageid;$clientID];{author:Shuffle Queue:$getVar[customemoji1]} {field:Requested By:<@$authorID>:yes} {field:Song:\`$numberSeparator[$queueLength]\`:yes} {description:\`$cropText[$queue[1;$queueLength;{number} - {title}];2000]\`} {color:$getVar[color]} {footer:Redirecting..} {timestamp}]
$shuffleQueue
$onlyIf[$queueLength>1;Only have 1 song. {delete:2s}]
$onlyIf[$queueLength!=0;]
$suppressErrors`
}
