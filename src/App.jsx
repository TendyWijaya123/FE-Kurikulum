import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PenyusunanKurikulumRoutes from "./routes/PenyusunanKurikulumRoutes";
import PengisianRpsRoutes from "./routes/PengisianRpsRoutes";
import { useEffect, useContext } from "react";
import { AppDataContext } from "./context/AppDataProvider";
import { AuthContext } from "./context/AuthProvider";

function App() {
	const { fetchCurrendKurikulum } = useContext(AppDataContext);
  	const { user } = useContext(AuthContext);
	useEffect(() => {
		if((!Array.isArray(user?.roles)) !== true) {
			if (user && !user?.roles.includes("P2MPP")) {
				fetchCurrendKurikulum();
			}
		}
	}, [user]);

	return (
		<Router basename="/kurikulum">
			<Routes>
				{PenyusunanKurikulumRoutes()}
				{PengisianRpsRoutes()}
			</Routes>
		</Router>
	);
}

export default App;
