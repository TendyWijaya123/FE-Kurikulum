import { useState, useEffect } from "react";
import {
	firstOrCreateVmtJurusan,
	upsertMisiJurusan,
	deleteMisiJurusan,
	updateVmtJurusan,
} from "../../service/api";

const useVmtJurusan = () => {
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);
	const [vmtJurusan, setVmtJurusan] = useState("");

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);
		setAlert(null);
		try {
			const response = await firstOrCreateVmtJurusan();
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
		try {
			await upsertMisiJurusan({ misi_jurusans: misiJurusansData });
			await fetchData();
		} catch (error) {
			setAlert({ type: "error", message: "Gagal menyimpan Misi Jurusan" });
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
		try {
			await updateVmtJurusan(id, data);
			await fetchData();
		} catch (error) {
			setAlert({ type: "error", message: "Gagal mengupdate VMT Jurusan" });
		}
	};

	return {
		loading,
		alert,
		vmtJurusan,
		handleUpsertMisiJurusans,
		handleDeleteMisiJurusan,
		handleUpdateVmtJurusan,
	};
};

export default useVmtJurusan;
