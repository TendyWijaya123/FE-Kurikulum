import { useEffect, useState } from "react";
import {
	createUser,
	getProdiDropdown,
	getRoleDropdown,
} from "../../service/api";

const useCreateUser = () => {
	const [loading, setLoading] = useState(false);
	const [prodiList, setProdiList] = useState([]);
	const [roleList, setRoleList] = useState([]);
	const [alert, setAlert] = useState(null);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		prodi_id: "",
		role_id: "",
	});

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const [prodiResponse, roleResponse] = await Promise.all([
					getProdiDropdown(),
					getRoleDropdown(),
				]);

				setProdiList(prodiResponse);
				setRoleList(roleResponse);
			} catch (error) {
				setAlert({ message: "Failed to fetch data.", severity: "error" });
				console.error("Error in fetching dropdown data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const handleChangeForm = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setAlert(null); // Clear previous alerts

		try {
			const response = await createUser(formData);
			setAlert({ message: "User created successfully!", severity: "success" });
			console.log("User created successfully:", response);
		} catch (error) {
			// Check for validation errors in the response
			if (error.response && error.response.data && error.response.data.errors) {
				const errorMessage = error.response.data.errors.email
					? error.response.data.errors.email[0] // Show email error message if it exists
					: "Failed to create user."; // Default message for other errors
				setAlert({ message: errorMessage, severity: "error" });
			} else {
				setAlert({ message: "Failed to create user.", severity: "error" });
			}
			console.error("Error creating user:", error);
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		prodiList,
		roleList,
		alert,
		formData,
		handleChangeForm,
		handleSubmit,
	};
};

export default useCreateUser;
