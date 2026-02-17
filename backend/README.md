# ⚙️ Backend — API REST

API RESTful desenvolvida em **Java 21 + Spring Boot** para o Sistema de Controle de Estoque e Produção. Responsável por toda a lógica de negócio, persistência dos dados e exposição dos endpoints consumidos pelo frontend.

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Linguagem | Java 21 |
| Framework | Spring Boot 4.0.2 |
| Persistência | Spring Data JPA / Hibernate |
| Banco de Dados | Oracle XE (XEPDB1) |
| Driver JDBC | ojdbc11 |
| Mapeamento | MapStruct 1.5.5 |
| Validação | Jakarta Bean Validation |
| Build | Maven |

---

## Estrutura do Projeto

```
src/main/java/com/teste/tecnico/
├── TecnicoApplication.java
├── controllers/
│   ├── ProductController.java
│   ├── RawMaterialController.java
│   ├── ProductRawMaterialController.java
│   └── ProductionController.java
├── services/
│   ├── ProductService.java
│   ├── RawMaterialService.java
│   ├── ProductRawMaterialService.java
│   └── ProductionService.java
├── repositories/
│   ├── ProductRepository.java
│   ├── RawMaterialRepository.java
│   └── ProductRawMaterialRepository.java
├── models/
│   ├── Product.java
│   ├── RawMaterial.java
│   └── ProductRawMaterial.java
├── dtos/
│   ├── ProductDTO.java
│   ├── RawMaterialDTO.java
│   ├── ProductRawMaterialDTO.java
│   ├── ProductRawMaterialResponseDTO.java
│   └── ProductionResponseDTO.java
├── mappers/
│   ├── ProductMapper.java
│   └── RawMaterialMapper.java
├── exceptions/
│   └── ResourceNotFoundException.java
└── handlers/
    └── GlobalExceptionHandler.java
```

---

## Pré-requisitos

- Java 21+
- Maven 3.8+
- Oracle Database XE (ou instância Oracle compatível)
- Schema Oracle com o usuário `TECNICO` criado

---

## Configuração do Banco de Dados

Crie o usuário e schema no Oracle antes de iniciar. As tabelas são geradas automaticamente pelo Hibernate (não é necessário executar DDL manualmente).

```sql
CREATE USER tecnico IDENTIFIED BY your_password;
GRANT CONNECT, RESOURCE TO tecnico;
GRANT UNLIMITED TABLESPACE TO tecnico;
```

Tabelas criadas automaticamente:

| Tabela | Descrição |
|---|---|
| `Products` | Cadastro de produtos com nome e preço |
| `Raw_Materials` | Estoque de matérias-primas |
| `Product_RawMaterial` | Associação produto ↔ matéria-prima com quantidade necessária |

---

## Configuração da Aplicação

Edite `src/main/resources/application.yml` com as credenciais do seu ambiente:

```yaml
spring:
  application:
    name: tecnico
  datasource:
    url: jdbc:oracle:thin:@localhost:1521/XEPDB1
    username: tecnico
    password: your_password
    driver-class-name: oracle.jdbc.OracleDriver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.OracleDialect
        format_sql: true
      open-in-view: false
```

> ⚠️ Não suba o `application.yml` com credenciais reais para repositórios públicos. Use variáveis de ambiente ou um arquivo `application-local.yml` ignorado pelo `.gitignore`.

---

## Como Executar

```bash
# Opção 1 — Maven Wrapper
mvn spring-boot:run

# Opção 2 — JAR
mvn clean package
java -jar target/tecnico-0.0.1-SNAPSHOT.jar
```

A API estará disponível em `http://localhost:8080`.

---

## Endpoints da API

### Produtos — `/api/products`

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/products` | Lista todos os produtos |
| `GET` | `/api/products/{id}` | Busca produto por ID |
| `POST` | `/api/products` | Cria um novo produto |
| `PUT` | `/api/products/{id}` | Atualiza um produto |
| `DELETE` | `/api/products/{id}` | Remove um produto |

**Corpo da requisição (POST / PUT):**
```json
{ "name": "Bicycle", "price": 599.99 }
```

**Resposta:**
```json
{ "id": 1, "name": "Bicycle", "price": 599.99 }
```

---

### Matérias-Primas — `/api/raw-materials`

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/raw-materials` | Lista todas as matérias-primas |
| `GET` | `/api/raw-materials/{id}` | Busca por ID |
| `POST` | `/api/raw-materials` | Cria uma nova matéria-prima |
| `PUT` | `/api/raw-materials/{id}` | Atualiza uma matéria-prima |
| `DELETE` | `/api/raw-materials/{id}` | Remove uma matéria-prima |

