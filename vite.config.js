import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import {
  sendContactMail,
  validateContactPayload,
} from "./api/_lib/sendContactMail.js";

function readRequestJson(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

function contactDevPlugin(mailEnv) {
  return {
    name: "contact-api-dev",
    configureServer(server) {
      server.middlewares.use("/api/contact", async (req, res, next) => {
        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.end();
          return;
        }
        if (req.method !== "POST") {
          next();
          return;
        }

        res.setHeader("Content-Type", "application/json");

        try {
          const body = await readRequestJson(req);
          const validated = validateContactPayload(body);
          if (!validated.ok) {
            res.statusCode = validated.status;
            res.end(JSON.stringify({ ok: false, error: validated.error }));
            return;
          }

          await sendContactMail(validated.fields, mailEnv);
          res.statusCode = 200;
          res.end(JSON.stringify({ ok: true }));
        } catch (err) {
          console.error("Contact API error:", err?.message || err);
          res.statusCode = err?.status || 500;
          res.end(
            JSON.stringify({ ok: false, error: "Unable to send message" })
          );
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd(), "VITE_");
  const mailEnv = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss(), contactDevPlugin(mailEnv)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      proxy: {
        "/api/events": {
          target: viteEnv.VITE_EVENTS_API_URL,
          changeOrigin: true,
          rewrite: () => `/API/events?key=${viteEnv.VITE_EVENTS_API_KEY}`,
        },
        "/api/clients": {
          target: viteEnv.VITE_CLIENTS_API_URL,
          changeOrigin: true,
          rewrite: () => `/API/clients?key=${viteEnv.VITE_CLIENTS_API_KEY}`,
        },
        "/api/gallery": {
          target: viteEnv.VITE_GALLERIES_API_URL,
          changeOrigin: true,
          rewrite: () => `/API/gallery?key=${viteEnv.VITE_GALLERIES_API_KEY}`,
        },
      },
    },
  };
});
