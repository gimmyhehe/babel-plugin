import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import plugin from '@opentiny/vite-plugin-generate-comments'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), plugin()],
})
