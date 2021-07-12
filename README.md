# Api_de_usuários

   <div>
        <h3>Descrição</h3>
        <p>Esta api tem como objetivo o controle de usuários, com funcionalidades como listar, adicionar, editar e deletar usuários.Além do retorno de dados e operções no banco de dados, foi criada rotas gráficas para listar e criar usuários.</p>
    </div>
    <div>
        <h3>Ferramentas instaladas no projeto</h3>
            <ul>
                <li>Koa => npm install --save-dev koa</li>
                <li>Mocha => npm install --save-dev mocha</li>
                <li>Chai => npm install --save-dev chai </li>
                <li>Chai-http => npm install chai-http</li>
                <li>Koa-router => npm i @koa/router</li>
                <li>Koa-ejs => npm install koa-ejs</li>
                <li>Koa-static => npm install koa-static</li>
                <li>Koa-bodyparser => npm install koa-bodyparser</li>
                <li>Bcrypt => npm install bcrypt</li>
                <li>Sequelize => npm install sequelize</li>
                <li>Mysql 2 => npm install mysql2</li>
            </ul>
    </div>
    <div>
        <h3>Como executar o projeto</h3>
        <p>Como primeiro passo, vá no arquivo database.js dentro da pasta database e modifique o código a seguir para o login e senha do seu mysql:
            <pre>
                <code>
                    const connection=new Sequelize('api_de_usuarios', >>'usuário aqui'<<, >>'senha aqui'<<,{
                        host:'localhost',
                        dialect:'mysql'
                    });
                </code>
            </pre>
            Após isso navegue até a pasta src e digite o comando node index.js para iniciar o servidor e ter acesso as rotas.
        </p>
    </div>
    <div>
        <h3>Descrição das rotas</h3>
        <p>A seguir uma descrição das funcionalidades das rotas, com seus retornos e parâmetros necessários.</p>
        <h4>/users</h4>
        <ul>
            <li>Esta rota lista todos os usuários ja cadastrados no banco de dados</li>
            <li>Nenhum parâmetro necessário.</li>
        </ul>
        <h4>/user/save</h4>
        <ul>
            <li>Esta rota tem a função de cadastrar um novo usuário no banco de dados.</li>
            <li>Tipo: JSON</li>
            <li>Dados necessários no corpo:
                <ul>
                    <li>"nome": "exemplo de nome"</li>
                    <li>"email": "exemplo de email"</li>
                    <li>"senha": "exemplo de senha"</li>
                    <li> "cpf": exemplo de cpf (este parâmetro precisa ser tipo inteiro e com o mínimo e máximo de 11 caracteres)</li>
                    <li>"userName": "exemplo de username"</li>
                </ul>
            </li>
        </ul>
        <h4>/user/update/:id</h3>
        <p>Esta rota edita dados do usuário no banco de dados</p>
        <p>Parâmetro id necessário para editar, que deve corresponder á um user no banco.</p>
        <p>Dados necessários no corpo:</p>
        <ul>
            <li>"nome": "exemplo de nome"</li>
            <li>"email": "exemplo de email"</li>
            <li>"senha": "exemplo de senha"</li>
            <li> "cpf": exemplo de cpf (este parâmetro precisa ser tipo inteiro e com o mínimo e máximo de 11 caracteres)</li>
            <li>"userName": "exemplo de username"</li>
        </ul>
        <h5>Esta rota pode conter ou não todos os parâmetros, só será editado os parâmetros passados.</h5>
        <h4>/user/delete/:id</h3>
        <p>Rota para deletar usuário no banco de dados.</p>
        <p>Parâmetro id necessário para deletar, que deve corresponder á um user no banco.</p>
    </div>
    <div>
       <h3>Rotas gráficas</h3>
       <p>Para acessar a parte gráfica do projeto, acesse a rota http://localhost:3000 que será possivel listar e criar novos usuários no banco de dados, sem as funcionalidades edição e deleção de usuários.Recomendo a utilização do Postman para acesso as funcionalidades da API.</p>
    </div>
    <footer>
        <h3>Contato:</h3>
        <p>Para qualquer duvida em relação ao projeto e outros assuntos, entre em contato pelo github ou pelas redes sociais:
            <ul>
                <li><a href="https://www.instagram.com/eduu_augusto/">Instagran</a></li>
                <li><a href="https://www.linkedin.com/in/eduardo-augusto-07/">Linkedin</a></li>
            </ul>
        </p>
        </footer>
</body>
