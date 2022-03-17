import { performance, PerformanceObserver } from "perf_hooks"
import * as hanaClientSync from "./hana-clientSync.js"
import * as hanaClientCallbacks from "./hana-client.js"
import * as hanaClientPromise from "./hana-clientPromise.js"
import * as hanaClientAwait from "./hana-clientAwait.js"
import * as hdb from "./hdb.js"

const limit = 100
const perfObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
        console.log(entry)
    })
})

perfObserver.observe({ entryTypes: ["measure"], buffer: true })


performance.mark("example-start")
hanaClientSync.example1(`SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT ${limit}`)
performance.mark("example-end")
performance.measure("Synchronous hana-client example", "example-start", "example-end")

performance.mark("example-start")
hdb.example1(`SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT ${limit}`, (err, result) => {
    if (err) {
        console.error(err)
    } else {
        performance.mark("example-end")
        performance.measure("hdb example", "example-start", "example-end")
    }
})

performance.mark("example-start")
hanaClientCallbacks.example1(`SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT ${limit}`, (err, result) => {
    if (err) {
        console.error(err)
    } else {
        performance.mark("example-end")
        performance.measure("Callback hana-client example", "example-start", "example-end")

    }
})

performance.mark("example-start")
try {
    hanaClientPromise.example1(`SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT ${limit}`)
        .then((result) => {
            performance.mark("example-end")
            performance.measure("Promise hana-client example", "example-start", "example-end")


        })
} catch (error) {
    console.error(error)
}

performance.mark("example-start")
try {
    await hanaClientAwait.example1(`SELECT SCHEMA_NAME, TABLE_NAME, COMMENTS FROM TABLES LIMIT ${limit}`)
    performance.mark("example-end")
    performance.measure("Await hana-client example", "example-start", "example-end")
} catch (error) {
    console.error(error)
}


