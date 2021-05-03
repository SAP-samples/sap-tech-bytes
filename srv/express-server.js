/* eslint-disable no-console */
'use strict'

//Catch uncaught errors
process.on('uncaughtException', function (err) {
    console.error(err.name + ': ' + err.message, err.stack.replace(/.*\n/, '\n')) // eslint-disable-line
})

const express = require('express')
const path = require('path')
const fileExists = require('fs').existsSync
const glob = require('glob')

function ExpressServer() {
    //Default port
    this.port = process.env.PORT || 4000
    this.baseDir = process.cwd();
    this.routes = [];

    let app
    let httpServer
    app = express()
    app.express = express
    this.app = app

    this.start = async  function () {
        app.baseDir = this.baseDir;

        //Load express.js
        let expressFile = path.join(app.baseDir, 'server/express.js');
        if (fileExists(expressFile)) {
            await require(expressFile)(app)
        }

        //Load routes
        let routesDir = path.join(this.baseDir, 'routes/**/*.js');
        let files = glob.sync(routesDir);
        this.routerFiles = files;
        if (files.length !== 0) {
            for (let file of files) {
                await require(file)(app)
            }
        }

        httpServer = app.listen(this.port)
        console.log(`Express Server Now Running On http://localhost:${this.port}/`)
    }

    this.stop = async function () {
        httpServer.close()
    }
}
module.exports = ExpressServer