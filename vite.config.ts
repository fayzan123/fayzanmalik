import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    cssTarget: ['chrome87', 'safari14', 'firefox78', 'edge88'],
  },
});
