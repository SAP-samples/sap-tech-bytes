import { existsSync as fileExists } from 'fs'
import * as path from 'path'
import g from "glob"
import { promisify } from 'util'
const glob = promisify(g)

/**
 * Dynamic Import on single project file (with file exists check)
 * @param {String} file - JavaScript file to load and import
 * @param {Object} app - Express Application Instance
 */
 export async function importFile(file, app) {
          let targetFile = path.join(app.baseDir, file)
          if (fileExists(targetFile)) {
              const { default: importFunction } = await import(`file://${targetFile}`)
              importFunction(app)
          }
 }

/**
 * Dynamic Import on folder full of project files
 * @param {String} folder - Project folder to load and import all js files within
 * @param {Object} app - Express Application Instance
 */
 export async function importFolder(folder, app) {

    let routesDir = path.join(app.baseDir, folder)
    let files = await glob(routesDir)
   // this.routerFiles = files
    if (files.length !== 0) {
        for (let file of files) {
            const { default: Route } = await import(`file://${file}`)
            Route(app)
        }
    }   
}