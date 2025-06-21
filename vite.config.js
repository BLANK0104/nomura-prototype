import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// https://vitejs.dev/config/
export default defineConfig(function (_a) {
    var command = _a.command;
    return ({
        plugins: [react()],
        base: command === 'build' ? '/nomura-prototype/' : '/',
        build: {
            outDir: 'dist',
            assetsDir: 'assets',
            sourcemap: false,
        },
    });
});
