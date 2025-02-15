import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [permissions, setPermissions] = useState([]);
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const savedToken = localStorage.getItem("authToken");
		if (savedToken) {
			setToken(savedToken);
			decodeToken(savedToken);
		} else {
			setLoading(false);
		}
	}, []);

	const decodeToken = (token) => {
		try {
			const decoded = jwtDecode(token);

			if (decoded.exp && Date.now() >= decoded.exp * 1000) {
				throw new Error("Token has expired");
			}

			setUser(decoded);
			setPermissions(decoded.permissions || []);
		} catch (error) {
			console.error("Invalid or expired token:", error.message);
			logout();
		} finally {
			setLoading(false);
		}
	};

	const login = async (email, password) => {
		try {
			const response = await axios.post("http://localhost:8000/api/login", {
				email,
				password,
			});
			const { token } = response.data;
			localStorage.setItem("authToken", token);
			setToken(token);

			decodeToken(token);
		} catch (error) {
			console.error("Error logging in:", error.response?.data || error.message);
			throw error;
		}
	};

	const logout = () => {
		localStorage.removeItem("authToken");
		setUser(null);
		setPermissions([]);
		setToken(null);

		axios
			.post(
				"http://localhost:8000/api/logout",
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.catch((error) => console.error("Error logging out:", error));
	};

	return (
		<AuthContext.Provider
			value={{ user, permissions, token, login, logout, loading }}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
