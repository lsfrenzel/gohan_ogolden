# Gohan's Life Timeline

## Overview

This is a photo and video timeline application celebrating the life of Gohan, a golden retriever. The application displays media content organized by year, allowing users to view photos and videos from different periods of Gohan's life. The project features a public-facing timeline view and an admin panel for uploading new media content.

The application is built as a full-stack web application with a React frontend and Express backend, featuring a warm, pet-friendly design aesthetic inspired by photo-centric platforms like Instagram and Pinterest. The design is fully responsive with optimized mobile experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React with TypeScript for type safety and developer experience
- Vite as the build tool and development server for fast HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing (instead of React Router)
- TanStack Query (React Query) for server state management and data fetching

**UI Component System**
- shadcn/ui component library (New York style variant) built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Custom color palette based on warm, organic pet brand aesthetics (golden yellows, warm browns)
- Custom typography using Google Fonts: Quicksand (headings), Inter (body), Fredoka (timeline years)
- Class Variance Authority (CVA) for managing component variants

**Key Design Decisions**
- Light mode primary focus with warm, cream-colored backgrounds
- Photo-grid layouts for media display (responsive: 2-3-4 columns)
- Timeline-based content organization with year-based sections
- Admin panel as a full-page overlay (not a separate route)

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for the HTTP server
- ES Modules (type: "module") for modern JavaScript syntax
- Custom Vite middleware integration for development mode HMR

**Data Storage Strategy**
- In-memory storage implementation (`MemStorage`) for development/demo purposes
- Interface-based storage abstraction (`IStorage`) allows easy swap to persistent storage
- Drizzle ORM configured for PostgreSQL (infrastructure ready, not yet implemented)
- File uploads stored in local `uploads/` directory via Multer

**API Design**
- RESTful endpoints under `/api` prefix
- File upload handling with Multer (images and videos: jpeg, jpg, png, gif, mp4, mov, avi, webm)
- Timeline data grouped by year for efficient client consumption
- Static file serving for uploaded media

**Key Architectural Decisions**
- Separation of storage interface from implementation allows database migration without API changes
- Session-based approach ready (connect-pg-simple imported but not yet active)
- Development and production modes handled differently (Vite SSR in dev, static serving in production)

### External Dependencies

**Database (Configured and Ready)**
- PostgreSQL database provisioned via Replit
- Drizzle ORM as the database toolkit with schema pushed
- @neondatabase/serverless for PostgreSQL connectivity (Neon serverless driver)
- drizzle-zod for schema validation integration
- Migration system configured via drizzle-kit
- Currently using in-memory storage (MemStorage) for development; database ready for production use

**File Storage**
- Multer for multipart/form-data handling and file uploads
- Local filesystem storage (uploads directory)
- Support for images (jpeg, jpg, png, gif) and videos (mp4, mov, avi, webm)

**UI Component Libraries**
- Radix UI primitives for accessible, unstyled components
- React Hook Form with Zod resolvers for form validation
- date-fns for date formatting and manipulation
- cmdk for command palette functionality (if needed)
- Lucide React for iconography

**Development Tools**
- TypeScript for static typing
- ESBuild for production bundling
- Replit-specific plugins for development experience (cartographer, dev-banner, runtime error overlay)

**Styling & Design**
- Tailwind CSS with PostCSS for processing
- Custom CSS variables for theming via HSL color space
- Autoprefixer for CSS vendor prefixing

**Key Integration Points**
- Google Fonts API for custom typography (Quicksand, Inter, Fredoka)
- Static asset serving from `attached_assets` directory for images
- Environment-based configuration (DATABASE_URL configured via Replit database)

## Replit Environment Setup

### Current Status (Updated: September 30, 2025 - Replit Environment Setup Complete)
- ✅ **GitHub import successfully completed and verified**
- ✅ Application running on port 5000 (frontend and backend unified)
- ✅ Vite dev server configured with `allowedHosts: true` for Replit proxy support
- ✅ Development workflow configured: `npm run dev` with webview output
- ✅ Production build configured: `npm run build` + `npm run start`
- ✅ Deployment configuration ready (autoscale deployment target)
- ✅ All Node.js dependencies installed and working
- ✅ PostgreSQL database provisioned and schema pushed successfully
- ✅ Database storage (DBStorage) active and connected
- ✅ TypeScript compilation passes without errors
- ✅ All API endpoints functional (/api/timeline, /api/media/:year, /api/upload)
- ✅ Static file serving operational (/uploads directory for media files)
- ✅ Hot Module Replacement (HMR) active and working
- ✅ File upload system ready (Multer configured for images and videos)
- ✅ Frontend displaying correctly with warm pet-friendly design
- ✅ Admin panel ready for uploading photos and videos

### Key Configuration
- **Host binding**: Server binds to `0.0.0.0:5000` for public access
- **Vite proxy**: Configured to accept all hosts for Replit's iframe proxy (`allowedHosts: true`)
- **File uploads**: Local `uploads/` directory for media storage
- **Storage**: PostgreSQL database (DBStorage) active - auto-detects DATABASE_URL environment variable
- **Workflow**: Single workflow "Start application" for frontend + backend on port 5000 (Express serves both)
- **Build system**: Vite for frontend, ESBuild for backend bundling
- **Deployment**: Autoscale deployment target configured in .replit

## Recent Updates (September 30, 2025)

### Mobile Responsiveness Improvements
Enhanced mobile experience across all components with better spacing, sizing, and layout:

**HeroSection**
- Reduced hero image size on mobile (160px) with progressive scaling to desktop (256px)
- Optimized padding and margins for smaller screens
- Improved title and subtitle font sizes with better mobile hierarchy
- Adjusted decorative paw prints positioning for mobile screens

