import * as hdbextAwait from "./hdbextAwait.js"
import * as assert from 'assert'

describe('hdbext', () => {
    describe('Example with Await', () => {
        it('returns 10 records', async () => {
            let dbQuery = `SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT 10`
            const results = await hdbextAwait.example1(dbQuery)
            assert.equal(results.length, 10)
        })

        it('returns single record', async () => {
            let dbQuery = `SELECT CURRENT_USER, CURRENT_SCHEMA from DUMMY`
            const results = await hdbextAwait.example1(dbQuery)
            assert.equal(results.length, 1)
        })

        it('throws error with target table not found', () => {
            let dbQuery = `SELECT CURRENT_USER, CURRENT_SCHEMA from DUMMY_DUMB`
            assert.rejects(async () => { await hdbextAwait.example1(dbQuery) }, Error)
        })
    })


    describe('Example Stored Procedure with Await', () => {
        it('Password is too short - Error Code 412', async () => {
            let result = await hdbextAwait.example2('SYS', 'IS_VALID_PASSWORD', { PASSWORD: "TEST" })
            assert.equal(result.outputScalar.ERROR_CODE, 412)
        })

        it('Password is good - Error Code 412', async () => {
            let result = await hdbextAwait.example2('SYS', 'IS_VALID_PASSWORD', { PASSWORD: "TESTtest1234" })
            assert.equal(result.outputScalar.ERROR_CODE, 0)
        })

        it('throws error with Stored Procedure not found', async () => {
            assert.rejects(async () => { await hdbextAwait.example2('SYS', 'IS_VALID_PASSWORD_NOT_A_PROC', { PASSWORD: "TESTtest1234" }) }, Error)
        })

    })
})