# Gohan's Life Timeline

## Overview

This is a photo and video timeline application celebrating the life of Gohan, a golden retriever. The application displays media content organized by year, allowing users to view photos and videos from different periods of Gohan's life. The project features a public-facing timeline view and an admin panel for uploading new media content.

The application is built as a full-stack web application with a React frontend and Express backend, featuring a warm, pet-friendly design aesthetic inspired by photo-centric platforms like Instagram and Pinterest.

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

### Current Status (Updated: September 30, 2025)
- ✅ Application running on port 5000 (frontend and backend)
- ✅ Vite dev server configured with `allowedHosts: true` for Replit proxy support
- ✅ PostgreSQL database provisioned and schema pushed
- ✅ Development workflow configured: `npm run dev`
- ✅ Production build configured: `npm run build` + `npm run start`
- ✅ Deployment configuration ready (autoscale deployment target)
- ✅ All dependencies installed and up-to-date (nanoid added, browserslist updated)
- ✅ Application successfully imported and tested on Replit environment

### Key Configuration
- **Host binding**: Server binds to `0.0.0.0:5000` for public access
- **Vite proxy**: Configured to accept all hosts for Replit's iframe proxy
- **File uploads**: Local `uploads/` directory with pre-existing media files
- **Storage**: In-memory (MemStorage) for demo; database ready for production switch