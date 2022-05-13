module.exports = {
  file: "server.js", //For stats
  database: "./database/main/main_scheme_1.sql", //For stats

  //Customize Property For Message
  pause: "⏸️ Paused.",
  resume: "▶️ Resumed!",
  skip: "⏩ Skipped!",  //Available {song}
  stop: "⏹ Stopped.",  
  remove: "Removed song on {d-amount}.", //Available {d-amount}

  shuffle: "Shuffle Queue.",
  errorjoin: "\`❌ You're not in a voice channel.\`",
  errorqueue: "\`❌ There no song was playing.\`",
  errorloop: "Only have {amount} song.", //Available {amount}
  erroruser: "{newEmbed:{title:❌ You cant use this command} {color:$getVar[color]}}",
  errorsameuser: "You must same in {voice} to use this command.", //Available {voice}
  errorbutton: "You cant use this.",
  customerror: "Something just happened.", //Custom $suppressErrors

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
  permission: "2176183360",
  deafenclient: "1", //Server Deafen Client, 0 = false | 1 = true
  defaultspotify: "youtube", //YouTube/SoundCloud
  multiseek: "1000",
  userid: "default",
  logmusic: "1", //0 = off | 1 = on
  247: "0", //0 = off | 1 = stay 24/7
  last: "null",
  linkdownload: "",
  filters: "none",
  cachemessageid: "",
  cacheplay: "",
  ratetime: "0",
  customratetime: "300",
  buttonmusic: "0", //0 = off | 1 = on
  buttonmusicmessage: "",
  buttonmusichannel: "",
  listfilters: "\`bassonly, clarity, deep, echo, flanger, gate, haas, nightcore, phaser, phone, pitch, pulsator, reverb, tempo, tremolo, remove, subboost, vaporwave, vibrato\`",

  //Emoji
  customemoji1: "https://cdn.discordapp.com/emojis/852434440668184615.png?size=4096",
  customemoji2: "https://cdn.discordapp.com/emojis/951749233919279125.png?size=4096",
  ytemoji: "https://cdn.discordapp.com/emojis/852432148207108110.png?size=4096",
  scemoji: "https://cdn.discordapp.com/emojis/852432173758676993.png?size=4096",
  loademoji: "https://cdn.discordapp.com/emojis/951749045787959337.gif?size=4096",
 
  listenuser: "0",
  listenserver: "0",
  listenglobal: "0",

  //Playlist
  playlistuser: "",
  playlistusercount: "1",
  playlistuserpublic: "off",
  playlistuserauto: "off",
  playlistuserwords: "off",
  playlistcacheuser: "",
  playlistcachecount: "1"
}
