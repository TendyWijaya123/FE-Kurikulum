import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import { SelectionProvider } from "./context/SelectionContext";
import AppDataProvider from "./context/AppDataProvider.jsx";
import { NotifikasiChatProvider } from "./context/notifikasiChatProvider.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
			<SelectionProvider>
				<AuthProvider>
					<NotifikasiChatProvider>
						<AppDataProvider>
							<App />
						</AppDataProvider>
					</NotifikasiChatProvider>
				</AuthProvider>
			</SelectionProvider>
	</StrictMode>
);
