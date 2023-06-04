# recipes-backend

API para o app NadaGostoso, desenvolvido para o trabalho da disciplina de Tópicos Especiais de Informática na FATEC de Itu, SP.

Disponível em: https://nadagostoso-api.onrender.com/

<hr />

## Como executar o projeto utilizando Docker

```bash
# Clone o projeto
git clone https://github.com/splorg/recipes-backend.git

# Entra na pasta do projeto
cd recipes-backend

# Executa o docker-compose
docker compose up -d
```
Acesse a API em `http://localhost:3000/`

## Como executar o projeto localmente
É necessário o Node.js instalado e um banco de dados MongoDB disponível.

1. Clone o repositório
2. Na pasta raíz do projeto, execute o comando ```npm install```
3. Crie um arquivo .env com as variáveis de ambiente, seguindo o exemplo do arquivo .env.template:
```bash
DATABASE_URL=<string de conexão para um banco de dados MongoDB>
PORT=<porta em que o servidor será exposto>
SECRET=<string secreta que será usada para a criptografia das senhas>
```
4. Execute o comando `npm start`

Você pode agora acessar a API em localhost na porta que você definiu no .env (se não definir uma porta, será utilizada a 3000).
