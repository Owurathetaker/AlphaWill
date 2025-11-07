# Alpha Gents - Warrior Motivation PWA

## Overview
Alpha Gents is a Progressive Web App (PWA) designed for men seeking daily motivation, warrior wisdom, and biblical inspiration. The app features a bold, masculine aesthetic with dark colors (blacks, rich golds, crimson reds) and provides curated motivational quotes across six categories.

## Purpose
Help men stay focused, motivated, and locked in on their goals every day through:
- Daily motivational quotes with biblical wisdom
- Warrior-themed inspiration emphasizing discipline, strength, and integrity
- Faith-based encouragement from scripture
- Offline-first PWA experience for anytime access

## Key Features

### Core Functionality
- **Daily Quote**: Deterministic daily quote that changes each day
- **Categories**: 6 themed categories (Discipline, Goals, Faith, Integrity, Strength, Purpose)
- **Random Quotes**: On-demand random motivation
- **Favorites**: Save quotes locally for quick access
- **Share**: Native share functionality with formatted quote text
- **Offline Support**: Service worker enables offline access to all quotes

### Technical Features
- **PWA**: Installable on mobile devices and tablets
- **Dark Theme**: Warrior aesthetic with rich gold (#B8860B) primary color and crimson accents
- **Mobile-First**: Bottom tab navigation optimized for mobile use
- **Local Storage**: Favorites persisted in browser
- **Responsive Design**: Works on all screen sizes

## Architecture

### Data Model
- **Quote**: id, text, author, category, biblicalReference
- **Categories**: Discipline, Goals, Faith, Integrity, Strength, Purpose
- **Storage**: In-memory storage with 50+ curated quotes

### Frontend Stack
- React + TypeScript
- Wouter for routing
- TanStack Query for data fetching
- Shadcn UI components
- Tailwind CSS for styling
- Montserrat (primary font) + Crimson Text (biblical references)

### Backend Stack
- Express.js server
- In-memory storage (MemStorage)
- RESTful API endpoints

## API Endpoints
- `GET /api/quotes` - Get all quotes
- `GET /api/quotes/daily` - Get daily quote (deterministic by date)
- `GET /api/quotes/category/:category` - Get quotes by category
- `GET /api/quotes/random` - Get random quote

## Design System

### Colors
- **Background**: Very dark (0 0% 8%)
- **Foreground**: Warm light (43 20% 92%)
- **Primary**: Rich gold (43 88% 45%)
- **Accent**: Crimson red (0 80% 40%)
- **Card**: Slightly elevated dark (0 0% 10%)

### Typography
- **Headers**: Montserrat (700-900 weight), uppercase, letter-spacing
- **Body**: Montserrat (500 weight)
- **Scripture**: Crimson Text (600 weight), italic

### Spacing
- Small: 0.25rem (4px)
- Medium: 1rem (16px)
- Large: 2rem (32px)

## User Preferences
- Dark mode by default (warrior aesthetic)
- Mobile-first experience
- Swipe gestures for quote navigation
- One-tap favorites and sharing

## Recent Changes
- 2025-11-07: Initial MVP implementation
  - Complete schema and data model
  - All frontend components with warrior aesthetic
  - Backend API with 50 curated quotes
  - PWA configuration with manifest and service worker
  - Install prompt for mobile devices
  - Favorites system with local storage
  - Native share functionality

## Project Structure
```
client/
  src/
    components/     # Reusable UI components
    pages/          # Route pages
    hooks/          # Custom hooks (useFavorites)
    lib/            # Utilities (quotes, pwa, queryClient)
server/
  routes.ts         # API routes
  storage.ts        # In-memory storage with quotes
shared/
  schema.ts         # TypeScript types
public/
  manifest.json     # PWA manifest
  service-worker.js # Offline functionality
```

## Running the Project
The workflow "Start application" runs `npm run dev` which starts:
- Express server on backend
- Vite dev server for frontend
- Both served on same port (5000)

## Future Enhancements
- User accounts with cloud sync
- Daily push notifications
- Custom quote image generator
- Community quote submissions
- Goal tracking system
- Achievement badges
