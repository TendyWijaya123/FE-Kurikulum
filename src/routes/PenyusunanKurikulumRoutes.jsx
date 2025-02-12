import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import ProtectedRoute from "../ProtectedRoute";
import Unauthorized from "../pages/Unauthorized";
import SKSU from "../pages/AnalisisKonsideran/SKSU";
import Users from "../pages/Users/Users";
import CreateUser from "../pages/Users/CreateUser";
import EditUser from "../pages/Users/EditUser";
import Jurusans from "../pages/Jurusans/Jurusans";
import Prodis from "../pages/Prodi/Prodis";
import CreateProdi from "../pages/Prodi/CreateProdi";
import Kurikulums from "../pages/Kurikulum/Kurikulums";
import CreateKurikulum from "../pages/Kurikulum/CreateKurikulum";
import VMT from "../pages/VMT/VMT";
import BenchKurikulums from "../pages/AnalisisKonsideran/BenchKurikulums";
import KKNI from "../pages/AnalisisKonsideran/KKNI";
import MateriPembelajaran from "../pages/MateriPembelajaran";
import Ipteks from "../pages/Ipteks";
import CplPpmVm from "../pages/ModelKonstruksi/CPLPPMVM/CplPpmVm";
import MatriksCplHasIea from "../pages/Matriks/MatriksCplHasIea";
import MatrixCplPpm from "../pages/ModelKonstruksi/MatrixCplPpm/MatrixCplPpm";
import Pengetahuan from "../pages/Pengetahuan";
import TemporaryUnavailable from "../pages/TemporaryUnavailable";
import MataKuliah from "../pages/MataKuliah/MataKuliah";
import MatriksPHasMp from "../pages/Matriks/MatriksPengetahuanHasMp";
import MatrixCplP from "../pages/ModelKonstruksi/MatrixCplP/MatrixCplP";
import MatrixCplMk from "../pages/ModelKonstruksi/MatrixCplMk/MatrixCplMk";
import CreateJurusan from "../pages/CreateJurusan";
import MatriksMpPMk from "../pages/Matriks/MatriksMpPMk";
import DashboardRps from "../pages/PengisianRPS/DashboardRps";
import DosenHasMatkul from "../pages/Dosen/dosenHasMatkul";
import Dosen from "../pages/Dosen/Dosen";

export default function PenyusunanKurikulumRoutes() {
    return (
        <Routes>
				<Route path="/" element={<Login />} />
				<Route path="/login" element={<Login />} />
				<Route path="/unauthorized" element={<Unauthorized />} />
				<Route
					path="/temporary-unavailable"
					element={<TemporaryUnavailable />}
				/>
				<Route path="/coba" element={<Dashboard />} />
				{/* User Pages */}
				<Route
					path="/users"
					element={
						<ProtectedRoute>
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
					path="/cpl-ppm-vm"
					element={
						<ProtectedRoute isProdiRestricted={true}>
							<CplPpmVm />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/matrix-cpl-ppm"
					element={
						<ProtectedRoute>
							<MatrixCplPpm />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/analisis-konsideran/sksu"
					element={
						<ProtectedRoute>
							<SKSU />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/analisis-konsideran/bench-kurikulums"
					element={
						<ProtectedRoute>
							<BenchKurikulums />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/analisis-konsideran/kkni"
					element={
						<ProtectedRoute>
							<KKNI />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/mp"
					element={
						<ProtectedRoute>
							<MateriPembelajaran />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/matriks-cpl-iea"
					element={
						<ProtectedRoute>
							<MatriksCplHasIea />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/matriks-p-mp"
					element={
						<ProtectedRoute>
							<MatriksPHasMp />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/analisis-konsideran/ipteks"
					element={
						<ProtectedRoute>
							<Ipteks />
						</ProtectedRoute>
					}
				/>
				{/* Pengetahuan */}

				<Route
					path="/pengetahuan"
					element={
						<ProtectedRoute>
							<Pengetahuan />
						</ProtectedRoute>
					}
				/>

				{/* Mata Kuliah */}

				<Route
					path="/mata-kuliah"
					element={
						<ProtectedRoute>
							<MataKuliah />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/matrix-cpl-p"
					element={
						<ProtectedRoute>
							<MatrixCplP />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/matriks-p-mp-mk"
					element={
						<ProtectedRoute>
							<MatriksMpPMk />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/matrix-cpl-mk"
					element={
						<ProtectedRoute>
							<MatrixCplMk />
						</ProtectedRoute>
					}
				/>

                <Route
					path="/dosen"
					element={
						<ProtectedRoute>
							<Dosen />
						</ProtectedRoute>
					}
				/>

                <Route
					path="/dosen-pengampu"
					element={
						<ProtectedRoute>
							<DosenHasMatkul />
						</ProtectedRoute>
					}
				/>
			</Routes>
            

    );
}