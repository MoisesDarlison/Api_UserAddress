
<h1 align="center"> 
	CreativeCode_teste
</h1>
<h2 align="center">Creative Code Testes BackEnd</h2>

## Variáveis de ambiente

Antes de executar a API, você precisa configurar o arquivo .env. Use o exemplo disponível, fornecido neste projeto, para criar o seu.

Você pode copiá-lo executando o seguinte comando no diretório raiz deste projeto:

`$ cp .env.example .env`

Depois de concluir, você precisará definir os novos valores em seu arquivo `.env`.

## Configuração

Antes de iniciar o serviço é necessário baixar as dependências do projeto com

`npm install`

## Executando Migrations

Depois de instalar todas as dependências, antes de iniciar o servidor, é necessário executar algumas migrations para criar os esquemas do banco de dados.

Você pode fazer isso executando:

`npm run typeorm migration:run`

## Executando a API

Depois de concluir todas as etapas anteriores, você estará pronto para começar a usar a API. Inicie o aplicativo executando o seguinte comando:

`$ npm run dev`

A API usa a porta 3000 como padrão, fique à vontade para alterá-la.

### Executando testes
- [x] Testes de integração </br>
Você pode executar os testes de integração executando o seguinte comando:

Para Windows
`npm run test_win`

Para Linux
`npm run test`

- [x] Testes de Rotas </br>

Você testar as rotas:

### Rotas
### URL Base
 
 `address:port`
 

Tabela de Rotas
   * Rota de Autenticação
      * Autenticar usuário - `post/auth`
          * Necessário enviar no body (email e password)
   
   * Rota de Usuário
      
      * Novo Usuário - `post/users` 
        * Enviar no body (name, telephone, email, password, age, weight, ethnicity)
      
      * Listar todos os usuário - `get/users/list`
        * Enviar no header-autorization-Bearer o `token` enviado ao response.body da rota `post/auth`
      
      * Listar os dados de único usuário - `get/users`
        * Enviar no header-autorization-Bearer o `token` enviado ao response.body da rota `post/auth`
      
      * Editar os dados do usuário - `put/users`
        * Enviar no header-autorization-Bearer o `token` enviado ao response.body da rota `post/auth`
        * Enviar no body (name, telephone, email, password, age, weight, ethnicity)
      
      * Excluir um usuário - `delete/users`
        * Enviar no header-autorization-Bearer o `token` enviado ao response.body da rota `post/auth`
   * Rota de Endereços
      * Novo Endereço - `post/address`
        * Enviar no header-autorization-Bearer o `token` enviado ao response.body da rota `post/auth`
        * Enviar no body (addressName, addressNumber, complement, zipcode, city, state )
      
      * Listar todos os endereços de um usuário - `get/address/list`
        * Enviar no header-autorization-Bearer o `token` enviado ao response.body da rota `post/auth`
      * Listar os dados de único endereço - `get/address/___id_do_endereço pesquisado_____`  
        * Enviar no header-autorization-Bearer o `token` enviado ao response.body da rota `post/auth`
      
      * Editar os dados de um endereço - `put/address/___id_do_endereço pesquisado_____`
        * Enviar no header-autorization-Bearer o `token` enviado ao response.body da rota `post/auth`
        * Enviar no body (addressName, addressNumber, complement, zipcode, city, state )
      
      * Excluir um endereço - `delete/address/___id_do_endereço pesquisado_____`
        * Enviar no header-autorization-Bearer o `token` enviado ao response.body da rota `post/auth`


<h5>📫 Como chegar até mim:<h5>
<a href="https://www.linkedin.com/in/moises-darlison-12833259/">🔗 Linkedin</a>.<br/>
<a href="https://github.com/MoisesDarlison/MoisesDarlison/">🔗 github</a>.<br/>
<a href="mailto:moisesdarlison91@gmail.com">📧 Moises Darlison</a>.<br/>
<br/>  <br/>  <br/>
  
<blockquote cite=Albert Einstein>
  <p> Lembre-se que as pessoas podem tirar tudo de você, menos o seu conhecimento.</p>
  <u>Albert Einstein</u>
</blockquote>
