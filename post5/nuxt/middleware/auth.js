var xssec = require('@sap/xssec')
var xsenv = require('@sap/xsenv')

export default function (context) {

	const {
		app,
		store,
		route,
		params,
		query,
		env,
		isDev,
		isHMR,
		redirect,
		req,
		error,
		$config
	} = context

	const unauthorized = () => {
		// redirect(process.env.approuterURL)
		return error({
			statusCode: 401,
			message: "401 - Unauthorized"
		})
	}

	if (!req.headers.authorization) {
		unauthorized()
	} else {
		const token = req.headers.authorization.split(" ")[1]
		xsenv.loadEnv()
		xssec.createSecurityContext(
			token,
			xsenv.getServices({ xsuaa: { tag: 'xsuaa' } }).xsuaa,
			function (error, securityContext, tokenInfo) {
				if (error) {
					unauthorized()
					return
				}
			})
	}
}
