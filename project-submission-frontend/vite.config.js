import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import tailwindcss from '@vitejs/plugin-tailwindcss';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),viteCompression(),tailwindcss()],
})
