import path from 'node:path'
import url from 'node:url'
import { defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

const resolve = (subPath: string) => path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), subPath)

export default defineConfig({
  ...viteConfig,
  test: {
    globals: true,
    testTimeout: 4000,
    setupFiles: 'src/setupTests.ts',
    environment: 'happy-dom',
    include: [
      '**/__tests__/**/*.{ts,tsx}',
      '**/*.{spec,test}.{ts,tsx}',
    ],
    alias: {
      '**/*.(css|sass|scss)$': resolve('./scripts/test-mock/mock-css.js'),
      '**/*.(jpg|svg)$': resolve('./scripts/test-mock/mock-file.js'),
    },
    coverage: {
      provider: 'c8',
      perFile: true,
      branches: -10,
      functions: -5,
      statements: -15,
      lines: -20,
      include: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.{form,context}.ts?(x)',
        '!src/services/{index,api}.ts',
        '!src/constants/**',
        '!src/{index,App}.tsx',
        '!src/{appMenu,serviceWorker,fixtures}.ts',
      ],
    },
  },
})
