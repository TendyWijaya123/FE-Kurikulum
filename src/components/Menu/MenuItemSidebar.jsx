import React from "react";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const MenuItemSidebar = ({ url, title, children, icon, isOpen, onToggle }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const isActive = location.pathname === url;

	const handleNavigation = (e) => {
		if (children) {
			e.preventDefault();
			onToggle(); // Jika ada submenu, hanya toggle, tidak navigasi
		} else if (url) {
			navigate(url); // Navigasi ke halaman tujuan tanpa reload
		}
	};

	return (
		<li className="p-2 rounded list-none">
			<button
				className={`flex items-center justify-between w-full rounded p-2 transition-all duration-200 text-gray-200 ${
					isActive
						? "bg-blue-500 text-white font-bold"
						: "hover:text-white hover:font-bold hover:scale-103"
				}`}
				onClick={handleNavigation}>
				<div className="flex items-center">
					{icon && <span className="mr-2">{icon}</span>}
					{title}
				</div>
				{children && <span>{isOpen ? <ExpandLess /> : <ExpandMore />}</span>}
			</button>

			{isOpen && children && <ul className="px-2 bg-slate-900">{children}</ul>}
		</li>
	);
};

export default MenuItemSidebar;
