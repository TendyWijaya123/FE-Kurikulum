import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import SKSU from "./pages/SKSU";
import Users from "./pages/Users/Users";
import CreateUser from "./pages/Users/CreateUser";
import EditUser from "./pages/Users/EditUser";
import Jurusans from "./pages/Jurusans/Jurusans";
import CreateJurusan from "./pages/Jurusans/CreateJurusan";
import Prodis from "./pages/Prodi/Prodis";
import CreateProdi from "./pages/Prodi/CreateProdi";
import Kurikulums from "./pages/Kurikulum.jsx/Kurikulums";
import CreateKurikulum from "./pages/Kurikulum.jsx/CreateKurikulum";
import VMT from "./pages/VMT/VMT";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/login" element={<Login />} />
				<Route path="/unauthorized" element={<Unauthorized />} />
				<Route path="/coba" element={<Dashboard />} />
				{/* User Pages */}
				<Route
					path="/users"
					element={
						<ProtectedRoute requiredPermission="view-users">
							<Users />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/user/create"
					element={
						<ProtectedRoute>
							<CreateUser />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/user/edit/:userId"
					element={
						<ProtectedRoute>
							<EditUser />
						</ProtectedRoute>
					}
				/>

				{/* Jurusan */}
				<Route
					path="/jurusans"
					element={
						<ProtectedRoute>
							<Jurusans />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/jurusans/create"
					element={
						<ProtectedRoute>
							<CreateJurusan />
						</ProtectedRoute>
					}
				/>

				{/* Prodi */}
				<Route
					path="/prodis"
					element={
						<ProtectedRoute>
							<Prodis />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/prodis/create"
					element={
						<ProtectedRoute>
							<CreateProdi />
						</ProtectedRoute>
					}
				/>

				{/* Kurikulum */}

				<Route
					path="/kurikulums"
					element={
						<ProtectedRoute>
							<Kurikulums />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/kurikulum/create"
					element={
						<ProtectedRoute>
							<CreateKurikulum />
						</ProtectedRoute>
					}
				/>

				{/* VMT */}

				<Route
					path="/vmt"
					element={
						<ProtectedRoute>
							<VMT />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute requiredPermission="view-dashboard">
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/analisis-konsideran/sksu"
					element={
						<ProtectedRoute requiredPermission="view-lala">
							<SKSU />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
