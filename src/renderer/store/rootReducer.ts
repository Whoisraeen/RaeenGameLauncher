import { combineReducers } from '@reduxjs/toolkit'

// Feature slices
import { gameLibrarySlice } from './slices/gameLibrarySlice'
import { performanceSlice } from './slices/performanceSlice'
import { customizationSlice } from './slices/customizationSlice'
import { socialSlice } from './slices/socialSlice'
import { settingsSlice } from './slices/settingsSlice'
import { userSlice } from './slices/userSlice'
import { notificationSlice } from './slices/notificationSlice'
import { analyticsSlice } from './slices/analyticsSlice'
import { moddingSlice } from './slices/moddingSlice'
import { streamingSlice } from './slices/streamingSlice'
import { competitiveSlice } from './slices/competitiveSlice'
import { utilitiesSlice } from './slices/utilitiesSlice'

// API slices (RTK Query)
import { gameStoreApi } from './slices/api/gameStoreApi'
import { systemInfoApi } from './slices/api/systemInfoApi'
import { communityApi } from './slices/api/communityApi'

export const rootReducer = combineReducers({
  // Feature state slices
  gameLibrary: gameLibrarySlice.reducer,
  performance: performanceSlice.reducer,
  customization: customizationSlice.reducer,
  social: socialSlice.reducer,
  settings: settingsSlice.reducer,
  user: userSlice.reducer,
  notifications: notificationSlice.reducer,
  analytics: analyticsSlice.reducer,
  modding: moddingSlice.reducer,
  streaming: streamingSlice.reducer,
  competitive: competitiveSlice.reducer,
  utilities: utilitiesSlice.reducer,

  // API slices
  [gameStoreApi.reducerPath]: gameStoreApi.reducer,
  [systemInfoApi.reducerPath]: systemInfoApi.reducer,
  [communityApi.reducerPath]: communityApi.reducer,
})

export type RootState = ReturnType<typeof rootReducer>