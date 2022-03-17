/**
 * @callback Callback
 * @param {Error} [err] Error
 * @param {object} [result] HANA ResultSet Object
 */
/**
 * hana-client example with Callbacks
 * @param {string} [dbQuery] Database Query
 * @param {Callback} [callback] Callback Function to receive results
 */
export function example1(dbQuery?: string, callback?: Callback): void;
/**
 * Test hana-client example with Callbacks
 */
export function testExample1(): void;
export type Callback = (err?: Error, result?: object) => any;
