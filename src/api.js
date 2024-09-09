const express = require('express');
const app = express();
const salaController = require('./controllers/salaController')
const token = require('./util/token')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

app.get('/', async (req, res) => {
    res.status(200).send("<h1>API_CHAT</h1>");
});

app.get("/sobre", async (req, res) => {
    res.status(200).send({
        "nome": "API-CHAT",
        "versão": "0.1.0",
        "autor": "cassiano"
    });
});

app.post("/entrar", async (req, res) => {
    const usuarioController = require("./controllers/usuarioController");
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
});

app.get("/salas", async (req, res) => {
    const token = require("./util/token");
    const salaController = require("./controllers/salaController");

    if (await token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick)) {
        let resp = await salaController.get();
        res.status(200).send(resp);
    } else {
        res.status(400).send({ msg: "Usuário não autorizado" });
    }
});
/*
token = require('./util/token')

router.get("/salas", async (req, res) => {
    if (await token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick)) {
        let resp = salaController.get();
        res.status(200).send(resp);
    } else {
        res.status(400).send({ msg: "Usuário não autorizado" });
    }
});*/
/*
app.put("/sala/entrar", async (req, res) => {
    const token = require("./util/token");
    const salaController = require("./controllers/salaController");

    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return res.status(401).send({ msg: "Usuário não autorizado" });

    let resp = await salaController.entrar(req.headers.iduser, req.query.idsala);
    res.status(200).send(resp);
});*/
app.put("/sala/entrar", async (req, res) => {
    const token = require("./util/token");
    const salaController = require("./controllers/salaController");

    if (!await token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return res.status(401).send({ msg: "Usuário não autorizado" });

    // Verifique se o parâmetro está sendo passado corretamente
    let resp = await salaController.entrar(req.headers.iduser, req.query.idSala)
    res.status(200).send(resp);
});
/*
app.post("/sala/mensagem/", async (req, res) => {
    const token = require("./util/token");
    const salaController = require("./controllers/salaController");

    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return res.status(401).send({ msg: "Usuário não autorizado" });

    let resp = await salaController.enviarMensagem(req.headers.nick, req.body.msg, req.body.idSala);
    res.status(200).send(resp);
});*/
app.use('/', router.post('/sala/mensagem', async (req, res)=>{
    if(!await token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick)){
        return false
    }
    let resp = await salaController.enviarMensagem(req.headers.nick, req.body.msg, req.body.idsala)
    res.status(200).send(resp);
}))

app.get("/sala/mensagens", async (req, res) => {
    const token = require("./util/token");
    const salaController = require("./controllers/salaController");

    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return res.status(401).send({ msg: "Usuário não autorizado" });

    let resp = await salaController.buscarMensagens(req.query.idSala, req.query.timestamp);
    res.status(200).send(resp);
});

app.delete("/sala/sair", async (req, res) => {
    const token = require("./util/token");
    const salaController = require("./controllers/salaController");

    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return res.status(401).send({ msg: "Usuário não autorizado" });

    let resp = await salaController.sair(req.headers.iduser, req.query.idsala);
    res.status(200).send(resp);
});

app.post("/sair", async (req, res) => {
    try {
        // No caso de um JWT, "sair" apenas significa que o cliente deve descartar o token.
        // Opcionalmente, se estivesse usando um sistema de tokens inválidos (blacklist), poderia adicioná-lo aqui.

        res.status(200).send({ message: "Logout realizado com sucesso!" });
    } catch (error) {
        res.status(500).send({ message: "Erro ao tentar deslogar" });
    }
});
app.use('/', router);

module.exports = app;
