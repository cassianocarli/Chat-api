require('dotenv').config();
const express = require('express');
const app = require('../src/api'); 


app.use((req, res, next) => {
 
    next();
});

let port = process.env.API_PORT || 4000;

app.listen(port, () => {
    console.log(`Starting on port ${port}`);
});
