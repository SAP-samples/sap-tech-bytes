import * as hdbAwait from "./hdbAwait.js"
import * as assert from 'assert'

describe('hdb', () => {
    describe('Example with Await', () => {
        it('returns 10 records', async () => {
            let dbQuery = `SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT 10`
            const results = await hdbAwait.example1(dbQuery)
            assert.equal(results.length, 10)
        })

        it('returns single record', async () => {
            let dbQuery = `SELECT CURRENT_USER, CURRENT_SCHEMA from DUMMY`
            const results = await hdbAwait.example1(dbQuery)
            assert.equal(results.length, 1)
        })

        it('throws error with target table not found', () => {
            let dbQuery = `SELECT CURRENT_USER, CURRENT_SCHEMA from DUMMY_DUMB`
            assert.rejects(async () => { await hdbAwait.example1(dbQuery) }, Error)
        })
    })
})