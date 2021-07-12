
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should();

chai.use(chaiHttp);

// Teste
describe('Iniciando os testes em cada rota', () => {
    describe("GET users", () => {
        it('Testando GET para listar todos os users', (done) => {
            chai.request("http://localhost:3000")            
                .get('/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    describe("/POST user", () => {
        it('Criar novo usuário', (done) => {
            chai.request("http://localhost:3000")
                .post('/user/save')
                .send({
                    nome: "Fulano",
                    cpf: 10000000001,
                    email: "teste@teste.com",
                    userName: "Fulano-de-tal",
                    senha: "123456"
                }) // Vamos salvar um user
                .end((err, res) => {
                    should.exist(res.body);
                    res.should.have.status(200);
                    done();
                });
        });
    }) 
    describe("/PUT user", () => {
        it('Editar o user 1', function (done) {
            chai.request("http://localhost:3000")
                .put('/user/update/1')
                .send({
                    nome: "Eduardo",
                    cpf: 10000000002,
                    email: "teste@teste.br",
                    userName: "Fulano-de-tal",
                    senha: "123456"
                })
                .end(function (err, res) {
                    should.exist(res.body);
                    res.body.should.be.a('object');
                    res.should.have.status(200);
                    done();

                });
        })
    });
    describe("/DELETE user", () => {
        it('excluir o user com o id 1', function (done) {
            chai.request("http://localhost:3000")
                .delete('/user/delete/1')
                .end(function (err, res) {
                    should.exist(res.body);
                    res.should.have.status(200);
                    done();
                });
        });

    });
});