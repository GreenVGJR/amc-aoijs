module.exports = {
 name: "play",
 type: "interaction",
 prototype: "slash",
 $if: "v4",
 code: `$if[$checkContains[$message[1];soundcloud.com/discover/sets/;youtube.com/playlist?list=;open.spotify.com/playlist]==true]
$interactionEdit[;{newEmbed:{author:Added to queue:$getVar[customemoji1]} {footer:$queueLength Song} {description:\`$replaceText[$get[message];Added ;;1]\` Song from Playlist.} {color:$getVar[color]}};;;;no]
$else
$interactionEdit[;{newEmbed:{author:$replaceText[$replaceText[$checkCondition[$queueLength==1];true;Started Playing];false;Added to Queue]:$getVar[customemoji1]} {footer:$replaceText[$replaceText[$checkCondition[$queueLength==1];true;];false;$queueLength Song]} {description:\`$replaceText[$get[message];Added ;;1]\`} {color:$getVar[color]}};;;;no]
$endif
$onlyIf[$hasPlayer!=false;]
$onlyIf[$checkCondition[$get[message]==Added 0]==false;Track not found]
$if[$checkContains[$message[1];youtu.be;m.youtube;youtube.com]==true]
$let[message;$playTrack[youtube;$message[1]]]
$elseIf[$checkContains[$message[1];soundcloud.com;app.goo.gl]==true]
$let[message;$playTrack[soundcloud;$message[1]]]
$endelseif
$elseIf[$checkContains[$message[1];open.spotify.com/track]==true]
$if[$message[2]==]
$if[$toLowercase[$getVar[defaultspotify]]==youtube]
$let[message;$playTrack[youtube;$advancedTextSplit[$get[url];data: ';2;"og:description" content=";2; ·;1] - $advancedTextSplit[$get[url];data: ';2;"og:title" content=";2;";1]]]
$interactionEdit[;{newEmbed:{author:Processing:$getVar[loademoji]} {footer:Converting to YouTube} {color:$getVar[color]}};;;;no]
$let[url;$djsEval[require('axios').get('$message[1]');yes]]
$elseif[$toLowercase[$getVar[defaultspotify]]==soundcloud]
$let[message;$playTrack[soundcloud;$advancedTextSplit[$get[url];data: ';2;"og:description" content=";2; ·;1] - $advancedTextSplit[$get[url];data: ';2;"og:title" content=";2;";1]]]
$interactionEdit[;{newEmbed:{author:Processing:$getVar[loademoji]} {footer:Converting to SoundCloud} {color:$getVar[color]}};;;;no]
$let[url;$djsEval[require('axios').get('$message[1]');yes]]
$endelseif
$endif
$else
$if[$message[2]==youtube]
$let[message;$playTrack[youtube;$advancedTextSplit[$get[url];data: ';2;"og:description" content=";2; ·;1] - $advancedTextSplit[$get[url];data: ';2;"og:title" content=";2;";1]]]
$interactionEdit[;{newEmbed:{author:Processing:$getVar[loademoji]} {footer:Converting to YouTube} {color:$getVar[color]}};;;;no]
$let[url;$djsEval[require('axios').get('$message[1]');yes]]
$elseIf[$message[2]==soundcloud]
$let[message;$playTrack[soundcloud;$advancedTextSplit[$get[url];data: ';2;"og:description" content=";2; ·;1] - $advancedTextSplit[$get[url];data: ';2;"og:title" content=";2;";1]]]
$interactionEdit[;{newEmbed:{author:Processing:$getVar[loademoji]} {footer:Converting to SoundCloud} {color:$getVar[color]}};;;;no]
$let[url;$djsEval[require('axios').get('$message[1]');yes]]
$endelseif
$endif
$endif
$endelseif
$elseIf[$checkContains[$message[1];open.spotify.com/playlist]==true]
$let[message;$playTrack[spotify;$message[1]]]
$endelseif
$else
$if[$replaceText[$replaceText[$checkContains[$message[1];youtu.be;m.youtube;youtube.com;soundcloud.com;app.goo.gl;soundcloud.com/discover/sets/;youtube.com/playlist?list=;open.spotify.com/playlist;open.spotify.com/track];true;];false;$isValidLink[$message[1]]]==true]
$let[message;$playTrack[url;$message[1]]]
$else
$if[$message[2]==soundcloud]
$let[message;$playTrack[soundcloud;$message[1]]]
$elseIf[$message[2]==youtube]
$let[message;$playTrack[youtube;$message[1]]]
$endelseif
$elseIf[$message[1]==]
$interactionEdit[;{newEmbed:{author:Error} {description:Message not found} {color:$getVar[color]}};;;;no]
$endelseif
$else
$let[message;$playTrack[youtube;$message[1]]]
$endif
$endif
$endif
$if[$checkContains[$message[1];soundcloud.com/discover/sets/;youtube.com/playlist?list=;open.spotify.com/playlist]==true]
$interactionEdit[;{newEmbed:{author:Adding to Queue:$getVar[customemoji2]} {footer:This can take long time.} {color:$getVar[color]}};;;;no]
$endif
$if[$voiceID[$clientID]==]
$joinVc[$voiceID;no;yes;yes]
$endif
$interactionReply[;{newEmbed:{author:Processing:$getVar[loademoji]} {color:$getVar[color]}};;;;no]
$onlyIf[$checkContains[$message[1];open.spotify.com/artist;open.spotify.com/album;open.spotify.com/episode]!=true;{
"content": "Not support",
"options": {
 "interaction": "true"
 }
}]
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
