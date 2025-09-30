# Guia de Deployment no Vercel

Este projeto está configurado para ser hospedado no Vercel com armazenamento escalável de imagens e vídeos usando Vercel Blob.

## Pré-requisitos

1. Conta no Vercel (gratuita em https://vercel.com)
2. Projeto no GitHub
3. PostgreSQL database (pode usar Vercel Postgres ou outro provider)

## Configuração Passo a Passo

### 1. Criar Vercel Blob Store

1. Acesse seu projeto no Vercel Dashboard
2. Vá para a aba **Storage**
3. Clique em **Connect Database**
4. Selecione **Blob** e clique em **Continue**
5. Dê um nome (ex: "gohan-media")
6. Clique em **Create**

O Vercel irá automaticamente criar e adicionar a variável `BLOB_READ_WRITE_TOKEN` ao seu projeto.

### 2. Configurar Database PostgreSQL

#### Opção A: Usar Vercel Postgres

1. Na mesma aba **Storage**, clique em **Connect Database**
2. Selecione **Postgres** e clique em **Continue**
3. Dê um nome ao database
4. Clique em **Create**

O Vercel irá automaticamente configurar o `DATABASE_URL`.

#### Opção B: Usar outro provider (Neon, Supabase, etc)

1. Crie um database PostgreSQL no provider de sua escolha
2. Copie a connection string
3. No Vercel Dashboard, vá para **Settings** → **Environment Variables**
4. Adicione `DATABASE_URL` com a connection string

### 3. Deploy via GitHub

1. Faça push do código para o GitHub
2. No Vercel Dashboard, clique em **Add New Project**
3. Importe seu repositório do GitHub
4. O Vercel detectará automaticamente as configurações
5. Clique em **Deploy**

### 4. Variáveis de Ambiente Necessárias

Certifique-se de que as seguintes variáveis estão configuradas no Vercel:

```
DATABASE_URL=postgres://...
BLOB_READ_WRITE_TOKEN=vercel_blob_...
NODE_ENV=production
```

### 5. Primeira Execução

Após o primeiro deploy:

1. O database será automaticamente criado com as tabelas necessárias
2. O armazenamento Blob estará pronto para receber uploads
3. Acesse o painel admin usando o botão de configuração no site

## Arquitetura no Vercel

### API Routes (Serverless Functions)

- `/api/timeline` - Busca todas as mídias agrupadas por ano
- `/api/media/[year]` - Busca mídias de um ano específico
- `/api/upload` - Upload de imagens e vídeos para Vercel Blob

### Armazenamento de Arquivos

- **Desenvolvimento Local**: Arquivos salvos em `/uploads`
- **Produção Vercel**: Arquivos salvos no Vercel Blob Storage
  - Limite: 5TB por arquivo
  - Distribuição global automática
  - URLs permanentes e otimizadas

### Database

- PostgreSQL para metadados das mídias
- Tabela `media` armazena:
  - `id` (UUID)
  - `year` (ano da foto/vídeo)
  - `filename` (nome do arquivo original)
  - `url` (URL do Vercel Blob ou local)
  - `type` (image ou video)
  - `uploadedAt` (timestamp)

## Custos

### Vercel Free Tier

- 1 GB de Blob storage
- 10 GB de data transfer por mês
- Serverless functions ilimitadas
- **Suficiente para centenas de fotos**

### Vercel Pro ($20/mês)

- 5 GB de Blob storage incluído
- Data transfer otimizado
- **Suporta milhares de fotos e vídeos**

### Preço adicional (se ultrapassar limites)

- Storage: $0.023/GB-mês
- Data Transfer: $0.050/GB
- Uploads: $5.00 por milhão de operações

**Exemplo**: 1000 fotos de 2MB cada = 2GB storage = ~$0.05/mês

## Escalabilidade

Este projeto está preparado para escalar automaticamente:

✅ **Até 100 fotos**: Funciona perfeitamente no plano gratuito
✅ **Até 1000 fotos**: Ainda dentro do free tier ou custo mínimo
✅ **Até 10,000 fotos**: Pro plan com custo muito baixo (~$5-10/mês)
✅ **Mais de 10,000 fotos**: Vercel Blob escala automaticamente

## Desenvolvimento Local

Para desenvolver localmente com Vercel:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Rodar em modo dev (simula ambiente Vercel)
vercel dev

# Ou usar o comando padrão
npm run dev
```

## Troubleshooting

### Erro de Upload

Se uploads falharem:
1. Verifique se `BLOB_READ_WRITE_TOKEN` está configurado
2. Confirme que o Blob store foi criado no Vercel
3. Verifique os logs do Vercel Dashboard

### Database Connection Error

1. Confirme que `DATABASE_URL` está correto
2. Verifique se o database aceita conexões externas
3. Certifique-se de que SSL está configurado corretamente

### Build Error

1. Limpe o cache: Vercel Dashboard → Settings → Clear Cache
2. Verifique se todas as dependências estão no `package.json`
3. Execute `npm run build` localmente para testar

## Suporte

Para mais informações sobre Vercel:
- Documentação: https://vercel.com/docs
- Vercel Blob: https://vercel.com/docs/storage/vercel-blob
- Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres
