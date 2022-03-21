/*eslint no-console: 0, no-unused-vars: 0*/
// @ts-check
"use strict"
if(parseInt(process.versions.node.split('.')[0]) > 14){
    console.log(`XSJS only supports Node.js version 10.x, 12.x, or 14.x`)
    process.exit()
}
import open from 'open'
const {default: xsjs} = await import('@sap/xsjs')
const xsenv = await import('@sap/xsenv')

 /** @type {Number} - Default Port*/
let port  = parseInt(process.env.PORT) || 3_000
if (!(/^[1-9]\d*$/.test(port.toString()) && 1 <= 1 * port && 1 * port <= 65_535)) {
     console.error(`${port} is not a valid HTTP port value`)
}
var options = {
	anonymous : true, 
	redirectUrl : "/index.xsjs"
}

// configure HANA
xsenv.loadEnv()
try {
	options = Object.assign(options, xsenv.getServices({ hana: {tag: "hana"} }))
} catch (err) {
	console.log("[WARN]", err.message)
}

// start server
xsjs(options).listen(port)

let serverAddr = `http://localhost:${port}`
console.log(`Server listening on ${serverAddr}`)
open(serverAddr)