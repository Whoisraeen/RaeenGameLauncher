import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import type { Game, GamePlatform, GameCategory, GameFilter } from '@types/game'

// Async thunks
export const loadGames = createAsyncThunk(
  'gameLibrary/loadGames',
  async (platforms: GamePlatform[]) => {
    // This would call the main process to scan for games
    const games = await window.electronAPI.games.scanForGames(platforms)
    return games
  }
)

export const launchGame = createAsyncThunk(
  'gameLibrary/launchGame',
  async (gameId: string) => {
    await window.electronAPI.games.launchGame(gameId)
    return gameId
  }
)

export const updateGameMetadata = createAsyncThunk(
  'gameLibrary/updateGameMetadata',
  async ({ gameId, metadata }: { gameId: string; metadata: Partial<Game> }) => {
    const updatedGame = await window.electronAPI.games.updateGameMetadata(gameId, metadata)
    return updatedGame
  }
)

interface GameLibraryState {
  games: Record<string, Game>
  categories: GameCategory[]
  filters: GameFilter
  sortBy: 'name' | 'lastPlayed' | 'playtime' | 'rating' | 'releaseDate'
  sortOrder: 'asc' | 'desc'
  selectedGameId: string | null
  currentlyPlayingId: string | null
  searchQuery: string
  viewMode: 'grid' | 'list' | 'compact'
  loading: {
    scanning: boolean
    launching: boolean
    updating: boolean
  }
  error: string | null
}

const initialState: GameLibraryState = {
  games: {},
  categories: [
    { id: 'all', name: 'All Games', color: '#3b82f6' },
    { id: 'favorites', name: 'Favorites', color: '#ef4444' },
    { id: 'recently-played', name: 'Recently Played', color: '#10b981' },
    { id: 'never-played', name: 'Never Played', color: '#6b7280' },
  ],
  filters: {
    platforms: [],
    genres: [],
    categories: [],
    playState: 'all',
    rating: null,
  },
  sortBy: 'name',
  sortOrder: 'asc',
  selectedGameId: null,
  currentlyPlayingId: null,
  searchQuery: '',
  viewMode: 'grid',
  loading: {
    scanning: false,
    launching: false,
    updating: false,
  },
  error: null,
}

export const gameLibrarySlice = createSlice({
  name: 'gameLibrary',
  initialState,
  reducers: {
    setSelectedGame: (state, action: PayloadAction<string | null>) => {
      state.selectedGameId = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setFilters: (state, action: PayloadAction<Partial<GameFilter>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setSortBy: (state, action: PayloadAction<GameLibraryState['sortBy']>) => {
      state.sortBy = action.payload
    },
    setSortOrder: (state, action: PayloadAction<GameLibraryState['sortOrder']>) => {
      state.sortOrder = action.payload
    },
    setViewMode: (state, action: PayloadAction<GameLibraryState['viewMode']>) => {
      state.viewMode = action.payload
    },
    toggleGameFavorite: (state, action: PayloadAction<string>) => {
      const game = state.games[action.payload]
      if (game) {
        game.isFavorite = !game.isFavorite
        game.updatedAt = new Date().toISOString()
      }
    },
    updateGamePlaytime: (state, action: PayloadAction<{ gameId: string; sessionTime: number }>) => {
      const { gameId, sessionTime } = action.payload
      const game = state.games[gameId]
      if (game) {
        game.playtime += sessionTime
        game.lastPlayed = new Date().toISOString()
        game.updatedAt = new Date().toISOString()
      }
    },
    addCustomCategory: (state, action: PayloadAction<GameCategory>) => {
      state.categories.push(action.payload)
    },
    removeCustomCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(cat => cat.id !== action.payload)
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Load games
      .addCase(loadGames.pending, (state) => {
        state.loading.scanning = true
        state.error = null
      })
      .addCase(loadGames.fulfilled, (state, action) => {
        state.loading.scanning = false
        // Convert array to record for efficient lookups
        state.games = action.payload.reduce((acc, game) => {
          acc[game.id] = game
          return acc
        }, {} as Record<string, Game>)
      })
      .addCase(loadGames.rejected, (state, action) => {
        state.loading.scanning = false
        state.error = action.error.message || 'Failed to load games'
      })
      
      // Launch game
      .addCase(launchGame.pending, (state, action) => {
        state.loading.launching = true
        state.currentlyPlayingId = action.meta.arg
      })
      .addCase(launchGame.fulfilled, (state) => {
        state.loading.launching = false
      })
      .addCase(launchGame.rejected, (state, action) => {
        state.loading.launching = false
        state.currentlyPlayingId = null
        state.error = action.error.message || 'Failed to launch game'
      })
      
      // Update game metadata
      .addCase(updateGameMetadata.pending, (state) => {
        state.loading.updating = true
      })
      .addCase(updateGameMetadata.fulfilled, (state, action) => {
        state.loading.updating = false
        state.games[action.payload.id] = action.payload
      })
      .addCase(updateGameMetadata.rejected, (state, action) => {
        state.loading.updating = false
        state.error = action.error.message || 'Failed to update game metadata'
      })
  },
})

export const {
  setSelectedGame,
  setSearchQuery,
  setFilters,
  setSortBy,
  setSortOrder,
  setViewMode,
  toggleGameFavorite,
  updateGamePlaytime,
  addCustomCategory,
  removeCustomCategory,
  clearError,
} = gameLibrarySlice.actions