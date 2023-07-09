import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Enable HTTPS
    https: true,
    // Set the port to 3000
    port: 3000,
  },
})
