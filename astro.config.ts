// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://www.legacymovingdenver.com",
  output: "server", // Enable server mode for API routes
  adapter: vercel(), // Add Vercel adapter for serverless functions
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
