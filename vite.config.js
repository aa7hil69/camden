import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      proxy: {
        "/api/events": {
          target: env.VITE_EVENTS_API_URL,
          changeOrigin: true,
          rewrite: (p) => {
            const url = new URL(p, "http://dummy");
            url.searchParams.set("key", env.VITE_EVENTS_API_KEY);
            return url.pathname.replace(/^\/api\/events/, "") + url.search;
          },
        },
        "/api/clients": {
          target: env.VITE_CLIENTS_API_URL,
          changeOrigin: true,
          rewrite: (p) => {
            const url = new URL(p, "http://dummy");
            url.searchParams.set("key", env.VITE_CLIENTS_API_KEY);
            return url.pathname.replace(/^\/api\/clients/, "") + url.search;
          },
        },
        "/api/galleries": {
          target: env.VITE_GALLERIES_API_URL,
          changeOrigin: true,	
          rewrite: (p) => {
            const url = new URL(p, "http://dummy");
            url.searchParams.set("key", env.VITE_GALLERIES_API_KEY);
            return url.pathname.replace(/^\/api\/galleries/, "") + url.search;
          },
        },
      },
    },
  };
});