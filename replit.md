# Gohan's Life Timeline

## Overview

Gohan's Life Timeline is a full-stack web application designed to celebrate the life of a golden retriever through a photo and video timeline. It provides a public-facing view of media content organized by year and an admin panel for media uploads. The project aims to offer a warm, pet-friendly user experience, inspired by photo-centric platforms, with a fully responsive design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

-   **Frameworks**: React with TypeScript, Vite for bundling, Wouter for routing, TanStack Query for data management.
-   **UI/UX**: shadcn/ui (New York style) built on Radix UI, Tailwind CSS for styling, custom warm color palette, Google Fonts (Quicksand, Inter, Fredoka).
-   **Design Patterns**: Light mode primary, responsive photo-grid layouts (2-3-4 columns), year-based timeline organization, admin panel as a full-page overlay.

### Backend

-   **Server**: Express.js with TypeScript, ES Modules.
-   **Data Storage**: Interface-based storage abstraction (`IStorage`) with an in-memory implementation (`MemStorage`) for development. Drizzle ORM is configured for PostgreSQL (PostgreSQL via Replit is provisioned), with `@neondatabase/serverless` for connectivity. Multer handles local file uploads to an `uploads/` directory.
-   **API**: RESTful endpoints under `/api` for timeline data, media, and file uploads. Static file serving for uploaded media.
-   **Key Decisions**: Separation of storage interface for database flexibility, session-based approach ready, distinct development and production modes.

### UI/UX Decisions

-   **Color Scheme**: Warm, cream-colored backgrounds, golden yellows, and warm browns.
-   **Typography**: Quicksand (headings), Inter (body), Fredoka (timeline years).
-   **Layout**: Photo-grid layouts, timeline-based content organization, responsive design with comprehensive Tailwind breakpoints.
-   **Accessibility**: Radix UI primitives provide accessible foundations for components.

### Feature Specifications

-   **Media Display**: Photos and videos organized by year in a scrollable timeline.
-   **Admin Panel**: Functionality for uploading new image and video content.
-   **File Support**: Images (jpeg, jpg, png, gif) and videos (mp4, mov, avi, webm).
-   **Responsiveness**: Optimized layouts for mobile and desktop across all components (HeroSection, TimelineSection, MediaLightbox, AdminPanel).

### System Design Choices

-   **Monorepo Structure**: Unified frontend and backend.
-   **Environment Configuration**: Supports different configurations for development (in-memory storage) and production (PostgreSQL, potentially cloud storage like Vercel Blob).
-   **Deployment**: Configured for Replit, Vercel, and Railway platforms with specific `railway.json` and `vercel.json` files for respective build and deployment commands.

## External Dependencies

### Database & ORM

-   PostgreSQL (via Replit database)
-   Drizzle ORM
-   `@neondatabase/serverless`
-   `drizzle-zod`
-   `drizzle-kit` (for migrations)

### File Storage

-   Multer (for local filesystem uploads)
-   Vercel Blob (for cloud storage on Vercel deployments)

### UI/Styling Libraries

-   Radix UI
-   shadcn/ui
-   Tailwind CSS
-   Lucide React (icons)
-   Google Fonts API

### Data Management & Forms

-   TanStack Query (React Query)
-   React Hook Form
-   Zod (for validation)
-   `date-fns`

### Development Tools

-   TypeScript
-   Vite
-   ESBuild
-   `tsx` (for running TypeScript files)