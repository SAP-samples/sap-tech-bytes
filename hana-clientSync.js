// @ts-check
/**
 * @module hana-client-sync - examples using @sap/hana-client
 */


/** @type {typeof import("@sap/hana-client")} */
import hanaClient from "@sap/hana-client"
/** @type {typeof import("@sap/xsenv")} */
import * as xsenv from "@sap/xsenv"

/**
 * hana-client synchronous example
 * @param {string} [dbQuery] Database Query 
 * @returns {object} HANA ResultSet Object
 */
export function example1(dbQuery) {
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
    conn.connect(connParams)
    let result = conn.exec(dbQuery)
    conn.disconnect()
    return result
}

/**
 * Test hana-client synchronous example
 */
export function testExample1() {
    console.table(example1(`SELECT CURRENT_USER, CURRENT_SCHEMA FROM DUMMY`))
}


/**
 * Test hana-client synchronous example multiple rows
 */
 export function testExample2() {
    console.table(example1(`SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT 10`))
}

