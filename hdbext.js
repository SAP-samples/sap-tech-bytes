// @ts-check
/**
 * @module hdbext - examples using @sap/hdbext
 */


/** @type {typeof import("@sap/hdbext")} */
import hdbext from "@sap/hdbext"
/** @type {typeof import("@sap/xsenv")} */
import * as xsenv from "@sap/xsenv"


/**
 * @callback Callback
 * @param {Error} [err] Error
 * @param {object} [result] HANA ResultSet Object
 */

/**
 * hdbext example with Callbacks
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

    hdbext.createConnection(hanaOptions.hana, (err, client) => {
        if (err) {
            callback(err)
        } else {
            client.exec(dbQuery, (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    callback(null, result)
                }
            })
        }
        return null
    })

}

/**
 * hdbext procedure example with Callbacks
 * @param {string} [schema] Database Stored Procedure Schema 
 * @param {string} [dbProcedure] Database Stored Procedure Name 
 * @param {object} [inputParams] Database Stored Procedure Input Parameters
 * @param {Callback} [callback] Callback Function to receive results
 */
export function example2(schema, dbProcedure, inputParams, callback) {
    xsenv.loadEnv()
    let hanaOptions = xsenv.getServices({
        hana: {
            label: "hana"
        }
    })

    hdbext.createConnection(hanaOptions.hana, (err, client) => {
        if (err) {
            callback(err)
        } else {
            hdbext.loadProcedure(client, schema, dbProcedure, (err, sp) => {
                if (err) {
                    callback(err)
                } else {
                    sp(inputParams, (err, parameters, tableRows) => {
                        client.disconnect()
                        callback(null, parameters)
                    })
                }
            })
        }
        return null
    })

}

/**
 * Test hdbext example with Callbacks
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
 * Test hdbext example with Callbacks Multiple Rows
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


/**
 * Test hdbext procedure example with Callbacks
 */
 export function testExample3() {
    example2('SYS', 'IS_VALID_PASSWORD', {PASSWORD: "TEST"}, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            console.table(result)
        }
    })
}
