import React from "react";
import MenuItemSidebar from "./MenuItemSidebar";
import { Assignment, ImportContacts } from "@mui/icons-material";

const MenuRps = () => {
	return (
		<>
			<MenuItemSidebar
				title="Pengisian RPS"
				icon={<Assignment />}
				isOpen={true}>
				<MenuItemSidebar
					url="/mata-kuliah-pengampu"
					title="Input RPS"
					icon={<ImportContacts />}
				/>
				<MenuItemSidebar
					url="/rps/review"
					title="Review RPS"
					icon={<Assignment />}
				/>
			</MenuItemSidebar>

			<MenuItemSidebar
				title="Dosen"
				icon={<Assignment />}
				url="/dosen"></MenuItemSidebar>
			<MenuItemSidebar
				title="Buku Referensi"
				icon={<Assignment />}
				url="/buku-referensi"></MenuItemSidebar>

			<MenuItemSidebar
				title="Referensi Mata Kuliah"
				icon={<Assignment />}
				url="/referensi-mata-kuliah"></MenuItemSidebar>
		</>
	);
};

export default MenuRps;
