import { DashboardCustomize } from "@mui/icons-material";
import MenuItemSidebar from "./MenuItemSidebar";
import VisibleMenu from "./VisibleMenu";

const MenuSidebar = () => {
	return (
		<ul>
			{/* Dashboard */}
			<MenuItemSidebar
				url="/dashboard"
				title="Dashboard"
				icon={<DashboardCustomize />}>
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
			<VisibleMenu requiredPermission="view-user">
				<MenuItemSidebar title="Users" icon={<DashboardCustomize />}>
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
			<MenuItemSidebar title="Jurusan" icon={<DashboardCustomize />}>
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
			<MenuItemSidebar title="Prodi" icon={<DashboardCustomize />}>
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
			<MenuItemSidebar title="Kurikulum" icon={<DashboardCustomize />}>
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
				icon={<DashboardCustomize />}>
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
			<MenuItemSidebar title="Model  Konstruksi" icon={<DashboardCustomize />}>
				<MenuItemSidebar url="/vmt" title="VMT" icon={<DashboardCustomize />} />
				<MenuItemSidebar
					url="/cpl-ppm-vm"
					title="CPL-PPM-VM"
					icon={<DashboardCustomize />}
				/>
			</MenuItemSidebar>
		</ul>
	);
};

export default MenuSidebar;
