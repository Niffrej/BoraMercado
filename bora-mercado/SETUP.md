# 🚀 Guia de Configuração - BoraMercado

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no Firebase
- Conta no Vercel (para deploy)

## 🔥 Configuração do Firebase

### 1. Criar Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Escolha um nome (ex: `bora-mercado-app`)
4. Desabilite Google Analytics (opcional)
5. Clique em "Criar projeto"

### 2. Configurar Firestore

1. No menu lateral, vá em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha "Começar no modo de teste"
4. Selecione uma localização (preferencialmente próxima do Brasil)
5. Clique em "Concluído"

### 3. Obter Configurações

1. Vá em "Configurações do projeto" (ícone da engrenagem)
2. Na aba "Geral", role até "Seus aplicativos"
3. Clique no ícone da web (`</>`)
4. Registre o app com o nome "BoraMercado"
5. **NÃO** marque "Configure também o Firebase Hosting"
6. Clique em "Registrar app"
7. **Copie as configurações mostradas**

### 4. Configurar Variáveis de Ambiente

1. Na raiz do projeto, crie o arquivo `.env.local`
2. Cole as configurações do Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:xxxxxxxxxxxxxxxx
```

## 🌐 Deploy no Vercel

### 1. Preparar Repositório

```bash
git init
git add .
git commit -m "Initial commit: BoraMercado app"
git remote add origin https://github.com/seu-usuario/bora-mercado.git
git push -u origin main
```

### 2. Deploy no Vercel

1. Acesse [Vercel](https://vercel.com)
2. Clique em "New Project"
3. Conecte seu repositório GitHub
4. Selecione o projeto `bora-mercado`
5. Em "Environment Variables", adicione as mesmas variáveis do `.env.local`
6. Clique em "Deploy"

### 3. Configurar Domínio (Opcional)

1. Após o deploy, vá em "Settings" > "Domains"
2. Adicione um domínio personalizado se desejar

## ✅ Teste Final

1. **Local**: Execute `npm run dev` e teste todas as funcionalidades
2. **Produção**: Acesse a URL do Vercel e teste o app online

## 🔧 Comandos Úteis

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Compilar para produção
npm run build

# Executar versão de produção
npm start

# Verificar lint
npm run lint

# Verificar tipos TypeScript
npm run type-check
```

## 📱 Funcionalidades Principais

- ✅ Loading screen animado
- ✅ Adicionar/remover/editar itens
- ✅ Marcar/desmarcar itens
- ✅ Cálculo automático de valores
- ✅ Finalizar lista e salvar histórico
- ✅ Visualizar compras anteriores
- ✅ Design responsivo e moderno
- ✅ Sincronização em tempo real com Firebase

## 🎯 Próximos Passos

1. Personalizar cores e branding
2. Adicionar categorias de produtos
3. Implementar compartilhamento de listas
4. Adicionar notificações push
5. Criar app mobile com React Native

## 🆘 Troubleshooting

### Erro de conexão Firebase

- Verifique se as variáveis de ambiente estão corretas
- Confirme se o Firestore está configurado em modo de teste

### Erro de build no Vercel

- Verifique se todas as variáveis de ambiente foram adicionadas
- Confirme se o projeto compila localmente com `npm run build`

### App não carrega

- Verifique o console do navegador para erros
- Confirme se o Firebase está acessível
- Teste a conexão de internet

---

**🎉 Pronto! Seu app BoraMercado está funcionando!**
