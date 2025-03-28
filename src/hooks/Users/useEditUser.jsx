import { useEffect, useState } from "react";
import {
	getUserById,
	getProdiDropdown,
	updateUser,
	getUserRoles,
} from "../../service/api";

const useEditUser = (userId) => {
	const [loading, setLoading] = useState(false);
	const [prodiList, setProdiList] = useState([]);
	const [roleList, setRoleList] = useState([]);
	const [alert, setAlert] = useState(null);
	const [errors, setErrors] = useState(null);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		prodi_id: "",
		role: "",
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
					role: userResponse.user.role,
				});
				const prodiResponse = await getProdiDropdown();
				setProdiList(prodiResponse);
				const roleResponse = await getUserRoles();
				setRoleList(roleResponse.roles);

				setProdiList(prodiResponse);
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
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		setLoading(true);
		setAlert(null);
		setErrors(null);
		try {
			const response = await updateUser(userId, formData);
			setAlert({ message: "User updated successfully!", severity: "success" });
		} catch (error) {
			if (error.response && error.response.data && error.response.data.errors) {
				const errorMessage = error.response.data.errors.email
					? error.response.data.errors.email[0]
					: "Failed to update user.";
				setAlert({ message: errorMessage, severity: "error" });
			} else {
				setAlert({ message: "Failed to update user.", severity: "error" });
			}
			setErrors(
				error.response?.data?.errors ||
					error.response?.data?.message || {
						message: "Terjadi kesalahan saat menyimpan CPL.",
					}
			);
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		prodiList,
		alert,
		formData,
		roleList,
		errors,
		handleChangeForm,
		handleSubmit,
	};
};

export default useEditUser;
