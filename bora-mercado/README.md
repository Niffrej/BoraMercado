# BoraMercado 🛒

Uma aplicação moderna de lista de compras desenvolvida com Next.js, TypeScript e Firebase.

## ✨ Funcionalidades

- 📝 **Criar listas de compras** com nome personalizado, data e hora
- 🏷️ **Nomear listas** com modal intuitivo e edição inline
- ➕ **Adicionar itens** com nome, quantidade e valor unitário
- 🔢 **Cálculo automático** de valores (quantidade x valor unitário)
- ✅ **Marcar/desmarcar** itens como comprados
- ✏️ **Editar** nome, quantidade e valor unitário dos itens
- 🗑️ **Remover** itens da lista
- 💰 **Calcular** valor total e valor dos itens selecionados
- 📋 **Finalizar** lista e armazenar no histórico
- 📚 **Visualizar** compras anteriores com nomes personalizados
- 🔄 **Continuar listas abertas** não finalizadas
- 🏷️ **Identificação visual** de listas abertas vs finalizadas
- ❌ **Cancelar lista** em criação/edição
- 🗑️ **Excluir listas** abertas e finalizadas
- ✏️ **Editar listas finalizadas** (reabrir para modificação)
- ⚠️ **Confirmação de exclusão** com modal de segurança
- 🔍 **Busca inteligente** por nome ou data das listas
- 🏷️ **Sistema de categorias** com 11 categorias predefinidas
- 🎨 **Ícones coloridos** para identificação visual das categorias
- 🔽 **Filtro por categoria** na lista de itens
- 📊 **Resumo financeiro** por categoria com percentuais
- ➕ **Categoria personalizada** para itens específicos
- 🎨 **Design** limpo e moderno
- 📱 **Responsivo** para mobile

## 🚀 Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Firebase Firestore** - Banco de dados
- **Lucide React** - Ícones
- **date-fns** - Manipulação de datas

## 🛠️ Configuração

1. **Clone o repositório**

   ```bash
   git clone <url-do-repositorio>
   cd bora-mercado
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure o Firebase**

   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
   - Ative o Firestore Database
   - Copie as configurações do projeto
   - Crie um arquivo `.env.local` na raiz do projeto:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
   ```

4. **Execute o projeto**

   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000)

## 📱 Como Usar

### Iniciando uma Lista

1. Na tela inicial, clique em "Iniciar Lista de Compras"
2. Digite um nome para sua lista (ex: "Compras do Supermercado")
3. A data atual será automaticamente registrada

### Gerenciando Itens

- **Adicionar**: Clique no botão "+" e preencha:
  - Nome do item (ex: "Açúcar")
  - Categoria (dropdown com ícones coloridos)
  - Quantidade (ex: "2")
  - Valor unitário (ex: "3,00")
  - Vê o cálculo automático: "2 x R$ 3,00 = R$ 6,00"
- **Marcar**: Clique no círculo ao lado do item
- **Editar**: Clique no ícone de edição para alterar categoria/quantidade/valor
- **Remover**: Clique no ícone da lixeira

### Sistema de Categorias

#### Categorias Disponíveis:

- 🍷 **Bebidas** (roxo)
- 🍬 **Doces e Snacks** (rosa)
- 👨‍🍳 **Temperos, Molhos e Condimentos** (laranja)
- 🌾 **Grãos, Cereais e Farinhas** (âmbar)
- 🥐 **Padaria e Massas** (amarelo)
- 🥛 **Laticínios e Ovos** (azul)
- 🥩 **Carnes, Aves e Peixes** (vermelho)
- 🍎 **Hortifruti** (verde)
- ❤️ **Pets** (rosa escuro)
- ✨ **Limpeza Doméstica** (ciano)
- ➕ **Outros** + categoria personalizada

#### Filtros e Organização:

- **Filtrar por categoria**: Botão "Filtrar por categoria" expande grid
- **Resumo por categoria**: Valores totais com percentuais
- **Ordenação**: Categorias por maior gasto
- **Identificação visual**: Ícone ao lado de cada item

### Busca de Listas

- **Interface**: Campo "Buscar listas..." se expande
- **Busca por**: Nome da lista OU data (ex: "15 de janeiro")
- **Resultados**: Filtra listas abertas e finalizadas
- **Feedback**: Mensagens específicas para "não encontrado"

### Editando Nome da Lista

- **Durante a criação**: Clique no título "Lista de Compras" para editar
- **Texto de ajuda**: Aparece "Clique para nomear" quando não há nome

### Finalizando

1. Clique em "Finalizar" no canto superior direito
2. A lista será salva no histórico com data e valor total

### Listas Abertas vs Finalizadas

#### Listas Abertas:

- **Localização**: Seção "Listas Abertas"
- **Visual**: Badge laranja "Não finalizada" + ícone carrinho
- **Ações**: Clique para continuar, Menu → Editar/Excluir

#### Listas Finalizadas:

- **Localização**: Seção "Compras Anteriores"
- **Visual**: Badge verde "Finalizada" + ícone calendário
- **Ações**: Clique para reabrir, Menu → Editar/Excluir

#### Controles de Segurança:

- **Cancelar**: Confirma antes de sair
- **Excluir**: Modal com confirmação
- **Menu**: Ícone ⋮ com opções Editar/Excluir

## 🎨 Design

O app possui um design clean e moderno com:

- 🎨 Gradient de cores suaves (azul/verde)
- 📱 Interface otimizada para mobile
- ⚡ Animações suaves e transições
- 🔄 Loading screen com logo animada
- ✨ Feedback visual para todas as ações

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente no dashboard
3. Deploy automático a cada push

### Manual

```bash
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── api/          # API Routes
│   ├── lista/        # Página da lista
│   ├── layout.tsx    # Layout principal
│   └── page.tsx      # Página inicial
├── components/       # Componentes reutilizáveis
├── lib/             # Configurações (Firebase)
├── services/        # Serviços de API
└── types/           # Tipos TypeScript
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido com ❤️ para facilitar suas compras!
