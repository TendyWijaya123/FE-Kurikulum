import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const VisibleMenu = ({ requiredPermission, children }) => {
	const { permissions } = useContext(AuthContext);

	if (
		requiredPermission &&
		(!permissions || !permissions.includes(requiredPermission))
	) {
		return null;
	}

	return children;
};

export default VisibleMenu;
