import { useEffect, useState } from "react";
import {
	deleteMisiJurusan,
	deleteMisiPolban,
	deleteTujuanPolban,
	firstOrCreateVmtJurusan,
	firstOrCreateVmtPolban,
	updateVmtJurusan,
	updateVmtPolban,
	upsertMisiJurusan,
	upsertMisiPolban,
	upsertTujuanPolban,
} from "../../service/api";

const useVmt = () => {
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);
	const [vmtJurusan, setVmtJurusan] = useState("");
	const [vmtPolban, setVmtPolban] = useState("");

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);
		setAlert(null);
		try {
			const [responseVmtJurusan, responseVmtPolban] = await Promise.all([
				firstOrCreateVmtJurusan(),
				firstOrCreateVmtPolban(),
			]);

			const mappedMisiJurusans =
				responseVmtJurusan?.data?.misi_jurusans?.map((misi) => ({
					id: misi.id,
					misi_jurusan: misi.misi_jurusan,
					vmt_jurusan_id: misi.vmt_jurusan_id,
				})) || [];

			const mappedMisiPolban =
				responseVmtPolban?.data?.misi_polban?.map((misi) => ({
					id: misi.id,
					misi_polban: misi.misi_polban,
					vmt_polban_id: misi.vmt_polban_id,
				})) || [];

			const mappedTujuanPolban =
				responseVmtPolban?.data?.tujuan_polban?.map((tujuan) => ({
					id: tujuan.id,
					tujuan_polban: tujuan.tujuan_polban,
					misi_polban_id: tujuan.misi_polban_id,
					vmt_polban_id: tujuan.vmt_polban_id,
				})) || [];

			setVmtJurusan({
				...responseVmtJurusan.data,
				misi_jurusans: mappedMisiJurusans,
			});
			setVmtPolban({
				...responseVmtPolban.data,
				misi_polban: mappedMisiPolban,
				tujuan_polban: mappedTujuanPolban,
			});

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

	const handleUpsertMisiPolbans = async (misiPolbansData) => {
		setAlert(null); // Reset alert before upsert
		try {
			await upsertMisiPolban({ misi_polbans: misiPolbansData });
			setAlert({
				type: "success",
				message: "Misi Polban berhasil disimpan atau diperbarui!",
			});
			await fetchData();
		} catch (error) {
			console.error("Error upserting Misi Polban:", error);
			setAlert({
				type: "error",
				message: "Gagal menyimpan atau memperbarui Misi Polban",
			});
		}
	};

	const handleUpsertTujuanPolbans = async (tujuanPolbansData) => {
		setAlert(null);
		try {
			await upsertTujuanPolban({ tujuan_polbans: tujuanPolbansData });
			setAlert({
				type: "success",
				message: "Tujuan Polban berhasil disimpan atau diperbarui!",
			});
			await fetchData();
		} catch (error) {
			console.error("Error upserting Tujuan Polban:", error);
			setAlert({
				type: "error",
				message: "Gagal menyimpan atau memperbarui tujuan Polban",
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

	const handleDeleteMisiPolban = async (id) => {
		setAlert(null);
		try {
			await deleteMisiPolban(id);
			setAlert({ type: "success", message: "Misi Polban berhasil dihapus!" });
		} catch (error) {
			console.error("Error deleting Misi Polban:", error);
			setAlert({ type: "error", message: "Gagal menghapus Misi Polban" });
		}
	};

	const handleDeleteTujuanPolban = async (id) => {
		setAlert(null);
		try {
			await deleteTujuanPolban(id);
			setAlert({ type: "success", message: "Tujuan Polban berhasil dihapus!" });
		} catch (error) {
			console.error("Error deleting Tujuan Polban:", error);
			setAlert({ type: "error", message: "Gagal menghapus Tujuan Polban" });
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

	const handleUpdateVmtPolban = async (id, vmtPolbanData) => {
		setAlert(null);
		try {
			await updateVmtPolban(id, vmtPolbanData);
			fetchData();
		} catch (error) {
			console.error("Error deleting Updating:", error);
			setAlert({ type: "error", message: "Gagal Mengupdate visi polban" });
		}
	};

	return {
		loading,
		alert,
		vmtJurusan,
		vmtPolban,
		handleUpsertMisiJurusans,
		handleUpsertMisiPolbans,
		handleUpsertTujuanPolbans,
		handleDeleteMisiJurusan,
		handleDeleteMisiPolban,
		handleDeleteTujuanPolban,
		handleUpdateVmtJurusan,
		handleUpdateVmtPolban,
	};
};

export default useVmt;
