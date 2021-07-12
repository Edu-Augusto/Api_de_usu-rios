const Sequelize=require('sequelize');
const connection=new Sequelize('api_de_usuarios', 'root', 'edu131413',{
    host:'localhost',
    dialect:'mysql'
});

module.exports=connection;