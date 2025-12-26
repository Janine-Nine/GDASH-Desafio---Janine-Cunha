Setup resumido e como rodar (gerado pelo assistente)

1) Subir serviços (RabbitMQ + MongoDB) via Docker Compose:

   docker compose up -d

   - RabbitMQ Management UI: http://localhost:15672 (user/password)
   - MongoDB: mongodb://localhost:27017

2) Worker (producer + consumer)

   cd meu-projeto-node\worker
   npm install
   copy .env.example .env   # editar se necessário

   # em um terminal rode o consumer
   npm run start-consumer

   # em outro terminal rode o producer (API)
   npm run start-producer
   POST /task para enviar tarefas (ex: via curl)

3) NestJS (api com MongoDB)

   cd meu-projeto-node\nest-app
   npm install
   npm run start:dev

4) React client (Vite + Tailwind)

   cd meu-projeto-node\client
   npm install
   npm run dev

5) shadcn/ui

   - shadcn/ui requer configuração manual (instale `@shadcn/ui` e siga a documentação https://ui.shadcn.com/)
   - Recomendado: após `npm install` rode `npx shadcn-ui@latest init` e siga as instruções

Notas:
- As dependências do NestJS e do client precisam ser instaladas com npm. Se preferir, posso rodar `npm install` para cada subprojeto agora (vai demorar para baixar pacotes). Deseja que eu execute as instalações agora?

### Docker (opção recomendada)

Eu também preparei um `docker-compose.yml` que orquestra RabbitMQ, MongoDB, NestJS, Python producer, Node worker e o frontend. Para subir tudo via Docker (build + run):

```cmd
cd C:\Users\JANINE\Desktop\Desafio Técnico GDASH-Janine Cunha
docker compose up -d --build
```

Ver logs de um serviço:

```cmd
docker compose logs -f node-worker
docker compose logs -f gdash-nest
docker compose logs -f gdash-python-producer
```

Parar e remover containers:

```cmd
docker compose down
```

Observações:
- O RabbitMQ Management UI estará em http://localhost:15672 (user/password).
- MongoDB ficará acessível em mongodb://localhost:27017.

Se quiser, eu já subo/buildo os containers agora e verifico os logs para confirmar tudo funcionando. 

# Instruções rápidas

Este diretório contém o projeto Node e um ambiente virtual Python criado pelo assistente.

Passos para usar localmente (Windows, cmd.exe):

1) Ativar o ambiente Python (.venv):

    .venv\Scripts\activate

2) (Opcional) Instalar dependências Python se existir `requirements.txt`:

    python -m pip install -r requirements.txt

3) Node.js: já executei `npm install` aqui. Para rodar o projeto, verifique os scripts em `package.json` e use, por exemplo:

    npm start
    # ou
    npm run dev

4) Para desativar o venv:

    deactivate

Observações:
- O `npm install` foi executado em `meu-projeto-node` e os módulos foram instalados.
- Não foi encontrado `requirements.txt` na pasta do projeto, então não há dependências Python a instalar (se você tiver um arquivo, coloque-o na mesma pasta e rode o comando do passo 2).

Se quiser, eu posso:
- Mostrar o conteúdo de `package.json` para confirmar os scripts disponíveis.
- Rodar `npm start` ou outro script para testar o app.
- Criar um `requirements.txt` ou `pyproject.toml` se você quiser gerenciar dependências Python.
