import { useEffect, useState } from "react";
import {
	getUserById,
	getProdiDropdown,
	getRoleDropdown,
	updateUser,
} from "../../service/api";

const useEditUser = (userId) => {
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
				const userResponse = await getUserById(userId);
				setFormData({
					name: userResponse.user.name,
					email: userResponse.user.email,
					prodi_id: userResponse.user.prodi_id,
					role_id: userResponse.user.role_id,
				});

				// Fetch the prodi and role dropdown data
				const [prodiResponse, roleResponse] = await Promise.all([
					getProdiDropdown(),
					getRoleDropdown(),
				]);

				setProdiList(prodiResponse);
				setRoleList(roleResponse);
			} catch (error) {
				setAlert({ message: "Failed to fetch data.", severity: "error" });
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [userId]);

	const handleChangeForm = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setAlert(null); // Clear previous alerts

		try {
			const response = await updateUser(userId, formData);
			setAlert({ message: "User updated successfully!", severity: "success" });
			console.log("User updated successfully:", response);
		} catch (error) {
			// Handle error, checking for validation errors
			if (error.response && error.response.data && error.response.data.errors) {
				const errorMessage = error.response.data.errors.email
					? error.response.data.errors.email[0] // Show email error message if it exists
					: "Failed to update user."; // Default message for other errors
				setAlert({ message: errorMessage, severity: "error" });
			} else {
				setAlert({ message: "Failed to update user.", severity: "error" });
			}
			console.error("Error updating user:", error);
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

export default useEditUser;
