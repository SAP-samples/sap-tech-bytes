#!/usr/bin/env zx

import open from 'open'
import * as btp from "./utils/btp.mjs"
try {       
    let basURL = await btp.getBASSubURL()       
    console.log(basURL)
    open(basURL)
} catch (error) {
    console.error(error)
}