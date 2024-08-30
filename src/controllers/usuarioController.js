const token = require("../util/token");
const usuarioModel = require('../models/usuarioModel');

exports.entrar = async (nick) => {
  let resp = await usuarioModel.registrarUsuario(nick);
  if (resp.insertedId) {
    const idUser = resp.insertedId;
    const tokenValue = await token.setToken(JSON.stringify(idUser).replace(/"/g, ''), nick);
    return {
      "idUser": idUser,
      "token": tokenValue,
      "nick": nick
    }
  } else {
    throw new Error('Failed to insert user');
  }
}