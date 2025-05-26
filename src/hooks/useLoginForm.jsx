import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export const useLoginForm = () => {
	const [userName, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { user, login, loginRps } = useContext(AuthContext);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		if (isLoggedIn && user?.roles) {
			handleLoginRedirect(user.roles);
		}
	}, [user, isLoggedIn]);

	const handleSubmit = async (e) => {
		setLoading(true);

		try {
			await login(userName, password);
			setIsLoggedIn(true);
		} catch (error) {
			console.error("Login failed:", error.response?.data || error.message);
			alert("Login failed, please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleLoginRedirect = (role) => {
		if (!role || role.length === 0) return;

		if (role.includes("Penyusun Kurikulum")) {
			navigate("/dashboard-penyusun-kurikulum");
		} else if (role.includes("P2MPP")) {
			navigate("/dashboard");
		}
	};

	const handleSubmitRps = async (e) => {
		setLoading(true);

		try {
			await loginRps(userName, password);
			navigate("/mata-kuliah-pengampu");
		} catch (error) {
			console.error("Login failed:", error.response?.data || error.message);
			alert("Login failed, please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleChangeUserName = (e) => {
		setUsername(e.target.value);
	};

	const handleChangePassword = (e) => {
		setPassword(e.target.value);
	};

	return {
		handleSubmit,
		userName,
		password,
		loading,
		handleChangePassword,
		handleChangeUserName,
		handleSubmitRps,
	};
};
