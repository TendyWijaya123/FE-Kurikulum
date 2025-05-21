import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	base: "/kurikulum/",
	plugins: [react()],
	server: {
		port: parseInt(process.env.VITE_PORT) || 5173, 
	},
});
