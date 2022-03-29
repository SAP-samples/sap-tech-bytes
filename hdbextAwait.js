// @ts-check
/**
 * @module hdbext-await - examples using sap-hdbext-promisfied
 */


/** @type {typeof import("sap-hdbext-promisfied")} */
import dbClass from "sap-hdbext-promisfied"
/** @type {typeof import("@sap/hdbext")} */
import * as hdbext from '@sap/hdbext'

/**
 * hdbext Await example
 * @param {string} [dbQuery] Database Query 
 * @returns {Promise<object>} HANA ResultSet Object
 */
export async function example1(dbQuery) {
    try {
        let db = new dbClass(await dbClass.createConnectionFromEnv())
        return await db.execSQL(dbQuery)
    } catch (error) {
        throw error
    }
}


/**
 * hdbext procedure example with Callbacks
 * @param {string} [schema] Database Stored Procedure Schema 
 * @param {string} [dbProcedure] Database Stored Procedure Name 
 * @param {object} [inputParams] Database Stored Procedure Input Parameters
 * @returns {Promise<object>} HANA ResultSet Object
 */
export async function example2(schema, dbProcedure, inputParams) {
    try {
        let db = new dbClass(await dbClass.createConnectionFromEnv())
        let sp = await db.loadProcedurePromisified(hdbext, schema, dbProcedure)
        return await db.callProcedurePromisified(sp, inputParams)
    } catch (error) {
        throw error
    }
}


/**
 * Test hdbext Await example
 */
 export async function testExample1() {
    try {
        console.table(await example1(`SELECT CURRENT_USER, CURRENT_SCHEMA FROM DUMMY`))
    } catch (error) {
        console.error(error)
    }
}



/**
 * Test hdbext Await example multiple rows
 */
 export async function testExample2() {
    try {
        console.table(await example1(`SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT 10`))
    } catch (error) {
        console.error(error)
    }
}

/**
 * Test hdbext Await stored procedure example
 */
 export async function testExample3() {
    try {
        console.log(await example2('SYS', 'IS_VALID_PASSWORD', {PASSWORD: "TEST"}))
    } catch (error) {
        console.error(error)
    }
}
