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
	NearMe,
} from "@mui/icons-material";
import MenuItemSidebar from "./MenuItemSidebar";
import VisibleMenu from "./VisibleMenu";
import React, { useState, useEffect, useContext } from "react";
import { SelectionContext } from "../../context/SelectionContext";
import MenuRps from "./menuRps";
import MenuPenyusunanKurikulum from "./menuPenyusunanKurikulum";

const MenuSidebar = () => {
	
	const { selectedOption } = useContext(SelectionContext);
	
	return (
		<ul>
			 {selectedOption !== "dosen" ? <MenuPenyusunanKurikulum /> : <MenuRps/>}
		</ul>
	);
};

export default MenuSidebar;
