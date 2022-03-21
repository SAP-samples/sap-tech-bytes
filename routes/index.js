// @ts-check
import * as express from 'express'

/**       
 * Entry Point Route
 * @param {Object} app - Express application instance
 */
 export default function (app) {
    /**
     * @swagger
     *
     * /:
     *   get:
     *     summary: Index of Examples
     *     tags:
     *       - entryPoint
     *     responses:
     *       '200':
     *         description: Info
     * @param {express.Request} [req] Request Object from Express 
     * @param {express.Response} [res] Response Object from Express
     * @returns {any}        
     */
     app.get("/", (req, res) => {
        let output =
        `<H1>@sap/hana-client Examples</H1></br>
        <a href="/rest/hanaClient">/hanaClient</a> - Select CURRENT_USER and CURRENT_SCHEMA from DUMMY</br>	
        <a href="/rest/hanaClient2">/hanaClient2</a> - Select 10 records from TABLES</br>
        `			
        res.type("text/html").status(200).send(output)
    })

 }