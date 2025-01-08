import React, { useState } from "react";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const MenuItemSidebar = ({ url, title, children, icon }) => {
	const [isOpen, setIsOpen] = useState(true);
	const location = useLocation();
	const isActive = location.pathname === url;

	const toggleSubmenu = (e) => {
		if (!children) {
			return;
		}
		e.preventDefault();
		setIsOpen(!isOpen);
	};

	return (
		<li className="p-2 rounded list-none">
			<a
				href={url || "#"}
				className={`flex items-center justify-between w-full rounded p-2 transition-all duration-200  text-gray-200 ${
					isActive
						? "bg-slate-300 text-white font-bold"
						: "hover:bg-slate-300 hover:text-white hover:font-bold"
				}`}
				onClick={toggleSubmenu}>
				<div className="flex items-center">
					{icon && <span className="mr-2">{icon}</span>}
					{title}
				</div>
				{children && <span>{isOpen ? <ExpandLess /> : <ExpandMore />}</span>}
			</a>

			{isOpen && children && <ul className="px-2 bg-slate-700">{children}</ul>}
		</li>
	);
};

export default MenuItemSidebar;
