/**
 * Dynamic Import on single project file (with file exists check)
 * @param {String} file - JavaScript file to load and import
 * @param {Object} app - Express Application Instance
 */
export function importFile(file: string, app: any): Promise<void>;
/**
 * Dynamic Import on folder full of project files
 * @param {String} folder - Project folder to load and import all js files within
 * @param {Object} app - Express Application Instance
 */
export function importFolder(folder: string, app: any): Promise<void>;
