import { DashboardCustomize } from "@mui/icons-material";
import MenuItemSidebar from "./MenuItemSidebar";
import VisibleMenu from "./VisibleMenu";
import React, { useState, useEffect } from "react";

const MenuSidebar = () => {
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
		<ul>
			{/* Dashboard */}
			<MenuItemSidebar
				url="/dashboard"
				title="Dashboard"
				icon={<DashboardCustomize />}
				isOpen={openMenu === "dashboard"}
				onToggle={() => handleMenuToggle("dashboard")}>
				<MenuItemSidebar
					url="/dashboard/overview"
					title="Overview"
					icon={<DashboardCustomize />}>
					<MenuItemSidebar
						url="/dashboard/stats"
						title="Stats"
						icon={<DashboardCustomize />}
					/>
				</MenuItemSidebar>
				<MenuItemSidebar
					url="/dashboard/stats"
					title="Stats"
					icon={<DashboardCustomize />}
				/>
			</MenuItemSidebar>

			{/* Users */}
			<VisibleMenu requiredPermission="view-users">
				<MenuItemSidebar
					title="Users"
					icon={<DashboardCustomize />}
					isOpen={openMenu === "users"}
					onToggle={() => handleMenuToggle("users")}>
					<MenuItemSidebar
						url="/users"
						title="Users"
						icon={<DashboardCustomize />}
					/>
					<VisibleMenu>
						<MenuItemSidebar
							url="/user/create"
							title="Create User"
							icon={<DashboardCustomize />}
						/>
					</VisibleMenu>
				</MenuItemSidebar>
			</VisibleMenu>

			{/* Jurusan */}
			<MenuItemSidebar
				title="Jurusan"
				icon={<DashboardCustomize />}
				isOpen={openMenu === "jurusan"}
				onToggle={() => handleMenuToggle("jurusan")}>
				<MenuItemSidebar
					url="/jurusans"
					title="Jurusan"
					icon={<DashboardCustomize />}
				/>
				<MenuItemSidebar
					url="/jurusans/create"
					title="Create Jurusan"
					icon={<DashboardCustomize />}
				/>
			</MenuItemSidebar>

			{/* Prodi */}
			<MenuItemSidebar
				title="Prodi"
				icon={<DashboardCustomize />}
				isOpen={openMenu === "prodi"}
				onToggle={() => handleMenuToggle("prodi")}>
				<MenuItemSidebar
					url="/prodis"
					title="Prodi"
					icon={<DashboardCustomize />}
				/>
				<MenuItemSidebar
					url="/prodis/create"
					title="Create Prodi"
					icon={<DashboardCustomize />}
				/>
			</MenuItemSidebar>

			{/* Kurikulum */}
			<MenuItemSidebar
				title="Kurikulum"
				icon={<DashboardCustomize />}
				isOpen={openMenu === "kurikulums"}
				onToggle={() => handleMenuToggle("kurikulums")}>
				<MenuItemSidebar
					url="/kurikulums"
					title="Kurikulum"
					icon={<DashboardCustomize />}
				/>
				<MenuItemSidebar
					url="/kurikulum/create"
					title="Create Kurikulum"
					icon={<DashboardCustomize />}
				/>
			</MenuItemSidebar>

			{/* Analisis Konsideran Page */}
			<MenuItemSidebar
				title="Analisis Konsideran"
				icon={<DashboardCustomize />}
				isOpen={openMenu === "analisisKonsideran"}
				onToggle={() => handleMenuToggle("analisisKonsideran")}>
				<VisibleMenu requiredPermission="view-users">
					<MenuItemSidebar
						url="/analisis-konsideran/sksu"
						title="SKSU"
						icon={<DashboardCustomize />}
					/>
					<MenuItemSidebar
						url="/analisis-konsideran/bench-kurikulums"
						title="BenchKurikulums"
						icon={<DashboardCustomize />}
					/>
					<MenuItemSidebar
						url="/analisis-konsideran/kkni"
						title="KKNI"
						icon={<DashboardCustomize />}
					/>
					<VisibleMenu>
						<MenuItemSidebar
							url="/analisis-konsideran/ipteks"
							title="IPTEKS"
							icon={<DashboardCustomize />}
						/>
					</VisibleMenu>
				</VisibleMenu>
			</MenuItemSidebar>

			{/* Model  dan Konstruksi Prauji */}
			<MenuItemSidebar
				title="Model  Konstruksi"
				icon={<DashboardCustomize />}
				isOpen={openMenu === "modelKonstruksi"}
				onToggle={() => handleMenuToggle("modelKonstruksi")}>
				<MenuItemSidebar url="/vmt" title="VMT" icon={<DashboardCustomize />} />
				<MenuItemSidebar
					url="/cpl-ppm-vm"
					title="CPL-PPM-VM"
					icon={<DashboardCustomize />}
				/>
				<MenuItemSidebar
					url="/matrix-cpl-ppm"
					title="Matriks CPL-PPM"
					icon={<DashboardCustomize />}
				/>
				<MenuItemSidebar
					url="/matrix-cpl-p"
					title="Matriks CPL-P"
					icon={<DashboardCustomize />}
				/>
			</MenuItemSidebar>

			{/* MataKuliah */}
			<MenuItemSidebar
				title="Mata Kuliah"
				icon={<DashboardCustomize />}
				isOpen={openMenu === "matakuliah"}
				onToggle={() => handleMenuToggle("matakuliah")}>
				<MenuItemSidebar
					url="/mata-kuliah"
					title="MataKuliah"
					icon={<DashboardCustomize />}
				/>
			</MenuItemSidebar>

			{/* Pengetahuan Page */}
			<MenuItemSidebar
				title="Pengetahuan"
				icon={<DashboardCustomize />}
				isOpen={openMenu === "pengetahuan"}
				onToggle={() => handleMenuToggle("pengetahuan")}>
				<MenuItemSidebar
					url="/pengetahuan"
					title="Pengetahuan"
					icon={<DashboardCustomize />}
				/>
			</MenuItemSidebar>

			<MenuItemSidebar
				url="/mp"
				title="Materi Pembelajaran"
				icon={<DashboardCustomize />}
			/>
			<MenuItemSidebar
				url="/matriks-cpl-iea"
				title="Matriks CPL IEA"
				icon={<DashboardCustomize />}
			/>
			<MenuItemSidebar
				url="/matriks-p-mp"
				title="Matriks p mp"
				icon={<DashboardCustomize />}
			/>
			<MenuItemSidebar
				url="/matriks-p-mp-mk"
				title="Matriks p mp mk"
				icon={<DashboardCustomize />}
			/>
		</ul>
	);
};

export default MenuSidebar;
