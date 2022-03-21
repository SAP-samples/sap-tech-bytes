// @ts-check
import * as express from 'express'
/** @type {typeof import("sap-hdbext-promisfied")} */
import dbClass from "sap-hdbext-promisfied"
/** @type {typeof import("@sap/hdbext")} */
import * as hdbext from '@sap/hdbext'
import { performance, PerformanceObserver } from "perf_hooks"
const perfObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
        console.log(entry)
    })
})
perfObserver.observe({ entryTypes: ["measure"], buffered: true })

/**       
 * hana-client Route
 * @param {Object} app - Express application instance
 */
export default function (app) {
    /**
     * @swagger
     *
     * /rest/hdbext:
     *   get:
     *     summary: Basic examples with hdbext
     *     tags:
     *       - hanaClient
     *     responses:
     *       '200':
     *         description: Info
     * @param {express.Request} [req] Request Object from Express 
     * @param {express.Response} [res] Response Object from Express
     * @returns {any}        
     */
    app.get("/rest/hdbext",
        (/** @type {express.Request} */ req, /** @type {express.Response} */ res) => {
            /** @type {hdbext} */
            // @ts-ignore
            let client = req.db
            client.prepare(
                `SELECT CURRENT_USER, CURRENT_SCHEMA FROM "DUMMY"`,
                (err, statement) => {
                    if (err) {
                        return res.type("text/plain").status(500).send("ERROR: " + err.toString())
                    }
                    statement.exec([],
                        (err, results) => {
                            if (err) {
                                return res.type("text/plain").status(500).send("ERROR: " + err.toString())
                            } else {
                                return res.type("application/json").status(200).send(results)
                            }
                        })
                    return null
                })
        })

    /**
     * @swagger
     *
     * /rest/hdbextAsync:
     *   get:
     *     summary: Async examples with hdbext
     *     tags:
     *       - hanaClient
     *     responses:
     *       '200':
     *         description: Info
     */
    app.get("/rest/hdbextAsync",
        async (/** @type {express.Request} */ req, /** @type {express.Response} */ res) => {
            try {
                // @ts-ignore
                let db = new dbClass(req.db)
                const statement = await db.preparePromisified(`SELECT SESSION_USER, CURRENT_SCHEMA 
				            								 FROM "DUMMY"`)
                const results = await db.statementExecPromisified(statement, [])
                return res.type("application/json").status(200).send(results)
            } catch (e) {
                return res.type("text/plain").status(500).send(`ERROR: ${e.toString()}`)
            }
        })

    /**
     * @swagger
     *
     * /rest/procedures:
     *   get:
     *     summary: hdbext with stored procedure
     *     tags:
     *       - hanaClient
     *     responses:
     *       '200':
     *         description: Output   
     */
    app.get("/rest/procedures",
        async (/** @type {express.Request} */ req, /** @type {express.Response} */ res) => {
            try {
                // @ts-ignore
                let db = new dbClass(req.db)
                let sp = await db.loadProcedurePromisified(hdbext, 'SYS', 'IS_VALID_PASSWORD')
                res.type("application/json").status(200).send(await db.callProcedurePromisified(sp, { PASSWORD: "TEST" }))

            } catch (error) {
                res.type("text/plain").status(500).send(`ERROR: ${error.toString()}`)
                return
            }
        })

    /**
     * @swagger
     *
     * /rest/procedures2/{password}:
     *   get:
     *     summary: Database Call Stored Procedure With Inputs
     *     tags:
     *       - hanaClient
     *     parameters:
     *       - name: password
     *         in: path
     *         description: Password
     *         required: true
     *         schema:
     *           type: string  
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/procedures2/:password",
        async (/** @type {express.Request} */ req, /** @type {express.Response} */ res) => {
            try {
                let password = req.params?.password
                let inputParams = {}
                if (typeof password === "undefined" || password === null) {
                    inputParams = {}
                } else {
                    inputParams = {
                        PASSWORD: password
                    }
                }
                // @ts-ignore
                let db = new dbClass(req.db)
                let sp = await db.loadProcedurePromisified(hdbext, 'SYS', 'IS_VALID_PASSWORD')
                res.type("application/json").status(200).send(await db.callProcedurePromisified(sp, inputParams))

            } catch (error) {
                res.type("text/plain").status(500).send(`ERROR: ${error.toString()}`)
                return
            }
        })

    /**
     * @swagger
     *
     * /rest/queriesParallel:
     *   get:
     *     summary: Call 2 Database queries in Parallel
     *     tags:
     *       - hanaClient
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/queriesParallel/",
        async (/** @type {express.Request} */ req, /** @type {express.Response} */ res) => {
            try {
                // @ts-ignore
                let db = new dbClass(req.db)
                let result = {}
                let [outputOne, outputTwo] = await Promise.all([queryOne(), queryTwo()])
                result.outputOne = outputOne
                result.outputTwo = outputTwo
                return res.type("application/json").status(200).send(result)

                /**
                 * hdbext based query for Session User and Current Schema
                 * @returns {Promise<object>} HANA ResultSet Object
                 */
                async function queryOne() {
                    const statement = await db.preparePromisified(`SELECT SESSION_USER, CURRENT_SCHEMA FROM "DUMMY"`)
                    return await db.statementExecPromisified(statement, [])
                }
                /**
                 * hdbext based query to call stored procedure IS_VALID_PASSWORD
                 * @returns {Promise<object>} HANA ResultSet Object
                 */
                async function queryTwo() {
                    let sp = await db.loadProcedurePromisified(hdbext, 'SYS', 'IS_VALID_PASSWORD')
                    return await db.callProcedurePromisified(sp, { PASSWORD: "TEST" })
                }
            } catch (e) {
                return res.type("text/plain").status(500).send(`ERROR: ${e.toString()}`)
            }
        })
        
    /**
     * @swagger
     *
     * /rest/queriesParallelWithMeasurements:
     *   get:
     *     summary: Call 2 Database queries in Parallel with time measurements logged
     *     tags:
     *       - hanaClient
     *     responses:
     *       '200':
     *         description: Output
     */
    app.get("/rest/queriesParallelWithMeasurements/",
        async (/** @type {express.Request} */ req, /** @type {express.Response} */ res) => {
            try {
                performance.mark("overall-start")
                // @ts-ignore
                let db = new dbClass(req.db)
                let result = {}
                let [outputOne, outputTwo] = await Promise.all([queryOne(), queryTwo()])
                result.outputOne = outputOne
                result.outputTwo = outputTwo
                performance.mark("overall-end")
                performance.measure("Overall measurement", "overall-start", "overall-end")
                return res.type("application/json").status(200).send(result)

                /**
                 * hdbext based query for Session User and Current Schema
                 * @returns {Promise<object>} HANA ResultSet Object
                 */
                async function queryOne() {
                    performance.mark("1-start")
                    const statement = await db.preparePromisified(`SELECT SESSION_USER, CURRENT_SCHEMA 
                    FROM "DUMMY"`)
                    let result = await db.statementExecPromisified(statement, [])
                    performance.mark("1-end")
                    performance.measure("Query 1", "1-start", "1-end")
                    return result
                }
                /**
                 * hdbext based query to call stored procedure IS_VALID_PASSWORD
                 * @returns {Promise<object>} HANA ResultSet Object
                 */
                async function queryTwo() {
                    performance.mark("2-start")
                    let sp = await db.loadProcedurePromisified(hdbext, 'SYS', 'IS_VALID_PASSWORD')
                    let result = await db.callProcedurePromisified(sp, { PASSWORD: "TEST" })
                    performance.mark("2-end")
                    performance.measure("Query 2", "2-start", "2-end")
                    return result
                }
            } catch (e) {
                return res.type("text/plain").status(500).send(`ERROR: ${e.toString()}`)
            }
        })
}
