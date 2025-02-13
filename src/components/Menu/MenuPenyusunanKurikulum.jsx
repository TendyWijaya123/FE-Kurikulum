import { Dashboard, People, School, Class, MenuBook, AccountTree, Assignment,
	AdminPanelSettings, PersonAdd, Lock, VerifiedUser, Assessment, BarChart,
	Science , Analytics, TableChart, ImportContacts
 } from "@mui/icons-material";
import MenuItemSidebar from "./MenuItemSidebar";
import VisibleMenu from "./VisibleMenu";
import React, { useState, useEffect } from "react";
const MenuPenyusunanKurikulum = () =>{
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
			<MenuItemSidebar
				url="/dashboard"
				title="Dashboard"
				icon={<Dashboard />}
				isOpen={openMenu === "dashboard"}
				onToggle={() => handleMenuToggle("dashboard")}>
				<MenuItemSidebar
					url="/dashboard/overview"
					title="Overview"
					icon={<Dashboard />}>
					<MenuItemSidebar
						url="/dashboard/stats"
						title="Stats"
						icon={<Dashboard />}
					/>
				</MenuItemSidebar>
				<MenuItemSidebar
					url="/dashboard/stats"
					title="Stats"
					icon={<Dashboard />}
				/>
			</MenuItemSidebar>

			{/* Users */}
			<VisibleMenu>
				<MenuItemSidebar
					title="Users"
					icon={<People />}
					isOpen={openMenu === "users"}
					onToggle={() => handleMenuToggle("users")}>
					<MenuItemSidebar url="/users" title="Users" icon={<People />} />
					<VisibleMenu>
						<MenuItemSidebar
							url="/user/create"
							title="Create User"
							icon={<PersonAdd />}
						/>
					</VisibleMenu>
				</MenuItemSidebar>
			</VisibleMenu>

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

			{/* Analisis Konsideran Page */}
			<MenuItemSidebar
				title="Analisis Konsideran"
				icon={<Analytics />}
				isOpen={openMenu === "analisisKonsideran"}
				onToggle={() => handleMenuToggle("analisisKonsideran")}>
				<VisibleMenu>
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
						url="/analisis-konsideran/kkni"
						title="KKNI"
						icon={<School />}
					/>
					<VisibleMenu>
						<MenuItemSidebar
							url="/analisis-konsideran/ipteks"
							title="IPTEKS"
							icon={<Science />}
						/>
					</VisibleMenu>
				</VisibleMenu>
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
					url="/matriks-p-mp"
					title="Matriks P-MP"
					icon={<TableChart />}
				/>
				<MenuItemSidebar
					url="/mata-kuliah"
					title="MataKuliah"
					icon={<Assignment />}
				/>
				<MenuItemSidebar
					url="/matriks-p-mp-mk"
					title="Matriks P-MP-MK"
					icon={<TableChart />}
				/>
			</MenuItemSidebar>

			<MenuItemSidebar
				url="/matrix-cpl-mk"
				title="Matriks CPL-MK"
				icon={<TableChart />}
			/>

			<MenuItemSidebar title="Dosen Pengampu" icon={<Assignment/>} url="/dosen-pengampu" ></MenuItemSidebar>
        </>
    )
}

export default MenuPenyusunanKurikulum;