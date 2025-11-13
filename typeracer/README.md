# TypeRacer - Real-time Multiplayer Typing Game

A real-time multiplayer typing game built with Next.js 16, React 19, Supabase, and TypeScript. Compete with other players to type sentences as fast and accurately as possible!

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **State Management**: Zustand
- **Database & Real-time**: Supabase (PostgreSQL + Real-time subscriptions)
- **UI Components**: Radix UI Themes
- **Styling**: Tailwind CSS
- **Testing**: Jest + React Testing Library
- **Data Grid**: AG Grid React

## Prerequisites

- Node.js 18+ and npm
- A Supabase account and project

## Setup Instructions

### 1. Database Setup

Follow the instructions in [`DATABASE_SETUP.md`](./DATABASE_SETUP.md) to:

- Create your Supabase project
- Run the SQL schema
- Get your API credentials

### 2. Environment Configuration

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start playing!

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

The test suite includes unit tests for React hooks with mocked dependencies.

## Project Structure

```
typeracer/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   │   ├── leaderboard-table.tsx
│   │   ├── personal-stats.tsx
│   │   ├── register-user.tsx
│   │   ├── sentence-display.tsx
│   │   ├── timer.tsx
│   │   └── typing-area.tsx
│   ├── hooks/            # Custom React hooks
│   │   ├── use-game.tsx
│   │   └── use-player.tsx
│   ├── interfaces/       # TypeScript interfaces
│   ├── utils/            # Utility functions
│   │   ├── sentences.ts
│   │   ├── store.ts      # Zustand store
│   │   ├── supabase.ts   # Supabase client
│   │   └── utils.ts
├── jest.config.js        # Jest configuration
├── jest.setup.js         # Jest setup file
└── DATABASE_SETUP.md     # Database schema and setup
```

## Key Design Decisions & Assumptions

### Architecture

- **Client-side state management**: Used Zustand for simple, performant state management. I also considered Redux, but thought it would be overkill for such a small project. Considering short time Zustand is quicker to setup.
- **Real-time updates**: Leveraged Supabase real-time subscriptions for live leaderboard and game state.
- **localStorage**: Used for persisting user ID across sessions (no authentication required)

### Simplifications

- **No authentication**: Players register with just a username (stored in localStorage)
- **Single active round**: Only one game round is active at a time for all players
- **No room system**: All players compete in the same global round
- **Public database access**: RLS policies allow full access (MVP approach - should be restricted in production)
- **No input validation**: Minimal validation on username and typing input
- **Fixed 60-second rounds**: Timer duration is hardcoded

### Technical Choices

- **Supabase**: Provides both database and real-time functionality in one service. I also considered Node.js server with Socket.io, but it would require more time to setup backend code.
- **Radix UI**: Accessible, unstyled component library.
- **AG Grid**: Robust data grid for the leaderboard with sorting and filtering capabilities. I considered Tanstack React Table, but I didn't like how much code (especially HTML) needs to be written to generate small table. And also I currently use Ag Grid on my daily work so it was easy for me to set it up.
- **Jest + RTL**: Industry-standard testing setup for React applications

### Performance Considerations

- **Real-time throttling**: Active session updates are sent on every keystroke (could be throttled for production)
- **Database indexes**: Added on frequently queried columns (WPM, accuracy, round_id)
- **Optimistic updates**: Local state updates immediately, syncs to database asynchronously

### Known Limitations

- No error boundaries for graceful error handling
- No offline support
- No input validation for special characters or SQL injection (handled by Supabase)
- Limited mobile optimization
- No game history or replay functionality
- Best scores would update only at round completion

## <del>How It Works</del> How it should work

1. **Player Registration**: Enter a username to create a player account (stored in Supabase)
2. **Auto-join Round**: Automatically joins the current active game round
3. **Real-time Gameplay**:
   - Type the displayed sentence
   - Your WPM and accuracy update in real-time
   - See other players' progress on the leaderboard (will be implemented)
4. **Round Completion**: When the timer hits 0, best scores are updated (will be implemented)
5. **New Round**: A new round automatically starts with a different sentence

## Future Enhancements

- User authentication (email/password)
- Practice mode (solo play)
- If first half of round passed, user should wait until new round begins
