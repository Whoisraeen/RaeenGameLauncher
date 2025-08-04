# Raeen Launcher - Development Guide

## Overview

This guide covers the complete development workflow, coding standards, and best practices for the Raeen Launcher project.

## Quick Start

### Prerequisites

- **Node.js**: Version 18+ (LTS recommended)
- **npm**: Version 8+ (comes with Node.js)
- **Git**: For version control
- **VS Code**: Recommended IDE with extensions

### Installation

```bash
# Clone the repository
git clone https://github.com/raeen-team/raeen-launcher.git
cd raeen-launcher

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Server

The development server runs both Vite (renderer) and Electron (main) processes:

- **Renderer Process**: React app at `http://localhost:5173`
- **Main Process**: Electron with hot reload
- **Auto Reload**: Changes trigger automatic recompilation

## Project Structure

### Core Directories

```
src/
├── main/           # Electron main process
├── renderer/       # React renderer process  
├── preload/        # Preload scripts
└── shared/         # Shared utilities and types
```

### Feature Organization

Each feature follows this structure:

```
features/[featureName]/
├── components/     # React components
├── hooks/          # Custom hooks
├── services/       # Business logic
├── types/          # TypeScript definitions
├── utils/          # Feature utilities
└── index.ts        # Public API exports
```

## Development Workflow

### 1. Feature Development

#### Branch Strategy
- `main`: Production-ready code
- `develop`: Integration branch
- `feature/[name]`: Individual features
- `hotfix/[name]`: Critical fixes

#### Feature Development Process

1. **Create Feature Branch**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/game-library-ui
   ```

2. **Setup Feature Module**
   ```bash
   mkdir -p src/renderer/features/gameLibrary/{components,hooks,services,types,utils}
   touch src/renderer/features/gameLibrary/index.ts
   ```

3. **Implement Feature**
   - Start with types and interfaces
   - Create services and business logic
   - Build React components
   - Add custom hooks
   - Write tests alongside code

4. **Testing**
   ```bash
   npm test -- --watch
   npm run test:coverage
   ```

5. **Code Quality**
   ```bash
   npm run lint
   npm run type-check
   npm run format
   ```

### 2. Code Standards

#### TypeScript Guidelines

- **Strict Mode**: Always enabled
- **Type Annotations**: Explicit for function parameters and returns
- **Interface over Type**: Use interfaces for object shapes
- **Utility Types**: Leverage built-in utility types

```typescript
// Good
interface GameMetadata {
  id: string
  title: string
  platform: GamePlatform
  lastPlayed?: Date
}

function updateGame(gameId: string, metadata: Partial<GameMetadata>): Promise<Game> {
  // Implementation
}

// Bad
function updateGame(gameId: any, metadata: any) {
  // Implementation
}
```

#### React Best Practices

- **Functional Components**: Use function components with hooks
- **Custom Hooks**: Extract reusable logic
- **Memoization**: Use React.memo, useMemo, useCallback appropriately
- **Error Boundaries**: Wrap features in error boundaries

```typescript
// Good
const GameCard = React.memo<GameCardProps>(({ game, onLaunch }) => {
  const handleLaunch = useCallback(() => {
    onLaunch(game.id)
  }, [game.id, onLaunch])

  return (
    <Card onClick={handleLaunch}>
      <CardContent>{game.title}</CardContent>
    </Card>
  )
})

// Custom hook
function useGameLibrary() {
  const dispatch = useAppDispatch()
  const games = useAppSelector(selectGames)
  
  const loadGames = useCallback(async () => {
    await dispatch(loadGamesThunk())
  }, [dispatch])

  return { games, loadGames }
}
```

#### State Management

- **Redux Toolkit**: Use RTK for complex state
- **Local State**: Use useState for component-specific state
- **Server State**: Use RTK Query for API data
- **Derived State**: Use selectors and memoization

```typescript
// Redux slice example
const gameLibrarySlice = createSlice({
  name: 'gameLibrary',
  initialState,
  reducers: {
    setSelectedGame: (state, action: PayloadAction<string>) => {
      state.selectedGameId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadGames.fulfilled, (state, action) => {
      state.games = action.payload
    })
  },
})

