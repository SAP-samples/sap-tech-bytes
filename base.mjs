// @ts-check
/**
 * @module base - Central functionality shared by all the various commands
 */

import { fileURLToPath } from 'url'
import { URL } from 'url'
const __dirname = fileURLToPath(new URL('.', import.meta.url))
import { createRequire } from 'module'
// @ts-ignore
const require = createRequire(import.meta.url)
import * as path from 'path'

import * as locale from "./locale.mjs"
const TextBundle = require('@sap/textbundle').TextBundle
/** @typeof TextBundle - instance of sap/textbundle */
export const bundle = new TextBundle(path.join(__dirname, '..', '/_i18n/messages'), locale.getLocale())

/** @type {typeof import("debug") } */
import debugModule from 'debug'
// @ts-ignore
export const debug = new debugModule('zx-scripting')
