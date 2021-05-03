const cds = require('@sap/cds')
module.exports = cds.service.impl(function () {

    const { POHeaders } = this.entities()

    this.after(['CREATE', 'UPDATE', 'DELETE'], [POHeaders], async (po, req) => {
     // const header = req.data
      req.on('succeeded', () => {
        global.it || console.log(`< emitting: poChanged ${po.PURCHASEORDERID}`)
        this.emit('poChange', po.PURCHASEORDERID)
      })
    })


    
  this.on('getPOItems', async (req) => {
    const dbClass = require("sap-hdbext-promisfied")
    var client = await dbClass.createConnectionFromEnv()
    let db = new dbClass(client)
    const hdbext = require("@sap/hdbext")
    const sp = await db.loadProcedurePromisified(hdbext, null, 'getPOItems')
    const output = await db.callProcedurePromisified(sp, [])
    return output.results
  })


})