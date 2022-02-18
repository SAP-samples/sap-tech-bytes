/* eslint-disable no-console */
const express = require("express");
require("dotenv").config();
const path = require("path");

const app = express();

if (process.env.NODE_ENV === "development") {
    console.log("Running in development...");
    app.use("/", express.static(path.join(__dirname, "./uimodule/webapp")));
} else {
    app.use("/", express.static(path.join(__dirname, "./uimodule/dist")));
}

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started at http://localhost:${port}`));