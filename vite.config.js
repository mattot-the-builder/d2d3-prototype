import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import path from "path";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/css/app.css",
                "resources/js/app.js",
                "./resources/**/*.blade.php",
                "./resources/**/*.js",
                "./resources/**/*.vue",
            ],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            "~fabric": path.resolve(__dirname, "node_modules/fabric"),
            "~three": path.resolve(__dirname, "node_modules/three"),
        },
    },
});
