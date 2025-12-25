# Mongo init scripts

Esta pasta contém scripts e arquivos auxiliares para inicializar o MongoDB usado pelo projeto.

Como funciona
- Quando o serviço `mongo` é iniciado com um volume vazio, o Docker executa qualquer arquivo encontrado em `/docker-entrypoint-initdb.d`.
- O script `init-mongo.js` cria a database `gdash`, a coleção `weather` e insere alguns documentos de exemplo se a coleção estiver vazia.

Como usar
1. Certifique-se de que o `docker-compose.yml` monta a pasta local `meu-projeto-node/mongo` em `/docker-entrypoint-initdb.d`.
2. Se o volume `mongo-data` já contém dados e você quer re-inicializar (apagar dados existentes), remova o volume antes de subir o serviço:
   ```cmd
   docker compose down
   docker volume rm <nome-do-volume-mongo>  # ex: gdash-mongo-data
   docker compose up -d --build
   ```

Observações:
- Os scripts só são executados pelo container quando o diretório de dados do Mongo está vazio; eles não rodam novamente se houver dados existentes. Por isso a remoção do volume é necessária para re-inicializar completamente.
- Pode ser necessário ajustar permissões se estiver em um host com políticas restritas; use `:ro` no volume se quiser montar read-only para a imagem.
