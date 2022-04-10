module.exports = {
 name: "play",
 type: "interaction",
 prototype: "slash",
 $if: "v4",
 code: `$if[$checkContains[$message[1];soundcloud.com/discover/sets/;youtube.com/playlist?list=]==true]
$interactionReply[;{newEmbed:{author:Added to queue:$getVar[customemoji1]} {footer:$queueLength Song} {description:$replaceText[$get[message];Added;;1] Song from Playlist.} {color:$getVar[color]}};;;;yes]
$else
$if[$queueLength<1]
$interactionReply[;{newEmbed:{title:Started Playing} {description:$replaceText[$get[message];Added;;1]} {color:$getVar[color]}};;;;yes]
$else
$interactionReply[;{newEmbed:{author:Added to queue:$getVar[customemoji1]} {footer:$queueLength Song} {description:$replaceText[$get[message];Added;;1]} {color:$getVar[color]}};;;;yes]
$endif
$endif
$if[$checkContains[$message[1];youtu.be;m.youtube;youtube.com]==true]
$let[message;$playTrack[youtube;$message[1]]]
$elseIf[$checkContains[$message[1];soundcloud.com;app.goo.gl]==true]
$onlyIf[$get[message]!=0;{
"content": "Track not found",
"ephemeral": "true",
"options": {
 "interaction": "true"
 }
}]
$let[message;$playTrack[soundcloud;$message[1]]]
$endelseif
$elseIf[$checkContains[$message[1];open.spotify.com/track]==true]
$if[$toLowercase[$getVar[defaultspotify]]==youtube]
$let[message;$playTrack[youtube;$advancedTextSplit[$get[url];data: ';2;"og:description" content=";2; ·;1] - $advancedTextSplit[$get[url];data: ';2;"og:title" content=";2;";1]]]
$let[url;$djsEval[require('axios').get('$message[1]');yes]]
$elseif[$toLowercase[$getVar[defaultspotify]]==soundcloud]
$let[message;$playTrack[soundcloud;$advancedTextSplit[$get[url];data: ';2;"og:description" content=";2; ·;1] - $advancedTextSplit[$get[url];data: ';2;"og:title" content=";2;";1]]]
$let[url;$djsEval[require('axios').get('$message[1]');yes]]
$endelseif
$endif
$endelseif
$else
$if[$isValidLink[$message[1]]==true]
$let[message;$playTrack[url;$message[1]]]
$else
$if[$message[2]==soundcloud]
$let[message;$playTrack[soundcloud;$message[1]]]
$elseIf[$message[2]==youtube]
$let[message;$playTrack[youtube;$message[1]]]
$endelseif
$else
$let[message;$playTrack[youtube;$message[1]]]
$endif
$endif
$endif
$if[$checkContains[$message[1];soundcloud.com/discover/sets/;youtube.com/playlist?list=]==true]
$interactionReply[;{newEmbed:{author:Adding to Queue:$getVar[customemoji2]} {footer:This can take long time.} {color:$getVar[color]}};;;;yes]
$else
$endif
$if[$voiceID[$clientID]==]
$joinVc[$voiceID;no;yes;yes]
$endif
$onlyIf[$checkCondition[$voiceID==$replaceText[$replaceText[$checkCondition[$voiceID[$clientID]==];true;$voiceID];false;$voiceID[$clientID]]]==true;{
"content": "$replaceText[$getVar[errorsameuser];{voice};<#$voiceID[$clientID]>]",
"ephemeral": "true",
"options": {
 "interaction": "true"
 }
}]
$onlyIf[$voiceID!=;{
"content": "$getVar[errorjoin]",
"ephemeral": "true",
"options": {
 "interaction": "true"
 }
}]
$onlyBotPerms[speak;{
"content": "Missing Permission, **Speak** - Bot",
"ephemeral": "true",
"options": {
 "interaction": "true"
 }
}]
$onlyBotPerms[connect;{
"content": "Missing Permission, **Connect** - Bot",
"ephemeral": "true",
"options": {
 "interaction": "true"
 }
}]`
}
