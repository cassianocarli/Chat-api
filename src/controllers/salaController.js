

exports.get=async function(){
    const salaModel = require('../models/salaModel');
    return await salaModel.listarSalas();
}

exports.get = async (req, res) =>{
    return await salaModel.listarSalas();
}

exports.entrar= async (iduser,idsala)=>{
    const sala = await salaModel.buscarSala(idsala);
    let usuarioModel=require('../models/usuarioModel');
    let user= await usuarioModel.buscarUsuario(iduser);
    user.sala={_id:sala._id, nome:sala.nome, tipo:sala.tipo};
    if(await usuarioModel.alterarUsuario(user)){
        return {msg:"OK", timestamp:timestamp=Date.now()};
    }
    return false;
}
exports.enviarMensagem = async(nick, msg, idsala)=>{
    const sala=await salaModel.buscarSala(idsala);
    if(!sala.msgs){
        sala.msgs=[];
    }
    timestamp=Date.now()
    sala.msgs.push({
        timestamp:timestamp,
        msg:msg,
        nick:nick
    })
    let resp = await salaModel.atualizarMensagens(sala);
    return{"msg":"OK", "timestamp":timestamp};
}

exports.buscarMensagens = async (idsala, timestamp)=>{
    let mensagens=await salaModel.buscarMensagens(idsala, timestamp)
    return{
        "timestamp":mensagens[mensagens.length -1].timestamp,
        "msgs":mensagens
    };
}
exports.sair = async (iduser, idsala) => {
    try {
        const sala = await salaModel.buscarSala(idsala);
        let usuarioModel = require('../models/usuarioModel');
        let user = await usuarioModel.buscarUsuario(iduser);
        
        if (user.sala && user.sala._id === sala._id) {
            user.sala = null;  // Remove o usuário da sala
            if (await usuarioModel.alterarUsuario(user)) {
                return { msg: "Usuário saiu da sala com sucesso" };
            } else {
                return { msg: "Erro ao atualizar o usuário", error: true };
            }
        } else {
            return { msg: "Usuário não está na sala especificada", error: true };
        }
    } catch (error) {
        console.error("Erro na função sair:", error);
        return { msg: "Erro interno do servidor", error: true };
    }
};
