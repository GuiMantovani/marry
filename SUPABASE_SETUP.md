# 🎉 Integração Supabase - Guia de Configuração

Este documento contém as instruções para completar a integração do projeto MarryMe com o Supabase.

## 📋 Pré-requisitos

- Acesso ao dashboard do Supabase: https://iesjhczbefheofdzlwfu.supabase.co
- Node.js instalado

## 🚀 Passo a Passo

### 1️⃣ Criar as Tabelas no Supabase

1. Acesse o dashboard do Supabase
2. Vá em **SQL Editor** no menu lateral
3. Clique em **New Query**
4. Copie e cole o conteúdo do arquivo `scripts/create-tables.sql`
5. Clique em **Run** para executar o SQL

Isso criará duas tabelas:
- `gifts` - Para armazenar os presentes
- `guests` - Para armazenar os convidados (RSVP)

### 2️⃣ Migrar os Dados Existentes

Execute o script de migração para transferir os dados dos arquivos JSON para o Supabase:

```bash
npm run migrate
```

Este script irá:
- Ler os dados de `src/data/gifts.json` (41 presentes)
- Ler os dados de `src/data/guest.json` (7 convidados)
- Inserir todos os dados no Supabase
- Exibir um relatório de sucesso

### 3️⃣ Verificar a Migração

1. No dashboard do Supabase, vá em **Table Editor**
2. Verifique a tabela `gifts` - deve conter 41 registros
3. Verifique a tabela `guests` - deve conter 7 registros

### 4️⃣ Testar a Aplicação

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse as seguintes páginas para testar:

- **Página de Presentes**: http://localhost:3000/gifts
- **Admin de Presentes**: http://localhost:3000/admin-gifts
- **Confirmação (RSVP)**: http://localhost:3000/confirmation
- **Admin de RSVP**: http://localhost:3000/admin-rsvp

## ✅ Verificações

### Testar API de Gifts

- [ ] GET `/api/gifts` - Lista todos os presentes
- [ ] POST `/api/gifts` - Criar novo presente
- [ ] PUT `/api/gifts` - Atualizar presente existente
- [ ] DELETE `/api/gifts?id=X` - Deletar presente

### Testar API de RSVP

- [ ] GET `/api/rsvp` - Lista todos os convidados
- [ ] POST `/api/rsvp` - Criar nova confirmação

## 🔒 Segurança

O arquivo `.env.local` contém suas credenciais do Supabase e **NÃO** está sendo versionado no Git (está no `.gitignore`).

**Importante**: Nunca compartilhe suas chaves do Supabase publicamente!

## 📝 Mudanças Realizadas

### Arquivos Criados
- `.env.local` - Variáveis de ambiente
- `src/lib/supabase.js` - Cliente Supabase
- `scripts/create-tables.sql` - SQL para criar tabelas
- `scripts/migrate-to-supabase.js` - Script de migração

### Arquivos Modificados
- `package.json` - Adicionada dependência e script de migração
- `src/pages/api/gifts.js` - Migrado para Supabase
- `src/pages/api/rsvp.js` - Migrado para Supabase

### Arquivos que podem ser removidos (após confirmação)
- `src/data/gifts.json` - Dados agora estão no Supabase
- `src/data/guest.json` - Dados agora estão no Supabase

## 🆘 Troubleshooting

### Erro ao executar migração
- Verifique se as tabelas foram criadas no Supabase
- Verifique se as credenciais em `.env.local` estão corretas
- Certifique-se de que o servidor Next.js não está rodando durante a migração

### Erro 500 nas APIs
- Verifique se as variáveis de ambiente estão configuradas
- Reinicie o servidor de desenvolvimento após criar `.env.local`
- Verifique os logs do console do navegador e do terminal

### Dados não aparecem
- Verifique se a migração foi executada com sucesso
- Verifique no dashboard do Supabase se os dados estão nas tabelas
- Verifique as políticas de RLS (Row Level Security) no Supabase

## 🎯 Próximos Passos

Após confirmar que tudo está funcionando:

1. Fazer backup dos arquivos JSON originais
2. Remover os arquivos JSON do projeto (opcional)
3. Testar todas as funcionalidades do site
4. Fazer deploy da aplicação (se necessário)
