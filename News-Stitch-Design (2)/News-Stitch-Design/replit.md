# UNESCO Media Literacy Tool

## Project Overview
A comprehensive media and information literacy mobile application following UNESCO principles. The tool features a sleek, modern, and intuitive UI with a futuristic yet approachable aesthetic, optimized for trust, clarity, and engagement. Includes 7 distinct screens with overlay popups, dashboard, game sections, and content analysis tools.

## Project Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state
- **Forms**: React Hook Form with Zod validation
- **Theme**: UNESCO-compliant design system with deep indigo (#2D3A8C), royal blue (#004E98), emerald green (#2ECC71), warm coral (#FF6B6B)
- **Typography**: Inter and Poppins fonts for accessibility and clarity

### Backend
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with local strategy
- **Storage**: In-memory storage pattern with interface abstraction
- **API**: RESTful API with `/api` prefix

### Development Setup
- **Build Tool**: Vite for frontend, esbuild for backend
- **Package Manager**: npm
- **Development Server**: tsx for TypeScript execution
- **Port**: 5000 (both frontend and backend served from same port)

## Recent Changes (UNESCO Media Literacy Tool)
- ✅ Implemented complete UNESCO Media Literacy Tool with all 7 screens
- ✅ Created proper app navigation flow: Login → Dashboard → Sidebar navigation
- ✅ Added overlay popup with news preview and bias analysis
- ✅ Integrated Tinder-style game section with tree growth gamification
- ✅ Built comprehensive progress tracking with achievements system
- ✅ Implemented saved collection with bias score filtering
- ✅ Created extended view with cross-source verification
- ✅ Applied UNESCO design principles with accessibility-focused high contrast design
- ✅ Added smooth animations and microinteractions throughout
- ✅ **MAJOR UPDATE**: Implemented full backend infrastructure with PostgreSQL database
- ✅ Created comprehensive database schema for users, media analyses, game results, achievements
- ✅ Built complete REST API with 15+ endpoints for all app functionality
- ✅ Integrated OpenAI GPT-4o for AI-powered media analysis and bias detection
- ✅ Added fallback content system for development when API limits are reached
- ✅ Enhanced tree growth animations with dramatic effects and celebration overlays
- ✅ Connected frontend to real backend APIs for dynamic functionality

## Key Features
- **Screen 1**: Overlay Quick Result - Semi-transparent popup with bias analysis and news preview
- **Screen 2**: Login & Permissions - Gradient authentication with friendly permission requests
- **Screen 3**: Main Dashboard - Central input hub with media upload and analysis results
- **Screen 4**: Game Section - Tinder-style truth/false cards with tree growth animation
- **Screen 5**: My Tree View - Progress visualization with achievements and motivational content
- **Screen 6**: Saved Collection - Grid view of analyzed content with bias scores
- **Screen 7**: Extended View - Detailed analysis with generational rewrite and source verification

## User Preferences
- Language: English
- Design preference: UNESCO-compliant modern interface with accessibility focus
- Navigation flow: Login → Dashboard → Sidebar navigation to Game/Tree/Saved sections
- Interaction style: Smooth animations, overlay popups, gamification elements
- Development style: Single-page application with proper routing

## Database Schema
- Users table with authentication fields
- Prepared for expansion with news-related entities

## Security Practices
- Client/server separation enforced
- Input validation with Zod schemas
- Session management ready
- Environment variable configuration
- Secure authentication patterns

## Next Steps
- Connect to real fact-checking APIs for bias analysis
- Implement user progress persistence
- Add more gamification elements and achievements
- Integrate with external media analysis services
- Add social sharing and collaborative features