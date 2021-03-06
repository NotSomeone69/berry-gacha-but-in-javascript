//some important values
const express = require("express")
const app = express()
const fs = require('fs')
const inv = JSON.parse(fs.readFileSync('./inv.json', 'utf-8'))
const list = JSON.parse(fs.readFileSync('./list.json', 'utf-8'))
const prefix = "j>"

//idk what is this
app.get("/", (req, res) => {
  res.send("bare bare daze")
})
app.listen(3000, () => {
  console.log("Stand is ready")
})

//to make the bot work
let Discord = require("discord.js")
let client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]})

client.on("ready", () => {
  client.user.setActivity(prefix+"help", {type: `PLAYING` })
})

//event to read messages
client.on("message", message =>{
  const authorId = message.author.id

  if(message.content === prefix+"help") {
    let embed = new Discord.MessageEmbed () 
    .setTitle("Commands :")
    .setDescription("for now there's no commands other than `"+prefix+"gacha`\nand `"+prefix+"inv`")
    .setColor("YELLOW")
    message.channel.send(embed)
  }

  if(message.content.startsWith(prefix+"inv")) {
    if(!inv.hasOwnProperty(authorId)) {
      let embed = new Discord.MessageEmbed () 
    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }) + '?size=1024')
    .setTitle("inventory :")
    .setDescription("There's nothing in here")
    .setColor("YELLOW")
    message.channel.send(embed)
    } else {
    let s1 = inv[authorId]["1S"]
    let s2 = inv[authorId]["2S"]
    let s3 = inv[authorId]["3S"]
    let s4 = inv[authorId]["4S"]
    let s5 = inv[authorId]["5S"]
    let s7 = inv[authorId]["7S"]
    let sL = inv[authorId]["limitedS"]
    let sI = inv[authorId]["∞S"]
    var text = ""
    if(inv[authorId]["∞S"] !== 0) {
      var text = "\n**∞<:ColoredStar:817061930241228851> : **"+sI
      console.log("text has been edited")
    }
    let embed = new Discord.MessageEmbed () 
    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }) + '?size=1024')
    .setTitle("inventory :")
    .setDescription("**1<:ColoredStar:817061930241228851> : **"+s1+"\n**2<:ColoredStar:817061930241228851> : **"+s2+"\n**3<:ColoredStar:817061930241228851> : **"+s3+"\n**4<:ColoredStar:817061930241228851> : **"+s4+"\n**5<:ColoredStar:817061930241228851> : **"+s5+"\n**7<:ColoredStar:817061930241228851> : **"+s7+"\n**Limited<:ColoredStar:817061930241228851> : **"+sL+text)
    .setColor("YELLOW")
    message.channel.send(embed)
    }
  }

  if(message.content === prefix+"gacha") {
    //here is to check if the authorId isnt in json file
    if(!inv.hasOwnProperty(authorId)) {
      console.log("user doesnt have inv")
      //here to set the value inside json file
      inv[authorId] = {
        "∞S" : 0,
        "limitedS" : 0,
        "7S" : 0,
        "5S" : 0,
        "4S" : 0,
        "3S" : 0,
        "2S" : 0,
        "1S" : 0
      }
      console.log("user inv has been setted")
    }
    const userInv = inv[authorId]
    var rarity = "unknown"
    var item = "unknown"
    const chance = [Math.floor(Math.random() * 100)+1]
    if (chance <= 25) {
      var rarity = "1<:ColoredStar:817061930241228851>"
      userInv["1S"] += 1
      let toPick = list["1S"]
      var item = toPick[Math.floor(Math.random() * toPick.length)]
    } else if (chance <= 47) {
      var rarity = "2<:ColoredStar:817061930241228851>"
      userInv["2S"] += 1
      let toPick = list["2S"]
      var item = toPick[Math.floor(Math.random() * toPick.length)]
    } else if (chance <= 65) {
      var rarity = "3<:ColoredStar:817061930241228851>"
      userInv["3S"] += 1
      let toPick = list["3S"]
      var item = toPick[Math.floor(Math.random() * toPick.length)]
    } else if (chance <= 80) {
      var rarity = "4<:ColoredStar:817061930241228851>"
      userInv["4S"] += 1
      let toPick = list["4S"]
      var item = toPick[Math.floor(Math.random() * toPick.length)]
    } else if (chance <= 90) {
      var rarity = "5<:ColoredStar:817061930241228851>"
      userInv["5S"] += 1
      let toPick = list["5S"]
      var item = toPick[Math.floor(Math.random() * toPick.length)]
    } else if (chance <= 96) {
      var rarity = "7<:ColoredStar:817061930241228851>"
      userInv["7S"] += 1
      let toPick = list["7S"]
      var item = toPick[Math.floor(Math.random() * toPick.length)]
    } else if (chance <= 99) {
      var rarity = "limited<:ColoredStar:817061930241228851>"
      userInv["limitedS"] += 1
      let toPick = list["limitedS"]
      var item = toPick[Math.floor(Math.random() * toPick.length)]
    } else if (chance <= 100) {
      var rarity = "∞<:ColoredStar:817061930241228851>"
      userInv["∞S"] += 1
      let toPick = list["∞S"]
      var item = toPick[Math.floor(Math.random() * toPick.length)]
    }
    console.log("generating compeleted")
    //then to save it
      fs.writeFile('./inv.json', JSON.stringify(inv, null, 2), err => {
        if (err) {
          console.log(err)
        }
      })
      console.log("file saved")
    //send embed
    let embed = new Discord.MessageEmbed () 
    .setAuthor("Jotarry Gacha")
    .setTitle(rarity)
    .setDescription(item)
    .setThumbnail("https://media.discordapp.net/attachments/783658117602607135/814704386898657290/berry_bot.png")
    .setColor("YELLOW")
    .setFooter(`${message.author.username} just got an item`)
    message.channel.send(embed)
  }
})

client.login(process.env.token)
