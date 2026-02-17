# 📦 Sistema de Controle de Estoque e Produção

Sistema web completo para **gestão de inventário e planejamento de produção industrial**. Permite cadastrar matérias-primas e produtos, associar insumos a cada produto e calcular automaticamente um plano de produção otimizado que maximiza o faturamento com base no estoque disponível.

---

## Visão Geral

O sistema é dividido em duas partes independentes que se comunicam via API REST:

| Parte | Tecnologia | README |
|---|---|---|
| **Backend** | Java 21 + Spring Boot | [📄 backend/README.md](./backend/README.md) |
| **Frontend** | React + TypeScript + Vite | [📄 frontend/README.md](./frontend/README.md) |

O **backend** é responsável por toda a lógica de negócio, persistência de dados (Oracle XE) e exposição dos endpoints REST. O **frontend** consome esses endpoints para fornecer uma interface gráfica intuitiva ao usuário final.

---

## Funcionalidades Principais

- ✅ Cadastro, edição e exclusão de **Matérias-Primas** com controle de estoque
- ✅ Cadastro, edição e exclusão de **Produtos** com preço e composição de insumos
- ✅ Associação de matérias-primas a produtos com quantidade necessária por unidade
- ✅ **Plano de Produção Otimizado**: calcula quais produtos fabricar, priorizando os de maior valor para maximizar o retorno total

---

## Como Funciona o Plano de Produção

O algoritmo guloso (greedy) ordena os produtos do maior para o menor preço e aloca o estoque disponível de forma sequencial:

```
1. Ordena produtos por preço (decrescente)
2. Para cada produto, calcula quantas unidades podem ser produzidas com o estoque atual
3. Desconta os insumos utilizados e avança para o próximo produto
4. Retorna o plano com quantidades e o valor total estimado
```

---

## Pré-requisitos

- Java 21+
- Node.js 18+
- Oracle Database XE

---

## Execução Rápida

### Backend
```bash
cd backend
mvn spring-boot:run
# API disponível em http://localhost:8080
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Interface disponível em http://localhost:5173
```

> Certifique-se de que o backend esteja em execução antes de iniciar o frontend. O proxy do Vite encaminha automaticamente as chamadas `/api/*` para `http://localhost:8080`.

---

## Estrutura do Repositório

```
/
├── backend/          # API REST — Java 21 + Spring Boot
│   └── README.md
├── frontend/         # Interface Web — React + TypeScript
│   └── README.md
└── README.md         # Este arquivo
```

---

## Licença

© 2026 Inventory Control System. Todos os direitos reservados.
