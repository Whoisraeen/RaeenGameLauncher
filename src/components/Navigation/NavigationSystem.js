/**
 * Raeen Launcher Design System - Navigation System
 * Advanced navigation for organizing 150+ gaming features
 */

import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassContainer } from '../Glass/GlassContainer';
import { spacing, borderRadius, colors, typographyPresets } from '../../../design-system/tokens';

// Navigation data structure for organizing features
export const navigationData = {
  // Core Gaming Features
  gaming: {
    id: 'gaming',
    label: 'Gaming',
    icon: '🎮',
    color: colors.primary[500],
    children: {
      library: {
        id: 'library',
        label: 'Game Library',
        icon: '📚',
        features: [
          'Universal game library (Steam, Epic, GOG, Origin, Uplay, Battle.net)',
          'One-click launch with automatic platform detection',
          'Game organization: tags, categories, smart folders',
          'Advanced search & filters (mood, completion status)',
          'Save game backup, sync, and version rollback',
          'Cross-platform playtime, achievements, screenshots'
        ]
      },
      performance: {
        id: 'performance',
        label: 'Performance',
        icon: '⚡',
        features: [
          'Pre-launch optimizer (background app killer)',
          'Game-specific graphics settings profiles',
          'Live FPS, temps, CPU/GPU/memory overlay',
          'Shader cache manager & cleaner',
          'GPU overclock tuner, fan curve editor',
          'Smart Game Mode resource allocator'
        ]
      },
      mods: {
        id: 'mods',
        label: 'Mods & Customization',
        icon: '🔧',
        features: [
          'Universal mod manager with conflict resolution',
          'Config (INI, JSON) editor, save editor',
          'Shader injectors (ReShade), FOV calculator',
          'Gamepad/keyboard/mouse remapper',
          'Auto-install modpacks & community load orders'
        ]
      }
    }
  },

  // Smart & AI Features
  smart: {
    id: 'smart',
    label: 'Smart Features',
    icon: '🧠',
    color: colors.secondary[500],
    children: {
      ai_recommendations: {
        id: 'ai_recommendations',
        label: 'AI Recommendations',
        icon: '🎯',
        features: [
          'AI-powered "What should I play?" engine',
          'Mood/time-based game filters',
          'Playtime goal tracking and reminders',
          'Abandoned-game reviver with progress tracker',
          'Game recap generator for open-world RPGs'
        ]
      },
      automation: {
        id: 'automation',
        label: 'Automation',
        icon: '🤖',
        features: [
          'Automatic game updates across platforms',
          'Smart notifications (friend online, sales)',
          'Gaming session planner with time estimates',
          'Quick Play mode for random selection',
          'Auto-apply performance optimizations'
        ]
      }
    }
  },

  // Competitive Tools
  competitive: {
    id: 'competitive',
    label: 'Competitive',
    icon: '🏆',
    color: colors.tertiary[500],
    children: {
      training: {
        id: 'training',
        label: 'Training Tools',
        icon: '🎯',
        features: [
          'Aim trainer with game-specific sensitivity',
          'Reaction time tester and improvement tracker',
          'Custom practice routine generator',
          'Match replay analyzer with statistics',
          'Team communication overlay for scrimmages'
        ]
      },
      optimization: {
        id: 'optimization',
        label: 'Performance Optimization',
        icon: '⚙️',
        features: [
          'Network latency optimizer for online games',
          'Input lag checker and optimizer',
          'Screen refresh rate and color calibration',
          'FPS capper with frame pacing',
          'Esports tournament tracker with notifications'
        ]
      }
    }
  },

  // Customization & Theming
  customization: {
    id: 'customization',
    label: 'Customization',
    icon: '🎨',
    color: colors.gaming.fps,
    children: {
      ui_themes: {
        id: 'ui_themes',
        label: 'UI Themes',
        icon: '🌈',
        features: [
          'Rounded glassmorphism UI with animated transitions',
          'Theme packs: color, font, layout, borders',
          'Real-time theme preview and switching',
          'Custom theme creator with live preview',
          'RGB lighting sync with UI themes'
        ]
      },
      overlays: {
        id: 'overlays',
        label: 'Overlays & Widgets',
        icon: '📱',
        features: [
          'Rounded transparent taskbar overlay UI',
          'Quick stats widgets (FPS, temp, time, ping)',
          'Dockable launchers and draggable HUD',
          'Custom window chrome and title bars',
          'Performance monitoring widgets'
        ]
      },
      wallpapers: {
        id: 'wallpapers',
        label: 'Live Wallpapers',
        icon: '🖼️',
        features: [
          'Audio-reactive and particle wallpapers',
          'Per-game dynamic backgrounds',
          'Wallpaper Engine compatibility SDK',
          'Custom backgrounds based on selected game',
          'Animated wallpapers with blur effects'
        ]
      }
    }
  },

  // Streaming & Content Creation
  streaming: {
    id: 'streaming',
    label: 'Streaming',
    icon: '📹',
    color: colors.rgb.purple,
    children: {
      recording: {
        id: 'recording',
        label: 'Recording & Editing',
        icon: '🎬',
        features: [
          'Game clip editor with auto-detection',
          'Kill/win moment automatic capture',
          'Highlight compiler and upload integration',
          'Simple editing tools for gaming clips',
          'Thumbnail generator with templates'
        ]
      },
      streaming_tools: {
        id: 'streaming_tools',
        label: 'Streaming Tools',
        icon: '📺',
        features: [
          'OBS/Streamlabs integration with presets',
          'Overlay builder: chat, alerts, webcam',
          'Voice changer for gaming/streaming',
          'Stream schedule planner with game rotation',
          'Viewer engagement tracker and analytics'
        ]
      }
    }
  },

  // Social & Community
  social: {
    id: 'social',
    label: 'Social',
    icon: '👥',
    color: colors.info,
    children: {
      friends: {
        id: 'friends',
        label: 'Friends & Community',
        icon: '🤝',
        features: [
          'Unified friends list across platforms',
          'Rich presence and session invites',
          'Achievement showcase from multiple launchers',
          'Gaming buddy finder by skill and schedule',
          'Discord status updater with achievements'
        ]
      },
      teams: {
        id: 'teams',
        label: 'Teams & Clans',
        icon: '⚔️',
        features: [
          'Gaming clan/team management platform',
          'Tournament bracket generator for local groups',
          'Matchmaking engine: co-op/PvP/skill-based',
          'Community mod packs and theme sharing',
          'Shared game collections with friends'
        ]
      }
    }
  },

  // System & Technical
  system: {
    id: 'system',
    label: 'System',
    icon: '💻',
    color: colors.neutral[400],
    children: {
      monitoring: {
        id: 'monitoring',
        label: 'System Monitoring',
        icon: '📊',
        features: [
          'Real-time system performance monitoring',
          'Hardware temperature and usage tracking',
          'Power consumption tracker per game',
          'Storage optimizer for game files',
          'System health checks with recommendations'
        ]
      },
      troubleshooting: {
        id: 'troubleshooting',
        label: 'Troubleshooting',
        icon: '🔧',
        features: [
          'Game crash log analyzer with solutions',
          'DirectX/driver conflict resolver',
          'Pre-game health check with OK to Play status',
          'Automatic driver updater for gaming',
          'Network stability tester with diagnostics'
        ]
      }
    }
  }
};

