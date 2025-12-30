# 🚀 Desafio Técnico GDASH

Este repositório contém a solução do **Desafio Técnico da GDASH**, desenvolvida com foco em organização, escalabilidade e boas práticas de arquitetura moderna, utilizando frontend em React, backend em Node/NestJS, mensageria com RabbitMQ e integração com Python para processamento de dados.

---

## 🧠 Visão Geral da Arquitetura

O projeto segue uma arquitetura distribuída, composta por múltiplos serviços:

- **Frontend**: Interface web em React + Vite + Tailwind
- **Backend (API)**: NestJS com autenticação e estrutura modular
- **Worker / Consumer / Producer**: Serviços Node.js integrados via RabbitMQ
- **Python Producer**: Serviço responsável por download e envio de CSV
- **Banco de Dados**: MongoDB
- **Infraestrutura**: Docker e Docker Compose

---

## 🗂 Estrutura do Projeto


---

## ⚙️ Tecnologias Utilizadas

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Nginx
- Docker

### Backend
- Node.js
- NestJS
- TypeScript
- MongoDB
- RabbitMQ
- Docker / Docker Compose

### Integrações
- Python (processamento e envio de CSV)
- Mensageria assíncrona com RabbitMQ

---

## ▶️ Como Executar o Projeto

### Pré-requisitos
- Docker
- Docker Compose
- Node.js (caso queira rodar localmente sem Docker)

---

### 🔥 Subindo tudo com Docker (recomendado)

Na raiz do projeto:

```bash
docker-compose up --build
