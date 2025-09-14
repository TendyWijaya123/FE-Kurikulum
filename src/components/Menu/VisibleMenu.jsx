import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const VisibleMenu = ({ children, isProdiRestricted = true }) => {
	const { user } = useContext(AuthContext);

	if (
		isProdiRestricted &&
		user.isActiveProdi !== undefined &&
		!user.isActiveProdi
	) {
		return null;
	}

	return children;
};

export default VisibleMenu;
