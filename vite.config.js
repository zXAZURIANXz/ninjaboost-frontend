import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
	server: {
    allowedHosts: [
      '3bd5-189-188-163-182.ngrok-free.app' // Agrega aquí el host de ngrok
    ]
  },
  optimizeDeps: {
    exclude: ['flowbite-react']
  }
})
