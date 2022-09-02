import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  outDir: '../../dist/apps/drun-web-client',
  integrations: [svelte(), tailwind()],
});
