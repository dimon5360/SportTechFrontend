import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
          target: 'https://localhost:40401',
          secure: false,
        },
    },
    https: {
      key: '/home/dmitry/Projects/SportTechService/SportTechCredentials/private.key',
      cert: '/home/dmitry/Projects/SportTechService/SportTechCredentials/server.crt',
    }
},
})
