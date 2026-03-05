// vite.config.ts
import { defineConfig } from "file:///C:/Users/numon/Downloads/mun-main/mun-main/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/numon/Downloads/mun-main/mun-main/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { componentTagger } from "file:///C:/Users/numon/Downloads/mun-main/mun-main/node_modules/lovable-tagger/dist/index.js";
import { visualizer } from "file:///C:/Users/numon/Downloads/mun-main/mun-main/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import viteCompression from "file:///C:/Users/numon/Downloads/mun-main/mun-main/node_modules/vite-plugin-compression/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\numon\\Downloads\\mun-main\\mun-main";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" && visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true
    }),
    viteCompression({
      algorithm: "gzip",
      filter: /\.(js|css|html|svg)$/
    }),
    viteCompression({
      algorithm: "brotliCompress",
      filter: /\.(js|css|html|svg)$/
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    target: "es2015",
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": ["@radix-ui/react-accordion", "@radix-ui/react-dialog", "@radix-ui/react-label", "@radix-ui/react-slot", "@radix-ui/react-tabs", "class-variance-authority", "clsx", "tailwind-merge"],
          "animation-vendor": ["framer-motion", "react-countup", "react-intersection-observer"]
        }
      }
    },
    cssCodeSplit: true,
    cssMinify: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxudW1vblxcXFxEb3dubG9hZHNcXFxcbXVuLW1haW5cXFxcbXVuLW1haW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG51bW9uXFxcXERvd25sb2Fkc1xcXFxtdW4tbWFpblxcXFxtdW4tbWFpblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbnVtb24vRG93bmxvYWRzL211bi1tYWluL211bi1tYWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgY29tcG9uZW50VGFnZ2VyIH0gZnJvbSBcImxvdmFibGUtdGFnZ2VyXCI7XG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSBcInJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiO1xuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbic7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiBcIjo6XCIsXG4gICAgcG9ydDogODA4MCxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgbW9kZSA9PT0gJ2RldmVsb3BtZW50JyAmJiBjb21wb25lbnRUYWdnZXIoKSxcbiAgICBtb2RlID09PSAncHJvZHVjdGlvbicgJiYgdmlzdWFsaXplcih7XG4gICAgICBvcGVuOiBmYWxzZSxcbiAgICAgIGd6aXBTaXplOiB0cnVlLFxuICAgICAgYnJvdGxpU2l6ZTogdHJ1ZSxcbiAgICB9KSxcbiAgICB2aXRlQ29tcHJlc3Npb24oe1xuICAgICAgYWxnb3JpdGhtOiAnZ3ppcCcsXG4gICAgICBmaWx0ZXI6IC9cXC4oanN8Y3NzfGh0bWx8c3ZnKSQvLFxuICAgIH0pLFxuICAgIHZpdGVDb21wcmVzc2lvbih7XG4gICAgICBhbGdvcml0aG06ICdicm90bGlDb21wcmVzcycsXG4gICAgICBmaWx0ZXI6IC9cXC4oanN8Y3NzfGh0bWx8c3ZnKSQvLFxuICAgIH0pLFxuICBdLmZpbHRlcihCb29sZWFuKSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIHRhcmdldDogJ2VzMjAxNScsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgICdyZWFjdC12ZW5kb3InOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC1yb3V0ZXItZG9tJ10sXG4gICAgICAgICAgJ3VpLXZlbmRvcic6IFsnQHJhZGl4LXVpL3JlYWN0LWFjY29yZGlvbicsICdAcmFkaXgtdWkvcmVhY3QtZGlhbG9nJywgJ0ByYWRpeC11aS9yZWFjdC1sYWJlbCcsICdAcmFkaXgtdWkvcmVhY3Qtc2xvdCcsICdAcmFkaXgtdWkvcmVhY3QtdGFicycsICdjbGFzcy12YXJpYW5jZS1hdXRob3JpdHknLCAnY2xzeCcsICd0YWlsd2luZC1tZXJnZSddLFxuICAgICAgICAgICdhbmltYXRpb24tdmVuZG9yJzogWydmcmFtZXItbW90aW9uJywgJ3JlYWN0LWNvdW50dXAnLCAncmVhY3QtaW50ZXJzZWN0aW9uLW9ic2VydmVyJ10sXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSxcbiAgICBjc3NNaW5pZnk6IHRydWUsXG4gICAgbWluaWZ5OiAndGVyc2VyJyxcbiAgICB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICBjb21wcmVzczoge1xuICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXG4gICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgb3V0RGlyOiAnZGlzdCcsXG4gICAgZW1wdHlPdXREaXI6IHRydWUsXG4gICAgc291cmNlbWFwOiBmYWxzZSxcbiAgfVxufSkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0VCxTQUFTLG9CQUFvQjtBQUN6VixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsdUJBQXVCO0FBQ2hDLFNBQVMsa0JBQWtCO0FBQzNCLE9BQU8scUJBQXFCO0FBTDVCLElBQU0sbUNBQW1DO0FBUXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFNBQVMsaUJBQWlCLGdCQUFnQjtBQUFBLElBQzFDLFNBQVMsZ0JBQWdCLFdBQVc7QUFBQSxNQUNsQyxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixZQUFZO0FBQUEsSUFDZCxDQUFDO0FBQUEsSUFDRCxnQkFBZ0I7QUFBQSxNQUNkLFdBQVc7QUFBQSxNQUNYLFFBQVE7QUFBQSxJQUNWLENBQUM7QUFBQSxJQUNELGdCQUFnQjtBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFBLElBQ1YsQ0FBQztBQUFBLEVBQ0gsRUFBRSxPQUFPLE9BQU87QUFBQSxFQUNoQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsVUFDWixnQkFBZ0IsQ0FBQyxTQUFTLGFBQWEsa0JBQWtCO0FBQUEsVUFDekQsYUFBYSxDQUFDLDZCQUE2QiwwQkFBMEIseUJBQXlCLHdCQUF3Qix3QkFBd0IsNEJBQTRCLFFBQVEsZ0JBQWdCO0FBQUEsVUFDbE0sb0JBQW9CLENBQUMsaUJBQWlCLGlCQUFpQiw2QkFBNkI7QUFBQSxRQUN0RjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxjQUFjO0FBQUEsSUFDZCxXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxlQUFlO0FBQUEsTUFDakI7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsSUFDUixhQUFhO0FBQUEsSUFDYixXQUFXO0FBQUEsRUFDYjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
