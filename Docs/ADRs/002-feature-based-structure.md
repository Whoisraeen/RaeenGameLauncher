# ADR-002: Feature-Based Project Structure

## Status
Accepted

## Context

Raeen Launcher will have 150+ features across multiple domains (game management, performance optimization, social features, streaming tools, etc.). The project structure needs to:

- Support independent feature development
- Enable code reusability and maintainability
- Allow for team scalability
- Facilitate feature toggles and A/B testing
- Support potential marketplace/plugin system

### Structure Options Considered

1. **Traditional Layer-Based Structure**
   ```
   src/
   ├── components/
   ├── services/
   ├── utils/
   └── types/
   ```

2. **Domain-Driven Design**
   ```
   src/
   ├── game-management/
   ├── performance/
   └── social/
   ```

3. **Feature-Based Structure**
   ```
   src/
   ├── features/
   │   ├── gameLibrary/
   │   ├── performance/
   │   └── social/
   └── shared/
   ```

## Decision

We will use a **Feature-Based Project Structure** with shared components and utilities.

### Structure Implementation

```
src/renderer/
├── features/           # Feature modules
│   ├── gameLibrary/    # Game management
│   ├── performance/    # Performance tools
│   ├── modding/        # Mod management
│   ├── streaming/      # Creator tools
│   ├── social/         # Community features
│   ├── customization/  # Theming & UI
│   ├── analytics/      # Data & insights
│   ├── competitive/    # Esports tools
│   └── utilities/      # Gaming utilities
├── shared/             # Shared code
│   ├── components/     # Reusable components
│   ├── hooks/          # Custom hooks
│   ├── services/       # Shared services
│   ├── utils/          # Utility functions
│   ├── types/          # Type definitions
│   └── constants/      # App constants
└── store/              # Global state
```

### Feature Module Structure

Each feature follows this pattern:
```
features/[featureName]/
├── components/         # Feature-specific components
├── hooks/              # Feature-specific hooks
├── services/           # Business logic
├── types/              # Type definitions
├── utils/              # Feature utilities
├── constants/          # Feature constants
└── index.ts            # Public API
```

## Consequences

### Positive

- **Independent Development**: Teams can work on features without conflicts
- **Clear Boundaries**: Well-defined feature boundaries prevent coupling
- **Reusability**: Shared components and utilities promote code reuse
- **Scalability**: Easy to add new features and scale team
- **Testing**: Features can be tested in isolation
- **Code Splitting**: Natural boundaries for lazy loading
- **Maintenance**: Easier to locate and modify feature-specific code
- **Plugin Architecture**: Structure supports future plugin system

### Negative

- **Initial Overhead**: More complex initial setup
- **Shared Code Management**: Need to carefully manage shared dependencies
- **Feature Communication**: Need clear patterns for inter-feature communication
- **Duplication Risk**: Risk of duplicating code instead of creating shared utilities

### Implementation Guidelines

1. **Feature Independence**: Features should be self-contained with minimal dependencies
2. **Shared First**: Common functionality goes in shared modules
3. **Public APIs**: Features expose clean, documented APIs through index.ts
4. **Cross-Feature Communication**: Use Redux store or event system for feature communication
5. **Naming Conventions**: Consistent naming patterns across all features
6. **Documentation**: Each feature maintains its own README and documentation

### Migration Path

- Start with core features (gameLibrary, performance, settings)
- Gradually extract shared components and utilities
- Implement feature loading system for dynamic imports
- Create tooling to analyze feature dependencies and coupling

This structure supports the massive scope of Raeen Launcher while maintaining code quality and developer productivity.