import { defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({

   resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components":`${path.resolve(__dirname, "./src/components/")}`,
        "@assets":`${path.resolve(__dirname, "./src/assets/")}`,
        "@pages":`${path.resolve(__dirname, "./src/pages/")}`,
        "@utils":`${path.resolve(__dirname, "./src/utils")}`,
        "@generatedTypes":`${path.resolve(__dirname,"./src/__generated_types")}`,
      },
    },

   plugins: [react()],
})