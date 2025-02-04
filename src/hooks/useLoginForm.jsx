import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export const useLoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			console.log({ email, password });
			await login(email, password);
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
	};
};
