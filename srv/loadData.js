global.__base = __dirname + "/"
const cds = require('@sap/cds')
const excel = require("node-xlsx")

const ora = require('ora')
const spinner = ora('Loading selected data \n')

async function init() {
  try {
    const db = await cds.connect.to('db', { model: global.__base + "/gen/csn.json", })
    const inquirer = require('inquirer')
    inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'))
    const answer = await inquirer.prompt([
      {
        type: 'fuzzypath',
        name: 'path',
        excludePath: nodePath => nodePath.startsWith('node_modules'),
        // excludePath :: (String) -> Bool
        // excludePath to exclude some paths from the file-system scan
        excludeFilter: nodePath => nodePath == '.',
        // excludeFilter :: (String) -> Bool
        // excludeFilter to exclude some paths from the final list, e.g. '.'
        itemType: 'file',
        // itemType :: 'any' | 'directory' | 'file'
        // specify the type of nodes to display
        // default value: 'any'
        // example: itemType: 'file' - hides directories from the item list
        rootPath: './data',
        // rootPath :: String
        // Root search directory
        message: 'Select a statistics file to import',
        default: 'sample-',
        suggestOnly: false,
        // suggestOnly :: Bool
        // Restrict prompt answer to available choices or use them as suggestions
        depthLimit: 5,
        // depthLimit :: integer >= 0
        // Limit the depth of sub-folders to scan
        // Defaults to infinite depth if undefined
      }
    ])

    spinner.start()
    let stats = []
    let dateUS = new Intl.DateTimeFormat("en-US")
    // Parse a file
    const workSheetsFromFile = excel.parse(answer.path, { raw: false })
    await Promise.all(workSheetsFromFile[0].data.map(async (item) => {
      if (item[0] === `Org`) {
        return
      }

      let newStats = []
      newStats.push(item[0]) //Org
      newStats.push(item[1]) //Repository
      newStats.push(dateUS.format(new Date(item[2]))) //Date
      newStats.push(item[3]) //Views
      stats.push(newStats)

    }))

    const dbClass = require("sap-hdbext-promisfied")
    let dbConn = new dbClass(await dbClass.createConnection(db.options.credentials))
    await dbConn.execSQL(`CREATE LOCAL TEMPORARY TABLE #TEMP_STATS LIKE STATS WITHOUT INDEX WITHOUT CONSTRAINT`)
    const statementStats = await dbConn.preparePromisified(`INSERT INTO #TEMP_STATS (ORG, REPOSITORY, DATE, VIEWS) VALUES (?, ?, TO_DATE(?, 'MM/DD/YYYY'), ?)`)

    await dbConn.statementExecBatchPromisified(statementStats, stats)
    await dbConn.execSQL(
      `DELETE FROM #TEMP_STATS WHERE "$rowid$" IN
       ( SELECT ROW_ID FROM (SELECT ROW_NUMBER() OVER (PARTITION BY ORG, REPOSITORY, "DATE") as RN,    
         "$rowid$" as ROW_ID, ORG, REPOSITORY, "DATE" FROM #TEMP_STATS ORDER BY 3, 2, 1)    
        WHERE RN>1)`)

    await dbConn.execSQL(`MERGE INTO STATS AS T1 USING #TEMP_STATS AS T2
        ON T1.ORG = T2.ORG and T1.REPOSITORY = T2.REPOSITORY and T1.DATE = T2.DATE
        WHEN MATCHED THEN UPDATE SET T1.VIEWS = (T1.VIEWS + T2.VIEWS)
        WHEN NOT MATCHED THEN INSERT (ORG, REPOSITORY, DATE, VIEWS) VALUES(T2.ORG, T2.REPOSITORY, T2.DATE, T2.VIEWS)`)

    await dbConn.execSQL(`DROP TABLE #TEMP_STATS`)
    spinner.stop()
    process.exit()

  } catch (error) {
    console.error(error)
    spinner.stop()
    process.exit()
  }
}

init()