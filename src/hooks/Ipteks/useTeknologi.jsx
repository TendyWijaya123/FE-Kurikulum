import { useState, useEffect, useContext } from "react";
import { message } from "antd";
import {
	getTeknologi,
	createTeknologi,
	deleteTeknologi,
	downloadTeknologiTemplate,
	importTeknologi,
} from "../../service/AnalisisKonsideran/Ipteks";
import { AuthContext } from "../../context/AuthProvider";
import { ProdiContext } from "../../context/ProdiProvider";

export const useTeknologi = () => {
	const { selectedProdiId } = useContext(ProdiContext);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const { user } = useContext(AuthContext);
	const [errors, setErrors] = useState(null);

	const rowSelection = {
		selectedRowKeys,
		onChange: (newSelectedRowKeys) => {
			setSelectedRowKeys(newSelectedRowKeys);
		},
	};

	const fetchData = async (prodiId = null) => {
		setLoading(true);
		try {
			const response = await getTeknologi(prodiId);
			setData(response.data);
		} catch (error) {
			console.error(
				"Gagal mengambil data: " +
					(error.response?.data?.message || error.message)
			);
		} finally {
			setLoading(false);
		}
	};

	const handleSave = (index, field, value) => {
		setData((prevData) => {
			const updatedData = [...prevData];
			updatedData[index] = {
				...updatedData[index],
				[field]: value,
			};
			return updatedData;
		});
	};

	const handleSaveData = async () => {
		setSaving(true);
		setErrors(null);

		try {
			await createTeknologi(data);
			message.success("Ilmu  pengetahuan berhasi disimpan");
			await fetchData();
		} catch (error) {
			setErrors(
				error.response?.data?.errors ||
					error.response?.data?.message || {
						message: "Terjadi kesalahan saat menyimpan teknologi.",
					}
			);
			message.error("Gagal menyimpan teknologi");
		} finally {
			setSaving(false);
		}
	};

	const handleCreate = () => {
		const newData = {
			id: null,
			deskripsi: "",
			link_sumber: "",
		};
		setData([...data, newData]);
	};

	const handleDelete = async (index) => {
		try {
			const updatedData = [...data];
			const itemToDelete = updatedData[index];

			if (itemToDelete?.id) {
				await deleteTeknologi(itemToDelete.id);
				message.success("Teknologi berhasil dihapus");
			}

			updatedData.splice(index, 1);
			setData(updatedData);
		} catch (error) {
			message.error("Gagal menghapus data");
		}
	};

	const handleMultiDelete = async () => {
		try {
			const idsToDelete = selectedRowKeys
				.map((index) => data[index]?.id) // Ambil ID berdasarkan index
				.filter((id) => id && !id.toString().startsWith("new-")); // Pastikan ID valid

			if (idsToDelete.length > 0) {
				await Promise.all(idsToDelete.map((id) => deleteTeknologi(id)));

				// Ambil data terbaru
				await fetchData();
			}

			message.success(`${selectedRowKeys.length} data berhasil dihapus`);
		} catch (error) {
			message.error("Gagal menghapus data");
		} finally {
			// Reset selectedRowKeys setelah selesai
			setSelectedRowKeys([]);
		}
	};

	const handleExportTemplateTeknologi = async () => {
		setLoading(true);
		try {
			const response = await downloadTeknologiTemplate();
			const blob = new Blob([response], {
				type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			});
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", "template-teknologi.xlsx");
			document.body.appendChild(link);
			link.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(link);

			message.success("Template berhasil diexport");
		} catch (error) {
			message.error(
				"Gagal mengunduh template: " +
					(error.response?.data?.message || error.message)
			);
		} finally {
			setLoading(false);
		}
	};

	const handleImportTeknologi = async (file) => {
		setLoading(true);
		try {
			setSaving(true);
			const formData = new FormData();
			formData.append("file", file);

			await importTeknologi(formData);
			await fetchData();
			message.success("Data berhasil diimport");
		} catch (error) {
			console.error("Import error:", error);
			message.error(
				error.response?.data?.message ||
					"Gagal mengimport data. Silakan coba lagi."
			);
			throw error;
		} finally {
			setLoading(false);
			setSaving(false);
		}
	};

	useEffect(() => {
		fetchData(selectedProdiId);
	}, [selectedProdiId]);

	return {
		data,
		loading,
		saving,
		selectedRowKeys,
		rowSelection,
		errors,
		handleSave,
		handleDelete,
		handleCreate,
		handleSaveData,
		handleMultiDelete,
		handleImportTeknologi,
		handleExportTemplateTeknologi,
	};
};
