import { useState, useEffect, useContext } from "react";
import {
	getPengetahuan,
	deletePengetahuan,
	createPengetahuan,
	updatePengetahuan,
} from "../service/api";
import { AuthContext } from "../context/AuthProvider";
import {
	getPengetahuanTemplate,
	importPengetahuan,
} from "../service/Import/ImportService";

export const usePengetahuan = () => {
	const [pengetahuanData, setPengetahuanData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [error, setError] = useState(null);
	const [notification, setNotification] = useState({ message: "", type: "" });
	const { user } = useContext(AuthContext);

	const showNotification = (message, type) => {
		setNotification({ message, type });
		setTimeout(() => setNotification({ message: "", type: "" }), 3000);
	};

	const fetchPengetahuan = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await getPengetahuan({ page: currentPage });
			setPengetahuanData(response.data);
			setTotalPage(response.totalPages);
		} catch (err) {
			setError(err.response?.data?.message || "Gagal mengambil data.");
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id) => {
		try {
			await deletePengetahuan(id);
			showNotification("Data berhasil dihapus.", "success");
			fetchPengetahuan();
		} catch (err) {
			showNotification(
				err.response?.data?.message || "Gagal menghapus data.",
				"error"
			);
		}
	};

	const handleCreate = async (data) => {
		try {
			await createPengetahuan({ ...data, kurikulum_id: user?.kurikulumId });
			showNotification("Data berhasil ditambahkan.", "success");
			fetchPengetahuan();
			return true;
		} catch (err) {
			showNotification(
				err.response?.data?.message || "Gagal menambah data.",
				"error"
			);
			return false;
		}
	};

	const handleUpdate = async (id, data) => {
		try {
			await updatePengetahuan(id, data);
			showNotification("Data berhasil diperbarui.", "success");
			fetchPengetahuan();
			return true;
		} catch (err) {
			showNotification(
				err.response?.data?.message || "Gagal memperbarui data.",
				"error"
			);
			return false;
		}
	};

	const handleExportTemplatePengetahuan = async () => {
		try {
			await getPengetahuanTemplate();
		} catch (error) {
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		}
	};

	const handleImportPengetahuan = async (file) => {
		try {
			await importPengetahuan(file);
			fetchPengetahuan();
		} catch (error) {
			message.error("Gagal mengunggah file. Coba lagi.");
		}
	};

	useEffect(() => {
		fetchPengetahuan();
	}, [currentPage]);

	return {
		pengetahuanData,
		loading,
		error,
		notification,
		currentPage,
		totalPage,
		setCurrentPage,
		handleDelete,
		handleCreate,
		handleUpdate,
		handleExportTemplatePengetahuan,
		handleImportPengetahuan,
	};
};