**TimelineSection**
- Optimized year badges and timeline dots for mobile (56px to 96px progressive sizing)
- Improved grid layout starting with 2 columns on mobile instead of 1
- Better video play button sizing across breakpoints (40px to 64px)
- Reduced padding and spacing for more content visibility on mobile

**MediaLightbox**
- Fixed padding issues on mobile (reduced side padding from 80px to 16px)
- Repositioned navigation buttons closer to edges on small screens
- Smaller close and navigation buttons on mobile for better screen real estate
- Improved counter badge sizing and positioning at bottom

**AdminPanel**
- Better header layout with responsive titles and close button
- Improved year selection grid (3 columns mobile, 5 columns desktop)
- Optimized file upload area padding and icon sizes
- Better file list layout with proper text truncation on mobile

**Floating Elements**
- Reduced floating admin button size on mobile (48px from 64px)
- Adjusted music player button positioning and size for mobile
- Better z-index management to prevent overlap

All components now use comprehensive Tailwind breakpoints (sm, md, lg, xl) for smooth scaling across all device sizes.

### Vercel Deployment Support (September 30, 2025)

**Adapted for Vercel Hosting**
The project now supports deployment on Vercel with automatic scalability for media files:

**Architecture Changes**
- ✅ Vercel Blob Storage integration for scalable file uploads (replaces local filesystem)
- ✅ Serverless API functions in `/api` directory for Vercel compatibility
- ✅ Updated schema to store blob URLs for cloud-hosted media
- ✅ Dual-mode support: local development with filesystem, production with Vercel Blob
- ✅ Database schema includes `url` field for flexible storage (local or cloud URLs)

**Scalability Features**
- Supports unlimited photos/videos through Vercel Blob (up to 5TB per file)
- Automatic global CDN distribution for fast media delivery
- Cost-effective: Free tier includes 1GB storage + 10GB transfer/month
- Production-ready with automatic scaling based on usage

**Deployment Files**
- `vercel.json` - Vercel deployment configuration
- `/api/*` - Serverless API functions for timeline, media, and uploads
- `.env.example` - Environment variables documentation
- `VERCEL_DEPLOYMENT.md` - Complete deployment guide with step-by-step instructions

**Cost Estimation**
- 100 photos (2MB each): Free tier
- 1,000 photos: ~$0.05/month
- 10,000 photos: ~$5-10/month
- Unlimited scalability with transparent pricing

**Development Experience**
- Local development unchanged: `npm run dev` continues to work
- Vercel CLI support: `vercel dev` for testing serverless functions locally
- Hot Module Replacement (HMR) active in both modes

### Railway Deployment Support (September 30, 2025)

**Adaptado para Hospedagem no Railway**
O projeto agora está totalmente configurado para deploy no Railway com PostgreSQL integrado:

**Configuração Railway**
- ✅ `railway.json` - Arquivo de configuração do Railway com build e deploy commands
- ✅ `.env.example` - Documentação completa de variáveis de ambiente
- ✅ `.gitignore` atualizado para proteger arquivos .env
- ✅ Código compatível: servidor usa `0.0.0.0:PORT` e `DATABASE_URL` do ambiente
- ✅ Scripts otimizados: `npm run build` (Vite + ESBuild) e `npm run start` (produção)

**Como fazer Deploy no Railway**

1. **Criar conta no Railway**
   - Acesse [railway.app](https://railway.app)
   - Faça login com GitHub

2. **Criar novo projeto**
   - Clique em "New Project"
   - Selecione "Deploy from GitHub repo"
   - Escolha o repositório do projeto
   - Railway detecta automaticamente Node.js e faz o build

3. **Adicionar PostgreSQL**
   - No dashboard do projeto, clique no botão "+"
   - Selecione "Database" → "Add PostgreSQL"
   - Railway cria automaticamente a variável `DATABASE_URL`

4. **Configurar Variáveis de Ambiente**
   - No serviço da aplicação, vá em "Variables"
   - Adicione: `DATABASE_URL` = `${{Postgres.DATABASE_URL}}`
   - Adicione: `NODE_ENV` = `production`
   - `PORT` é configurado automaticamente pelo Railway

5. **Migrar o Schema do Banco**
   - Instale Railway CLI: `npm install -g @railway/cli`
   - Faça login: `railway login`
   - Vincule o projeto: `railway link`
   - Execute: `railway run npm run db:push`

6. **Gerar Domínio Público**
   - No serviço, vá em "Settings"
   - Role até "Networking"
   - Clique em "Generate Domain"
   - Seu site estará disponível em: `[nome-projeto].up.railway.app`

**Arquivos Importantes**
- `railway.json` - Configuração de build e deploy
- `.env.example` - Template de variáveis de ambiente
- `server/storage.ts` - Detecta automaticamente DATABASE_URL e usa PostgreSQL

**Custos Railway**
- Plano gratuito: $5 em créditos mensais
- Uso típico: ~$2-5/mês para pequenos projetos
- PostgreSQL incluído sem custo adicional
- Rede privada entre serviços (sem custos de egress)

**Armazenamento de Arquivos**
- No Railway, os uploads ficam no diretório `uploads/` local
- Para persistência de arquivos após redeploys, considere:
  - Railway Volumes (armazenamento persistente)
  - Serviços externos como Cloudinary ou AWS S3
  - Por padrão, arquivos em `uploads/` são temporários

**Compatibilidade Total**
- ✅ Express server configurado para 0.0.0.0
- ✅ Porta dinâmica via process.env.PORT
- ✅ PostgreSQL via DATABASE_URL
- ✅ Build otimizado (Vite + ESBuild)
- ✅ Processo de restart automático configurado