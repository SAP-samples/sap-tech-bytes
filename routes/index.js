// @ts-check
import * as express from 'express'

/**       
 * Entry Point Route
 * @param {Object} app - Express application instance
 */
export default function (app) {
   app.get("/",
      (/** @type {express.Request} */ req, /** @type {express.Response} */ res) => {
         let output =
            `<H1>Swagger UI Test Tool</H1></br>
        <a href="/api/api-docs/">/api/api-docs</a> - Swagger UI for all Express Endpoints</br>
        <H1>@sap/hana-client Examples</H1></br>
        <a href="/rest/hanaClient">/hanaClient</a> - Select CURRENT_USER and CURRENT_SCHEMA from DUMMY</br>	
        <a href="/rest/hanaClient2">/hanaClient2</a> - Select 10 records from TABLES</br>
        <H1>@sap/hdbext Examples</H1></br>
        <a href="/rest/hdbext">/hdbext</a> - Select CURRENT_USER and CURRENT_SCHEMA from DUMMY</br>	
        <a href="/rest/hdbextAsync">/hdbextAsync</a> - Select CURRENT_USER and CURRENT_SCHEMA from DUMMY via Async/Await</br>
        <a href="/rest/procedures">/procedures</a> - Stored Procedures via hdbext with Await</br>
        <a href="/rest/procedures2/input">/procedures2</a> - Database Call Stored Procedure With Inputs</br>
        <a href="/rest/queriesParallel/">/queriesParallel</a> - Call 2 Database queries in Parallel</br>
        <a href="/rest/queriesParallelWithMeasurements/">/queriesParallelWithMeasurements</a> - Call 2 Database queries in Parallel with time measurements logged</br>
        `
         res.type("text/html").status(200).send(output)
      })

}