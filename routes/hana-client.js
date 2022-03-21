// @ts-check
/** @type {typeof import("@sap/hana-client")} */
import client from "@sap/hana-client"
/** @type {typeof import("@sap/xsenv")} */
import * as xsenv from "@sap/xsenv"
import * as express from 'express'

/**       
 * hana-client Route
 * @param {Object} app - Express application instance
 */
export default function (app) {
    /**
     * @swagger
     *
     * /rest/hanaClient:
     *   get:
     *     summary: Basic examples
     *     tags:
     *       - hanaClient
     *     responses:
     *       '200':
     *         description: Info
     * @param {express.Request} [req] Request Object from Express 
     * @param {express.Response} [res] Response Object from Express
     * @returns {any}        
     */
    app.get("/rest/hanaClient", (req, res) => {
        return query(res, `select CURRENT_USER, CURRENT_SCHEMA from DUMMY`)
    })

    /**
     * @swagger
     *
     * /rest/hanaClient:
     *   get:
     *     summary: Basic examples #2
     *     tags:
     *       - hanaClient
     *     responses:
     *       '200':
     *         description: Info
     * @param {express.Request} [req] Request Object from Express 
     * @param {express.Response} [res] Response Object from Express
     * @returns {any}        
     */
    app.get("/rest/hanaClient2", (req, res) => {
        return query(res, `SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT 10`)
    })
}

/**
* hana-client Promise example
* @param {express.Response} [res] Response Object from Express
* @param {string} [dbQuery] Database Query
* @returns {any}  
*/
function query(res, dbQuery) {
    let hanaOptions = xsenv.getServices({
        hana: {
            label: "hana"
        }
    })
    let conn = client.createConnection()
    let connParams = {
        serverNode: hanaOptions.hana.host + ":" + hanaOptions.hana.port,
        uid: hanaOptions.hana.user,
        pwd: hanaOptions.hana.password,
        ca: hanaOptions.hana.certificate,
        encrypt: hanaOptions.hana.encrypt,
        sslValidateCertificate: hanaOptions.hana.sslValidateCertificate
    }
    conn.connect(connParams, (err) => {
        if (err) {
            return res.type("text/plain").status(500).send(`ERROR: ${JSON.stringify(err)}`)
        } else {
            conn.exec(dbQuery, (err, result) => {
                if (err) {
                    return res.type("text/plain").status(500).send(`ERROR: ${JSON.stringify(err)}`)
                } else {
                    conn.disconnect()
                    return res.type("application/json").status(200).send(result)
                }
            })
        }
        return null
    })
}