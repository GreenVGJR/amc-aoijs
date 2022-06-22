module.exports = {
  //Customize Property For Message
  pause: "⏸️ Paused.",
  resume: "▶️ Resumed!",
  skip: "⏩ Skipped!",  //Available {song}
  stop: "⏹ Stopped.",  
  remove: "Removed song on {d-amount}.", //Available {d-amount}
  shuffle: "Shuffle Queue.",

  //Error Message
  errorjoin: "\`❌ You're not in a voice channel.\`",
  errorqueue: "\`❌ There no song was playing.\`",
  errorloop: "Only have {amount} song.", //Available {amount}
  erroruser: "{newEmbed:{title:❌ You cant use this command} {color:$getVar[color]}}",
  errorsameuser: "You must same in {voice} to use this command.", //Available {voice}
  errorbutton: "You cant use this.",
  customerror: "Something just happened.", //Custom $suppressErrors

  //Event Message
  join: "Joined Voice Channel to the {join}.", //Available {join}
  dc: "Disconnected.",
  leftvc: "There no song again on queue.", //Description
  secondleftvc: "Left VC.", //Footer

  //Changing Other
  color: "a09fff",
  channelstatus: "", //Optional (channelid), for send ready message
  vol: "50", //Default Volume
  maxvol: "150", //Max Volume

  //Changing Other - Advance
  permission: "277070867456",
  deafenclient: "1", //Server Deafen Client, 0 = false | 1 = true
  defaultspotify: "youtube", //YouTube/SoundCloud
  multiseek: "1000", //Seek Command
  userid: "default",
  logmusic: "1", //0 = off | 1 = on
  247: "0", //0 = off | 1 = stay 24/7
  last: "null",
  linkdownload: "", //Stream HLS (Soon)
  filters: "none",
  cachemessageid: "",
  cacheplay: "",
  ratetime: "0",
  customratetime: "300",
  listfilters: "\`bassonly, clarity, deep, echo, flanger, gate, haas, nightcore, phaser, phone, pitch, pulsator, reverb, tempo, tremolo, remove, subboost, vaporwave, vibrato\`",

  //Emoji(s)
  customemoji1: "https://cdn.discordapp.com/emojis/852434440668184615.png?size=4096",
  customemoji2: "https://cdn.discordapp.com/emojis/951749233919279125.png?size=4096",
  ytemoji: "https://cdn.discordapp.com/emojis/852432148207108110.png?size=4096",
  scemoji: "https://cdn.discordapp.com/emojis/852432173758676993.png?size=4096",
  loademoji: "https://cdn.discordapp.com/emojis/951749045787959337.gif?size=4096",
 
  //Listen-Info
  listenuser: "0",
  listenserver: "0",
  listenglobal: "0",

  //Music Controller
  buttonmusic: "0", //0 = off | 1 = on
  buttonmusicmessage: "",
  buttonmusichannel: "",
  timechangemessage: "8000", //0 = disable | milisecond
  openpublicbutton: "0", //0 = no | 1 = yes (for inside vc users)
  forceusebutton: "0", //0 = no | 1 = yes (for everyone, include non-vc users)

  //Playlist(s)
  playlistuser: "",
  playlistusercount: "1",
  playlistuserpublic: "off",
  playlistuserauto: "off",
  playlistuserwords: "off",
  playlistuserbypass: "0", //0 = off | 1 = on (bypass from blocking)
  playlistcacheuser: "",
  playlistcachecount: "1"
}
