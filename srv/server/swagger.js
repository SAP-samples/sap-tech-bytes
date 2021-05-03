function swagger(app) {

	this.getOpenAPI = async() => {
		let swaggerJSDoc = require('swagger-jsdoc')
		let options = {
			swaggerDefinition: {
				openapi: '3.0.0',
				info: {
					title: 'Stanalone PO Service',
					version: '1.0.0',
					"x-odata-version": '4.0'
				},
				tags: [{
					name: "PurchaseOrders"
				}],
			},
			apis: ['./routes/*']
		}
		return swaggerJSDoc(options)
	}
}
module.exports = swagger