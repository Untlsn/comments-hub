import solidPlugin from 'vite-plugin-solid'
import ssr from 'vite-plugin-ssr/plugin'
import WindiCSS from 'vite-plugin-windicss';
import { UserConfig } from 'vite'
import path from 'path';

export default {
  plugins: [
    solidPlugin({ ssr: true }),
    ssr(),
    WindiCSS(),
  ],
  build: {
    polyfillDynamicImport: false,
  },
  resolve: {
    alias: {
      '$': path.resolve(__dirname, 'src'),
    }
  }
} as UserConfig
