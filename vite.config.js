import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
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
        }),
        tailwindcss(),
    ],
    resolve: {
        alias: [
            {
                find: /^~\/(.*)/,
                replacement: resolve(__dirname, "src/$1"),
            },
        ],
    },
});
