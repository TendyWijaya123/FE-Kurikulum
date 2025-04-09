import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const VisibleMenu = ({
	children,
	isProdiRestricted = false,
	allowedRoles = [],
}) => {
	const { user } = useContext(AuthContext);

	if (
		isProdiRestricted &&
		user.isActiveProdi !== undefined &&
		!user.isActiveProdi
	) {
		return null;
	}

	if (
		allowedRoles.length > 0 &&
		!user.roles.some((role) => allowedRoles.includes(role))
	) {
		return null;
	}

	return children;
};

export default VisibleMenu;
