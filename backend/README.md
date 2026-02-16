# Tecnico - API de Gerenciamento de Produção Industrial
Este repositório contém o **backend** do sistema Tecnico, desenvolvido como API RESTful com Spring Boot. O sistema é dividido em duas partes independentes que se comunicam via HTTP:

| Parte | Tecnologia |
|---|---|
| **Backend**| Java 21 + Spring Boot |
| **Frontend** | — |

> O backend expõe todos os dados e regras de negócio por meio de endpoints REST. O frontend consome essa API para fornecer a interface gráfica ao usuário final.

---
## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Configuração da Aplicação](#configuração-da-aplicação)
- [Como Executar](#como-executar)
- [Endpoints da API](#endpoints-da-api)
  - [Produtos](#produtos)
  - [Matérias-Primas](#matérias-primas)
  - [Associação Produto–Matéria-Prima](#associação-produtomatéria-prima)
  - [Planejamento de Produção](#planejamento-de-produção)
- [Modelos de Dados](#modelos-de-dados)
- [Lógica de Negócio](#lógica-de-negócio)
- [Tratamento de Erros](#tratamento-de-erros)
- [Validações](#validações)
- [Frontend — Visão Geral](#visão-geral-do-frontend)

---

## Visão Geral

Esta API é a camada de backend do sistema Tecnico para gerenciamento de produção industrial. Toda a persistência de dados, regras de negócio e cálculo do plano de produção vivem aqui — o frontend consome esses recursos exclusivamente via endpoints REST.

A API permite:

- Gerenciar o **cadastro de produtos** (nome e valor)
- Gerenciar o **estoque de matérias-primas** (nome e quantidade em estoque)
- Definir quais **matérias-primas** (e em quais quantidades) são necessárias para fabricar cada produto
- Consultar um **plano de produção otimizado** que maximiza o faturamento total com base no estoque atual

---

## Tecnologias Utilizadas

| Camada | Tecnologia |
|---|---|
| Linguagem | Java 21 |
| Framework | Spring Boot 4.0.2 |
| Persistência | Spring Data JPA / Hibernate |
| Banco de Dados | Oracle XE (XEPDB1) |
| Driver JDBC | ojdbc11 |
| Mapeamento de Objetos | MapStruct 1.5.5 |
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

src/main/resources/
└── application.yml
```

---

## Pré-requisitos

- Java 21+
- Maven 3.8+
- Oracle Database XE (ou outra instância Oracle compatível)
- Schema Oracle com o usuário `TECNICO` criado

---

## Configuração do Banco de Dados

Antes de executar a aplicação, crie o usuário e o schema no Oracle. As tabelas são geradas automaticamente pelo Hibernate na primeira inicialização, não sendo necessário executar nenhum script DDL manualmente.

```sql
CREATE USER tecnico IDENTIFIED BY your_password;
GRANT CONNECT, RESOURCE TO tecnico;
GRANT UNLIMITED TABLESPACE TO tecnico;
```

As três tabelas criadas automaticamente serão:

| Tabela | Descrição |
|---|---|
| `Products` | Cadastro de produtos com nome e preço |
| `Raw_Materials` | Estoque de matérias-primas com nome e quantidade |
| `Product_RawMaterial` | Tabela de junção que associa produtos às suas matérias-primas e quantidades necessárias |

---

## Configuração da Aplicação

Todas as configurações ficam em `src/main/resources/application.yml`. Abaixo está um exemplo completo aceito pelo projeto — ajuste `url`, `username` e `password` conforme o seu ambiente:

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

logging:
  level:
    org.hibernate.SQL: DEBUG
    org.hibernate.orm.jdbc.bind: TRACE
    org.springframework.web: INFO
    com.teste.tecnico: DEBUG
```

> **Atenção:** não suba o arquivo `application.yml` com credenciais reais para repositórios públicos. Considere usar variáveis de ambiente ou um arquivo `application-local.yml` ignorado pelo `.gitignore`.

---

## Como Executar

Clone o repositório e execute com Maven:

```bash
git clone <repository-url>
cd tecnico
mvn spring-boot:run
```

Ou gere e execute o JAR diretamente:

```bash
mvn clean package
java -jar target/tecnico-0.0.1-SNAPSHOT.jar
```

A API estará disponível em `http://localhost:8080`.

---

## Endpoints da API

### Produtos

Caminho base: `/api/products`

| Método | Endpoint | Descrição | Corpo da Requisição | Resposta |
|---|---|---|---|---|
| `GET` | `/api/products` | Lista todos os produtos | — | `200 OK` |
| `GET` | `/api/products/{id}` | Busca produto por ID | — | `200 OK` |
| `POST` | `/api/products` | Cria um novo produto | `ProductDTO` | `200 OK` |
| `PUT` | `/api/products/{id}` | Atualiza um produto existente | `ProductDTO` | `200 OK` |
| `DELETE` | `/api/products/{id}` | Remove um produto | — | `204 No Content` |

Exemplo de corpo da requisição:

```json
{
  "name": "Bicycle",
  "price": 599.99
}
```

Exemplo de resposta:

```json
{
  "id": 1,
  "name": "Bicycle",
  "price": 599.99
}
```

---

### Matérias-Primas

Caminho base: `/api/raw-materials`

| Método | Endpoint | Descrição | Corpo da Requisição | Resposta |
|---|---|---|---|---|
| `GET` | `/api/raw-materials` | Lista todas as matérias-primas | — | `200 OK` |
| `GET` | `/api/raw-materials/{id}` | Busca matéria-prima por ID | — | `200 OK` |
| `POST` | `/api/raw-materials` | Cria uma nova matéria-prima | `RawMaterialDTO` | `200 OK` |
| `PUT` | `/api/raw-materials/{id}` | Atualiza uma matéria-prima existente | `RawMaterialDTO` | `200 OK` |
| `DELETE` | `/api/raw-materials/{id}` | Remove uma matéria-prima | — | `204 No Content` |

> ⚠️ A tentativa de excluir uma matéria-prima associada a um ou mais produtos retornará `409 Conflict`.

Exemplo de corpo da requisição:

```json
{
  "name": "Steel Tube",
  "stockQuantity": 200
}
```

Exemplo de resposta:

```json
{
  "id": 3,
  "name": "Steel Tube",
  "stockQuantity": 200
}
```

---

### Associação Produto–Matéria-Prima

Caminho base: `/api/product-raw-materials`

| Método | Endpoint | Descrição | Corpo da Requisição | Resposta |
|---|---|---|---|---|
| `GET` | `/api/product-raw-materials` | Lista todas as associações | — | `200 OK` |
| `GET` | `/api/product-raw-materials/product/{productId}` | Lista associações de um produto específico | — | `200 OK` |
| `POST` | `/api/product-raw-materials` | Cria uma nova associação | `ProductRawMaterialDTO` | `201 Created` |
| `PUT` | `/api/product-raw-materials/{id}` | Atualiza uma associação existente | `ProductRawMaterialDTO` | `200 OK` |
| `DELETE` | `/api/product-raw-materials/{id}` | Remove uma associação | — | `204 No Content` |

Exemplo de corpo da requisição:

```json
{
  "productId": 1,
  "rawMaterialId": 3,
  "quantity": 4
}
```

Exemplo de resposta:

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

### Planejamento de Produção

Caminho base: `/api/production`

| Método | Endpoint | Descrição | Resposta |
|---|---|---|---|
| `GET` | `/api/production` | Calcula o plano de produção otimizado | `200 OK` |

Exemplo de resposta:

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

## Modelos de Dados

### Product

| Campo | Tipo | Restrições |
|---|---|---|
| `id` | `int` | PK gerada automaticamente |
| `name` | `String` | `NOT NULL` |
| `price` | `BigDecimal` | `NOT NULL`, mínimo `0.01`, precisão 15 escala 2 |

### RawMaterial

| Campo | Tipo | Restrições |
|---|---|---|
| `id` | `int` | PK gerada automaticamente |
| `name` | `String` | `NOT NULL` |
| `stockQuantity` | `int` | `NOT NULL` |

### ProductRawMaterial

| Campo | Tipo | Restrições |
|---|---|---|
| `id` | `int` | PK gerada automaticamente |
| `product` | `Product` | FK → `Products`, `NOT NULL` |
| `rawMaterial` | `RawMaterial` | FK → `Raw_Materials`, `NOT NULL` |
| `quantity` | `int` | `NOT NULL` |

> A combinação de `product_id` + `raw_material_id` é enforçada como `UNIQUE CONSTRAINT` no banco de dados.

---

## Lógica de Negócio

### Algoritmo de Planejamento de Produção

O endpoint `/api/production` implementa uma estratégia de **otimização gulosa (greedy)**: os produtos de maior preço têm prioridade na alocação do estoque, garantindo que o faturamento total seja maximizado com os insumos disponíveis.

#### Método principal — `calculateProduction()`

Responsável apenas por orquestrar o fluxo. Toda a lógica de cálculo é delegada a métodos privados com responsabilidade única.

```java
@Transactional(readOnly = true)
public ProductionResponseDTO calculateProduction() {

    List products = productRepository.findAll()
            .stream()
            .sorted(Comparator.comparing(Product::getPrice).reversed())
            .toList();

    Map stock = buildStockSnapshot(rawMaterialRepository.findAll());

    Map productionPlan = new LinkedHashMap<>();
    BigDecimal totalValue = BigDecimal.ZERO;

    for (Product product : products) {
        int qty = maxProducible(product, stock);

        if (qty > 0) {
            productionPlan.put(product.getName(), qty);
            totalValue = totalValue.add(valueof(product, qty));
            deductStock(product.getProductRawMaterials(), qty, stock);
        }
    }

    return new ProductionResponseDTO(productionPlan, totalValue);
}
```

#### Métodos auxiliares privados

**`buildStockSnapshot`** — constrói o mapa de estoque virtual a partir dos dados carregados. Isola o estado inicial antes de qualquer desconto, garantindo que o loop nunca releia o banco em estados intermediários. O `merge function Integer::sum` trata corretamente possíveis IDs duplicados sem lançar exceção.

```java
private Map buildStockSnapshot(List materials) {
    return materials.stream()
            .collect(Collectors.toMap(
                    RawMaterial::getId,
                    RawMaterial::getStockQuantity,
                    Integer::sum,
                    HashMap::new
            ));
}
```

**`maxProducible`** — calcula quantas unidades do produto cabem no estoque atual. O `orElse(0)` elimina o sentinela `Integer.MAX_VALUE` do código original: produtos sem insumos associados retornam `0` diretamente e não entram no plano.

```java
private int maxProducible(Product product, Map stock) {
    return product.getProductRawMaterials().stream()
            .mapToInt(prm -> possibleUnits(prm, stock))
            .min()
            .orElse(0);
}
```

**`possibleUnits`** — calcula quantas unidades um único insumo comporta. O `getOrDefault(id, 0)` garante comportamento seguro mesmo que o insumo não esteja no mapa.

```java
private int possibleUnits(ProductRawMaterial prm, Map stock) {
    int available = stock.getOrDefault(prm.getRawMaterial().getId(), 0);
    return available / prm.getQuantity();
}
```

**`deductStock`** — desconta os insumos consumidos do estoque virtual em um único passo. `Map.merge` com `Integer::sum` é seguro contra chaves ausentes, eliminando o risco de `NullPointerException` que existia no `stock.get(id)` original.

```java
private void deductStock(List materials, int quantity, Map stock) {
    materials.forEach(prm ->
            stock.merge(
                    prm.getRawMaterial().getId(),
                    -(prm.getQuantity() * quantity),
                    Integer::sum
            )
    );
}
```

**`valueof`** — calcula o valor gerado pelo lote de um produto. Extraído para manter o loop principal legível.

```java
private BigDecimal valueof(Product product, int quantity) {
    return product.getPrice().multiply(BigDecimal.valueOf(quantity));
}
```

---

## Tratamento de Erros

Todos os erros são interceptados globalmente pelo `GlobalExceptionHandler` e retornam uma estrutura JSON padronizada:

```json
{
  "status": 404,
  "message": "Product not found",
  "timestamp": "2025-06-01T10:30:00"
}
```

| Exceção | Status HTTP | Situação |
|---|---|---|
| `ResourceNotFoundException` | `404 Not Found` | Entidade não encontrada pelo ID informado |
| `IllegalStateException` | `409 Conflict` | Exclusão de matéria-prima vinculada a um produto |
| `IllegalArgumentException` | `409 Conflict` | Tentativa de criar uma associação duplicada |
| `MethodArgumentNotValidException` | `400 Bad Request` | Falha na validação dos campos da requisição |
| `Exception` (genérica) | `500 Internal Server Error` | Erros inesperados |

Erros de validação retornam um mapa com o nome do campo e a respectiva mensagem:

```json
{
  "name": "must not be blank",
  "stockQuantity": "must be greater than or equal to 1"
}
```

---

## Validações

A validação de entrada é aplicada via anotações do Jakarta Bean Validation diretamente nos DTOs:

| DTO | Campo | Anotação | Regra |
|---|---|---|---|
| `ProductDTO` | `name` | `@NotBlank` | Nome é obrigatório |
| `ProductDTO` | `price` | `@DecimalMin("0.01")` | Preço mínimo de 0,01 |
| `RawMaterialDTO` | `name` | `@NotBlank` | Nome é obrigatório |
| `RawMaterialDTO` | `stockQuantity` | `@Min(1)` | Estoque mínimo de 1 unidade |
| `ProductRawMaterialDTO` | `quantity` | `@Min(1)` | Quantidade mínima de 1 unidade |

---

# Frontend

> Interface web desenvolvida em **React** que consome a API REST do backend para fornecer uma experiência gráfica completa ao usuário. O frontend não possui lógica de negócio própria — toda a persistência e os cálculos são responsabilidade da API.

---

## Visão Geral do Frontend

A interface cobre todas as operações disponíveis no backend:

- Cadastro, edição e exclusão de **produtos**
- Cadastro, edição e exclusão de **matérias-primas**
- Associação de matérias-primas a produtos com definição de quantidade necessária por unidade produzida
- Visualização do **plano de produção otimizado** com quantidades produzíveis e valor total estimado

---