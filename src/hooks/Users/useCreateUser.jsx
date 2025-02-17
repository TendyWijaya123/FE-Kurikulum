import { useEffect, useState } from "react";
import { createUser, getProdiDropdown } from "../../service/api";

const useCreateUser = () => {
	const [loading, setLoading] = useState(false);
	const [prodiList, setProdiList] = useState([]);
	const [alert, setAlert] = useState(null);
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
		setAlert(null);

		try {
			await createUser(formData);
			setAlert({ 
				message: "User created successfully! Password has been sent to the user's email.", 
				severity: "success" 
			});
		} catch (error) {
			setAlert({ message: "Failed to create user.", severity: "error" });
			console.error("Error creating user:", error);
		} finally {
			setLoading(false);
		}
	};

	return { loading, prodiList, alert, formData, handleChangeForm, handleSubmit };
};

export default useCreateUser;
