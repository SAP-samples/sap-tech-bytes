'use strict'
module.exports = (app) => {

    //Helmet for Security Policy Headers
    const helmet = require("helmet")
    app.use(helmet());
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "sapui5.hana.ondemand.com", "'unsafe-inline'"],
            scriptSrc: ["'self'", "sapui5.hana.ondemand.com", "'unsafe-inline'"],
            imgSrc: ["'self'", "sapui5.hana.ondemand.com", "data:"]
        }
    }))

    // Sets "Referrer-Policy: no-referrer".
    app.use(helmet.referrerPolicy({ policy: "no-referrer" }))

    const passport = require("passport")
    const xssec = require("@sap/xssec")
    const xsenv = require("@sap/xsenv")

    /*    passport.use("JWT", new xssec.JWTStrategy(xsenv.getServices({
           uaa: {
               tag: "xsuaa"
           }
       }).uaa))
       app.use(passport.initialize()) 
       app.use(
           passport.authenticate("JWT", {
               session: false
           })
       ) */
}