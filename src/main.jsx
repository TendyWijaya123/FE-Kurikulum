import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import { SelectionProvider } from "./context/SelectionContext";
import ProdiProvider from "./context/ProdiProvider.jsx";
import { NotifikasiChatProvider } from "./context/notifikasiChatProvider.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
			<SelectionProvider>
				<AuthProvider>
					<NotifikasiChatProvider>
						<ProdiProvider>
							<App />
						</ProdiProvider>
					</NotifikasiChatProvider>
				</AuthProvider>
			</SelectionProvider>
	</StrictMode>
);
