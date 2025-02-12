import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";

const ProtectedRoute = ({ children, isProdiRestricted = false }) => {
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

	return children;
};

export default ProtectedRoute;
