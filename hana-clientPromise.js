// @ts-check
/**
 * @module hana-client-promise - examples using @sap/hana-client
 */


/** @type {typeof import("@sap/hana-client")} */
import hanaClient from "@sap/hana-client"
import hanaClientPromise from "@sap/hana-client/extension/Promise.js"
/** @type {typeof import("@sap/xsenv")} */
import * as xsenv from "@sap/xsenv"

/**
 * hana-client Promise example
 * @param {string} [dbQuery] Database Query 
 * @returns {Promise<object>} HANA ResultSet Object
 */
export function example1(dbQuery) {
    return new Promise((resolve, reject) => {
        xsenv.loadEnv()
        let hanaOptions = xsenv.getServices({
            hana: {
                label: "hana"
            }
        })
        let conn = hanaClient.createConnection()
        var connParams = {
            serverNode: hanaOptions.hana.host + ":" + hanaOptions.hana.port,
            uid: hanaOptions.hana.user,
            pwd: hanaOptions.hana.password,
            ca: hanaOptions.hana.certificate,
            encrypt: hanaOptions.hana.encrypt,
            sslValidateCertificate: hanaOptions.hana.sslValidateCertificate
        }
        hanaClientPromise.connect(conn, connParams)
            .then(() => {
                return hanaClientPromise.exec(conn, dbQuery)
            })
            .then((result) => {
                conn.disconnect()
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * Test hana-client Promise example
 */
export function testExample1() {
    try {
        example1(`SELECT CURRENT_USER, CURRENT_SCHEMA FROM DUMMY`)
            .then((result) => {
                console.table(result)
            })
    } catch (error) {
        console.error(error)
    }
}


/**
 * Test hana-client Promise example multiple rows
 */
 export function testExample2() {
    try {
        example1(`SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT 10`)
            .then((result) => {
                console.table(result)
            })
    } catch (error) {
        console.error(error)
    }
}
