// @ts-check
import cds from '@sap/cds'
const db = await cds.connect.to('db', { model: './csn.json', credentials: null })

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
 * Test cds Await example
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
 * Test cds Await example
 */
 export async function testExample2() {
    try {
        let dbQuery = `SELECT CURRENT_USER, CURRENT_SCHEMA from DUMMY`
        console.table(await example1(dbQuery))
    } catch (error) {
        console.error(error)
    }
}

await Promise.all([testExample1(), testExample2()])
