import { defineConfig } from "vite";
import { uglify } from "rollup-plugin-uglify";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), uglify()],
});
