// @ts-check
/**
 * @module hdb-await - examples using sap-hdb-promisfied
 */


/** @type {typeof import("sap-hdb-promisfied")} */
import dbClass from "sap-hdb-promisfied"

/**
 * hdb Await example
 * @param {string} [dbQuery] Database Query 
 * @returns {Promise<object>} HANA ResultSet Object
 */
export async function example1(dbQuery) {
    try {
        let db = new dbClass(await dbClass.createConnectionFromEnv())
        let result = await db.execSQL(dbQuery)
        db.destroyClient()
        return result
    } catch (error) {
        throw error
    }
}


/**
 * hdb procedure example with Callbacks
 * @param {string} [schema] Database Stored Procedure Schema 
 * @param {string} [dbProcedure] Database Stored Procedure Name 
 * @param {object} [inputParams] Database Stored Procedure Input Parameters
 * @returns {Promise<object>} HANA ResultSet Object
 */
export async function example2(schema, dbProcedure, inputParams) {
    try {
        let db = new dbClass(await dbClass.createConnectionFromEnv())
        let sp = await db.loadProcedurePromisified(schema, dbProcedure)
        let result = await db.callProcedurePromisified(sp, inputParams)
        db.destroyClient()
        return result
    } catch (error) {
        throw error
    }
}


/**
 * Test hdb Await example
 */
 export async function testExample1() {
    try {
        console.table(await example1(`SELECT CURRENT_USER, CURRENT_SCHEMA FROM DUMMY`))
    } catch (error) {
        console.error(error)
    }
}



/**
 * Test hdb Await example multiple rows
 */
 export async function testExample2() {
    try {
        console.table(await example1(`SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT 10`))
    } catch (error) {
        console.error(error)
    }
}

/**
 * Test hdb Await stored procedure example
 */
 export async function testExample3() {
    try {
        console.table(await example2('SYS', 'IS_VALID_PASSWORD', {PASSWORD: "TEST"}))
    } catch (error) {
        console.error(error)
    }
}

