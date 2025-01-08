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

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/login" element={<Login />} />
				<Route path="/unauthorized" element={<Unauthorized />} />
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
