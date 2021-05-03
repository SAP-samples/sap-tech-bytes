'use strict';

const bodyParser = require('body-parser')

module.exports = function (app) {


	let logging = require('@sap/logging')
	let appContext = logging.createAppContext({})
	app.logger = appContext.createLogContext().getLogger('/Application')

	const swagger = require('./swagger')
	app.swagger = new swagger(app)

	const xsenv = require("@sap/xsenv")
	xsenv.loadEnv()
	const HDBConn = require("@sap/hdbext")
	let hanaOptions = xsenv.getServices({
		hana: {
			tag: "hana"
		}
	});
	hanaOptions.hana.pooling = true


	require('./healthCheck')(app, { hdbext: HDBConn, hanaOptions: hanaOptions })
	require('./overloadProtection')(app)
	
	const cors = require('cors')
	app.use(cors())

	require('./expressSecurity')(app)


	app.use(logging.middleware({ appContext: appContext, logNetwork: true }));

	app.use(
		HDBConn.middleware(hanaOptions.hana)
	)

}