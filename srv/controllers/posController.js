
exports.list_all_pos = async (req, res) => {
    try {
        const dbClass = require("sap-hdbext-promisfied")
        let dbConn = new dbClass(req.db)
        res.json(await dbConn.execSQL(`SELECT * FROM "PO.Header" LIMIT 10`))
    } catch (error) {
        res.send(error)
    }
}



exports.create_a_po = async (req, res) => {

}


exports.read_a_po = async (req, res) => {
    let poId = req.params.poId
    try {
        const dbClass = require("sap-hdbext-promisfied")
        let dbConn = new dbClass(req.db)
        let query = `SELECT * FROM "PO.Header" WHERE PURCHASEORDERID = ?`
        res.json(await dbConn.statementExecPromisified(await dbConn.preparePromisified(query), [poId]))

    } catch (error) {
        res.send(error)
    }

}


exports.update_a_po = async (req, res) => {

}


exports.delete_a_po = async (req, res) => {
}
