const express = require("express");
const app = express();

app.use(express.urlencoded({ extend:true}));
app.use(express.json());

const router = express.Router();

app.use('/', router.get('/', async(req, res) =>{
    res.status(200).send("<h1>API_CHAT</h1>")
}));

app.use("/",router.get("/sobre", async(req,res) =>{
    res.status(200).send({
        "nome":"API-CHAT",
        "versão":"0.1.0",
        "autor":"cassiano"
    })
}));

app.use("/",router.get("/salas", async (req,res) =>{
    const salaController = require("./controllers/salaController");
    const resp = await salaController.get();
    res.status(200).send(resp);
}));

app.use("/entrar",router.post("/entrar", async(req, res, next) => {
    const usuarioController = require("./controllers/usuarioController");
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
}));

module.exports = app;