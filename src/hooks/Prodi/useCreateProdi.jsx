import { useState, useEffect } from "react";
import { createProdi, getJurusanDropdown } from "../../service/api";

const useCreateProdi = () => {
	const [loading, setLoading] = useState(false);
	const [jurusanList, setJurusanList] = useState([]);
	const [alert, setAlert] = useState(null);
	const [formData, setFormData] = useState({
		nama: "",
		jenjang: "",
		kode: "",
		jurusan_id: "",
	});

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const jurusanResponse = await getJurusanDropdown();
				setJurusanList(jurusanResponse.data);
				console.log(jurusanResponse.data);
			} catch (error) {
				setAlert({
					message: error.response?.data?.message || "Failed to fetch data.",
					severity: "error",
				});
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
			const response = await createProdi(formData); // Assume createProdi API exists
			setAlert({
				message: response.data.message || "Prodi created successfully!",
				severity: "success",
			});
			console.log("Prodi created successfully:", response);
		} catch (error) {
			setAlert({
				message: error.response?.data?.message || "Failed to create Prodi.",
				severity: "error",
			});
			console.error("Error creating Prodi:", error);
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		jurusanList,
		alert,
		formData,
		handleChangeForm,
		handleSubmit,
	};
};

export default useCreateProdi;
