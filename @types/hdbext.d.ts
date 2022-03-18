/**
 * @callback Callback
 * @param {Error} [err] Error
 * @param {object} [result] HANA ResultSet Object
 */
/**
 * hdbext example with Callbacks
 * @param {string} [dbQuery] Database Query
 * @param {Callback} [callback] Callback Function to receive results
 */
export function example1(dbQuery?: string, callback?: Callback): void;
/**
 * hdbext procedure example with Callbacks
 * @param {string} [schema] Database Stored Procedure Schema
 * @param {string} [dbProcedure] Database Stored Procedure Name
 * @param {object} [inputParams] Database Stored Procedure Input Parameters
 * @param {Callback} [callback] Callback Function to receive results
 */
export function example2(schema?: string, dbProcedure?: string, inputParams?: object, callback?: Callback): void;
/**
 * Test hdbext example with Callbacks
 */
export function testExample1(): void;
/**
 * Test hdbext example with Callbacks Multiple Rows
 */
export function testExample2(): void;
/**
 * Test hdbext procedure example with Callbacks
 */
export function testExample3(): void;
export type Callback = (err?: Error, result?: object) => any;
