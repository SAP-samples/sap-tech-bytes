'use strict'
module.exports = (app, options) => {

    //Health Check - Can we at least connect to underlying persistence?
    const health = require('@cloudnative/health-connect');
    let healthcheck = new health.HealthChecker();
    const hanaHealth = () => new Promise((resolve, _reject) => {
        options.hdbext.createConnection(options.hanaOptions.hana, (error) => {
            if (error) {
                _reject(error);
            }
            resolve()
        })
    })

    const lagHealth = () => new Promise((resolve, _reject) => {
        let lag = require('event-loop-lag')(1000)
        if(lag() > 40){
          _reject(`Event Loop Lag Exceeded: ${lag()} milliseconds`) 
        }
        resolve()
    })

    let startCheck = new health.StartupCheck("Start Check", hanaHealth);
    healthcheck.registerStartupCheck(startCheck);
    let liveCheck = new health.LivenessCheck("HANA Check", hanaHealth);
    healthcheck.registerLivenessCheck(liveCheck);
    let lagCheck = new health.LivenessCheck("Event Loop Lag Check", lagHealth);
    healthcheck.registerLivenessCheck(lagCheck);

    app.use('/live', health.LivenessEndpoint(healthcheck))
    app.use('/ready', health.ReadinessEndpoint(healthcheck))
    app.use('/health', health.HealthEndpoint(healthcheck))
    app.use('/healthcheck', health.HealthEndpoint(healthcheck))

}