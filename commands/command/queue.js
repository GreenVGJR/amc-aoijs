module.exports = {
  name: "queue",
  aliases: ["q"],
  cooldown: "3s",
  code: `$author[Queue;$getVar[customemoji1]]
$addField[Page $replaceText[$replaceText[$checkCondition[$noMentionMessage!=];false;1];true;$noMentionMessage] - $truncate[$sum[$divide[$queueLength;10];0.9]] ($abbreviate[$charCount[$queue[1;$queueLength;{number} - {title}]]]);$queue[$replaceText[$replaceText[$checkCondition[$noMentionMessage!=];false;1];true;$noMentionMessage];10;\`{number} - {title}\`]]
$addField[Estimated Next Playing;\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[3];(];)];00:00:00;LIVE]]\`;yes]
$addField[Next Requested By;<@$songInfo[userID;1]>;yes]
$addField[Requested By;<@$songInfo[userID]>;yes]
$addField[Total Duration;\`$replaceText[$formatDate[$filterMessage[$filterMessage[$multi[$sum[$splitText[4];$splitText[7]];1000];(];)];mm:ss];0:;00:]\`;yes]
$addField[Next Playing;[$songInfo[title;1] | $songInfo[publisher;1]]($songInfo[url;1]);yes]
$addField[Now Playing;[$songInfo[title] | $songInfo[publisher]]($songInfo[url]);yes]
$footer[$queueLength Song]
$thumbnail[$songInfo[thumbnail]]
$addTimestamp
$color[$getVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$checkContains[$replaceText[$replaceText[$checkCondition[$noMentionMessage!=];false;1];true;$noMentionMessage];-]!=true;]
$onlyIf[$replaceText[$replaceText[$checkCondition[$noMentionMessage!=];false;1];true;$noMentionMessage]<=$truncate[$sum[$divide[$queueLength;10];0.9]];]
$onlyIf[$isNumber[$replaceText[$replaceText[$checkCondition[$noMentionMessage!=];false;1];true;$noMentionMessage]]!=false;]
$onlyIf[$queueLength!=1;{author:Currently Playing:$getVar[customemoji1]} {title:$songInfo[title]} {url:$songInfo[url]} {footer:$songInfo[publisher]:$songInfo[thumbnail]} {field:Duration:\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[6];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$filterMessage[$filterMessage[$splitText[6];(];)];00:00:00;LIVE]]\`:yes} {field:Duration Left:\`$replaceText[$replaceText[$checkCondition[$charCount[$replaceText[$filterMessage[$filterMessage[$splitText[6];(];)];00:00:00;LIVE]]==2];true;undefined];false;$replaceText[$replaceText[$checkCondition[$filterMessage[$filterMessage[$splitText[6];(];)]==00:00:00];true;LIVE];false;$filterMessage[$filterMessage[$splitText[3];(];)]]]\`:yes} {thumbnail:$songInfo[thumbnail]} {color:$getVar[color]}]
$if[$queueLength==1]
$textSplit[$songInfo[duration_left] $songInfo[duration]; ]
$else
$textSplit[$songInfo[duration_left] $songInfo[duration] $songInfo[duration;1]; ]
$endif
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$cooldown[$commandInfo[queue;cooldown];Please wait **%time%** before using again.]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$suppressErrors[something just happened.]`
}
