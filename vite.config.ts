import basicSsl from '@vitejs/plugin-basic-ssl'

export default {
  plugins: [
    basicSsl()
  ],
  build: {
    outDir: './docs'
  },
  base: "/pay-attention/"
}