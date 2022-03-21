// @ts-check
import express from 'express'
import * as loader from './utils/loader.js'
/** @type {typeof import("@sap/hdbext")} */
import hdbext from "@sap/hdbext"
/** @type {typeof import("@sap/xsenv")} */
import * as xsenv from "@sap/xsenv"
import open from 'open'

/**
 * Build the Express Server and Setup Route Loading dynamically from a /routes folder
 */
export default class ExpressServer {

    /**
    * @constructor
    * Express Server Constructor
    */
    constructor() {
        /** @type {Number} - Default Port*/
        this.port = parseInt(process.env.PORT) || 4_000
        if (!(/^[1-9]\d*$/.test(this.port.toString()) && 1 <= 1 * this.port && 1 * this.port <= 65_535)) {
            throw new Error(`${this.port} is not a valid HTTP port value`)
        }

        /** @type {String} - Directory relative to root of the project*/
        this.baseDir = process.cwd()
        this.routes = []
        this.app = express()
        // @ts-ignore
        this.app.express = express
    }


    /**
     * Start Express Server
     */
    async start() {
        let app = this.app
        // @ts-ignore
        app.baseDir = this.baseDir
        xsenv.loadEnv()
        let hanaOptions = xsenv.getServices({
            hana: {
                tag: "hana"
            }
        })
        hanaOptions.hana.pooling = true
        app.use(
            hdbext.middleware(hanaOptions.hana)
        )

        //Load routes
        loader.importFolder('routes/**/*.js', app)

        this.httpServer = app.listen(this.port)
        let serverAddr = `http://localhost:${this.port}`
        console.log(`Express Server listening on ${serverAddr}`)
        open(serverAddr)

    }

    /**
    * Stop Express Server
    */
    stop() {
        this.httpServer.close()
    }
   
}