import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import restart from 'vite-plugin-restart'

// https://vite.dev/config/
export default defineConfig({
  server:
  {host: true},
  plugins: [react(), restart({ restart: [ '../public/**', ] })],
})
