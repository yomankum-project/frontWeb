import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      // https: true,
      proxy: {
        '/yomankum': {
          target: process.env.VITE_ENDPOINT,
          changeOrigin: true,
          secure: true,
          // rewrite: (path) => path.replace(/^\/api/, ''),
          // agent: new https.Agent(),
          // ws: true
        }
      }
    }
  })
}