<<<<<<< HEAD
# GDASH - Sistema de Monitoramento de Energia Renovável

## 📖 Visão Geral

GDASH é uma aplicação full-stack para monitoramento de geração de energia fotovoltaica. O sistema coleta dados climáticos que impactam a produção solar e fornece insights através de um dashboard intuitivo.

**Tecnologias:** React + Vite + Tailwind, Express.js (TypeScript), PostgreSQL, Redis, Python, Docker

---

## 🏗️ Arquitetura do Sistema

### Pipeline de Dados
```
Python Collector → Redis Queue → Node Worker → Express API → PostgreSQL
                                                              ↓
                                                      React Frontend
```

### Serviços

1. **Python Collector** (`python/weather_collector.py`)
   - Coleta dados climáticos da API Open-Meteo
   - Publica mensagens na fila Redis
   - Intervalo configurável (padrão: 1 hora)

2. **Redis Message Broker**
   - Fila de mensagens assíncrona
   - Desacoplamento entre coleta e processamento

3. **Node.js Worker** (`worker/index.ts`)
   - Consome mensagens da fila Redis
   - Valida e envia dados para a API
   - Retry logic para falhas

4. **Express API** (`server/`)
   - Autenticação JWT
   - CRUD de usuários
   - Armazenamento de logs climáticos
   - Geração de insights de IA
   - Exportação CSV/XLSX

5. **PostgreSQL Database**
   - Armazenamento persistente
   - Drizzle ORM para type-safety
   - Tabelas: users, weather_logs, insights

6. **React Frontend** (`client/`)
   - Dashboard com visualizações
   - Gerenciamento de usuários
   - Integração com API pública (PokéAPI)

---

## 🚀 Execução

### 1️⃣ Desenvolvimento (Replit)

A aplicação já está configurada e rodando no Replit:

```bash
# O servidor já está executando na porta 5000
# Frontend e backend integrados
```

**Credenciais padrão:**
- Email: `admin@gdash.com`
- Senha: `123456`

### 2️⃣ Produção com Docker Compose

```bash
# Subir todos os serviços
docker-compose up -d

# Verificar status
docker-compose ps

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down
```

**URLs após inicialização:**
- Frontend + API: http://localhost:5000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

### 3️⃣ Execução Manual

#### Backend (API)
```bash
# Instalar dependências
npm install

# Push do schema para o banco
npm run db:push

# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

#### Python Collector
```bash
cd python

# Instalar dependências
pip install -r requirements.txt

# Executar
python weather_collector.py
```

#### Node Worker
```bash
cd worker

# Instalar dependências
npm install

# Executar
npm start
```

---

## 🗂️ Estrutura do Projeto

```
gdash/
├── client/                  # Frontend React
│   ├── src/
│   │   ├── pages/          # Dashboard, Users, Login, Explore
│   │   ├── components/     # Layout, UI components
│   │   └── lib/            # API client, utils
│   └── index.html
├── server/                  # Backend Express
│   ├── routes.ts           # API endpoints
│   ├── storage.ts          # Database operations
│   ├── auth.ts             # JWT authentication
│   ├── insights.ts         # AI insights generator
│   └── export.ts           # CSV/XLSX export
├── shared/
│   └── schema.ts           # Drizzle models & Zod schemas
├── python/
│   ├── weather_collector.py
│   ├── requirements.txt
│   └── Dockerfile
├── worker/
│   ├── index.ts            # Node worker
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── Dockerfile
└── README.md
```

---

## 📡 Endpoints da API

### Autenticação
- `POST /api/auth/login` - Login (retorna JWT token)
- `GET /api/auth/me` - Usuário atual (protegido)

### Usuários
- `GET /api/users` - Listar usuários (protegido)
- `POST /api/users` - Criar usuário (protegido)
- `PATCH /api/users/:id` - Atualizar usuário (protegido)
- `DELETE /api/users/:id` - Deletar usuário (protegido)

### Clima
- `GET /api/weather/logs` - Listar logs climáticos
- `POST /api/weather/logs` - Criar log (usado pelo worker)
- `GET /api/weather/export.csv` - Exportar CSV
- `GET /api/weather/export.xlsx` - Exportar XLSX

### Insights
- `GET /api/insights` - Listar insights
- `POST /api/insights/generate` - Gerar novos insights (protegido)
- `GET /api/insights/efficiency` - Análise de eficiência energética

---

## 🤖 Insights de IA

O sistema gera insights automaticamente baseado nos dados climáticos:

### Algoritmos Implementados

1. **Análise de Temperatura**
   - Detecta calor extremo (>35°C) → Alerta de eficiência reduzida
   - Temperatura ideal (15-30°C) → Condições ótimas

2. **Análise de Precipitação**
   - Alta probabilidade de chuva → Alerta de redução de geração
   - Estimativa de impacto percentual

3. **Análise de Vento**
   - Ventos fortes (>40 km/h) → Alerta de segurança
   - Recomendações de manutenção

4. **Análise de Umidade**
   - Alta umidade (>80%) → Alerta de condensação

5. **Previsão de Eficiência**
   - Pontuação 0-100 baseada em múltiplos fatores
   - Recomendações contextuais

### Geração Automática
- Novos insights são criados automaticamente quando dados são inseridos
- Análise das últimas 24-48 horas
- Severidade: low, medium, high

---

## 🌍 Coleta de Dados

### Fonte: Open-Meteo API (Gratuita)
- Endpoint: `https://api.open-meteo.com/v1/forecast`
- Sem necessidade de API key
- Dados para São Paulo, Brasil

### Dados Coletados
- Temperatura (°C)
- Umidade relativa (%)
- Velocidade do vento (km/h)
- Código climático (WMO)
- Precipitação (mm)

