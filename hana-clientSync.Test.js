import * as hanaClientSync from "./hana-clientSync.js"
import * as assert from 'assert'

describe('hana-client', () => {
    describe('Example with Synchronous Calls', () => {
        it('returns 10 records', () => {
            let dbQuery = `SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT 10`
            const results = hanaClientSync.example1(dbQuery)
            assert.equal(results.length, 10)
        })

        it('returns single record', () => {
            let dbQuery = `SELECT CURRENT_USER, CURRENT_SCHEMA from DUMMY`
            const results = hanaClientSync.example1(dbQuery)
            assert.equal(results.length, 1)
        })

        it('throws error with target table not found', () => {
            let dbQuery = `SELECT CURRENT_USER, CURRENT_SCHEMA from DUMMY_DUMB`
            assert.throws(() => { hanaClientSync.example1(dbQuery) }, Error)
        })
    })
})