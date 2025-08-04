import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isServe = command === 'serve'
  const isBuild = command === 'build'
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG

  return {
    plugins: [
      react(),
      electron([
        {
          // Main process entry point
          entry: 'src/main/index.ts',
          onstart(options) {
            if (process.env.VSCODE_DEBUG) {
              console.log('[startup] Electron App')
            } else {
              options.startup()
            }
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: 'dist/main',
              rollupOptions: {
                external: ['electron']
              }
            }
          }
        },
        {
          // Preload scripts
          entry: 'src/preload/index.ts',
          onstart(options) {
            // Notify the Renderer process to reload the page when the Preload scripts build is complete
            options.reload()
          },
          vite: {
            build: {
              sourcemap: sourcemap ? 'inline' : false,
              minify: isBuild,
              outDir: 'dist/preload',
              rollupOptions: {
                external: ['electron']
              }
            }
          }
        }
      ]),
      // Use Node.js API in the Renderer process
      renderer()
    ],
    
    // Renderer process configuration
    root: resolve(__dirname, 'src/renderer'),
    publicDir: resolve(__dirname, 'src/renderer/assets'),
    
    build: {
      outDir: resolve(__dirname, 'dist/renderer'),
      emptyOutDir: true,
      sourcemap,
      minify: isBuild,
      rollupOptions: {
        input: resolve(__dirname, 'src/renderer/index.html')
      }
    },
    
    server: {
      port: 5173,
      host: 'localhost',
      strictPort: true
    },
    
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src/renderer'),
        '@main': resolve(__dirname, 'src/main'),
        '@preload': resolve(__dirname, 'src/preload'),
        '@shared': resolve(__dirname, 'src/renderer/shared'),
        '@features': resolve(__dirname, 'src/renderer/features'),
        '@components': resolve(__dirname, 'src/renderer/shared/components'),
        '@hooks': resolve(__dirname, 'src/renderer/shared/hooks'),
        '@utils': resolve(__dirname, 'src/renderer/shared/utils'),
        '@types': resolve(__dirname, 'src/renderer/shared/types'),
        '@services': resolve(__dirname, 'src/renderer/shared/services'),
        '@store': resolve(__dirname, 'src/renderer/store'),
        '@assets': resolve(__dirname, 'src/renderer/assets')
      }
    },
    
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __APP_NAME__: JSON.stringify(process.env.npm_package_name)
    },
    
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@reduxjs/toolkit',
        'react-redux',
        'framer-motion',
        'lucide-react'
      ]
    },
    
    css: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer')
        ]
      }
    },
    
    esbuild: {
      // Remove console logs in production
      drop: isBuild ? ['console', 'debugger'] : []
    }
  }
})