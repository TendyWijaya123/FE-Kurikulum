import { useState, useEffect, useContext } from "react";
import {
	getIpteks,
	deleteIpteks,
	createIpteks,
	updateIpteks,
} from "../service/api";
import { AuthContext } from "../context/AuthProvider";
import {
	getIpteksTemplate,
	importIpteks,
} from "../service/Import/ImportService";

export const useIpteks = () => {
	const [ipteksData, setIpteksData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [error, setError] = useState(null);
	const [notification, setNotification] = useState({ message: "", type: "" });
	const { user } = useContext(AuthContext);

	const showNotification = (message, type) => {
		setNotification({ message, type });
		setTimeout(() => {
			setNotification({ message: "", type: "" });
		}, 3000);
	};

	const fetchIpteks = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await getIpteks(user?.prodiId);

			if (!response) {
				throw new Error("No data received");
			}

			const { pengetahuan = [], teknologi = [], seni = [] } = response;

			const maxLength = Math.max(
				pengetahuan.length,
				teknologi.length,
				seni.length
			);

			const combinedData = Array.from({ length: maxLength }, (_, index) => ({
				id: index + 1,
				pengetahuan: pengetahuan[index] || null,
				teknologi: teknologi[index] || null,
				seni: seni[index] || null,
			}));

			setIpteksData(combinedData);
		} catch (error) {
			console.error("Error fetching IPTEKS data:", error);
			setError(
				"Gagal mengambil data: " +
					(error.response?.data?.message || error.message)
			);
			setIpteksData([]);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (row) => {
		try {
			if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
				return;
			}
			const deletePromises = [];
			if (row.pengetahuan) {
				deletePromises.push(deleteIpteks("pengetahuan", row.pengetahuan.id));
			}
			if (row.teknologi) {
				deletePromises.push(deleteIpteks("teknologi", row.teknologi.id));
			}
			if (row.seni) {
				deletePromises.push(deleteIpteks("seni", row.seni.id));
			}
			await Promise.all(deletePromises);
			await fetchIpteks();
			showNotification("Data berhasil dihapus", "success");
		} catch (error) {
			showNotification("Gagal menghapus data", "error");
		}
	};

	const handleCreate = async (values) => {
		try {
			const updates = [];
			if (values.pengetahuan) {
				updates.push(
					createIpteks("pengetahuan", {
						ilmu_pengetahuan: values.pengetahuan,
					})
				);
			}

			if (values.teknologi) {
				updates.push(
					createIpteks("teknologi", {
						teknologi: values.teknologi,
					})
				);
			}

			if (values.seni) {
				updates.push(
					createIpteks("seni", {
						seni: values.seni,
					})
				);
			}
			await Promise.all(updates);
			await fetchIpteks();
			showNotification("Data berhasil ditambahkan", "success");
			return true;
		} catch (error) {
			showNotification("Gagal menambahkan data", "error");
			return false;
		}
	};

	const handleUpdate = async (row, values) => {
		try {
			const updates = [];

			if (row.pengetahuan) {
				updates.push(
					updateIpteks("pengetahuan", row.pengetahuan.id, {
						ilmu_pengetahuan: values.pengetahuan,
					})
				);
			}

			if (row.teknologi) {
				updates.push(
					updateIpteks("teknologi", row.teknologi.id, {
						teknologi: values.teknologi,
					})
				);
			}

			if (row.seni) {
				updates.push(
					updateIpteks("seni", row.seni.id, {
						seni: values.seni,
					})
				);
			}

			await Promise.all(updates);

			await fetchIpteks();

			showNotification("Data berhasil diubah", "success");
			return true;
		} catch (error) {
			showNotification("Gagal mengubah data", "error");
			return false;
		}
	};

	const handleExportTemplateIpteks = async () => {
		try {
			await getIpteksTemplate();
		} catch (error) {
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		}
	};

	const handleImportIpteks = async (file) => {
		try {
			await importIpteks(file);
			fetchData();
		} catch (error) {
			message.error("Gagal mengunggah file. Coba lagi.");
		}
	};

	useEffect(() => {
		fetchIpteks();
	}, []);

	return {
		ipteksData,
		loading,
		error,
		notification,
		currentPage,
		totalPage,
		setCurrentPage,
		handleDelete,
		handleCreate,
		handleUpdate,
		handleExportTemplateIpteks,
		handleImportIpteks,
	};
};
