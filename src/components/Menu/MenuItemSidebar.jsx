import React, { useState } from "react";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const MenuItemSidebar = ({ url, title, children, icon, isOpen, onToggle }) => {
	const location = useLocation();
	const isActive = location.pathname === url;

	const toggleSubmenu = (e) => {

		if (children) {
			e.preventDefault();
			onToggle();
		}
	};

	return (
		<li className="p-2 rounded list-none">
			<a
				href={url || "#"}
				className={`flex items-center justify-between w-full rounded p-2 transition-all duration-200  text-gray-200 ${
					isActive
						? "bg-blue-500 text-white font-bold"
						: "hover:text-white hover:font-bold hover:scale-103"
				}`}
				onClick={toggleSubmenu}>
				<div className="flex items-center">
					{icon && <span className="mr-2">{icon}</span>}
					{title}
				</div>
				{children && <span>{isOpen ? <ExpandLess /> : <ExpandMore />}</span>}
			</a>

			{isOpen && children && <ul className="px-2 bg-slate-900">{children}</ul>}
		</li>
	);
};

export default MenuItemSidebar;
