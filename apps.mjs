#!/usr/bin/env zx

import open from 'open'
import * as btp from "./utils/btp.mjs"
try {
    let subs = await btp.getBTPSubscriptions()
    const subscribed = 'SUBSCRIBED'
    for (let item of subs.applications) {
        if (item.state === subscribed) {
            console.log(item.displayName)
            console.log(chalk.blue(item.subscriptionUrl))
        }
    }
} catch (error) {
    console.error(error)
}