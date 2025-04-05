import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),],
  server:{
    proxy:{
      "/api/":"http://localhost:3080",
      "/uploads/":"http://localhost:3080",
    },
  },
});
