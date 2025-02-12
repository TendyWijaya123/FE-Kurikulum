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
		  setIpteksData(response.data);
		} catch (error) {
		  console.error("Error fetching IPTEKS data:", error);
		  setError("Gagal mengambil data: " + (error.response?.data?.message || error.message));
		} finally {
		  setLoading(false);
		}
	  };
	
	  const handleDelete = async (row) => {
		if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
		  return;
		}
		try {
		  await deleteIpteks(row.id);
		  await fetchIpteks();
		  showNotification("Data berhasil dihapus", "success");
		} catch (error) {
		  showNotification("Gagal menghapus data", "error");
		}
	  };
	
	  const handleCreate = async (values) => {
		try {
		  await createIpteks(values);
		  await fetchIpteks();
		  showNotification("Data berhasil ditambahkan", "success");
		  return true;
		} catch (error) {
		  showNotification("Gagal menambahkan data", "error");
		  return false;
		}
	  };
	
	  const handleUpdate = async (id, values) => {
		try {
		  await updateIpteks(id, values);
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
			message.success("berhasil inport data, refresh halaman!!");
		} catch (error) {
			message.error("Gagal mengunggah file. Coba lagi.");
		}
	};

	const handleMultiDelete = async (ids) => {
		if (!window.confirm(`Apakah Anda yakin ingin menghapus ${ids.length} data yang dipilih?`)) {
		  return;
		}
		
		try {
		  for (const id of ids) {
			await deleteIpteks(id);
		  }
		  await fetchIpteks();
		  showNotification(`${ids.length} data berhasil dihapus`, "success");
		} catch (error) {
		  showNotification("Gagal menghapus data", "error");
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
		handleMultiDelete
	};
};
