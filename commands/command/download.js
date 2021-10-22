module.exports = {
  name: "download",
  code: `$if[$checkContains[$songInfo[url] $suppressErrors;https://soundcloud.com/]==true]
$attachment[$getServerVar[linkdownload];$cropText[$songInfo[title];28]_128_Bitrate.mp3]
$onlyIf[$checkContains[$getServerVar[linkdownload];playlist.m3u8]!=true;not available.]
$endif
$if[$toLowercase[$message]==]
$color[$getVar[color]]
$image[attachment://$random[1000;1000000]-thumbnail.png]
$attachment[$songInfo[thumbnail];$random[1000;1000000]-thumbnail.png]
$sendMessage[Downloading..;no]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$elseIf[$toLowercase[$message]==--refresh]
$addCmdReactions[✅]
$setServerVar[linkdownload;$jsonRequest[$jsonRequest[https://api.leref.ga/soundcloud?url=$songInfo[url];songInfo.trackURL]?client_id=$getVar[clientidsoundcloud];url]]
$onlyIf[$checkContains[$songInfo[url];https://soundcloud.com/]!=false;Only for SoundCloud.]
$endelseif
$endif
$onlyBotPerms[attachfiles;Missing Permission **Attach Files** - Bot]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$cooldown[3s;Please wait **%time%** before using again.]`
}
