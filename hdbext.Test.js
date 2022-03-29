import * as hdbextCallbacks from "./hdbext.js"
import * as assert from 'assert'

describe('hdbext', () => {
    describe('Example with Callbacks', () => {
        it('returns single record', (done) => {
            hdbextCallbacks.example1(`SELECT CURRENT_USER, CURRENT_SCHEMA FROM DUMMY`, (err, result) => {
                if (err) {
                    done(err)
                } else {
                    assert.equal(result.length, 1)
                    done()
                }
            })
        })

        it('throws error with target table not found', (done) => {
            hdbextCallbacks.example1(`SELECT CURRENT_USER, CURRENT_SCHEMA from DUMMY_DUMB`, (err, result) => {
                if (err) {
                    done()
                } else {
                    done(new Error(`Expected Exception but Received None`))
                }
            })
        })


        it('returns 10 records', (done) => {
            hdbextCallbacks.example1(`SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT 10`, (err, result) => {
                if (err) {
                    done(err)
                } else {
                    assert.equal(result.length, 10)
                    done()
                }
            })
        })

    })
 
    describe('Example Stored Procedure with Callbacks', () => {
        it('Password is too short - Error Code 412', (done) => {
            hdbextCallbacks.example2('SYS', 'IS_VALID_PASSWORD', {PASSWORD: "TEST"}, (err, result) => {
                if (err) {
                    done(err)
                } else {
                    assert.equal(result.ERROR_CODE, 412)
                    done()
                }
            })
        })

        it('Password is good - Error Code 412', (done) => {
            hdbextCallbacks.example2('SYS', 'IS_VALID_PASSWORD', {PASSWORD: "TESTtest1234"}, (err, result) => {
                if (err) {
                    done(err)
                } else {
                    assert.equal(result.ERROR_CODE, 0)
                    done()
                }
            })
        })

        it('throws error with Stored Procedure not found', (done) => {
            hdbextCallbacks.example2('SYS', 'IS_VALID_PASSWORD_NOT_A_PROC', {PASSWORD: "TESTtest1234"}, (err, result) => {
                if (err) {
                    done()
                } else {
                    done(new Error(`Expected Exception but Received None`))
                }
            })
        })

    })
})
