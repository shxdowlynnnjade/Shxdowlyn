import { readdirSync, existsSync, readFileSync, watch } from 'fs'
import { join, resolve } from 'path'
import { format } from 'util'
import syntaxerror from 'syntax-error'
import importFile from './import.js'
import Helper from './manejador.js'

const __dirname = Helper.__dirname(import.meta)
const comandosFolder = Helper.__dirname(join(__dirname, './comandos'))
const comandosFilter = filename => /\.(mc)?js$/.test(filename)

let watcher = {}
let comandos = {}
let comandosFolders = []

async function filesInit(folder = comandosFolder, filter = comandosFilter, conn) {
    const resolved = resolve(folder)
    if (resolved in watcher) return

    comandosFolders.push(resolved)

    await Promise.all(
        readdirSync(resolved).filter(filter).map(async filename => {
            try {
                let file = globalThis.__filename(join(resolved, filename))
                const module = await import(file)
                if (module) comandos[filename] = 'default' in module ? module.default : module
            } catch (e) {
                conn?.logger.error(e)
                delete comandos[filename]
            }
        })
    )

    const watching = watch(resolved, reload.bind(null, conn, resolved, filter))
    watching.on('close', () => deletecomandosFolder(resolved, true))
    watcher[resolved] = watching

    return comandos
}

function deletecomandosFolder(folder, isAlreadyClosed = false) {
    const resolved = resolve(folder)
    if (!(resolved in watcher)) return
    if (!isAlreadyClosed) watcher[resolved].close()
    delete watcher[resolved]
    comandosFolders.splice(comandosFolders.indexOf(resolved), 1)
}

async function reload(conn, folder = comandosFolder, filter = comandosFilter, _ev, filename) {
    if (filter(filename)) {
        let dir = globalThis.__filename(join(folder, filename), true)

        if (filename in comandos) {
            if (existsSync(dir)) conn?.logger.info(`updated comando - '${filename}'`)
            else {
                conn?.logger.warn(`deleted comando - '${filename}'`)
                return delete comandos[filename]
            }
        } else conn?.logger.info(`new comando - '${filename}'`)

        let err = syntaxerror(readFileSync(dir), filename, {
            sourceType: 'module',
            allowAwaitOutsideFunction: true
        })

        if (err) conn?.logger.error(`syntax error while loading '${filename}'\n${format(err)}`)
        else {
            try {
                const module = await importFile(globalThis.__filename(dir)).catch(console.error)
                if (module) comandos[filename] = module
            } catch (e) {
                conn?.logger.error(`error require comandos '${filename}'\n${format(e)}`)
            } finally {
                comandos = Object.fromEntries(
                    Object.entries(comandos).sort(([a], [b]) => a.localeCompare(b))
                )
            }
        }
    }
}

export { comandosFolder, comandosFilter, comandos, watcher, comandosFolders, filesInit, deletecomandosFolder, reload }