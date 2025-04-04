import { useState } from "react";
import { JURUSAN_KATEGORI } from "../../constants/constants";
import { createJurusan } from "../../service/api";
import { message } from "antd";

const useCreateJurusan = () => {
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);
	const [errors, setErrors] = useState(null);

	const [formData, setFormData] = useState({
		nama: "",
		kategori: JURUSAN_KATEGORI.REKAYASA,
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
			await createJurusan(formData);
			setFormData({ nama: "", kategori: JURUSAN_KATEGORI.REKAYASA });
			message.success("Jurusan berhasil dibuat");
		} catch (error) {
			message.error("Jurusan gagal dibuat");
			setErrors(
				error.response?.data?.errors ||
					error.response?.data?.message || {
						message: "Terjadi kesalahan saat menyimpan jurusan.",
					}
			);
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		alert,
		formData,
		errors,
		handleChange,
		handleSubmit,
	};
};

export default useCreateJurusan;