> ⚠️ Excluir uma matéria-prima vinculada a produtos retorna `409 Conflict`.

**Corpo da requisição:**
```json
{ "name": "Steel Tube", "stockQuantity": 200 }
```

---

### Associação Produto–Matéria-Prima — `/api/product-raw-materials`

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/product-raw-materials` | Lista todas as associações |
| `GET` | `/api/product-raw-materials/product/{productId}` | Associações de um produto |
| `POST` | `/api/product-raw-materials` | Cria uma associação |
| `PUT` | `/api/product-raw-materials/{id}` | Atualiza uma associação |
| `DELETE` | `/api/product-raw-materials/{id}` | Remove uma associação |

**Corpo da requisição:**
```json
{ "productId": 1, "rawMaterialId": 3, "quantity": 4 }
```

**Resposta:**
```json
{
  "id": 10,
  "productId": 1,
  "productName": "Bicycle",
  "rawMaterialId": 3,
  "rawMaterialName": "Steel Tube",
  "quantity": 4
}
```

---

### Planejamento de Produção — `/api/production`

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/production` | Calcula o plano de produção otimizado |

**Resposta:**
```json
{
  "productionPlan": {
    "Bicycle": 25,
    "Scooter": 10
  },
  "totalValue": 17499.90
}
```

---

## Lógica de Negócio — Algoritmo de Produção

O endpoint `/api/production` implementa uma **estratégia gulosa (greedy)**: ordena os produtos do maior para o menor preço e aloca o estoque sequencialmente para maximizar o faturamento total.

### Fluxo Principal

```java
List<Product> products = productRepository.findAll()
    .stream()
    .sorted(Comparator.comparing(Product::getPrice).reversed())
    .toList();

Map<Integer, Integer> stock = buildStockSnapshot(rawMaterialRepository.findAll());

for (Product product : products) {
    int qty = maxProducible(product, stock);
    if (qty > 0) {
        productionPlan.put(product.getName(), qty);
        totalValue = totalValue.add(valueOf(product, qty));
        deductStock(product.getProductRawMaterials(), qty, stock);
    }
}
```

### Métodos Auxiliares

**`buildStockSnapshot`** — cria um mapa de estoque virtual para que o loop nunca releia o banco em estados intermediários.

**`maxProducible`** — calcula quantas unidades do produto cabem no estoque atual (mínimo entre todos os insumos).

**`possibleUnits`** — calcula quantas unidades um único insumo comporta: `available / quantity`.

**`deductStock`** — desconta os insumos consumidos do mapa virtual após cada produto alocado.

---

## Modelos de Dados

**Product:** `id`, `name` (NOT NULL), `price` (NOT NULL, min 0.01, precisão 15 escala 2)

**RawMaterial:** `id`, `name` (NOT NULL), `stockQuantity` (NOT NULL)

**ProductRawMaterial:** `id`, `product` (FK), `rawMaterial` (FK), `quantity` (NOT NULL) — combinação `product_id + raw_material_id` é UNIQUE.

---

## Validações

| DTO | Campo | Regra |
|---|---|---|
| `ProductDTO` | `name` | `@NotBlank` |
| `ProductDTO` | `price` | `@DecimalMin("0.01")` |
| `RawMaterialDTO` | `name` | `@NotBlank` |
| `RawMaterialDTO` | `stockQuantity` | `@Min(1)` |
| `ProductRawMaterialDTO` | `quantity` | `@Min(1)` |

---

## Tratamento de Erros

Todos os erros são interceptados pelo `GlobalExceptionHandler` e retornam JSON padronizado:

```json
{ "status": 404, "message": "Product not found", "timestamp": "2025-06-01T10:30:00" }
```

| Exceção | HTTP |
|---|---|
| `ResourceNotFoundException` | `404 Not Found` |
| `IllegalStateException` | `409 Conflict` |
| `IllegalArgumentException` | `409 Conflict` |
| `MethodArgumentNotValidException` | `400 Bad Request` |
| `Exception` (genérica) | `500 Internal Server Error` |