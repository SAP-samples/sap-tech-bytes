import * as cds from './cds.js'
import * as assert from 'assert'
import sinon from 'sinon'

describe('cds', () => {
    before(() => {
        sinon.stub(console, 'log')  // disable console.log
        sinon.stub(console, 'info')  // disable console.info
    })
    after(() => {
        console.log.restore()
        console.info.restore()
    })
    describe('Await example with CDL', () => {
        it('returns 10 records', async () => {
            let dbQuery = SELECT
                .from(cds.db.entities.TABLES)
                .columns(TABLES => {
                    TABLES.SCHEMA_NAME.as('SCHEMA'),
                        TABLES.TABLE_NAME
                })
                .limit(10)
            const results = await cds.example1(dbQuery)

            assert.equal(results.length, 10)
        })
    })

    describe('Await example with Query as String', () => {
        it('returns single record', async () => {
            let dbQuery = `SELECT CURRENT_USER, CURRENT_SCHEMA from DUMMY`
            const results = await cds.example1(dbQuery)
            assert.equal(results.length, 1)

        })

        it('throws error with target table not found', () => {
            let dbQuery = `SELECT CURRENT_USER, CURRENT_SCHEMA from DUMMY_DUMB`
            assert.rejects(async () => { await cds.example1(dbQuery) }, Error)
        })
    })


    describe('Await Example with Stored Procedure', () => {
        let dbQuery = ' Call SYS.IS_VALID_PASSWORD(PASSWORD => ?, ERROR_CODE => ?, ERROR_MESSAGE => ? )'

        it('Password is too short - Error Code 412', async () => {
            let result = await cds.cdsLib.run(dbQuery, { PASSWORD: "TEST" })
            assert.equal(result.ERROR_CODE, 412)
        })

        it('Password is good - Error Code 412', async () => {
            let result = await cds.cdsLib.run(dbQuery, { PASSWORD: "TESTtest1234" })
            assert.equal(result.ERROR_CODE, 0)
        })

        it('throws error with Stored Procedure not found', async () => {
            assert.rejects(async () => {
                await cds.cdsLib.run(
                    ' Call SYS.IS_VALID_PASSWORD_NOT_A_PROC(PASSWORD => ?, ERROR_CODE => ?, ERROR_MESSAGE => ? )',
                    { PASSWORD: "TESTtest1234" })
            }, Error)
        })

    })
})