### Mapeamento de Condições
```python
0 → Sunny
1-2 → Partly Cloudy
3 → Cloudy
51-67 → Rainy
80-99 → Stormy
```

---

## 🔐 Segurança

- **Autenticação JWT** com expiração de 7 dias
- **Bcrypt** para hash de senhas (10 salt rounds)
- **Validação Zod** em todos os endpoints
- **Middleware de autorização** para rotas protegidas
- **Variáveis de ambiente** para secrets

### Variáveis de Ambiente

```bash
# Backend
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-secret-key
PORT=5000

# Python Collector
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_QUEUE=weather_queue
COLLECTION_INTERVAL=3600

# Worker
REDIS_HOST=localhost
REDIS_PORT=6379
API_URL=http://localhost:5000
POLL_INTERVAL=5000
```

---

## 📊 Schema do Banco de Dados

### Tabela: users
```typescript
id: serial (PK)
name: text
email: text (unique)
password: text (hashed)
role: text (Admin/User)
status: text (Active/Inactive)
lastLogin: timestamp
createdAt: timestamp
```

### Tabela: weather_logs
```typescript
id: serial (PK)
timestamp: timestamp
location: text
temperature: real
humidity: real
windSpeed: real
condition: text
precipitationProb: real
createdAt: timestamp
```

### Tabela: insights
```typescript
id: serial (PK)
type: text (alert/info/prediction)
title: text
description: text
severity: text (low/medium/high)
timestamp: timestamp
createdAt: timestamp
```

---

## 🎨 Frontend Features

### Dashboard (`/`)
- Cards de métricas em tempo real
- Gráfico de temperatura (Recharts)
- Painel de insights de IA
- Tabela de logs recentes
- Exportação CSV/XLSX

### Usuários (`/users`)
- Listagem com tabela
- CRUD completo
- Filtros por role e status
- Badges visuais

### Explorar API (`/explore`)
- Integração com PokéAPI
- Paginação
- Cards responsivos
- Demonstração de consumo de API pública

### Login (`/login`)
- Autenticação via JWT
- Validação de formulário
- Rotas protegidas
- Persistência de token

---

## 🐳 Docker

### Serviços no Docker Compose
- `postgres` - PostgreSQL 16
- `redis` - Redis 7
- `python-collector` - Coletor de dados
- `worker` - Worker Node.js
- `api` - Backend Express + Frontend React

### Health Checks
- PostgreSQL: `pg_isready`
- Redis: `redis-cli ping`

### Volumes
- `postgres_data` - Persistência do banco

---

## 🧪 Teste da Aplicação

### 1. Login
1. Acesse http://localhost:5000/login
2. Use: `admin@gdash.com` / `123456`

### 2. Dashboard
- Visualize dados climáticos
- Veja insights de IA
- Exporte dados (CSV/XLSX)

### 3. Gerenciamento de Usuários
- Navegue para `/users`
- Crie, edite, delete usuários
- Teste as permissões

### 4. Explorar API
- Navegue para `/explore`
- Teste a paginação da PokéAPI
- Veja os cards de Pokémon

### 5. Coleta de Dados (Docker)
```bash
# Ver logs do coletor Python
docker-compose logs -f python-collector

# Ver logs do worker
docker-compose logs -f worker

# Ver logs da API
docker-compose logs -f api
```

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- React 19
- Vite
- TypeScript
- Tailwind CSS
- Shadcn/UI
- TanStack Query
- Wouter (routing)
- Recharts
- React Hook Form + Zod

### Backend
- Express.js
- TypeScript
- Drizzle ORM
- PostgreSQL (Neon)
- JWT + Bcrypt
- XLSX

### Serviços
- Python 3.11
- Redis
- Docker

### APIs Externas
- Open-Meteo (clima)
- PokéAPI (exemplo)

---

## 📝 Decisões Técnicas

### Por que PostgreSQL em vez de MongoDB?
- Type-safety com Drizzle ORM
- Relações estruturadas
- Melhor integração com TypeScript
- Suporte nativo no Replit

### Por que Node Worker em vez de Go?
- Integração simplificada com o stack TypeScript
- Melhor reuso de tipos compartilhados
- Facilita debugging e desenvolvimento

### Por que Express em vez de NestJS?
- Menor overhead
- Setup mais rápido
- Suficiente para o escopo do projeto
- Melhor performance

### Arquitetura de Filas
- Redis como message broker: leve, rápido, simples
- Desacoplamento entre coleta e processamento
- Retry logic no worker para resiliência

---

## 🎯 Diferenciais Implementados

✅ Autenticação JWT completa  
✅ Geração automática de insights de IA  
✅ Exportação de dados em múltiplos formatos  
✅ Interface moderna e responsiva  
✅ Docker Compose com todos os serviços  
✅ Type-safety end-to-end (TypeScript)  
✅ Integração com API pública (PokéAPI)  
✅ Dashboard com visualizações em tempo real  
✅ Pipeline de dados completo (Python → Redis → Worker → API → DB)  
✅ Usuário padrão criado automaticamente  

---

## 🔮 Melhorias Futuras

- [ ] Testes automatizados (Jest/Cypress)
- [ ] CI/CD pipeline
- [ ] Notificações em tempo real (WebSockets)
- [ ] Filtros avançados no dashboard
- [ ] Múltiplas localizações
- [ ] Previsão climática (ML)
- [ ] PWA para mobile
- [ ] Internacionalização (i18n)

---

## 👥 Autor

Desenvolvido para o processo seletivo GDASH 2025/02

---

## 📄 Licença

MIT License