// Selector
const selectFilteredGames = createSelector(
  [selectGames, selectSearchQuery, selectFilters],
  (games, query, filters) => {
    return games.filter(game => 
      game.title.toLowerCase().includes(query.toLowerCase()) &&
      (filters.platform === 'all' || game.platform === filters.platform)
    )
  }
)
```

#### Styling Guidelines

- **Tailwind CSS**: Primary styling solution
- **Design System**: Use consistent spacing, colors, typography
- **Component Variants**: Use cva for component variants
- **Responsive Design**: Mobile-first approach

```typescript
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        gaming: 'bg-gradient-gaming text-white hover:shadow-xl hover:scale-105',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)
```

### 3. Testing Strategy

#### Test Types

1. **Unit Tests**: Individual functions and components
2. **Integration Tests**: Feature workflows
3. **E2E Tests**: Complete user journeys

#### Testing Guidelines

```typescript
// Component test example
describe('GameCard', () => {
  const mockGame: Game = {
    id: '1',
    title: 'Test Game',
    platform: 'steam',
    // ... other properties
  }

  it('renders game information correctly', () => {
    render(<GameCard game={mockGame} onLaunch={jest.fn()} />)
    
    expect(screen.getByText('Test Game')).toBeInTheDocument()
    expect(screen.getByText('Steam')).toBeInTheDocument()
  })

  it('calls onLaunch when clicked', async () => {
    const mockOnLaunch = jest.fn()
    render(<GameCard game={mockGame} onLaunch={mockOnLaunch} />)
    
    await user.click(screen.getByRole('button'))
    
    expect(mockOnLaunch).toHaveBeenCalledWith('1')
  })
})

// Hook test example
describe('useGameLibrary', () => {
  it('loads games on mount', async () => {
    const { result } = renderHook(() => useGameLibrary())
    
    await act(async () => {
      await result.current.loadGames()
    })
    
    expect(result.current.games).toHaveLength(mockGames.length)
  })
})
```

### 4. Performance Guidelines

#### Bundle Optimization

- **Code Splitting**: Split by routes and features
- **Lazy Loading**: Load components on demand
- **Tree Shaking**: Import only what you need

```typescript
// Route-based code splitting
const GameLibrary = lazy(() => import('@features/gameLibrary'))
const Settings = lazy(() => import('@features/settings'))

// Component lazy loading
const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/games" element={<GameLibrary />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  )
}
```

#### React Performance

- **Memoization**: Prevent unnecessary re-renders
- **Virtualization**: Handle large lists efficiently
- **Debouncing**: Optimize search and filters

```typescript
// Virtualized list example
function GameList({ games }: { games: Game[] }) {
  const rowRenderer = useCallback(({ index, key, style }) => (
    <div key={key} style={style}>
      <GameCard game={games[index]} />
    </div>
  ), [games])

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          width={width}
          rowCount={games.length}
          rowHeight={200}
          rowRenderer={rowRenderer}
        />
      )}
    </AutoSizer>
  )
}
```

### 5. Electron Integration

#### IPC Communication

- **Type-Safe**: Define IPC channels with TypeScript
- **Error Handling**: Proper error propagation
- **Security**: Context isolation and secure preload

```typescript
// Preload script
const electronAPI = {
  games: {
    scanForGames: (platforms: GamePlatform[]) => 
      ipcRenderer.invoke('games:scan', platforms),
    launchGame: (gameId: string) => 
      ipcRenderer.invoke('games:launch', gameId),
  },
  system: {
    getSystemInfo: () => 
      ipcRenderer.invoke('system:info'),
  },
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)

// Main process handlers
ipcMain.handle('games:scan', async (_, platforms: GamePlatform[]) => {
  try {
    return await scanForGames(platforms)
  } catch (error) {
    logger.error('Failed to scan games:', error)
    throw error
  }
})
```

### 6. Build and Deployment

#### Development Build
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run dist         # Create distribution packages
```

#### Production Build
```bash
npm run build:all    # Build all platforms
npm run build:win    # Windows only
npm run build:mac    # macOS only
npm run build:linux  # Linux only
```

#### Release Process
```bash
npm run version      # Auto-increment version
npm run release      # Create GitHub release
```

## Git Workflow

### Commit Messages

Follow conventional commits format:

```
type(scope): description

feat(gameLibrary): add grid view for game collection
fix(performance): resolve memory leak in overlay system
docs(readme): update installation instructions
```

### Pre-commit Hooks

Husky runs these checks before each commit:
- ESLint for code quality
- Prettier for formatting
- TypeScript type checking
- Unit tests

## VS Code Setup

### Recommended Extensions

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "ms-vscode.vscode-json"
  ]
}
```

### Settings

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Clear build cache: `npm run clean`

2. **Type Errors**
   - Update TypeScript: `npm update typescript`
   - Clear VS Code cache: Reload window

3. **Electron Issues**
   - Check main process logs in console
   - Verify preload script loading
   - Test IPC communication

### Performance Debugging

```typescript
// React DevTools Profiler
if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React)
}

// Performance monitoring
function usePerformanceMonitor(componentName: string) {
  useEffect(() => {
    const start = performance.now()
    return () => {
      const end = performance.now()
      console.log(`${componentName} render time: ${end - start}ms`)
    }
  })
}
```

This development guide ensures consistent, high-quality code across the entire Raeen Launcher project while maintaining excellent developer experience and performance.