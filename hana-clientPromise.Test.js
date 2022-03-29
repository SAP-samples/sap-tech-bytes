import * as hanaClientPromise from "./hana-clientPromise.js"
import * as assert from 'assert'

describe('hana-client', () => {
    describe('Example with Promises', () => {
        it('returns 10 records', (done) => {
            hanaClientPromise.example1(`SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT 10`)
                .then((result) => {
                    assert.equal(result.length, 10)
                    done()
                })
        })

        it('returns single record', (done) => {
            hanaClientPromise.example1(`SELECT CURRENT_USER, CURRENT_SCHEMA FROM DUMMY`)
                .then((result) => {
                    assert.equal(result.length, 1)
                    done()
                })
        })

        it('throws error with target table not found', (done) => {

            hanaClientPromise.example1(`SELECT CURRENT_USER, CURRENT_SCHEMA FROM DUMMY_DUMB`)
                .then(() => {
                    done(new Error(`Expected Exception but Received None`))
                })
                .catch(() => {
                    done()
                })
        })
    })
})