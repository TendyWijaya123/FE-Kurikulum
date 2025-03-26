import { useState, useEffect, useContext } from "react";
import {
	firstOrCreateVmtPolban,
	upsertMisiPolban,
	upsertTujuanPolban,
	deleteMisiPolban,
	deleteTujuanPolban,
	updateVmtPolban,
} from "../../service/api";
import { ProdiContext } from "../../context/ProdiProvider";
import { message } from "antd";

const useVmtPolban = () => {
	const { selectedProdiId } = useContext(ProdiContext);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);
	const [vmtPolban, setVmtPolban] = useState("");
	const [errors, setErrors] = useState(null);

	useEffect(() => {
		fetchData(selectedProdiId);
	}, [selectedProdiId]);

	const fetchData = async (prodiId = null) => {
		setLoading(true);
		setAlert(null);
		try {
			const response = await firstOrCreateVmtPolban(prodiId);
			setVmtPolban(response.data);
			setAlert({
				type: "success",
				message: "Data VMT Polban berhasil diambil!",
			});
		} catch (error) {
			setAlert({ type: "error", message: "Gagal mengambil data VMT Polban" });
		} finally {
			setLoading(false);
		}
	};

	const handleUpsertMisiPolbans = async (misiPolbansData) => {
		setErrors(null);
		try {
			await upsertMisiPolban({ misi_polbans: misiPolbansData });
			await fetchData();
			message.success("Berhasil  menyimpan misi polban");
		} catch (error) {
			setErrors(
				error.response?.data?.errors ||
					error.response?.data?.message || {
						message: "Terjadi kesalahan saat menyimpan misi polban.",
					}
			);
			message.error("Gagal menyimpan Misi Polban");
		}
	};

	const handleUpsertTujuanPolbans = async (tujuanPolbansData) => {
		setErrors(null);
		try {
			await upsertTujuanPolban({ tujuan_polbans: tujuanPolbansData });
			await fetchData();
			message.success("Berhasil  Menyimpan Tujuan Polban");
		} catch (error) {
			setErrors(
				error.response?.data?.errors ||
					error.response?.data?.message || {
						message: "Terjadi kesalahan saat menyimpan tujuan polban.",
					}
			);
			message.error("Gagal menyimpan Tujuan Polban ");
		}
	};

	const handleDeleteMisiPolban = async (id) => {
		try {
			await deleteMisiPolban(id);
			await fetchData();
		} catch (error) {
			setAlert({ type: "error", message: "Gagal menghapus Misi Polban" });
		}
	};

	const handleDeleteTujuanPolban = async (id) => {
		try {
			await deleteTujuanPolban(id);
			await fetchData();
		} catch (error) {
			setAlert({ type: "error", message: "Gagal menghapus Tujuan Polban" });
		}
	};

	const handleUpdateVmtPolban = async (id, data) => {
		setErrors(null);
		try {
			await updateVmtPolban(id, data);
			await fetchData();
			message.success("Berhasil menyimpan visi polban");
		} catch (error) {
			setErrors(
				error.response?.data?.errors ||
					error.response?.data?.message || {
						message: "Terjadi kesalahan saat menyimpan Visi Polban.",
					}
			);
			message.error("Gagal menyimpan visi polban");
		}
	};

	return {
		loading,
		alert,
		vmtPolban,
		errors,
		handleUpsertMisiPolbans,
		handleUpsertTujuanPolbans,
		handleDeleteMisiPolban,
		handleDeleteTujuanPolban,
		handleUpdateVmtPolban,
	};
};

export default useVmtPolban;
