#!/usr/bin/env zx
import * as btp from "./btp.mjs"
let data = await btp.getBTPConfig()
console.log(data)
