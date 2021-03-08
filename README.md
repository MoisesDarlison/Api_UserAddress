
<h1 align="center"> 
	CreativeCode_teste
</h1>
<h2 align="center">Creative Code Testes BackEnd</h2>

## Variaveis de ambiente

Antes de executar a API, você precisa configurar o arquivo .env. Use o exemplo disponível, fornecido neste projeto, para criar o seu.

Você pode copiá-lo executando o seguinte comando no diretório raiz deste projeto:

`$ cp .env.example .env`

Depois de concluir, você precisará definir as chaves no seu arquivo `.env`.

## Configuração

Antes de inicair o serviço é necessario baixar as dependencias do projeto com

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
- [x] Testes de integracao </br>
Você pode executar os testes de integracao executando o seguinte comando:

Para windows
`npm run test_win`

Para linux
`npm run test`

- [x] Testes de Rotas </br>

Você testar as rotas:

### Rotas
### URL Base
 
 `address:port`
 

Tabela de Rotas
   * Rota de Autenticação
      * Autenticar usuario - `post/auth`
          * Necessario enviar no body (email e password)
   
   * Rota de Usuário
      
      * Novo Usuário - `post/users` 
        * Enviar no body (name, telephone, email, password, age, weight, ethnicity)
      
      * Listar todos os usuario - `get/users/list`
        * Enviar no header-autorization-Bearer o `token` enviado ao response.body da rota `post/auth`
      
      * Listar os dados de unico usuario - `get/users`
        * Enviar no header-autorization-Bearer o `token` enviado ao response.body da rota `post/auth`
      
      * Editar os dados do usuario - `put/users`
        * Enviar no header-autorization-Bearer o `token` enviado ao response.body da rota `post/auth`
        * Enviar no body (name, telephone, email, password, age, weight, ethnicity)
      
      * Excluir um usuario - `delete/users`
        * Enviar no header-autorization-Bearer o `token` enviado ao response.body da rota `post/auth`
   * Rota de Enderecços
      * Novo Endereço - `post/address`
        * Enviar no header-autorization-Bearer o `token` enviado ao response.body da rota `post/auth`
        * Enviar no body (addressName, addressNumber, complement, zipcode, city, state )
      
      * Listar todos os endereços de um usuario - `get/address/list`
        * Enviar no header-autorization-Bearer o `token` enviado ao response.body da rota `post/auth`
      * Listar os dados de unico endereço - `get/address/___id_do_endereço pesquisado_____`  
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
  <a href="#">Albert Einstein</a>
</blockquote>






