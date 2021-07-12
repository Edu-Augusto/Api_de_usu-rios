const Sequelize=require('sequelize');
const connection=new Sequelize('api_de_usuarios', 'root', '1234',{
    host:'localhost',
    dialect:'mysql'
});

module.exports=connection;
