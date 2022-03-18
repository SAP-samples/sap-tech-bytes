// @ts-check
import { performance, PerformanceObserver } from "perf_hooks"
import * as hanaClientSync from "./hana-clientSync.js"
import * as hanaClientCallbacks from "./hana-client.js"
import * as hanaClientPromise from "./hana-clientPromise.js"
import * as hanaClientAwait from "./hana-clientAwait.js"
import * as hdb from "./hdb.js"
import * as hdbext from "./hdbext.js"
import * as hdbextAwait from "./hdbextAwait.js"
import * as hdbAwait from "./hdbAwait.js"
import * as fs from 'fs'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const inquirer = require('inquirer')

let limit = 100
const perfObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
        console.log(entry)
    })
})
perfObserver.observe({ entryTypes: ["measure"], buffered: true })
const perfData = JSON.parse(fs.readFileSync('./performance.json', { encoding: 'utf8', flag: 'r' }))
inquirer
    .prompt([
        { name: 'size', type: 'input', default: limit },
        {
            name: 'test',
            type: 'list',
            message: 'Choose Performance Test',
            choices: perfData
        }
    ])
    .then((answers) => {
        limit = answers.size
        let chosenTest = perfData.find(x => x.name == answers.test)
        console.log(chosenTest.name)
        console.log(`Size: ${limit}`)
        for (let test of chosenTest.tests) {
            eval(`${test}()`)
        }
    })

function test1() {
    performance.mark("1-start")
    let result = hanaClientSync.example1(`SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT ${limit}`)
    performance.mark("1-end")
    performance.measure("Synchronous hana-client example", "1-start", "1-end")
}
async function test2() {
    performance.mark("2-start")
    try {
        let result = await hdbAwait.example1(`SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT ${limit}`)
        performance.mark("2-end")
        performance.measure("Await hdb example", "2-start", "2-end")
    } catch (error) {
        console.error(error)
    }
}
function test3() {
    performance.mark("3-start")
    hdb.example1(`SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT ${limit}`, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            performance.mark("3-end")
            performance.measure("hdb example", "3-start", "3-end")
        }
    })
}

function test4() {
    performance.mark("4-start")
    hanaClientCallbacks.example1(`SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT ${limit}`, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            performance.mark("4-end")
            performance.measure("Callback hana-client example", "4-start", "4-end")

        }
    })
}

function test5() {
    performance.mark("5-start")
    try {
        hanaClientPromise.example1(`SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT ${limit}`)
            .then((result) => {
                performance.mark("5-end")
                performance.measure("Promise hana-client example", "5-start", "5-end")


            })
    } catch (error) {
        console.error(error)
    }
}

async function test6() {
    performance.mark("6-start")
    try {
        let result = await hanaClientAwait.example1(`SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT ${limit}`)
        performance.mark("6-end")
        performance.measure("Await hana-client example", "6-start", "6-end")
    } catch (error) {
        console.error(error)
    }
}

function test7() {
    performance.mark("7-start")
    hdbext.example1(`SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT ${limit}`, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            performance.mark("7-end")
            performance.measure("Callback hdbext example", "7-start", "7-end")
        }
    })
}

async function test8() {
    performance.mark("8-start")
    try {
        let result = await hdbextAwait.example1(`SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT ${limit}`)
        performance.mark("8-end")
        performance.measure("Await hdbext example", "8-start", "8-end")
    } catch (error) {
        console.error(error)
    }
}

function test9() {
    performance.mark("9-start")
    hdb.example1(`SELECT * FROM TABLE_COLUMNS LIMIT ${limit}`, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            performance.mark("9-end")
            performance.measure("hdb wide columns example", "9-start", "9-end")
        }
    })
}

function test10() {
    performance.mark("10-start")
    hanaClientCallbacks.example1(`SELECT * FROM TABLE_COLUMNS LIMIT ${limit}`, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            performance.mark("10-end")
            performance.measure("hana-client wide columns example", "10-start", "10-end")

        }
    })
}

async function test11() {
    performance.mark("11-start")
    try {
        let result = await hdbextAwait.example2('SYS', 'IS_VALID_PASSWORD', {PASSWORD: "TEST"})
        performance.mark("11-end")
        performance.measure("hdbext stored procedure", "11-start", "11-end")
    } catch (error) {
        console.error(error)
    }
}

async function test12() {
    performance.mark("12-start")
    try {
        let result = await hdbAwait.example2('SYS', 'IS_VALID_PASSWORD', {PASSWORD: "TEST"})
        performance.mark("12-end")
        performance.measure("hdb stored procedure", "12-start", "12-end")
    } catch (error) {
        console.error(error)
    }
}



