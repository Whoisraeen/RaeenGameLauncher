# ADR-003: Redux Toolkit for State Management

## Status
Accepted

## Context

Raeen Launcher requires sophisticated state management for:

- Complex game library data with filtering, sorting, and categorization
- Real-time performance monitoring data
- User preferences and settings across multiple domains
- Cross-feature data sharing (themes, user profile, system info)
- Offline-first capabilities with data persistence
- Undo/redo functionality for certain operations
- Time-travel debugging for development

### State Management Options Considered

1. **React Context + useReducer**
   - Pros: Built-in, simple, no dependencies
   - Cons: Performance issues with large state trees, no dev tools

2. **Zustand**
   - Pros: Simple API, good TypeScript support, small bundle
   - Cons: Limited ecosystem, fewer dev tools

3. **Redux Toolkit (RTK)**
   - Pros: Mature, excellent dev tools, normalized state, time-travel debugging
   - Cons: Learning curve, boilerplate (though RTK reduces this)

4. **Jotai/Valtio**
   - Pros: Atomic approach, good performance
   - Cons: Newer ecosystem, different mental model

## Decision

We will use **Redux Toolkit** as the primary state management solution.

### Architecture Components

- **Store**: Centralized state with feature-based slices
- **RTK Query**: Data fetching and caching
- **Slices**: Feature-specific state management
- **Selectors**: Memoized state selection
- **Middleware**: Custom middleware for IPC communication and logging

### State Organization

```typescript
// Root State Structure
interface RootState {
  // Feature states
  gameLibrary: GameLibraryState
  performance: PerformanceState
  customization: CustomizationState
  social: SocialState
  settings: SettingsState
  user: UserState
  notifications: NotificationState
  
  // API states (RTK Query)
  gameStoreApi: GameStoreApiState
  systemInfoApi: SystemInfoApiState
  communityApi: CommunityApiState
}
```

## Consequences

### Positive

- **Predictable State**: Single source of truth with predictable updates
- **Developer Experience**: Excellent dev tools, time-travel debugging
- **Performance**: Optimized with memoized selectors and normalized state
- **Type Safety**: Full TypeScript integration
- **Data Fetching**: RTK Query provides caching, synchronization, and loading states
- **Middleware**: Extensible middleware system for cross-cutting concerns
- **Testing**: Easy to test with predictable state updates
- **Debugging**: Rich debugging capabilities with Redux DevTools

### Negative

- **Learning Curve**: Team needs to understand Redux patterns
- **Bundle Size**: Larger than simpler solutions
- **Boilerplate**: More code compared to Context API (though RTK minimizes this)
- **Over-engineering Risk**: May be overkill for simple state

### Implementation Strategy

1. **Feature Slices**: Each major feature gets its own slice
2. **Normalized State**: Use entity adapters for collections
3. **Async Thunks**: Handle side effects and API calls
4. **Selectors**: Create reusable, memoized selectors
5. **RTK Query**: Use for server state and caching
6. **Persistence**: Implement selective state persistence
7. **Middleware**: Custom middleware for Electron IPC integration

### Code Examples

```typescript
// Feature slice
const gameLibrarySlice = createSlice({
  name: 'gameLibrary',
  initialState,
  reducers: {
    setSelectedGame: (state, action) => {
      state.selectedGameId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadGames.fulfilled, (state, action) => {
      gamesAdapter.setAll(state, action.payload)
    })
  },
})

// Selector
const selectFilteredGames = createSelector(
  [selectAllGames, selectFilters],
  (games, filters) => applyFilters(games, filters)
)

// RTK Query API
const gameStoreApi = createApi({
  reducerPath: 'gameStoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/games/',
  }),
  endpoints: (builder) => ({
    getGameMetadata: builder.query({
      query: (gameId) => `metadata/${gameId}`,
    }),
  }),
})
```

### Migration and Adoption

- Start with core features (game library, settings)
- Gradually migrate complex state to Redux
- Keep simple local state in components
- Train team on Redux Toolkit patterns
- Establish state shape conventions

This decision provides a robust foundation for managing the complex state requirements of Raeen Launcher while maintaining developer productivity.