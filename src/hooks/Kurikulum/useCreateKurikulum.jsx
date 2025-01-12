import { useEffect, useState } from "react";
import { createKurikulum, getProdiDropdown } from "../../service/api";

const useCreateKurikulum = () => {
	const [loading, setLoading] = useState(false);
	const [prodiList, setProdiList] = useState([]);
	const [alert, setAlert] = useState(null);
	const [formData, setFormData] = useState({
		tahun_awal: "",
		tahun_akhir: "",
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
		setAlert(null); // Clear previous alerts

		try {
			const response = await createKurikulum(formData);
			setAlert({ message: "User created successfully!", severity: "success" });
			console.log("User created successfully:", response);
		} catch (error) {
			setAlert({
				message: error.response?.data?.message || "Failed to create Prodi.",
				severity: "error",
			});
			console.error("Error creating user:", error);
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		prodiList,
		alert,
		formData,
		handleChangeForm,
		handleSubmit,
	};
};

export default useCreateKurikulum;
