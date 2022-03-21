// @ts-check
/**
 * @module hana-client-await - examples using @sap/hana-client
 */


/** @type {typeof import("@sap/hana-client")} */
import hanaClient from "@sap/hana-client"
import hanaClientPromise from "@sap/hana-client/extension/Promise.js"
/** @type {typeof import("@sap/xsenv")} */
import * as xsenv from "@sap/xsenv"

/**
 * hana-client Await example
 * @param {string} [dbQuery] Database Query 
 * @returns {Promise<object>} HANA ResultSet Object
 */
export async function example1(dbQuery) {
    try {
        xsenv.loadEnv()
        let hanaOptions = xsenv.getServices({
            hana: {
                label: "hana"
            }
        })
        let conn = hanaClient.createConnection()
        let connParams = {
            serverNode: hanaOptions.hana.host + ":" + hanaOptions.hana.port,
            uid: hanaOptions.hana.user,
            pwd: hanaOptions.hana.password,
            ca: hanaOptions.hana.certificate,
            encrypt: hanaOptions.hana.encrypt,
            sslValidateCertificate: hanaOptions.hana.sslValidateCertificate
        }
        await hanaClientPromise.connect(conn, connParams)
        let result = await hanaClientPromise.exec(conn, dbQuery)
        conn.disconnect()
        return result

    } catch (error) {
        throw error
    }
}

/**
 * Test hana-client Await example
 */
export async function testExample1() {
    try {
        console.table(await example1(`SELECT CURRENT_USER, CURRENT_SCHEMA FROM DUMMY`))
    } catch (error) {
        console.error(error)
    }
}


/**
 * Test hana-client Await example multiple rows
 */
 export async function testExample2() {
    try {
        console.table(await example1(`SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT 10`))
    } catch (error) {
        console.error(error)
    }
}

