module.exports = {
type: "interactionCommand",
name: "filter",
code: `$if[$message[1]==]
$title[Filter]
$description[\`\`\`
30 ) 3d, 8d, 8d-v2, chipmunk, chorus, clarity, distorted, deep, delay, double, echo, earwax, fan, flanger, gate, half, high, low, mid, nightcore, nightcore-normal, phaser, pulsator, pulsator-2x, purebass, space, surround, vaporwave, vibrato, vibrato-2x

2  ) all, clear
\`\`\`]
$addField[Filters;$getServerVar[filters];no]
$color[$getVar[color]]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$elseif[$toLowercase[$message[1]]==nightcore]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1.3;speed:0.775;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Nightcore} {color:$getVar[color]}]
$setServerVar[filters;Nightcore]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==chipmunk]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1.9;speed:0.550;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Chipmunk} {color:$getVar[color]}]
$setServerVar[filters;Chipmunk]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==surround]
$songFilter[phaser:0;flanger:0;gate:0;surround:1;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[300ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Surround} {color:$getVar[color]}]
$setServerVar[filters;Surround]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==flanger]
$songFilter[phaser:0;flanger:1;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Flanger} {color:$getVar[color]}]
$setServerVar[filters;Flanger]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==gate]
$songFilter[phaser:0;flanger:0;gate:1;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Gate} {color:$getVar[color]}]
$setServerVar[filters;Gate]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==chorus]
$songFilter[phaser:1;flanger:1;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Chorus} {color:$getVar[color]}]
$setServerVar[filters;Chorus]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==clear]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Clearing..
$editIn[2msClearing.. $random[1;30]%;Clearing.. $random[31;50]%;Clearing.. $random[51;70]%;Clearing.. $random[71;100]%;{title:Cleared.} {color:$getVar[color]}]
$setServerVar[filters;none]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==phaser]
$songFilter[phaser:1;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Phaser} {color:$getVar[color]}]
$setServerVar[filters;Phaser]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==earwax]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:1;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Earwax} {color:$getVar[color]}]
$setServerVar[filters;Earwax]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==echo]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:100;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Echo} {color:$getVar[color]}]
$setServerVar[filters;Echo]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==pulsator]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0.5;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Pulsator} {color:$getVar[color]}]
$setServerVar[filters;Pulsator]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==pulsator-2x]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:2;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Pulsator 2x} {color:$getVar[color]}]
$setServerVar[filters;Pulsator 2x]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==distorted]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:99;pulsator:0;vibrato:0]
$songFilter[contrast:99]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Distorted} {color:$getVar[color]}]
$setServerVar[filters;Distorted]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==vibrato]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0.3]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Vibrato} {color:$getVar[color]}]
$setServerVar[filters;Vibrato]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==vibrato-2x]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0.6]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Vibrato 2x} {color:$getVar[color]}]
$setServerVar[filters;Vibrato 2x]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==space]
$songFilter[phaser:1;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:1;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Space} {color:$getVar[color]}]
$setServerVar[filters;Space]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==all]
$songFilter[phaser:1;flanger:1;gate:1;surround:1;bass:10;pitch:1.1;speed:1.1;earwax:1;echo:100;contrast:99;pulsator:0.125;vibrato:0.3]
Applying..
$editIn[2s;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = All} {color:$getVar[color]}]
$setServerVar[filters;All]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==deep]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:-3;pitch:0.9;speed:1.1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
$songFilter[pitch:0.9;speed:1.1;bass:-3]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Deep} {color:$getVar[color]}]
$setServerVar[filters;Deep]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==3d]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0.125;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = 3D} {color:$getVar[color]}]
$setServerVar[filters;3D]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==8d]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:30;contrast:0;pulsator:0.08;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = 8D} {color:$getVar[color]}]
$setServerVar[filters;8D]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==clarity]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0.1;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Clarity} {color:$getVar[color]}]
$setServerVar[filters;Clarity]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==nightcore-normal]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1.3;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Nightcore Normal} {color:$getVar[color]}]
$setServerVar[filters;Nightcore Normal]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==half]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:0;speed:0.5;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Half} {color:$getVar[color]}]
$setServerVar[filters;Half]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==double]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:0;speed:2;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Double} {color:$getVar[color]}]
$setServerVar[filters;Double]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==fan]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:25;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Fan} {color:$getVar[color]}]
$setServerVar[filters;Fan]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==purebass]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:20;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Purebass} {color:$getVar[color]}]
$setServerVar[filters;Purebass]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==low]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Low} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0.05;contrast:0;pulsator:0;vibrato:0]
$setServerVar[filters;Low]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==mid]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Mid} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0.2;contrast:0;pulsator:0;vibrato:0]
$setServerVar[filters;Mid]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==high]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = High} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0.07;contrast:0;pulsator:0;vibrato:0]
$setServerVar[filters;High]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==delay]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Delay} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:1000;contrast:0;pulsator:0;vibrato:0]
$setServerVar[filters;Delay]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==8d-v2]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = 8D V2} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;echo:0.1;contrast:0;pulsator:0.15;vibrato:0;earwax:1]
$setServerVar[filters;8D V2]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseIf[$toLowercase[$replaceText[$message[1];-; ]]==$toLowercase[$getServerVar[filters]]]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:1;speed:1;earwax:0;echo:0;contrast:0;pulsator:0;vibrato:0]
Clearing..
$editIn[2msClearing.. $random[1;30]%;Clearing.. $random[31;50]%;Clearing.. $random[51;70]%;Clearing.. $random[71;100]%;{title:Cleared.} {color:$getVar[color]}]
$setServerVar[filters;none]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$elseif[$toLowercase[$message[1]]==vaporwave]
Applying..
$editIn[2ms;Applying.. $random[1;55]%;Applying.. $random[56;100]%;{title:Applyed.} {footer:Filter = Vaporwave} {color:$getVar[color]}]
$songFilter[phaser:0;flanger:0;gate:0;surround:0;bass:0;pitch:0.875;speed:1;echo:0;contrast:0;pulsator:0;vibrato:0;earwax:0]
$setServerVar[filters;Vaporwave]
$setGlobalUserVar[commanduserused;$sum[$getGlobalUserVar[commanduserused];1]]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$endelseif
$else
There no filter \`$message\`.
$endif
$onlyIf[$songInfo[duration]!=0 Seconds (00:00:00);\`This track was LIVE\`]
$onlyIf[$queueLength!=0;$getVar[errorqueue]]
$onlyIf[$voiceID!=;$getVar[errorjoin]]
$cooldown[3s;Please wait **%time%** before using again.]
$onlyIf[$replaceText[$replaceText[$checkCondition[$getServerVar[userid]==default];true;$authorID];false;$getServerVar[userid]]==$authorID;{title:❌ You cant use this command} {color:$getVar[color]}]
$interactionReply[\`$userTag[$authorID]\` using slash.]
$suppressErrors`
}
