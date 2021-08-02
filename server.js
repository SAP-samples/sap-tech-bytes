'use strict';

const express = require('express');

const version = "version is in development"

const app = express();
app.get('/', (_, res) => {
    res.send(`Hello SAP Tech Bytes! This ${version}`);
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Started on port ${process.env.PORT || 3000}`);
});