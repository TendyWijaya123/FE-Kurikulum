import { useEffect, useState } from "react";
import {
	deleteMisiJurusan,
	firstOrCreateVmtJurusan,
	updateVmtJurusan,
	upsertMisiJurusan,
} from "../../service/api";

const useVmt = () => {
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);
	const [vmtJurusan, setVmtJurusan] = useState("");

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);
		setAlert(null); // Reset alert before fetch
		try {
			const response = await firstOrCreateVmtJurusan();

			const mappedMisiJurusans =
				response?.data?.misi_jurusans?.map((misi) => ({
					id: misi.id,
					misi_jurusan: misi.misi_jurusan,
					vmt_jurusan_id: misi.vmt_jurusan_id,
				})) || [];

			setVmtJurusan({ ...response.data, misi_jurusans: mappedMisiJurusans });
			console.log(mappedMisiJurusans);
			setAlert({ type: "success", message: "Data fetched successfully!" });
		} catch (error) {
			console.error("Error fetching data:", error);
			setAlert({ type: "error", message: "Failed to fetch data" });
		} finally {
			setLoading(false);
		}
	};
	const handleUpsertMisiJurusans = async (misiJurusansData) => {
		setAlert(null); // Reset alert before upsert
		try {
			await upsertMisiJurusan({ misi_jurusans: misiJurusansData });
			setAlert({
				type: "success",
				message: "Misi Jurusan berhasil disimpan atau diperbarui!",
			});
			await fetchData();
		} catch (error) {
			console.error("Error upserting Misi Jurusan:", error);
			setAlert({
				type: "error",
				message: "Gagal menyimpan atau memperbarui Misi Jurusan",
			});
		}
	};

	const handleDeleteMisiJurusan = async (id) => {
		setAlert(null); // Reset alert before delete
		try {
			await deleteMisiJurusan(id);
			setAlert({ type: "success", message: "Misi Jurusan berhasil dihapus!" });
		} catch (error) {
			console.error("Error deleting Misi Jurusan:", error);
			setAlert({ type: "error", message: "Gagal menghapus Misi Jurusan" });
		}
	};

	const handleUpdateVmtJurusan = async (id, vmtJurusanData) => {
		setAlert(null);
		try {
			await updateVmtJurusan(id, vmtJurusanData);
			fetchData();
		} catch (error) {
			console.error("Error deleting Updating:", error);
			setAlert({ type: "error", message: "Gagal Mengupdate visi jurusan" });
		}
	};

	return {
		loading,
		alert,
		vmtJurusan,
		handleUpsertMisiJurusans,
		handleDeleteMisiJurusan,
    handleUpdateVmtJurusan
	};
};

export default useVmt;
