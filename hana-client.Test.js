import * as hanaClientCallbacks from "./hana-client.js"
import * as assert from 'assert'

describe('hana-client', () => {
    describe('Example with Callbacks', () => {
        it('returns single record', (done) => {
            hanaClientCallbacks.example1(`SELECT CURRENT_USER, CURRENT_SCHEMA FROM DUMMY`, (err, result) => {
                if (err) {
                    done(err)
                } else {
                    assert.equal(result.length, 1)
                    done()
                }
            })
        })

        it('throws error with target table not found', (done) => {
            hanaClientCallbacks.example1(`SELECT CURRENT_USER, CURRENT_SCHEMA from DUMMY_DUMB`, (err, result) => {
                if (err) {
                    done()
                } else {
                    done(new Error(`Expected Exception but Received None`))
                }
            })
        })


        it('returns 10 records', (done) => {
            hanaClientCallbacks.example1(`SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT 10`, (err, result) => {
                if (err) {
                    done(err)
                } else {
                    assert.equal(result.length, 10)
                    done()
                }
            })
        })

    })

})
