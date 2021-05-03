
const ExpressServer = require('./express-server')
global.__base = __dirname + "/"

const server = new ExpressServer()
server.start()