// Styled components for navigation
const NavigationContainer = styled(GlassContainer)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 320px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  padding: 0;
  border-radius: 0 ${borderRadius.xl} ${borderRadius.xl} 0;
  
  @media (max-width: 1024px) {
    width: 280px;
  }
  
  @media (max-width: 768px) {
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    transition: transform 0.3s ease;
    width: 100%;
    max-width: 320px;
    border-radius: 0 ${borderRadius.xl} 0 0;
  }
`;

const NavigationHeader = styled.div`
  padding: ${spacing[6]} ${spacing[4]} ${spacing[4]};
  border-bottom: 1px solid ${props => props.theme.glass?.border || 'rgba(255, 255, 255, 0.1)'};
`;

const NavigationTitle = styled.h2`
  ${typographyPresets.heading2}
  margin: 0;
  background: linear-gradient(135deg, ${colors.primary[400]}, ${colors.secondary[400]});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const NavigationContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${spacing[2]} 0;
  
  /* Custom scrollbar for navigation */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${colors.primary[500]};
    border-radius: 2px;
  }
`;

const CategoryItem = styled(motion.div)`
  margin: 0 ${spacing[2]} ${spacing[1]};
`;

const CategoryButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  padding: ${spacing[3]} ${spacing[4]};
  background: ${props => props.isActive ? 
    'rgba(99, 102, 241, 0.2)' : 
    'transparent'
  };
  border: 1px solid ${props => props.isActive ? 
    'rgba(99, 102, 241, 0.3)' : 
    'transparent'
  };
  border-radius: ${borderRadius.lg};
  color: ${props => props.theme.text?.primary || colors.neutral[50]};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.2);
    transform: translateX(4px);
  }
  
  .icon {
    font-size: 20px;
    min-width: 24px;
  }
  
  .label {
    ${typographyPresets.label}
    flex: 1;
    text-align: left;
  }
  
  .arrow {
    font-size: 12px;
    transition: transform 0.2s ease;
    transform: rotate(${props => props.isExpanded ? '90deg' : '0deg'});
  }
`;

