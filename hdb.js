// @ts-check
/**
 * @module hdb - examples using hdb
 */


/** @type {typeof import("hdb")} */
import hanaClient from "hdb"
/** @type {typeof import("@sap/xsenv")} */
import * as xsenv from "@sap/xsenv"

/**
 * @callback Callback
 * @param {Error} [err] Error
 * @param {object} [result] HANA ResultSet Object
 */

/**
 * hdb example with Callbacks
 * @param {string} [dbQuery] Database Query 
 * @param {Callback} [callback] Callback Function to receive results
 */
export function example1(dbQuery, callback) {
    xsenv.loadEnv()
    let hanaOptions = xsenv.getServices({
        hana: {
            label: "hana"
        }
    })   
    let conn = hanaClient.createClient(hanaOptions.hana)
    conn.on('error', (err) => {
        throw(err)
    })

    conn.connect((err) => {
        if (err) {
            callback(err)
        } else {
            conn.exec(dbQuery, (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    conn.disconnect()
                    callback(null, result)
                }
            })
        }
        return null
    })

}

/**
 * Test hdb example with Callbacks
 */
export function testExample1() {
    example1(`SELECT CURRENT_USER, CURRENT_SCHEMA FROM DUMMY`, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            console.table(result)
        }
    })
}

/**
 * Test hdb example with Callbacks Multiple Rows
 */
 export function testExample2() {
    example1(`SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT 10`, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            console.table(result)
        }
    })
}
