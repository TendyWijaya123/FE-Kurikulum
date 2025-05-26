import { useState, useEffect, useContext } from "react";
import {
	firstOrCreateVmtJurusan,
	upsertMisiJurusan,
	deleteMisiJurusan,
	updateVmtJurusan,
} from "../../service/api";
import { AppDataContext } from "../../context/AppDataProvider";
import { message } from "antd";

const useVmtJurusan = () => {
	const { selectedProdiId } = useContext(AppDataContext);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);
	const [vmtJurusan, setVmtJurusan] = useState("");
	const [errors, setErrors] = useState(null);

	useEffect(() => {
		fetchData(selectedProdiId);
	}, [selectedProdiId]);

	const fetchData = async (prodiId = null) => {
		setLoading(true);
		setAlert(null);
		try {
			const response = await firstOrCreateVmtJurusan(prodiId);
			setVmtJurusan(response.data);
			setAlert({
				type: "success",
				message: "Data VMT Jurusan berhasil diambil!",
			});
		} catch (error) {
			setAlert({ type: "error", message: "Gagal mengambil data VMT Jurusan" });
		} finally {
			setLoading(false);
		}
	};

	const handleUpsertMisiJurusans = async (misiJurusansData) => {
		setErrors(null);
		try {
			await upsertMisiJurusan({ misi_jurusans: misiJurusansData });
			await fetchData();
			message.success("Berhasil  menyimpan misi jurusan");
		} catch (error) {
			setErrors(
				error.response?.data?.errors ||
					error.response?.data?.message || {
						message: "Terjadi kesalahan saat menyimpan misi jurusan.",
					}
			);
			message.error("Gagal menyimpan misi jurusan");
		}
	};

	const handleDeleteMisiJurusan = async (id) => {
		try {
			await deleteMisiJurusan(id);
			await fetchData();
		} catch (error) {
			setAlert({ type: "error", message: "Gagal menghapus Misi Jurusan" });
		}
	};

	const handleUpdateVmtJurusan = async (id, data) => {
		setErrors(null);
		try {
			await updateVmtJurusan(id, data);
			await fetchData();
			message.success("Berhasil menyimpan visi jurusan");
		} catch (error) {
			setErrors(
				error.response?.data?.errors ||
					error.response?.data?.message || {
						message: "Terjadi kesalahan saat menyimpan Visi jurusan.",
					}
			);
			message.error("Gagal menyimpan visi jurusan");
		}
	};

	return {
		loading,
		alert,
		errors,
		vmtJurusan,
		handleUpsertMisiJurusans,
		handleDeleteMisiJurusan,
		handleUpdateVmtJurusan,
	};
};

export default useVmtJurusan;
