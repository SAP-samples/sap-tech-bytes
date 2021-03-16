global.__base = __dirname + "/"
const cds = require('@sap/cds')

async function init() {
    try {
        const db = await cds.connect.to('db', { model: global.__base + "/gen/csn.json", })
        const dbClass = require("sap-hdbext-promisfied")
        let dbConn = new dbClass(await dbClass.createConnection(db.options.credentials))
        await dbConn.execSQL(`DELETE FROM STATS`)

        process.exit()
    } catch (error) {
        console.error(error)
        process.exit()
    }
}

init()