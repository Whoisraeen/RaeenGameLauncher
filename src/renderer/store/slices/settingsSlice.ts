import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system'
  accentColor: string
  backgroundType: 'solid' | 'gradient' | 'wallpaper' | 'video'
  backgroundImage?: string
  backgroundVideo?: string
  enableAnimations: boolean
  enableParticles: boolean
  glassEffect: boolean
  borderRadius: number
  fontSize: 'small' | 'medium' | 'large'
}

interface PerformanceSettings {
  enableGameMode: boolean
  autoOptimizeOnLaunch: boolean
  backgroundAppKiller: boolean
  priorityBooster: boolean
  memoryOptimizer: boolean
  enableOverlay: boolean
  overlayPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  fpsTarget: number
  enableVSync: boolean
}

interface LibrarySettings {
  defaultView: 'grid' | 'list' | 'compact'
  autoScanOnStartup: boolean
  scanPlatforms: string[]
  autoUpdateMetadata: boolean
  showHiddenGames: boolean
  defaultSortBy: 'name' | 'lastPlayed' | 'playtime' | 'rating'
  enableQuickLaunch: boolean
}

interface SocialSettings {
  enableRichPresence: boolean
  showOnlineStatus: boolean
  autoAcceptFriendRequests: boolean
  sharePlaytime: boolean
  shareAchievements: boolean
  enableNotifications: boolean
  soundEffects: boolean
}

interface PrivacySettings {
  collectAnalytics: boolean
  shareUsageData: boolean
  enableCrashReporting: boolean
  autoUpdates: boolean
  betaFeatures: boolean
}

interface GeneralSettings {
  language: string
  startOnSystemBoot: boolean
  startMinimized: boolean
  minimizeToTray: boolean
  closeToTray: boolean
  enableHotkeys: boolean
  hotkeys: Record<string, string>
}

interface SettingsState {
  appearance: AppearanceSettings
  performance: PerformanceSettings
  library: LibrarySettings
  social: SocialSettings
  privacy: PrivacySettings
  general: GeneralSettings
  isLoading: boolean
  lastSaved: string | null
}

const initialState: SettingsState = {
  appearance: {
    theme: 'dark',
    accentColor: '#3b82f6',
    backgroundType: 'gradient',
    enableAnimations: true,
    enableParticles: false,
    glassEffect: true,
    borderRadius: 8,
    fontSize: 'medium',
  },
  performance: {
    enableGameMode: true,
    autoOptimizeOnLaunch: true,
    backgroundAppKiller: false,
    priorityBooster: true,
    memoryOptimizer: true,
    enableOverlay: true,
    overlayPosition: 'top-right',
    fpsTarget: 60,
    enableVSync: true,
  },
  library: {
    defaultView: 'grid',
    autoScanOnStartup: true,
    scanPlatforms: ['steam', 'epic', 'gog'],
    autoUpdateMetadata: true,
    showHiddenGames: false,
    defaultSortBy: 'name',
    enableQuickLaunch: true,
  },
  social: {
    enableRichPresence: true,
    showOnlineStatus: true,
    autoAcceptFriendRequests: false,
    sharePlaytime: true,
    shareAchievements: true,
    enableNotifications: true,
    soundEffects: true,
  },
  privacy: {
    collectAnalytics: true,
    shareUsageData: false,
    enableCrashReporting: true,
    autoUpdates: true,
    betaFeatures: false,
  },
  general: {
    language: 'en',
    startOnSystemBoot: false,
    startMinimized: false,
    minimizeToTray: true,
    closeToTray: false,
    enableHotkeys: true,
    hotkeys: {
      quickLaunch: 'Ctrl+Space',
      showOverlay: 'Ctrl+Shift+O',
      screenshot: 'F12',
    },
  },
  isLoading: false,
  lastSaved: null,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateAppearanceSettings: (state, action: PayloadAction<Partial<AppearanceSettings>>) => {
      state.appearance = { ...state.appearance, ...action.payload }
    },
    updatePerformanceSettings: (state, action: PayloadAction<Partial<PerformanceSettings>>) => {
      state.performance = { ...state.performance, ...action.payload }
    },
    updateLibrarySettings: (state, action: PayloadAction<Partial<LibrarySettings>>) => {
      state.library = { ...state.library, ...action.payload }
    },
    updateSocialSettings: (state, action: PayloadAction<Partial<SocialSettings>>) => {
      state.social = { ...state.social, ...action.payload }
    },
    updatePrivacySettings: (state, action: PayloadAction<Partial<PrivacySettings>>) => {
      state.privacy = { ...state.privacy, ...action.payload }
    },
    updateGeneralSettings: (state, action: PayloadAction<Partial<GeneralSettings>>) => {
      state.general = { ...state.general, ...action.payload }
    },
    setTheme: (state, action: PayloadAction<AppearanceSettings['theme']>) => {
      state.appearance.theme = action.payload
    },
    setAccentColor: (state, action: PayloadAction<string>) => {
      state.appearance.accentColor = action.payload
    },
    updateHotkey: (state, action: PayloadAction<{ key: string; value: string }>) => {
      state.general.hotkeys[action.payload.key] = action.payload.value
    },
    resetToDefaults: (state, action: PayloadAction<keyof SettingsState>) => {
      const section = action.payload
      if (section in initialState) {
        ;(state as any)[section] = (initialState as any)[section]
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    markSaved: (state) => {
      state.lastSaved = new Date().toISOString()
    },
    loadSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      Object.assign(state, action.payload)
    },
  },
})

export const {
  updateAppearanceSettings,
  updatePerformanceSettings,
  updateLibrarySettings,
  updateSocialSettings,
  updatePrivacySettings,
  updateGeneralSettings,
  setTheme,
  setAccentColor,
  updateHotkey,
  resetToDefaults,
  setLoading,
  markSaved,
  loadSettings,
} = settingsSlice.actions