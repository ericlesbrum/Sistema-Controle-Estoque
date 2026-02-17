# 🖥️ Frontend — Interface Web

Interface web desenvolvida em **React + TypeScript + Vite** que consome a API REST do backend para fornecer uma experiência gráfica completa ao usuário. O frontend não possui lógica de negócio própria — toda a persistência e os cálculos são responsabilidade da API.

---

## Tecnologias

| Categoria | Tecnologia |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 7 |
| UI | React Bootstrap 2 + Bootstrap 5 |
| Ícones | React Icons 5 |
| Formulários | React Hook Form 7 |
| HTTP | Axios 1 |
| Roteamento | React Router DOM 7 |

---

## Pré-requisitos

- Node.js 18+
- Backend em execução em `http://localhost:8080`

---

## Instalação e Execução

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
# Interface disponível em http://localhost:5173

# Build para produção
npm run build

# Preview do build
npm run preview
```

---

## Proxy de Desenvolvimento

O Vite está configurado para encaminhar automaticamente todas as chamadas `/api/*` para o backend:

```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
    }
  }
}
```
---

## Estrutura do Projeto

```
src/
├── components/
│   ├── common/
│   │   ├── BaseFormModal.tsx     # Modal base reutilizável para formulários
│   │   ├── ConfirmDialog.tsx     # Dialog de confirmação com loading/error
│   │   ├── ErrorAlert.tsx        # Alerta de erro com botão de retry
│   │   ├── IconButton.tsx        # Botão com ícone (esq. ou dir.)
│   │   └── LoadingSpinner.tsx    # Spinner de carregamento
│   ├── forms/
│   │   ├── AssociationForm.tsx   # Form: associar matéria-prima a produto
│   │   ├── ProductForm.tsx       # Form: criar/editar produto
│   │   └── RawMaterialForm.tsx   # Form: criar/editar matéria-prima
│   ├── layout/
│   │   └── Navbar.tsx            # Barra de navegação principal
│   └── Footer.tsx
├── dtos/
│   ├── product.dto.ts
│   ├── rawMaterial.dto.ts
│   ├── productRawMaterial.dto.ts
│   └── production.dto.ts
├── hooks/
│   ├── useProducts.ts            # CRUD de produtos
│   ├── useRawMaterials.ts        # CRUD de matérias-primas
│   ├── useAssociations.ts        # CRUD de associações por produto
│   ├── useProduction.ts          # Cálculo do plano de produção
│   └── useFormModal.ts           # Abstração de formulário com React Hook Form
├── pages/
│   ├── HomePage.tsx              # Página inicial com cards de navegação
│   ├── RawMaterialsPage.tsx      # Listagem e CRUD de matérias-primas
│   ├── ProductsPage.tsx          # Listagem e CRUD de produtos
│   ├── ProductDetailPage.tsx     # Associações de um produto específico
│   └── ProductionPage.tsx        # Plano de produção otimizado
├── services/
│   ├── api.ts                    # Instância Axios com baseURL
│   ├── product.service.ts
│   ├── rawMaterial.service.ts
│   ├── productRawMaterial.service.ts
│   └── production.service.ts
└── styles/
    ├── Variables.css             # Variáveis CSS globais (cores, sombras, radii)
    ├── IconButton.css            # Estilos dos botões com ícone
    ├── Navbar.module.css
    ├── ConfirmDialog.css
    └── ProductionPage.css
```

---

## Páginas e Rotas

| Rota | Página | Descrição |
|---|---|---|
| `/` | `HomePage` | Dashboard com cards de acesso rápido |
| `/raw-materials` | `RawMaterialsPage` | Listagem, criação, edição e exclusão de matérias-primas |
| `/products` | `ProductsPage` | Listagem, criação, edição e exclusão de produtos |
| `/products/:id` | `ProductDetailPage` | Associações de matérias-primas de um produto |
| `/production` | `ProductionPage` | Plano de produção sugerido com valor total |

---

## Padrões de Desenvolvimento

### Hooks Customizados

Toda operação de dados é encapsulada em custom hooks que gerenciam estado, loading e erros:

```typescript
const { products, loading, error, createProduct, updateProduct, deleteProduct } = useProducts();
```

### Formulários

Os formulários utilizam o hook `useFormModal`, que abstrai a integração com `react-hook-form`, gerencia o estado de submissão e expõe erros de validação e de API de forma padronizada.

### Componentes Comuns

`BaseFormModal` serve como contêiner para todos os formulários modais, garantindo consistência visual. `ConfirmDialog` centraliza a lógica de confirmação de exclusão com tratamento de erro inline.

---

## Scripts Disponíveis

| Script | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com HMR |
| `npm run build` | Build TypeScript + Vite para produção |
| `npm run preview` | Preview local do build de produção |
| `npm run lint` | Análise estática com ESLint |