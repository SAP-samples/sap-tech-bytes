module.exports = (app) => {
    let pos = require('../controllers/posController')
  
	/**
	 * @swagger
	 *
	 * components:
	 *   schemas:
	 *     PO:
	 *       type: object
     *       required:
     *         - PURCHASEORDERID
	 *       properties:
	 *         PURCHASEORDERID:
	 *           type: integer
     *           format: int32
     *         HISTORY.CREATEDBY.EMPLOYEEID:
     *           type: integer
     *           format: int32
     *           nullable: true
     *         HISTORY.CREATEDAT:
     *           type: string
     *           format: date
     *           example: 2017-04-13
     *           nullable: true
     *         HISTORY.CHANGEDBY.EMPLOYEEID:
     *           type: integer
     *           format: int32
     *           nullable: true
     *         HISTORY.CHANGEDAT:
     *           type: string
     *           format: date
     *           example: 2017-04-13
     *           nullable: true 
     *         NOTEID:
     *           type: string
     *           formaxLength: 10
     *           nullable: true
	 *         PARTNER.PARTNERID:
	 *           type: integer
     *           format: int32
     *           nullable: true
     *         CURRENCY:
     *           type: string
     *           maxLength: 5
     *           nullable: true
     *         GROSSAMOUNT:
     *           anyOf: 
     *             - type: number
     *             - type: string
     *           format: decimal
     *           example: 0
     *           multipleOf: 0.01
     *           maximum: 9999999999999.99
     *           minimum: -9999999999999.99
     *           nullable: true
     *         NETAMOUNT:
     *           anyOf: 
     *             - type: number
     *             - type: string
     *           format: decimal
     *           example: 0
     *           multipleOf: 0.01
     *           maximum: 9999999999999.99
     *           minimum: -9999999999999.99
     *           nullable: true 
     *         TAXAMOUNT:
     *           anyOf: 
     *             - type: number
     *             - type: string
     *           format: decimal
     *           example: 0
     *           multipleOf: 0.01
     *           maximum: 9999999999999.99
     *           minimum: -9999999999999.99
     *           nullable: true
     *         LIFECYCLESTATUS:
     *           type: string
     *           maxLength: 1
     *           nullable: true
     *         APPROVALSTATUS:
     *           type: string
     *           maxLength: 1
     *           nullable: true 
     *         CONFIRMSTATUS:
     *           type: string
     *           maxLength: 1
     *           nullable: true
     *         ORDERINGSTATUS:
     *           type: string
     *           maxLength: 1
     *           nullable: true
     *         INVOICINGSTATUS:
     *           type: string
     *           maxLength: 1
     *           nullable: true
     * 
	 */

    app.route('/pos')
	/**
	 * @swagger
	 *
	 * /pos:
	 *   get:
	 *     summary: Get a list of all Purchase Orders
	 *     tags:
	 *       - PurchaseOrders 
	 *     responses:
	 *       '200':
	 *         description: A List of all Purchase Order Headers
	 *         content:
	 *           application/json: 
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/PO'
	 *       '401':
	 *         description: ERROR Not Authorized 
	 *       '500':
	 *         description: General DB Error 
	 */    
      .get(pos.list_all_pos)
      .post(pos.create_a_po)
  
  
    app.route('/pos/:poId')
	/**
	 * @swagger
	 *
	 * /pos/{poID}:
	 *   get:
	 *     summary: Get details of a single Purchase Order Header
	 *     tags:
	 *       - PurchaseOrders
	 *     parameters:
	 *       - name: poID
	 *         in: path
	 *         description: Parnter ID
	 *         required: true
	 *         schema:
	 *           type: integer
     *           format: int32  
	 *     responses:
	 *       '200':
	 *         description: Details of a single Purchase Order Header 
	 *         content:
	 *           application/json: 
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/PO'
	 *       '401':
	 *         description: ERROR Not Authorized 
	 *       '500':
	 *         description: General DB Error 
	 */        
      .get(pos.read_a_po)
      .put(pos.update_a_po)
      .delete(pos.delete_a_po)
  }