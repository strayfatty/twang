import { resolve } from "node:path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

export default defineConfig({
    root: "site",
    build: {
        target: "es2020",
        outDir: resolve(__dirname, "dist"),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, "site/index.html"),
                signin_complete: resolve(
                    __dirname,
                    "site/signin-complete/index.html",
                ),
            },
        },
    },
    plugins: [
        checker({
            typescript: true,
            biome: { command: "check" },
        }),
    ],
    resolve: {
        alias: [
            {
                find: /^components\/(.*)/,
                replacement: resolve(__dirname, "src/components/$1"),
            },
            {
                find: /^lib\/(.*)/,
                replacement: resolve(__dirname, "src/lib/$1"),
            },
            {
                find: /^pages\/(.*)/,
                replacement: resolve(__dirname, "src/pages/$1"),
            },
        ],
    },
});
