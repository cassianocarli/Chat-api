require('dotenv').config();
const express = require('express');
const app = require('../src/api');  // Importa a instância do Express corretamente

// Configuração de middleware (se necessário)
app.use((req, res, next) => {
    // Aqui você pode configurar middlewares, se necessário
    next();
});

let port = process.env.API_PORT || 4000;

app.listen(port, () => {
    console.log(`Starting on port ${port}`);
});
