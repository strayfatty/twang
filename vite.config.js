import { resolve } from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

export default defineConfig({
    root: "site",
    build: {
        target: "es2020",
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'site/index.html'),
                signin_complete: resolve(__dirname, 'site/signin-complete/index.html')
            }
        }
    },
    plugins: [
        checker({ typescript: true })
    ],
    resolve: {
        alias: [
            { find: /^Shared\/(.*)/, replacement: resolve(__dirname, "src/Shared/$1") },
            { find: /^Pages\/(.*)/, replacement: resolve(__dirname, "src/Pages/$1") },
            { find: /^Twitch\/(.*)/, replacement: resolve(__dirname, "src/Twitch/$1") }
        ]
    }
});
