// @ts-check
import cds from '@sap/cds'
export const db = await cds.connect.to('db', { model: './csn.json', credentials: null })
export const cdsLib = cds
/**
 * cds Await example
 * @param {object} [dbQuery] Database Query 
 * @returns {Promise<object>} HANA ResultSet Object
 */
export async function example1(dbQuery) {
    try {
        let result = await db.run(dbQuery)
        return result
    } catch (error) {
        throw error
    }
}

/**
 * Test cds Await example with CDL
 */
export async function testExample1() {
    try {
        let dbQuery = SELECT
            .from(db.entities.TABLES)
            .columns(TABLES => {
                TABLES.SCHEMA_NAME.as('SCHEMA'),
                TABLES.TABLE_NAME
            })
            .limit(10)
        console.table(await example1(dbQuery))
    } catch (error) {
        console.error(error)
    }
}


/**
 * Test cds Await example with Query as String
 */
 export async function testExample2() {
    try {
        let dbQuery = `SELECT CURRENT_USER, CURRENT_SCHEMA from DUMMY1`
        console.table(await example1(dbQuery))
    } catch (error) {
        console.error(error)
    }
}

/**
 * Test cds Await example with Stored Procedure - New in March '22 release https://cap.cloud.sap/docs/releases/mar22#driver-agnostic-results-for-stored-procedures
 */
 export async function testExample3() {
    try {
        let dbQuery = ' Call SYS.IS_VALID_PASSWORD(PASSWORD => ?, ERROR_CODE => ?, ERROR_MESSAGE => ? )'
        // @ts-ignore - CDS Types aren't updated for this new Stored Procedure option yet 
        let result = await db.run(dbQuery, { PASSWORD: "TEST" })
        console.table(result)
    } catch (error) {
        console.error(error)
    }
}
