import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PenyusunanKurikulumRoutes from "./routes/PenyusunanKurikulumRoutes";
import PengisianRpsRoutes from "./routes/PengisianRpsRoutes";

function App() {
	return (
		<Router>
			<PenyusunanKurikulumRoutes />
			<PengisianRpsRoutes />
		</Router>
	);
}

export default App;
