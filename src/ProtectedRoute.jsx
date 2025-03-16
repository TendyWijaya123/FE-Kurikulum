import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";

const ProtectedRoute = ({
	children,
	isProdiRestricted = false,
	allowedRoles = [],
}) => {
	const { user, loading } = useContext(AuthContext);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	if (
		isProdiRestricted &&
		user.isActiveProdi !== undefined &&
		user.isActiveProdi === 0
	) {
		return <Navigate to="/temporary-unavailable" replace />;
	}

	if (
		allowedRoles.length > 0 &&
		!user.roles.some((role) => allowedRoles.includes(role))
	) {
		return <Navigate to="/unauthorized" replace />;
	}

	return children;
};

export default ProtectedRoute;
