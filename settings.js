import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import fs from "fs"

global.botNumber = "" 

global.owner = [
// ZONA DE JIDS
["5493863447787", "jade </>", true],
["5493863402551"],
// ZONA DE LIDS 
["", "", true],
["", "", true], 
["", "", true]
]

global.mods = []
global.suittag = ["5493863447797"] 
global.prems = []


global.libreria = "Baileys Multi Device"
global.vs = "^1.3.2"
global.nameqr = "shadow"
global.sessions = "Sessions/Principal"
global.jadi = "Sessions/SubBot"
global.MichiJadibts = true

global.botname = "Shxdowlyn"
global.textbot = "Shxdowlyn, jade"
global.dev = "SHXDOWLYN"
global.author = "*SHXDOWLYN* © mᥲძᥱ ᥕі𝗍һ Jade"
global.etiqueta = "© Jade | 𝟤𝟢𝟤6"
global.currency = "¢ Pesos"
global.michipg = "https://files.catbox.moe/4aoqq0.jpg"
global.icono = "https://files.catbox.moe/ymq02m.jpg"
global.catalogo = fs.readFileSync('./lib/catalogo.jpg')


global.group = "https://chat.whatsapp.com/JWVjGYj7MFv351BgW8OVWu?mode=ems_copy_t"
global.community = ""
global.channel = "https://whatsapp.com/channel/0029VbBx9210gcfSqAtvxf1t"
global.github = "https://github.com"
global.gmail = "minexdt@gmail.com"
global.ch = {
ch1: "120363420941524030@newsletter"
}


global.APIs = {
vreden: { url: "https://api.vreden.web.id", key: null },
delirius: { url: "https://api.delirius.store", key: null },
zenzxz: { url: "https://api.zenzxz.my.id", key: null },
siputzx: { url: "https://api.siputzx.my.id", key: null },
adonix: { url: "https://api-adonix.ultraplus.click", key: null }
}


let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.redBright("Update 'settings.js'"))
import(`${file}?update=${Date.now()}`)
})