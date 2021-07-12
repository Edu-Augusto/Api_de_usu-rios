const PORT = process.env.PORT || 3000;

//Ferramentas necessárias para a api
const { Op } = require('sequelize');
const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const render = require('koa-ejs');
const koaStatic = require('koa-static');
var bodyParser = require('koa-bodyparser');
const bcrypt = require('bcrypt');


//Importando o banco de dados
const connection = require('../database/database');
//Koa Js
const app = new Koa();
var router = new Router();
//Importando a model de usuários
const Users = require('../database/Usuario');

//Setando a pasta views para as páginas web
render(app, {
  root: path.join(__dirname, '../views'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
});
//Conexão com o banco de dados
connection
  .authenticate()
  .then(() => {
    console.log("Servidor conectado com sucesso com o banco de dados!")
  })
  .catch((erro) => {
    console.log(erro)
  })
//Rota principal da API, arquivo EJS
router.get('/', async (ctx) => {
  await ctx.render("index");
});
//Rota para a criação de usuários, arquivo EJS
router.get('/user/create', async (ctx) => {
  await ctx.render("create");
})
//Rota de listagem de usuários, arquivo EJS
router.get('/user/list', async (ctx) => {
  const users = await Users.findAll();
  await ctx.render("list", { users });
});
//Rota que retorna os usuários em JSON
router.get('/users', async (ctx) => {
  const users = await Users.findAll();
  ctx.status = 200;
  ctx.response.type = 'json';
  ctx.response.body = users;
})
//Rota para criar novos usuários na API
router.post('/user/save', async (ctx) => {
  var body = ctx.request.body;
  var nome = body.nome;
  var email = body.email;
  var senha = body.senha;
  var userName = body.userName;
  var cpf = body.cpf;
  var status;

  if (nome != undefined) {
    if (!isNaN(cpf)) {
      if (email != undefined) {
        if (senha != undefined) {
          if (userName != undefined) {
            await Users.findOne({
              where: {
                [Op.or]: [
                  { email: email },
                  { cpf: cpf }
                ]
              }
            }).then(el => {
              if (el == undefined) {
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(senha, salt);
                status = true;
                Users.create({
                  nome: nome,
                  email: email,
                  senha: hash,
                  cpf: cpf,
                  userName: userName,
                  status: 1
                })
              } else {//if(el == undefined)                             
                status = false;
              }
            });
          } else {//if(userName != undefined)
            ctx.status = 422;
            ctx.response.type = 'json';
            ctx.response.body = `Formulário inválido.`;
          }
        } else {//if(senha == undefined)
          ctx.status = 422;
          ctx.response.type = 'json';
          ctx.response.body = `Formulário inválido.`;
        }
      } else {//if(email == undefined)
        ctx.status = 422;
        ctx.response.type = 'json';
        ctx.response.body = `Formulário inválido.`;
      }
    } else {//if(isNaN(cpf))
      ctx.status = 422;
      ctx.response.type = 'json';
      ctx.response.body = `Formulário inválido.`;
    }
  } else {//if(nome == undefined)
    ctx.status = 422;
    ctx.response.type = 'json';
    ctx.response.body = `Formulário inválido.`;
  }
  /*Caso tente cadastre um usuario com o cpf ou email ja existente, cairá no else e será retornado o erro,
    caso não, cairá no if e cadastrara o user normalmente.*/
  if (status == true) {
    ctx.status = 200;
    ctx.response.type = 'json';
    ctx.response.body ={Msg:`Sucesso! Retorne a página principal = http://localhost:3000`,
                        body:"Deu certo"}
  } else {
    ctx.status = 422;
    ctx.response.type = 'json';
    ctx.response.body = `Formulário inválido.`;
  }
});
//Rota de edição de informações do usuário
router.put('/user/update/:id', async (ctx) => {
  var id = ctx.params.id;
  var body = ctx.request.body;
  var { nome, cpf, email, userName, senha } = body
  var status;
  if (isNaN(id)) {
    ctx.status = 400;
    ctx.response.type = 'json';
    ctx.response.body = `Id inválido.`;
  } else {
    await Users.findOne({
      where: {
        id: id
      }
    }).then((el) => {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(senha, salt);
      if (el == undefined) {
        status = false;
      } else {
        status = true;
        if (el != null) {
          Users.update({ nome }, { where: { id } })
        }
        if (cpf != null) {
          Users.update({ cpf }, { where: { id } })
        }
        if (email != null) {
          Users.update({ email }, { where: { id } })
        }
        if (userName != null) {
          Users.update({ userName }, { where: { id } })
        }
        if (senha != null) {
          Users.update({ senha:hash }, { where: { id } })
        }
      }
    })
    if (status == true) {
      ctx.status = 200;
      ctx.response.type = 'json';
      ctx.response.body ={Msg:`Usuário editado com sucesso.`,
                          body:"Deu certo"};
    } else {
      ctx.status = 400;
      ctx.response.type = 'json';
      ctx.response.body = `Id de usuário não encontrado.`;
                          
    }
  }
});
//Rota de deleção de usuário
router.delete('/user/delete/:id', async (ctx) => {
  var id = ctx.params.id;
  var status;
  if (isNaN(id)) {
    ctx.status = 400;
    ctx.response.type = 'json';
    ctx.response.body = `Id inválido.`;
  } else {
    await Users.findOne({
      where: {
        id: id
      }
    }).then((el) => {
      if (el == undefined) {
        status = false;
      }
      else {
        status = true;
        Users.destroy({ where: { id: id } })
      }
    })

    if (status == true) {
      ctx.status = 200;
      ctx.response.type = 'json';
      ctx.response.body = {Msg:`Usuário deletado. Retorne a url principal : http://localhost:3000`,
                          body:"Deu certo"};
    } else {
      ctx.status = 400;
      ctx.response.type = 'json';
      ctx.response.body = `Id não encontrado.`;
    }
  }
})

//Funcionalidades que o Koa irá utilizar
app.use(koaStatic('../public'));
app.use(bodyParser());
app
  .use(router.routes())
  .use(router.allowedMethods());
//Criando o servidor
app.listen(PORT);
