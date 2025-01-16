import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";

const ProtectedRoute = ({
	children,
	requiredPermission,
	isProdiRestricted = false,
}) => {
	const { user, permissions, loading } = useContext(AuthContext);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	if (
		requiredPermission &&
		(!permissions || !permissions.includes(requiredPermission))
	) {
		return <Navigate to="/unauthorized" replace />;
	}

	if (
		isProdiRestricted &&
		user.isActiveProdi !== undefined &&
		user.isActiveProdi === 0
	) {
		return <Navigate to="/temporary-unavailable" replace />;
	}

	return children;
};

export default ProtectedRoute;
