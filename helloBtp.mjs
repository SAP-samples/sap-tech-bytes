#!/usr/bin/env zx
import * as btp from "./utils/btp.mjs"
let data = await btp.getBTPConfig()
console.log(data)
