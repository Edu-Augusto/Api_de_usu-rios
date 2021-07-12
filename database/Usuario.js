const Sequelize=require("sequelize");
const connection=require("./database");

const Usuario=connection.define("usuario",{
    nome:{
        type:Sequelize.TEXT,
        allowNull: false
    },
    email:{
        type:Sequelize.TEXT,
        allowNull: false
    },
    senha:{
        type:Sequelize.TEXT,
        allowNull: false
    },
    userName:{
        type:Sequelize.TEXT,
        allowNull: false
    },
    cpf:{
        type:Sequelize.BIGINT,
        allowNull: false
    },
    status:{
        type:Sequelize.INTEGER,
        allowNull: false
    }

});
Usuario.sync({force:false});

module.exports= Usuario;