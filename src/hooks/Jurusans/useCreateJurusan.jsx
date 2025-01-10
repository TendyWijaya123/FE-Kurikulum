import { useState } from "react";
import { JURUSAN_KATEGORI } from "../../constants/constants";
import { createJurusan } from "../../service/api";

const useCreateJurusan = () => {
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);

	const [formData, setFormData] = useState({
		nama: "",
		kategori: JURUSAN_KATEGORI.REKAYASA, // Default kategori
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async () => {
		setLoading(true);
		setAlert(null);

		try {
			const result = await createJurusan(formData);
			setAlert({ type: "success", message: "Jurusan berhasil dibuat!" });
			setFormData({ nama: "", kategori: JURUSAN_KATEGORI.REKAYASA });
			return result;
		} catch (error) {
			setAlert({
				type: "error",
				message: error.response?.data?.message || "Gagal membuat jurusan",
			});
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		alert,
		formData,
		handleChange,
		handleSubmit,
	};
};

export default useCreateJurusan;
