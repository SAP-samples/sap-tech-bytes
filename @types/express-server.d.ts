/// <reference types="node" />
/**
 * Build the Express Server and Setup Route Loading dynamically from a /routes folder
 */
export default class ExpressServer {
    /** @type {Number} - Default Port*/
    port: number;
    /** @type {String} - Directory relative to root of the project*/
    baseDir: string;
    routes: any[];
    app: import("express-serve-static-core").Express;
    /**
     * Start Express Server
     */
    start(): Promise<void>;
    httpServer: import("http").Server;
    /**
    * Stop Express Server
    */
    stop(): void;
}
