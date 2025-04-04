import { useEffect, useState } from "react";
import { createUser, getProdiDropdown, getUserRoles } from "../../service/api";

const useCreateUser = () => {
	const [loading, setLoading] = useState(false);
	const [prodiList, setProdiList] = useState([]);
	const [roleList, setRoleList] = useState([]);
	const [alert, setAlert] = useState(null);
	const [errors, setErrors] = useState(null);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		prodi_id: "",
	});

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const prodiResponse = await getProdiDropdown();
				setProdiList(prodiResponse);
				const roleResponse = await getUserRoles();
				setRoleList(roleResponse.roles);
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
		setLoading(true);
		setAlert(null);
		setErrors(null);
		try {
			await createUser(formData);
			setAlert({
				message:
					"User created successfully! Password has been sent to the user's email.",
				severity: "success",
			});
		} catch (error) {
			setErrors(
				error.response?.data?.errors ||
					error.response?.data?.message || {
						message: "Terjadi kesalahan saat menyimpan user.",
					}
			);
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		prodiList,
		roleList,
		alert,
		errors,
		formData,
		handleChangeForm,
		handleSubmit,
	};
};

export default useCreateUser;
