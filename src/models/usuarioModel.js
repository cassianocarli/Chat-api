const db = require("./db");

/**
 * Registra um novo usuário no banco de dados.
 * @param {string} nick - O nickname do usuário.
 * @returns {Promise} - Uma promessa que resolve com o resultado da operação.
 */
async function registrarUsuario(nick) {
    return await db.insertOne("usuario", { "nick": nick });
}

/**
 * Busca um usuário no banco de dados pelo ID.
 * @param {string} idUser - O ID do usuário.
 * @returns {Promise} - Uma promessa que resolve com o usuário encontrado ou null se não encontrado.
 */
let buscarUsuario = async (idUser) => {
    let user = await db.findOne("usuarios", idUser);
    return user;
}

/**
 * Altera as informações de um usuário no banco de dados.
 * @param {object} user - O objeto com as informações do usuário.
 * @returns {Promise} - Uma promessa que resolve com o resultado da operação.
 */
let alterarUsuario = async (user) => {
    return await db.updateOne("usuarios", user, { _id: user._id });
}

module.exports = { registrarUsuario, buscarUsuario, alterarUsuario }