const db = require('./db');

async function listarSalas() {
    try {
        return await db.findAll('salas');
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function buscarSala(idsala) {
    try {
        return await db.findOne('salas', idsala);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function atualizarMensagens(sala) {
    try {
        return await db.updateOne('salas', sala, { _id: sala._id });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function buscarMensagens(idsala, timestamp) {
    try {
        let sala = await buscarSala(idsala);
        if (sala.msgs) {
            let msgs = [];
            sala.msgs.forEach((msg) => {
                if (msg.timestamp >= timestamp) {
                    msgs.push(msg);
                }
            });
            return msgs;
        }
        return [];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { listarSalas, atualizarMensagens, buscarMensagens, buscarSala }; 
