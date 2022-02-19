import { resolve } from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

export default defineConfig({
    // root: "src",
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html')
            }
        }
    },
    plugins: [
        checker({ typescript: true })
    ]
});
