const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

router.get('/', async (req, res) => {
    res.status(200).send("<h1>API_CHAT</h1>");
});

router.get("/sobre", async (req, res) => {
    res.status(200).send({
        "nome": "API-CHAT",
        "versão": "0.1.0",
        "autor": "cassiano"
    });
});

router.post("/entrar", async (req, res) => {
    const usuarioController = require("./controllers/usuarioController");
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
});

router.get("/salas", async (req, res) => {
    const token = require("./util/token");
    const salaController = require("./controllers/salaController");

    if (await token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick)) {
        let resp = await salaController.get();
        res.status(200).send(resp);
    } else {
        res.status(400).send({ msg: "Usuário não autorizado" });
    }
});

router.put("/sala/entrar", async (req, res) => {
    const token = require("./util/token");
    const salaController = require("./controllers/salaController");

    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return res.status(401).send({ msg: "Usuário não autorizado" });

    let resp = await salaController.entrar(req.headers.iduser, req.query.idsala);
    res.status(200).send(resp);
});

router.post("/sala/mensagem/", async (req, res) => {
    const token = require("./util/token");
    const salaController = require("./controllers/salaController");

    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return res.status(401).send({ msg: "Usuário não autorizado" });

    let resp = await salaController.enviarMensagem(req.headers.nick, req.body.msg, req.body.idSala);
    res.status(200).send(resp);
});

router.get("/sala/mensagens", async (req, res) => {
    const token = require("./util/token");
    const salaController = require("./controllers/salaController");

    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return res.status(401).send({ msg: "Usuário não autorizado" });

    let resp = await salaController.buscarMensagens(req.query.idSala, req.query.timestamp);
    res.status(200).send(resp);
});

router.delete("/sala/sair", async (req, res) => {
    const token = require("./util/token");
    const salaController = require("./controllers/salaController");

    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return res.status(401).send({ msg: "Usuário não autorizado" });

    let resp = await salaController.sair(req.headers.iduser, req.query.idsala);
    res.status(200).send(resp);
});

app.use('/', router);

module.exports = app;
