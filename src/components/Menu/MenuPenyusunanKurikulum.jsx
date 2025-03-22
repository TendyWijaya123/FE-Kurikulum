import {
	Dashboard,
	People,
	School,
	Class,
	MenuBook,
	AccountTree,
	Assignment,
	AdminPanelSettings,
	PersonAdd,
	Lock,
	VerifiedUser,
	Assessment,
	BarChart,
	Science,
	Analytics,
	TableChart,
	ImportContacts,
} from "@mui/icons-material";
import MenuItemSidebar from "./MenuItemSidebar";
import VisibleMenu from "./VisibleMenu";
import React, { useState, useEffect } from "react";
import { DotChartOutlined } from "@ant-design/icons";
const MenuPenyusunanKurikulum = () => {
	const [openMenu, setOpenMenu] = useState(null);

	useEffect(() => {
		const savedMenu = localStorage.getItem("openMenu");
		if (savedMenu) {
			setOpenMenu(savedMenu);
		}
	}, []);

	const handleMenuToggle = (menuId) => {
		const newOpenMenu = openMenu === menuId ? null : menuId;
		setOpenMenu(newOpenMenu);
		if (newOpenMenu) {
			localStorage.setItem("openMenu", newOpenMenu);
		} else {
			localStorage.removeItem("openMenu");
		}
	};

	return (
		<>
			{/* Dashboard */}

			<VisibleMenu allowedRoles={["P2MPP"]}>
				<MenuItemSidebar
					url="/dashboard"
					title="Dashboard"
					icon={<Dashboard />}
					isOpen={openMenu === "dashboard"}
					onToggle={() => handleMenuToggle("dashboard")}></MenuItemSidebar>
				{/* Users */}
				<MenuItemSidebar
					title="Users"
					icon={<People />}
					isOpen={openMenu === "users"}
					onToggle={() => handleMenuToggle("users")}>
					<MenuItemSidebar url="/users" title="Users" icon={<People />} />
					<MenuItemSidebar
						url="/user/create"
						title="Create User"
						icon={<PersonAdd />}
					/>
				</MenuItemSidebar>

				{/* Jurusan */}
				<MenuItemSidebar
					title="Jurusan"
					icon={<School />}
					isOpen={openMenu === "jurusan"}
					onToggle={() => handleMenuToggle("jurusan")}>
					<MenuItemSidebar url="/jurusans" title="Jurusan" icon={<School />} />
					<MenuItemSidebar
						url="/jurusans/create"
						title="Create Jurusan"
						icon={<School />}
					/>
				</MenuItemSidebar>

				{/* Prodi */}
				<MenuItemSidebar
					title="Prodi"
					icon={<Class />}
					isOpen={openMenu === "prodi"}
					onToggle={() => handleMenuToggle("prodi")}>
					<MenuItemSidebar url="/prodis" title="Prodi" icon={<Class />} />
					<MenuItemSidebar
						url="/prodis/create"
						title="Create Prodi"
						icon={<Class />}
					/>
				</MenuItemSidebar>

				{/* Kurikulum */}
				<MenuItemSidebar
					title="Kurikulum"
					icon={<MenuBook />}
					isOpen={openMenu === "kurikulums"}
					onToggle={() => handleMenuToggle("kurikulums")}>
					<MenuItemSidebar
						url="/kurikulums"
						title="Kurikulum"
						icon={<MenuBook />}
					/>
					<MenuItemSidebar
						url="/kurikulum/create"
						title="Create Kurikulum"
						icon={<MenuBook />}
					/>
				</MenuItemSidebar>
			</VisibleMenu>

			{/* Analisis Konsideran Page */}
			<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
				<MenuItemSidebar
						url="/dashboard-penyusun-kurikulum"
						title="Dashboard"
						icon={<Dashboard />}
						isOpen={openMenu === "dashboard"}
						onToggle={() => handleMenuToggle("dashboard")}></MenuItemSidebar>
			</VisibleMenu>
			<MenuItemSidebar
				title="Analisis Konsideran"
				icon={<Analytics />}
				isOpen={openMenu === "analisisKonsideran"}
				onToggle={() => handleMenuToggle("analisisKonsideran")}>
				<MenuItemSidebar
					url="/analisis-konsideran/sksu"
					title="SKSU"
					icon={<Assessment />}
				/>
				<MenuItemSidebar
					url="/analisis-konsideran/bench-kurikulums"
					title="BenchKurikulums"
					icon={<BarChart />}
				/>
				<MenuItemSidebar
					url="/analisis-konsideran/ipteks"
					title="IPTEKS"
					icon={<Science />}
				/>
				<MenuItemSidebar
					url="/analisis-konsideran/kkni"
					title="KKNI"
					icon={<School />}
				/>
			</MenuItemSidebar>

			{/* Model dan Konstruksi Prauji */}
			<MenuItemSidebar
				title="Model Konstruksi"
				icon={<AccountTree />}
				isOpen={openMenu === "modelKonstruksi"}
				onToggle={() => handleMenuToggle("modelKonstruksi")}>
				<MenuItemSidebar url="/vmt" title="VMT" icon={<AccountTree />} />
				<MenuItemSidebar
					url="/cpl-ppm-vm"
					title="CPL-PPM-VM"
					icon={<AccountTree />}
				/>
				<MenuItemSidebar
					url="/matrix-cpl-ppm"
					title="Matriks CPL-PPM"
					icon={<TableChart />}
				/>
				<MenuItemSidebar
					url="/matriks-cpl-iea"
					title="Matriks CPL IEA"
					icon={<TableChart />}
				/>
				<MenuItemSidebar
					url="/matrix-cpl-p"
					title="Matriks CPL-P"
					icon={<TableChart />}
				/>

				<MenuItemSidebar
					url="/peta-kompetensi"
					title="Peta Kompetensi"
					icon={<TableChart />}
				/>
			</MenuItemSidebar>

			{/* Pengetahuan Page */}
			<MenuItemSidebar
				title="Matriks P-MP-MK"
				icon={<TableChart />}
				isOpen={openMenu === "Matriks P-MP-MK"}
				onToggle={() => handleMenuToggle("Matriks P-MP-MK")}>
				<MenuItemSidebar
					url="/pengetahuan"
					title="Pengetahuan"
					icon={<MenuBook />}
				/>
				<MenuItemSidebar
					url="/mp"
					title="Materi Pembelajaran"
					icon={<ImportContacts />}
				/>

				<MenuItemSidebar
					url="/mata-kuliah"
					title="MataKuliah"
					icon={<Assignment />}
				/>

				<MenuItemSidebar
					url="/matriks-p-mp"
					title="Matriks P-MP"
					icon={<TableChart />}
				/>
				<MenuItemSidebar
					url="/matriks-p-mp-mk"
					title="Matriks P-MP-MK"
					icon={<TableChart />}
				/>

				<MenuItemSidebar
					url="/jejaring-matakuliah"
					title="Jejaring Mata Kuliah"
					icon={<DotChartOutlined />}
				/>
			</MenuItemSidebar>

			<MenuItemSidebar
				url="/matrix-cpl-mk"
				title="Matriks CPL-MK"
				icon={<TableChart />}
			/>

			<MenuItemSidebar
				title="Dosen Pengampu"
				icon={<Assignment />}
				url="/dosen-pengampu"></MenuItemSidebar>

			<MenuItemSidebar
				title="Export"
				icon={<Assignment />}
				isOpen={openMenu === "Export"}
				onToggle={() => handleMenuToggle("Export")}>
				<MenuItemSidebar
					url="/export-penyusunan-kurikulum"
					title="Export Penyusunan Kurikulum"
					icon={<TableChart />}
				/>
			</MenuItemSidebar>
		</>
	);
};

export default MenuPenyusunanKurikulum;
