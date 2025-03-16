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

const useVmtPolban = () => {
	const { selectedProdiId } = useContext(ProdiContext);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);
	const [vmtPolban, setVmtPolban] = useState("");

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
		try {
			await upsertMisiPolban({ misi_polbans: misiPolbansData });
			await fetchData();
		} catch (error) {
			setAlert({ type: "error", message: "Gagal menyimpan Misi Polban" });
		}
	};

	const handleUpsertTujuanPolbans = async (tujuanPolbansData) => {
		try {
			await upsertTujuanPolban({ tujuan_polbans: tujuanPolbansData });
			await fetchData();
		} catch (error) {
			setAlert({ type: "error", message: "Gagal menyimpan Tujuan Polban" });
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
		try {
			await updateVmtPolban(id, data);
			await fetchData();
		} catch (error) {
			setAlert({ type: "error", message: "Gagal mengupdate VMT Polban" });
		}
	};

	return {
		loading,
		alert,
		vmtPolban,
		handleUpsertMisiPolbans,
		handleUpsertTujuanPolbans,
		handleDeleteMisiPolban,
		handleDeleteTujuanPolban,
		handleUpdateVmtPolban,
	};
};

export default useVmtPolban;
