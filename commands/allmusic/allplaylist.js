module.exports = [{
 name: "playlist",
 $if: "v4",
 code: `$reply[$messageID;no]
$if[$message[1]==]
$if[$getGlobalUserVar[playlistuser]==]
$author[1;Playlist;$getVar[customemoji1]]
$description[1;You dont have your playlist.]
$addTimestamp[1]
$addSelectMenu[1;selectmenu;Options - $cropText[$username[$authorID];15;0;..]#$discriminator[$authorID];1;1;no;Options:List Options:optionplaylist-$authorID:no]
$color[1;$getVar[color]]
$else
$author[1;Playlist;$getVar[customemoji1]]
$title[1;Page 1]
$description[1;$replaceText[$replaceText[$checkCondition[$getObjectProperty[name1]==undefined];true;];false;1. $getObjectProperty[name1]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name2]==undefined];true;];false;2. $getObjectProperty[name2]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name3]==undefined];true;];false;3. $getObjectProperty[name3]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name4]==undefined];true;];false;4. $getObjectProperty[name4]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name5]==undefined];true;];false;5. $getObjectProperty[name5]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name6]==undefined];true;];false;6. $getObjectProperty[name6]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name7]==undefined];true;];false;7. $getObjectProperty[name7]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name8]==undefined];true;];false;8. $getObjectProperty[name8]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name9]==undefined];true;];false;9. $getObjectProperty[name9]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name10]==undefined];true;];false;10. $getObjectProperty[name10]]]
$color[1;$getVar[color]]
$footer[1;$sub[$getGlobalUserVar[playlistusercount];1] Song]
$thumbnail[1;https://discord.com/users/$authorID]
$addButton[2;Page $truncate[$sum[$divide[$getGlobalUserVar[playlistusercount];10];0.8]];2;rightplaylist;$replaceText[$replaceText[$checkCondition[$sub[$getGlobalUserVar[playlistusercount];1]>=11];true;no];false;yes];⏩]
$addButton[2;Close;1;closeplaylist;no;⏹]
$addButton[2;Page 1;2;leftplaylist;yes;⏪]
$addSelectMenu[1;selectmenu;Options - $cropText[$username[$authorID];15;0;..]#$discriminator[$authorID];1;1;no;Options:List Options:optionplaylist-$authorID:no;Delete Playlist:Delete your playlist.:deleteplaylist-$authorID:no]
$createObject[{$cropText[$getGlobalUserVar[playlistuser];$charCount[$getGlobalUserVar[playlistuser]];2]}]
$endif
$else
$if[$findUser[$message[1];no]==]
$author[1;Playlist;$getVar[customemoji1]]
$description[1;Cant find the user.]
$addTimestamp[1]
$addSelectMenu[1;selectmenu;Options - $cropText[$username[$authorID];15;0;..]#$discriminator[$authorID];1;1;no;Options:List Options:optionplaylist-$authorID:no]
$color[1;$getVar[color]]
$else
$if[$getGlobalUserVar[playlistuserpublic;$findUser[$message[1];no]]==on]
$if[$getGlobalUserVar[playlistuser;$findUser[$message[1];no]]==]
$author[1;Playlist;$getVar[customemoji1]]
$description[1;<@!$findUser[$message[1];no]> dont have the playlist.]
$addTimestamp[1]
$addSelectMenu[1;selectmenu;Options - $cropText[$username[$authorID];15;0;..]#$discriminator[$authorID];1;1;no;Options:List Options:optionplaylist-$authorID:no]
$color[1;$getVar[color]]
$else
$author[1;Playlist - $cropText[$username[$findUser[$message[1];no]];15;0;..]#$discriminator[$findUser[$message[1];no]];$getVar[customemoji1]]
$title[1;Page 1 - $truncate[$sum[$divide[$getGlobalUserVar[playlistusercount];10];0.8]]]
$description[1;$replaceText[$replaceText[$checkCondition[$getObjectProperty[name1]==undefined];true;];false;1. $getObjectProperty[name1]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name2]==undefined];true;];false;2. $getObjectProperty[name2]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name3]==undefined];true;];false;3. $getObjectProperty[name3]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name4]==undefined];true;];false;4. $getObjectProperty[name4]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name5]==undefined];true;];false;5. $getObjectProperty[name5]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name6]==undefined];true;];false;6. $getObjectProperty[name6]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name7]==undefined];true;];false;7. $getObjectProperty[name7]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name8]==undefined];true;];false;8. $getObjectProperty[name8]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name9]==undefined];true;];false;9. $getObjectProperty[name9]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name10]==undefined];true;];false;10. $getObjectProperty[name10]]]
$color[1;$getVar[color]]
$footer[1;$sub[$getGlobalUserVar[playlistusercount;$findUser[$message[1];no]];1] Song]
$thumbnail[1;https://discord.com/users/$authorID]
$addButton[2;Page $truncate[$sum[$divide[$getGlobalUserVar[playlistusercount];10];0.8]];2;rightplaylist;yes;⏩]
$addButton[2;Close;1;closeplaylist;yes;⏹]
$addButton[2;Page 1;2;leftplaylist;yes;⏪]
$addSelectMenu[1;selectmenu;Options - $cropText[$username[$authorID];15;0;..]#$discriminator[$authorID] (Button Disabled);1;1;no;Options:List Options:optionplaylist-$authorID:no;Delete Playlist:Delete your playlist.:deleteplaylist-$authorID:no]
$createObject[{$cropText[$getGlobalUserVar[playlistuser;$findUser[$message[1];no]];$charCount[$getGlobalUserVar[playlistuser;$findUser[$message[1];no]]];2]}]
$endif
$else
$if[$findUser[$message[1];no]==$authorID]
$if[$getGlobalUserVar[playlistuser]==]
$author[1;Playlist;$getVar[customemoji1]]
$description[1;You dont have your playlist.]
$addTimestamp[1]
$addSelectMenu[1;selectmenu;Options - $cropText[$username[$authorID];15;0;..]#$discriminator[$authorID];1;1;no;Options:List Options:optionplaylist-$authorID:no]
$color[1;$getVar[color]]
$else
$author[1;Playlist;$getVar[customemoji1]]
$title[1;Page 1]
$description[1;$replaceText[$replaceText[$checkCondition[$getObjectProperty[name1]==undefined];true;];false;1. $getObjectProperty[name1]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name2]==undefined];true;];false;2. $getObjectProperty[name2]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name3]==undefined];true;];false;3. $getObjectProperty[name3]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name4]==undefined];true;];false;4. $getObjectProperty[name4]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name5]==undefined];true;];false;5. $getObjectProperty[name5]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name6]==undefined];true;];false;6. $getObjectProperty[name6]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name7]==undefined];true;];false;7. $getObjectProperty[name7]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name8]==undefined];true;];false;8. $getObjectProperty[name8]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name9]==undefined];true;];false;9. $getObjectProperty[name9]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name10]==undefined];true;];false;10. $getObjectProperty[name10]]]
$color[1;$getVar[color]]
$footer[1;$sub[$getGlobalUserVar[playlistusercount];1] Song]
$thumbnail[1;https://discord.com/users/$authorID]
$addButton[2;Page $truncate[$sum[$divide[$getGlobalUserVar[playlistusercount];10];0.8]];2;rightplaylist;$replaceText[$replaceText[$checkCondition[$sub[$getGlobalUserVar[playlistusercount];1]>=11];true;no];false;yes];⏩]
$addButton[2;Close;1;closeplaylist;no;⏹]
$addButton[2;Page 1;2;leftplaylist;yes;⏪]
$addSelectMenu[1;selectmenu;Options - $cropText[$username[$authorID];15;0;..]#$discriminator[$authorID];1;1;no;Options:List Options:optionplaylist-$authorID:no;Delete Playlist:Delete your playlist.:deleteplaylist-$authorID:no]
$createObject[{$cropText[$getGlobalUserVar[playlistuser];$charCount[$getGlobalUserVar[playlistuser]];2]}]
$endif
$else
$author[1;Playlist;$getVar[customemoji1]]
$description[1;Cant find the user.]
$addTimestamp[1]
$addSelectMenu[1;selectmenu;Options - $cropText[$username[$authorID];15;0;..]#$discriminator[$authorID];1;1;no;Options:List Options:optionplaylist-$authorID:no]
$color[1;$getVar[color]]
$endif
$endif
$endif
$endif
`
},
{
name: "playlist-add",
 $if: "v4",
 code: `$if[$getGlobalUserVar[playlistuserwords]==off]
$if[$checkContains[$message[1];youtu.be;m.youtube;youtube.com;soundcloud.com;app.goo.gl;open.spotify.com/track;soundcloud.com/discover/sets/;youtube.com/playlist?list=;cdn.discordapp.com]==false]
$if[$advancedTextSplit[$message[1];http://;1]!=]
Invalid link
$else
$if[$advancedTextSplit[$message[1];https://;1]!=]
Invalid link
$else
Invalid link (\`$message[1]\`)
$endif
$endif
$else
$editMessage[$get[id];{newEmbed:{field:Added:$message:yes} {field:Position:$numberSeparator[$sub[$getGlobalUserVar[playlistusercount];1]]:yes} {timestamp} {color:$getVar[color]}}]
$createObject[{$cropText[$getGlobalUserVar[playlistuser];$charCount[$getGlobalUserVar[playlistuser]];2]}]
$editMessage[$get[id];{newEmbed:{author:Checking Playlist:$getVar[loademoji]} {timestamp} {color:$getVar[color]}}]
$setGlobalUserVar[playlistusercount;$sum[$getGlobalUserVar[playlistusercount];1]]
$setGlobalUserVar[playlistuser;$getGlobalUserVar[playlistuser],
"name$getGlobalUserVar[playlistusercount]": "$nonEscape[$message]"]
$onlyIf[$isValidLink[$nonEscape[$message]]!=false;Invalid link]
$editMessage[$get[id];{newEmbed:{author:Checking Link:$getVar[loademoji]} {timestamp} {color:$getVar[color]}}]
$let[id;$sendMessage[{newEmbed:{author:Adding to playlist:$getVar[loademoji]} {timestamp} {color:$getVar[color]}};yes]]
$endif
$else
$editMessage[$get[id];{newEmbed:{field:Added:$message:yes} {field:Position:$numberSeparator[$sub[$getGlobalUserVar[playlistusercount];1]]:yes} {timestamp} {color:$getVar[color]}}]
$createObject[{$cropText[$getGlobalUserVar[playlistuser];$charCount[$getGlobalUserVar[playlistuser]];2]}]
$editMessage[$get[id];{newEmbed:{author:Checking Playlist:$getVar[loademoji]} {timestamp} {color:$getVar[color]}}]
$setGlobalUserVar[playlistusercount;$sum[$getGlobalUserVar[playlistusercount];1]]
$setGlobalUserVar[playlistuser;$getGlobalUserVar[playlistuser],
"name$getGlobalUserVar[playlistusercount]": "$nonEscape[$message]"]
$let[id;$sendMessage[{newEmbed:{author:Adding to playlist:$getVar[loademoji]} {timestamp} {color:$getVar[color]}};yes]]
$endif
$onlyIf[$message[1]!=;What song/playlist you want add]`
},
 {
 name: "playlist-play",
 $if: "v4",
 code: `
$if[$checkContains[$getUserVar[playlistcacheuser];soundcloud.com/discover/sets/;youtube.com/playlist?list=]==true]
$setUserVar[playlistcacheuser;]
$deleteMessage[$get[id]]
$sendMessage[{newEmbed:{author:Added to queue:$getVar[customemoji1]} {footer:$queueLength Song} {description:$replaceText[$get[message];Added;;1] Song from Playlist.} {color:$getVar[color]}};no]
$else
$if[$queueLength<1]
$if[$getServerVar[logmusic]==1]
$setUserVar[playlistcacheuser;]
$deleteMessage[$get[id]]
$endif
$editMessage[$get[id];{newEmbed:{title:Started Playing} {description:$replaceText[$get[message];Added;;1]} {color:$getVar[color]}}]
$setUserVar[playlistcacheuser;]
$else
$editMessage[$get[id];{newEmbed:{author:Added to queue:$getVar[customemoji1]} {footer:$queueLength Song} {description:$replaceText[$get[message];Added;;1]} {color:$getVar[color]}}]
$onlyIf[$queueLength!=0;]
$setUserVar[playlistcacheuser;]
$endif
$endif
$onlyIf[$checkCondition[$get[message]==Added 0]==false;Track not found]
$if[$checkContains[$getUserVar[playlistcacheuser];open.spotify.com/track]==true]
$if[$toLowercase[$getVar[defaultspotify]]==youtube]
$let[message;$playTrack[youtube;$advancedTextSplit[$get[url];data: ';2;"og:description" content=";2; ·;1] - $advancedTextSplit[$get[url];data: ';2;"og:title" content=";2;";1]]]
$editMessage[$get[id];{newEmbed:{author:Searching:$getVar[loademoji]} {footer:Converting to YouTube} {color:$getVar[color]}}]
$let[url;$djsEval[require('axios').get('$getUserVar[playlistcacheuser]');yes]]
$elseif[$toLowercase[$getVar[defaultspotify]]==soundcloud]
$let[message;$playTrack[soundcloud;$advancedTextSplit[$get[url];data: ';2;"og:description" content=";2; ·;1] - $advancedTextSplit[$get[url];data: ';2;"og:title" content=";2;";1]]]
$editMessage[$get[id];{newEmbed:{author:Searching:$getVar[loademoji]} {footer:Converting to SoundCloud} {color:$getVar[color]}}]
$let[url;$djsEval[require('axios').get('$getUserVar[playlistcacheuser]');yes]]
$endelseif
$else
$let[message;$playTrack[youtube;$getUserVar[playlistcacheuser]]]
$endif
$else
$if[$checkContains[$getUserVar[playlistcacheuser];youtu.be;m.youtube]==true]
$let[message;$playTrack[youtube;$getUserVar[playlistcacheuser]]]
$elseif[$checkContains[$getUserVar[playlistcacheuser];soundcloud.com;app.goo.gl]==true]
$endelseif
$else
$let[message;$playTrack[youtube;$getUserVar[playlistcacheuser]]]
$endif
$endif
$if[$checkContains[$getUserVar[playlistcacheuser];soundcloud.com/discover/sets/;youtube.com/playlist?list=]==true]
$editMessage[$get[id];{newEmbed:{author:Adding to Queue:$getVar[customemoji2]} {footer:This can take long time.} {color:$getVar[color]}}]
$editMessage[$get[id];{newEmbed:{author:Searching:$getVar[loademoji]} {color:$getVar[color]}}]
$else
$editMessage[$get[id];{newEmbed:{author:Searching:$getVar[loademoji]} {color:$getVar[color]}}]
$endif
$onlyIf[$checkContains[$getUserVar[playlistcacheuser];open.spotify.com/playlist;open.spotify.com/artist;open.spotify.com/album;open.spotify.com/episode]!=true;Not support]
$if[$voiceID[$clientID]==]
$joinVc[$voiceID;no;yes;yes]
$endif
$setUserVar[playlistcacheuser;$get[url]]
$let[url;$replaceText[$replaceText[$isValidLink[https://$advancedTextSplit[$getObjectProperty[name$filterMessage[$message[1];-]];#LEFT#(https://;2;);1]];true;https://$advancedTextSplit[$getObjectProperty[name$filterMessage[$message[1];-]];#LEFT#(https://;2;);1]];false;$getObjectProperty[name$filterMessage[$message[1];-]]]]
$createObject[{$cropText[$getGlobalUserVar[playlistuser];$charCount[$getGlobalUserVar[playlistuser]];2]}]
$let[id;$sendMessage[{newEmbed:{author:Processing:$getVar[loademoji]} {color:$getVar[color]}};yes]]
$onlyIf[$truncate[$message[1]]<$getGlobalUserVar[playlistusercount];Your playlist only has **$numberSeparator[$sub[$getGlobalUserVar[playlistusercount];1]]** song.]
$onlyIf[$isNumber[$message[1]]!=false;Must number]
$onlyIf[$message[1]!=;Usage: \`playlist-play <number position>\`]
$onlyIf[$getGlobalUserVar[playlistusercount]!=1;You dont have your playlist.]`
},
 {
 name: "rightplaylist",
 type: "interaction",
 prototype: "button",
 code: `$interactionUpdate[;{newEmbed:{author:Playlist:$getVar[customemoji1]}
{title:Page $get[page]}
{description:$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];9]]==undefined];true;];false;$sub[$get[secondpage];9]. $getObjectProperty[name$sub[$get[secondpage];9]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];8]]==undefined];true;];false;$sub[$get[secondpage];8]. $getObjectProperty[name$sub[$get[secondpage];8]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];7]]==undefined];true;];false;$sub[$get[secondpage];7]. $getObjectProperty[name$sub[$get[secondpage];7]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];6]]==undefined];true;];false;$sub[$get[secondpage];6]. $getObjectProperty[name$sub[$get[secondpage];6]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];5]]==undefined];true;];false;$sub[$get[secondpage];5]. $getObjectProperty[name$sub[$get[secondpage];5]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];4]]==undefined];true;];false;$sub[$get[secondpage];4]. $getObjectProperty[name$sub[$get[secondpage];4]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];3]]==undefined];true;];false;$sub[$get[secondpage];3]. $getObjectProperty[name$sub[$get[secondpage];3]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];2]]==undefined];true;];false;$sub[$get[secondpage];2]. $getObjectProperty[name$sub[$get[secondpage];2]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];1]]==undefined];true;];false;$sub[$get[secondpage];1]. $getObjectProperty[name$sub[$get[secondpage];1]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];0]]==undefined];true;];false;$sub[$get[secondpage];0]. $getObjectProperty[name$sub[$get[secondpage];0]]]}
{color:$getVar[color]}
{footer:$sub[$getGlobalUserVar[playlistusercount;$interactionData[author.id]];1] Song} {thumbnail:https://discord.com/users/$interactionData[author.id]};{actionRow:{selectMenu:selectmenu:Options - $cropText[$username[$authorID];15;0;..]#$discriminator[$authorID]:1:1:no:{selectMenuOptions:Options:optionplaylist-$authorID:List Options:no} {selectMenuOptions:Delete Playlist:deleteplaylist-$authorID:Delete your playlist.}}} {actionRow:{button:Page 1:2:leftplaylist:$replaceText[$replaceText[$checkCondition[$sum[$get[page];1]<1];true;yes];false;no]:⏪}
{button:Close:1:closeplaylist:no:⏹}
{button:Page $truncate[$sum[$divide[$getGlobalUserVar[playlistusercount;$interactionData[author.id]];10];0.8]]:2:rightplaylist:$replaceText[$replaceText[$checkCondition[$sub[$getGlobalUserVar[playlistusercount;$interactionData[author.id]];1]>=11];true;$replaceText[$replaceText[$checkCondition[$truncate[$sum[$divide[$getGlobalUserVar[playlistusercount;$interactionData[author.id]];10];0.8]]>=$sum[$get[page];1]];true;no];false;yes]];false;yes]:⏩}}]
$let[secondpage;$multi[$get[page];10]]
$let[page;$sum[$advancedTextSplit[$getEmbed[$channelID;$interactionData[message.id];1;title]; ;2];1]]
$createObject[{$cropText[$getGlobalUserVar[playlistuser;$interactionData[author.id]];$charCount[$getGlobalUserVar[playlistuser;$interactionData[author.id]]];2]}]
$onlyIf[$checkContains[$getEmbed[$channelID;$interactionData[message.id];1;thumbnail];$authorID]==true;{
 "content": "You cant use this button.",
 "ephemeral": "true",
 "options": {
  "interaction": "true"
 }
}]`
},
 {
 name: "leftplaylist",
 type: "interaction",
 prototype: "button",
 code: `$interactionUpdate[;{newEmbed:{author:Playlist:$getVar[customemoji1]}
{title:Page $get[page]}
{description:$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];9]]==undefined];true;];false;$sub[$get[secondpage];9]. $getObjectProperty[name$sub[$get[secondpage];9]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];8]]==undefined];true;];false;$sub[$get[secondpage];8]. $getObjectProperty[name$sub[$get[secondpage];8]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];7]]==undefined];true;];false;$sub[$get[secondpage];7]. $getObjectProperty[name$sub[$get[secondpage];7]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];6]]==undefined];true;];false;$sub[$get[secondpage];6]. $getObjectProperty[name$sub[$get[secondpage];6]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];5]]==undefined];true;];false;$sub[$get[secondpage];5]. $getObjectProperty[name$sub[$get[secondpage];5]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];4]]==undefined];true;];false;$sub[$get[secondpage];4]. $getObjectProperty[name$sub[$get[secondpage];4]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];3]]==undefined];true;];false;$sub[$get[secondpage];3]. $getObjectProperty[name$sub[$get[secondpage];3]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];2]]==undefined];true;];false;$sub[$get[secondpage];2]. $getObjectProperty[name$sub[$get[secondpage];2]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];1]]==undefined];true;];false;$sub[$get[secondpage];1]. $getObjectProperty[name$sub[$get[secondpage];1]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];0]]==undefined];true;];false;$sub[$get[secondpage];0]. $getObjectProperty[name$sub[$get[secondpage];0]]]}
{color:$getVar[color]}
{footer:$sub[$getGlobalUserVar[playlistusercount;$interactionData[author.id]];1] Song} {thumbnail:https://discord.com/users/$interactionData[author.id]};{actionRow:{selectMenu:selectmenu:Options - $cropText[$username[$authorID];15;0;..]#$discriminator[$authorID]:1:1:no:{selectMenuOptions:Options:optionplaylist-$authorID:List Options:no} {selectMenuOptions:Delete Playlist:deleteplaylist-$authorID:Delete your playlist.}}} {actionRow:{button:Page 1:2:leftplaylist:$replaceText[$replaceText[$checkCondition[$sub[$get[page];1]<1];true;yes];false;no]:⏪}
{button:Close:1:closeplaylist:no:⏹}
{button:Page $truncate[$sum[$divide[$getGlobalUserVar[playlistusercount;$interactionData[author.id]];10];0.8]]:2:rightplaylist:$replaceText[$replaceText[$checkCondition[$sub[$getGlobalUserVar[playlistusercount;$interactionData[author.id]];1]>=11];true;$replaceText[$replaceText[$checkCondition[$truncate[$sum[$divide[$getGlobalUserVar[playlistusercount;$interactionData[author.id]];10];0.8]]>=$sum[$get[page];1]];true;no];false;yes]];false;yes]:⏩}}]
$let[secondpage;$multi[$get[page];10]]
$let[page;$sub[$advancedTextSplit[$getEmbed[$channelID;$interactionData[message.id];1;title]; ;2];1]]
$createObject[{$cropText[$getGlobalUserVar[playlistuser;$interactionData[author.id]];$charCount[$getGlobalUserVar[playlistuser;$interactionData[author.id]]];2]}]
$onlyIf[$checkContains[$getEmbed[$channelID;$interactionData[message.id];1;thumbnail];$authorID]==true;{
 "content": "You cant use this button.",
 "ephemeral": "true",
 "options": {
  "interaction": "true"
 }
}]`
},
{
 name: "playlist",
 type: "interaction",
 prototype: "button",
 $if: "v4",
 code: `$if[$getGlobalUserVar[playlistuser]==]
$interactionUpdate[;{newEmbed:{author:Playlist:$getVar[customemoji1]} {description:You dont have your playlist.} {timestamp} {color:$getVar[color]}};{actionRow:{selectMenu:selectmenu:Options - $cropText[$username[$authorID];15;0;..]#$discriminator[$authorID]:1:1:no:{selectMenuOptions:Options:optionplaylist-$authorID:List Options:no}}}]
$else
$interactionUpdate[;{newEmbed:{author:Playlist:$getVar[customemoji1]}
{title:Page $get[page]}
{description:$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];9]]==undefined];true;];false;$sub[$get[secondpage];9]. $getObjectProperty[name$sub[$get[secondpage];9]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];8]]==undefined];true;];false;$sub[$get[secondpage];8]. $getObjectProperty[name$sub[$get[secondpage];8]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];7]]==undefined];true;];false;$sub[$get[secondpage];7]. $getObjectProperty[name$sub[$get[secondpage];7]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];6]]==undefined];true;];false;$sub[$get[secondpage];6]. $getObjectProperty[name$sub[$get[secondpage];6]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];5]]==undefined];true;];false;$sub[$get[secondpage];5]. $getObjectProperty[name$sub[$get[secondpage];5]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];4]]==undefined];true;];false;$sub[$get[secondpage];4]. $getObjectProperty[name$sub[$get[secondpage];4]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];3]]==undefined];true;];false;$sub[$get[secondpage];3]. $getObjectProperty[name$sub[$get[secondpage];3]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];2]]==undefined];true;];false;$sub[$get[secondpage];2]. $getObjectProperty[name$sub[$get[secondpage];2]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];1]]==undefined];true;];false;$sub[$get[secondpage];1]. $getObjectProperty[name$sub[$get[secondpage];1]]]
$replaceText[$replaceText[$checkCondition[$getObjectProperty[name$sub[$get[secondpage];0]]==undefined];true;];false;$sub[$get[secondpage];0]. $getObjectProperty[name$sub[$get[secondpage];0]]]}
{color:$getVar[color]}
{footer:$sub[$getGlobalUserVar[playlistusercount;$interactionData[author.id]];1] Song} {thumbnail:https://discord.com/users/$interactionData[author.id]};{actionRow:{selectMenu:selectmenu:Options - $cropText[$username[$authorID];15;0;..]#$discriminator[$authorID]:1:1:no:{selectMenuOptions:Options:optionplaylist-$authorID:List Options:no} {selectMenuOptions:Delete Playlist:deleteplaylist-$authorID:Delete your playlist.}}} {actionRow:{button:Page 1:2:leftplaylist:$replaceText[$replaceText[$checkCondition[$sum[$get[page];1]<1];true;yes];false;yes]:⏪}
{button:Close:1:closeplaylist:no:⏹}
{button:Page $truncate[$sum[$divide[$getGlobalUserVar[playlistusercount;$interactionData[author.id]];10];0.8]]:2:rightplaylist:$replaceText[$replaceText[$checkCondition[$sub[$getGlobalUserVar[playlistusercount;$interactionData[author.id]];1]>=11];true;$replaceText[$replaceText[$checkCondition[$truncate[$sum[$divide[$getGlobalUserVar[playlistusercount;$interactionData[author.id]];10];0.8]]>=$sum[$get[page];1]];true;no];false;yes]];false;yes]:⏩}}]
$let[secondpage;$multi[$get[page];10]]
$let[page;1]
$createObject[{$cropText[$getGlobalUserVar[playlistuser;$interactionData[author.id]];$charCount[$getGlobalUserVar[playlistuser;$interactionData[author.id]]];2]}]
$endif
$onlyIf[$checkContains[$getEmbed[$channelID;$interactionData[message.id];1;thumbnail];$authorID]==true;{
 "content": "You cant use this button.",
 "ephemeral": "true",
 "options": {
  "interaction": "true"
 }
}]`
},
 {
 name: "closeplaylist",
 type: "interaction",
 prototype: "button",
 code: `$deleteMessage[$interactionData[message.id]]
$onlyIf[$checkContains[$getEmbed[$channelID;$interactionData[message.id];1;thumbnail];$authorID]==true;{
 "content": "You cant use this button.",
 "ephemeral": "true",
 "options": {
  "interaction": "true"
 }
}]`
},
 {
 name: "selectmenu",
 type: "interaction",
 prototype: "selectMenu",
 code: `$if[$advancedTextSplit[$interactionData[values[0]];-;1]==optionplaylist;{execute:optionplaylist}]
$if[$advancedTextSplit[$interactionData[values[0]];-;1]==deleteplaylist;{execute:confirmplaylist}]
$if[$advancedTextSplit[$interactionData[values[0]];-;1]==resetplaylist;{execute:resetplaylist}]
$onlyIf[$advancedTextSplit[$interactionData[values[0]];-;2]==$authorID;{
 "content": "You cant use this selectmenu.",
 "ephemeral": "true",
 "options": {
  "interaction": "true"
 }
}]`
},
 {
 name: "optionplaylist",
 type: "awaited",
 $if: "v4",
 code: `$interactionUpdate[;{newEmbed:{author:Playlist:$getVar[customemoji1]} {title:Options} {field:Auto-Add:\`$getGlobalUserVar[playlistuserauto;$interactionData[author.id]]\`:yes} {field:Words:\`$getGlobalUserVar[playlistuserwords;$interactionData[author.id]]\`:yes} {field:Public:\`$getGlobalUserVar[playlistuserpublic;$interactionData[author.id]]\`:yes} {color:$getVar[color]} {thumbnail:https://discord.com/users/$interactionData[author.id]}};{actionRow:{button:Back:2:playlist:no:↩} {button:Reset:4:resetplaylist:no:🗑}} {actionRow:{button:Auto-Add:3:autoplaylist-$getGlobalUserVar[playlistuserauto;$interactionData[author.id]]:no} {button:Words:3:wordsplaylist-$getGlobalUserVar[playlistuserwords;$interactionData[author.id]]:no} {button:Public:3:publicplaylist-$getGlobalUserVar[playlistuserpublic;$interactionData[author.id]]:no}}]`
},
 {
 name: "resetplaylist",
 type: "interaction",
 prototype: "button",
 $if: "v4",
 code: `$interactionEdit[;{newEmbed:{author:Playlist:$getVar[customemoji1]} {title:Options} {field:Auto-Add:\`$getGlobalUserVar[playlistuserauto;$interactionData[author.id]]\`:yes} {field:Words:\`$getGlobalUserVar[playlistuserwords;$interactionData[author.id]]\`:yes} {field:Public:\`$getGlobalUserVar[playlistuserpublic;$interactionData[author.id]]\`:yes} {color:$getVar[color]} {thumbnail:https://discord.com/users/$interactionData[author.id]}};{actionRow:{button:Back:2:playlist:no:↩} {button:Reset:4:resetplaylist:no:🗑}} {actionRow:{button:Auto-Add:3:autoplaylist-$getGlobalUserVar[playlistuserauto;$interactionData[author.id]]:no} {button:Words:3:wordsplaylist-$getGlobalUserVar[playlistuserwords;$interactionData[author.id]]:no} {button:Public:3:publicplaylist-$getGlobalUserVar[playlistuserpublic;$interactionData[author.id]]:no}}]
$deleteMessage[$interactionData[message.id]]
$wait[1s]
$if[$getGlobalUserVar[playlistuserwords;$interactionData[author.id]]-$getGlobalUserVar[playlistuserauto;$interactionData[author.id]]-$getGlobalUserVar[playlistuserpublic;$interactionData[author.id]]!=off-off-off]
$interactionEdit[;{author:Failed Reseting} {color:$getVar[color]} {timestamp}]
$else
$interactionEdit[;{newEmbed:{author:Reseted.} {color:$getVar[color]} {timestamp}}]
$endif
$setGlobalUserVar[playlistuserauto;off;$interactionData[author.id]]
$setGlobalUserVar[playlistuserpublic;off;$interactionData[author.id]]
$setGlobalUserVar[playlistuserwords;off;$interactionData[author.id]]
$interactionReply[;{newEmbed:{author:Reseting:$getVar[loademoji]} {color:$getVar[color]} {timestamp}}]
$onlyIf[$checkContains[$getEmbed[$channelID;$interactionData[message.id];1;thumbnail];$authorID]==true;{
 "content": "You cant use this button.",
 "ephemeral": "true",
 "options": {
  "interaction": "true"
 }
}]`
},
 {
  name: "autoplaylist-off",
  type: "interaction",
  prototype: "button",
  code: `$loop[1;{};optionplaylist]
$setGlobalUserVar[playlistuserauto;on;$interactionData[author.id]]
$onlyIf[$checkContains[$getEmbed[$channelID;$interactionData[message.id];1;thumbnail];$authorID]==true;{
 "content": "You cant use this button.",
 "ephemeral": "true",
 "options": {
  "interaction": "true"
 }
}]`
},
 {
  name: "autoplaylist-on",
  type: "interaction",
  prototype: "button",
  code: `$loop[1;{};optionplaylist]
$setGlobalUserVar[playlistuserauto;off;$interactionData[author.id]]
$onlyIf[$checkContains[$getEmbed[$channelID;$interactionData[message.id];1;thumbnail];$authorID]==true;{
 "content": "You cant use this button.",
 "ephemeral": "true",
 "options": {
  "interaction": "true"
 }
}]`
},
{
  name: "wordsplaylist-off",
  type: "interaction",
  prototype: "button",
  code: `$loop[1;{};optionplaylist]
$setGlobalUserVar[playlistuserwords;on;$interactionData[author.id]]
$onlyIf[$checkContains[$getEmbed[$channelID;$interactionData[message.id];1;thumbnail];$authorID]==true;{
 "content": "You cant use this button.",
 "ephemeral": "true",
 "options": {
  "interaction": "true"
 }
}]`
},
 {
  name: "wordsplaylist-on",
  type: "interaction",
  prototype: "button",
  code: `$loop[1;{};optionplaylist]
$setGlobalUserVar[playlistuserwords;off;$interactionData[author.id]]
$onlyIf[$checkContains[$getEmbed[$channelID;$interactionData[message.id];1;thumbnail];$authorID]==true;{
 "content": "You cant use this button.",
 "ephemeral": "true",
 "options": {
  "interaction": "true"
 }
}]`
},
{
  name: "publicplaylist-off",
  type: "interaction",
  prototype: "button",
  code: `$loop[1;{};optionplaylist]
$setGlobalUserVar[playlistuserpublic;on;$interactionData[author.id]]
$onlyIf[$checkContains[$getEmbed[$channelID;$interactionData[message.id];1;thumbnail];$authorID]==true;{
 "content": "You cant use this button.",
 "ephemeral": "true",
 "options": {
  "interaction": "true"
 }
}]`
},
 {
  name: "publicplaylist-on",
  type: "interaction",
  prototype: "button",
  code: `$loop[1;{};optionplaylist]
$setGlobalUserVar[playlistuserpublic;off;$interactionData[author.id]]
$onlyIf[$checkContains[$getEmbed[$channelID;$interactionData[message.id];1;thumbnail];$authorID]==true;{
 "content": "You cant use this button.",
 "ephemeral": "true",
 "options": {
  "interaction": "true"
 }
}]`
},
 {
 name: "confirmplaylist",
 type: "awaited",
 code: `$interactionUpdate[;{newEmbed:{author:Confirmation to delete your playlist} {color:$getVar[color]} {thumbnail:https://discord.com/users/$interactionData[author.id]}};{actionRow:{button:No:2:noconfirmdeleteplaylist:no:❌} {button:Yes:2:confirmdeleteplaylist:no:✅}}]`
},
 {
 name: "confirmdeleteplaylist",
 type: "interaction",
 prototype: "button",
 code: `$interactionEdit[;{newEmbed:{author:Successful deleted.} {color:$getVar[color]} {timestamp}]
$onlyIf[$getGlobalUserVar[playlistusercount;$interactionData[author.id]]==1;Already deleted]
$onlyIf[$getGlobalUserVar[playlistuser;$interactionData[author.id]]==;Already deleted]
$interactionEdit[;{newEmbed:{author:Checking Playlist for last time:$getVar[loademoji]} {color:$getVar[color]} {timestamp}]
$setGlobalUserVar[playlistusercount;1;$interactionData[author.id]]
$setGlobalUserVar[playlistuser;;$interactionData[author.id]]
$interactionEdit[;{newEmbed:{author:Deleting Playlist:$getVar[loademoji]} {color:$getVar[color]} {timestamp}]
$createObject[{$cropText[$getGlobalUserVar[playlistuser;$interactionData[author.id]];$charCount[$getGlobalUserVar[playlistuser;$interactionData[author.id]]];2]}]
$deleteMessage[$interactionData[message.id]]
$interactionReply[;{newEmbed:{author:Checking Playlist:$getVar[loademoji]} {color:$getVar[color]} {timestamp}]
$onlyIf[$checkContains[$getEmbed[$channelID;$interactionData[message.id];1;thumbnail];$authorID]==true;{
 "content": "You cant use this button.",
 "ephemeral": "true",
 "options": {
  "interaction": "true"
 }
}]`
},
 {
 name: "noconfirmdeleteplaylist",
 type: "interaction",
 prototype: "button",
 code: `$deleteMessage[$interactionData[message.id]]
$interactionReply[;{newEmbed:{author:Canceled.} {color:$getVar[color]} {timestamp}]
$onlyIf[$checkContains[$getEmbed[$channelID;$interactionData[message.id];1;thumbnail];$authorID]==true;{
 "content": "You cant use this button.",
 "ephemeral": "true",
 "options": {
  "interaction": "true"
 }
}]`
}]
