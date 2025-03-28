import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PenyusunanKurikulumRoutes from "./routes/PenyusunanKurikulumRoutes";
import PengisianRpsRoutes from "./routes/PengisianRpsRoutes";

function App() {
	return (
		<Router>
			<Routes>
				{PenyusunanKurikulumRoutes()}
				{PengisianRpsRoutes()}
			</Routes>
		</Router>
	);
}

export default App;
