import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import { SelectionProvider } from "./context/SelectionContext";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<SelectionProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</SelectionProvider>
	</StrictMode>
);
