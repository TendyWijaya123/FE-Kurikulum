import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export const useLoginForm = () => {
	const [email, setEmail] = useState("");
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
			console.log({ email, password });
			await login(email, password);
			setIsLoggedIn(true);
		} catch (error) {
			console.error("Login failed:", error.response?.data || error.message);
			alert("Login failed, please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleLoginRedirect = (role) => {
		if (!role || role.length === 0) return; // 🔹 Pastikan role ada sebelum redirect

		if (role.includes("Penyusun Kurikulum")) {
			navigate("/dashboard-penyusun-kurikulum");
		} else if (role.includes("P2MPP")) {
			navigate("/dashboard");
		} 
	};

	const handleSubmitRps = async (e) => {
		console.log(e)
		setLoading(true);

		try {
			console.log({ email, password });
			await loginRps(email, password);
			navigate("/dashboard");
		} catch (error) {
			console.error("Login failed:", error.response?.data || error.message);
			alert("Login failed, please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleChangeEmail = (e) => {
		setEmail(e.target.value);
	};

	const handleChangePassword = (e) => {
		setPassword(e.target.value);
	};

	return {
		handleSubmit,
		email,
		password,
		loading,
		handleChangePassword,
		handleChangeEmail,
		handleSubmitRps
	};
};
