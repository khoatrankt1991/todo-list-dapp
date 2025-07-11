import { defineConfig } from 'vitest/config';

export default defineConfig(async () => {
  const react = (await import('@vitejs/plugin-react')).default;
  const path = await import('path');
  return {
    plugins: [react()],
    test: {
      environment: 'jsdom',
      setupFiles: ['./test/setup.ts'],
      globals: true,
      css: false,
      coverage: {
        exclude: [
          'out/**', // ignore out directory
          'dist/**', // ignore dist directory
          '.next/**',
          'node_modules/**',
          'test/**',
          '**/*.test.ts',
          '**/*.test.tsx',
          'next.config.ts',
          'postcss.config.mjs',
          'eslint.config.mjs',
          'next-env.d.ts',
          'next.config.mjs',
          'tsconfig.json',
          'tsconfig.build.json',
          'tsconfig.node.json',
          'tsconfig.app.json',
          'tsconfig.base.json',
          'vitest.config.ts',
          'package.json',
          'package-lock.json',
          '*.md',
        ],
      },
    },
    // css: {
    //   postcss: 'false',
    // },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // css: false,
  };
});
