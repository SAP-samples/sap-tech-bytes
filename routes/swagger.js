// @ts-check
import * as express from 'express'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const swaggerJSDoc = require('swagger-jsdoc')
import * as swaggerUi from 'swagger-ui-express'
let options = {
    explorer: true,
    swaggerOptions: {
        docExpansion: "none"
    }
}
/**       
 * Entry Point Route
 * @param {Object} app - Express application instance
 */
export default async function (app) {

    let openAPIContent = await getOpenAPI()

    app.get('/api/api-docs.json', 
     (/** @type {express.Request} */ req, /** @type {express.Response} */ res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(openAPIContent)
    })

    app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(openAPIContent, options))

    async function getOpenAPI() {
        let options = {
            swaggerDefinition: {
                openapi: '3.0.0',
                info: {
                    title: 'HANA Client Code Samples',
                    version: '1.0.0',
                    "x-odata-version": '4.0'
                },
            },
            apis: ['./routes/*']
        }
        let swaggerSpec = swaggerJSDoc(options)
        // @ts-ignore
        swaggerSpec.components.requestBodies = []
        return swaggerSpec
    }
}


