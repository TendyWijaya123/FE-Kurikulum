import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dosen from "../pages/Dosen/Dosen";
import ProtectedRoute from "../ProtectedRoute";
import BukuReferensi from "../pages/BukuReferensi/BukuReferensi";
import ReferensiMataKuliah from "../pages/ReferensiMataKuliah/ReferensiMataKuliah";
import MataKuliahPengampu from "../pages/DosenPages/RPS/MataKuliahPengampu";
import Rps from "../pages/DosenPages/RPS/Rps";

export default function PengisianRpsRoutes() {
	return (
		<Routes>
			<Route
				path="/buku-referensi"
				element={
					<ProtectedRoute>
						<BukuReferensi />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/referensi-mata-kuliah"
				element={
					<ProtectedRoute>
						<ReferensiMataKuliah />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/mata-kuliah-pengampu"
				element={
					<ProtectedRoute>
						<MataKuliahPengampu />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/rps/:mata_kuliah_id"
				element={
					<ProtectedRoute>
						<Rps />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}
