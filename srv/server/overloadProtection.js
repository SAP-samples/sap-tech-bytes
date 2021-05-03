'use strict'
module.exports = (app) => {
    const protectCfg = {
        production: process.env.NODE_ENV === 'production', // if production is false, detailed error messages are exposed to the client
        clientRetrySecs: 1, // Client-Retry header, in seconds (0 to disable) [default 1]
        sampleInterval: 5, // sample rate, milliseconds [default 5]
        maxEventLoopDelay: 100, // maximum detected delay between event loop ticks [default 42]
        maxHeapUsedBytes: 0, // maximum heap used threshold (0 to disable) [default 0]
        maxRssBytes: 0, // maximum rss size threshold (0 to disable) [default 0]
        errorPropagationMode: false, // dictate behavior: take over the response 
        logging: (message)=>{
            app.logger.error(message)
        }
        // or propagate an error to the framework [default false]
    }
    const protect = require('overload-protection')('express', protectCfg)
    app.use(protect)
}