const SubcategoryList = styled(motion.div)`
  padding-left: ${spacing[8]};
  margin-top: ${spacing[2]};
`;

const SubcategoryItem = styled.div`
  margin-bottom: ${spacing[1]};
`;

const SubcategoryButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[2]} ${spacing[3]};
  background: ${props => props.isActive ? 
    'rgba(34, 197, 94, 0.2)' : 
    'transparent'
  };
  border: 1px solid ${props => props.isActive ? 
    'rgba(34, 197, 94, 0.3)' : 
    'transparent'
  };
  border-radius: ${borderRadius.md};
  color: ${props => props.theme.text?.secondary || colors.neutral[200]};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(34, 197, 94, 0.1);
    border-color: rgba(34, 197, 94, 0.2);
    color: ${props => props.theme.text?.primary || colors.neutral[50]};
  }
  
  .icon {
    font-size: 16px;
    min-width: 20px;
  }
  
  .label {
    ${typographyPresets.bodySmall}
    flex: 1;
    text-align: left;
  }
  
  .count {
    background: rgba(99, 102, 241, 0.2);
    color: ${colors.primary[400]};
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 11px;
    font-weight: 600;
  }
`;

const SearchContainer = styled.div`
  padding: 0 ${spacing[4]} ${spacing[4]};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${spacing[3]} ${spacing[4]};
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${borderRadius.lg};
  color: ${props => props.theme.text?.primary || colors.neutral[50]};
  font-size: 14px;
  
  &::placeholder {
    color: ${props => props.theme.text?.muted || colors.neutral[400]};
  }
  
  &:focus {
    outline: none;
    border-color: ${colors.primary[500]};
    background: rgba(0, 0, 0, 0.3);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  position: fixed;
  top: ${spacing[4]};
  left: ${spacing[4]};
  z-index: 101;
  width: 44px;
  height: 44px;
  background: rgba(99, 102, 241, 0.2);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: ${borderRadius.lg};
  color: ${props => props.theme.text?.primary || colors.neutral[50]};
  cursor: pointer;
  backdrop-filter: blur(20px);
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

/**
 * NavigationSystem - Advanced navigation for organizing 150+ gaming features
 */
export const NavigationSystem = ({ 
  onCategorySelect, 
  onSubcategorySelect, 
  activeCategory, 
  activeSubcategory 
}) => {
  const [expandedCategories, setExpandedCategories] = useState(new Set(['gaming']));
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const searchInputRef = useRef(null);

  // Toggle category expansion
  const handleCategoryToggle = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    onCategorySelect?.(categoryId);
    if (!expandedCategories.has(categoryId)) {
      handleCategoryToggle(categoryId);
    }
  };

  // Handle subcategory selection
  const handleSubcategorySelect = (categoryId, subcategoryId) => {
    onSubcategorySelect?.(categoryId, subcategoryId);
    setIsMobileOpen(false); // Close mobile menu after selection
  };

  // Filter navigation data based on search
  const filteredNavigation = React.useMemo(() => {
    if (!searchQuery) return navigationData;
    
    const filtered = {};
    Object.entries(navigationData).forEach(([categoryId, category]) => {
      const matchingSubcategories = {};
      let hasMatches = false;
      
      // Check if category label matches
      const categoryMatches = category.label.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Check subcategories and their features
      Object.entries(category.children || {}).forEach(([subId, subcategory]) => {
        const subMatches = subcategory.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (subcategory.features || []).some(feature => 
            feature.toLowerCase().includes(searchQuery.toLowerCase())
          );
        
        if (subMatches || categoryMatches) {
          matchingSubcategories[subId] = subcategory;
          hasMatches = true;
        }
      });
      
      if (hasMatches || categoryMatches) {
        filtered[categoryId] = {
          ...category,
          children: matchingSubcategories
        };
      }
    });
    
    return filtered;
  }, [searchQuery]);

  // Auto-expand categories when searching
  useEffect(() => {
    if (searchQuery) {
      setExpandedCategories(new Set(Object.keys(filteredNavigation)));
    }
  }, [searchQuery, filteredNavigation]);

  return (
    <>
      <MobileMenuButton onClick={() => setIsMobileOpen(!isMobileOpen)}>
        ☰
      </MobileMenuButton>
      
      <NavigationContainer 
        variant="strong" 
        isOpen={isMobileOpen}
      >
        <NavigationHeader>
          <NavigationTitle>Raeen</NavigationTitle>
          <div style={{ fontSize: '14px', opacity: 0.8, marginTop: '4px' }}>
            Gaming Ecosystem
          </div>
        </NavigationHeader>
        
        <SearchContainer>
          <SearchInput
            ref={searchInputRef}
            type="text"
            placeholder="Search features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>
        
        <NavigationContent>
          <AnimatePresence>
            {Object.entries(filteredNavigation).map(([categoryId, category]) => (
              <CategoryItem
                key={categoryId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <CategoryButton
                  isActive={activeCategory === categoryId}
                  isExpanded={expandedCategories.has(categoryId)}
                  onClick={() => handleCategorySelect(categoryId)}
                >
                  <span className="icon">{category.icon}</span>
                  <span className="label">{category.label}</span>
                  <span className="arrow">▶</span>
                </CategoryButton>
                
                <AnimatePresence>
                  {expandedCategories.has(categoryId) && (
                    <SubcategoryList
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {Object.entries(category.children || {}).map(([subId, subcategory]) => (
                        <SubcategoryItem key={subId}>
                          <SubcategoryButton
                            isActive={activeCategory === categoryId && activeSubcategory === subId}
                            onClick={() => handleSubcategorySelect(categoryId, subId)}
                          >
                            <span className="icon">{subcategory.icon}</span>
                            <span className="label">{subcategory.label}</span>
                            <span className="count">{subcategory.features?.length || 0}</span>
                          </SubcategoryButton>
                        </SubcategoryItem>
                      ))}
                    </SubcategoryList>
                  )}
                </AnimatePresence>
              </CategoryItem>
            ))}
          </AnimatePresence>
        </NavigationContent>
      </NavigationContainer>
    </>
  );
};