module.exports = {
 name: "slash",
 code: `$editMessage[$get[id];{newEmbed:{author:Successful Created.} {color:$getVar[color]} {footer:$numberSeparator[$sub[$dateStamp;$get[time]]]ms} {timestamp}}]
$createApplicationCommand[$guildID;options;List Options Music;true;slash;
{
 "name": "music",
 "description": "24/7, Log",
 "type": "SUB_COMMAND",
 "options": [{
    "name": "24-7",
    "description": "Disable/Enable 24/7",
    "type": 3,
    "require": "true",
    "choices": [{
     "name": "Disable",
     "value": "off"
   },
   {
     "name": "Enable",
     "value": "on"
   }]
   },
   {
    "name": "log",
    "description": "Disable/Enable Log",
    "type": 3,
    "require": "true",
    "choices": [{
     "name": "Disable",
     "value": "off-log"
   },
   {
     "name": "Enable",
     "value": "on-log"
   }]
 }]
}]
$createApplicationCommand[$guildID;play;Play song;true;slash;
[{
 "name": "name",
 "description": "Write/Put the Song/Link here",
 "type": 3,
 "require": "true"
},
{
 "name": "platform",
 "description": "You can select the platform you want - YouTube (Default)",
 "type": 3,
 "require": "false",
 "choices": [{
   "name": "YouTube",
   "value": "youtube"
   },
   {
    "name": "SoundCloud",
    "value": "soundcloud"
   }]
}]
]
$let[time;$dateStamp]
$let[id;$sendMessage[{newEmbed:{author:Creating Slash:$getVar[loademoji]} {color:$getVar[color]} {timestamp}};yes]]
$onlyBotPerms[useappcmds;Missing Permission, **Use Application Commands** - Bot]
$onlyPerms[manageserver;Missing Permission, **Manage Server** - User]`
}
