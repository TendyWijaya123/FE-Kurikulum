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
			<MenuItemSidebar title="Users" icon={<DashboardCustomize />}>
				<VisibleMenu requiredPermission="view-users">
					<MenuItemSidebar
						url="/users"
						title="Users"
						icon={<DashboardCustomize />}
					/>
				</VisibleMenu>
				<VisibleMenu>
					<MenuItemSidebar
						url="/user/create"
						title="Create User"
						icon={<DashboardCustomize />}
					/>
				</VisibleMenu>
			</MenuItemSidebar>

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

			{/* Analisis Konsideran Page */}
			<MenuItemSidebar
				title="Analisis Konsideran"
				icon={<DashboardCustomize />}>
				<VisibleMenu>
					<MenuItemSidebar
						url="/analisis-konsideran/sksu"
						title="SKSU"
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
		</ul>
	);
};

export default MenuSidebar;
