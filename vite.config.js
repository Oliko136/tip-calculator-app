import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";

export default defineConfig({
    plugins: [imagetools()],
    build: {
        outDir: "dist",
        rollupOptions: {
            output: {
                assetFileNames: "assets/[name].[hash][extname]",
                chunkFileNames: "assets/[name].[hash].js",
                entryFileNames: "assets/[name].[hash].js",
            }
        }
    },
    css: {
        postcss: "./postcss.config.js",
    },
})