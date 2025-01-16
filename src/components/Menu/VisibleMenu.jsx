import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const VisibleMenu = ({
	requiredPermission,
	children,
	isProdiRestricted = true,
}) => {
	const { permissions, user } = useContext(AuthContext);

	if (
		requiredPermission &&
		(!permissions || !permissions.includes(requiredPermission))
	) {
		return null;
	}

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
