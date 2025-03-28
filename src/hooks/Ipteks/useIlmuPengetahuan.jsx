import { useState, useEffect, useContext } from "react";
import { message } from "antd";
import {
	getIlmuPengetahuan,
	createIlmuPengetahuan,
	deleteIlmuPengetahuan,
	downloadIlmuPengetahuanTemplate,
	importIlmuPengetahuan,
} from "../../service/AnalisisKonsideran/Ipteks";
import { AuthContext } from "../../context/AuthProvider";
import { get } from "react-hook-form";
import { ProdiContext } from "../../context/ProdiProvider";

export const useIlmuPengetahuan = () => {
	const { selectedProdiId } = useContext(ProdiContext);
	const [alert, setAlert] = useState(null);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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
			const response = await getIlmuPengetahuan(prodiId);
			setData(response.data);
		} catch (error) {
			message.error(
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
			await createIlmuPengetahuan(data);
			message.success("Data berhasil disimpan");
			await fetchData();
		} catch (error) {
			setErrors(
				error.response?.data?.errors ||
					error.response?.data?.message || {
						message: "Terjadi kesalahan saat menyimpan ilmu pengetahuan.",
					}
			);
			message.error("Gagal menyimpan ilmu pengetahuan");
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
				await deleteIlmuPengetahuan(itemToDelete.id);
				message.success("Data berhasil dihapus");
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
				.map((index) => data[index]?.id)
				.filter((id) => id && !id.toString().startsWith("new-"));

			if (idsToDelete.length > 0) {
				await Promise.all(idsToDelete.map((id) => deleteIlmuPengetahuan(id)));

				await fetchData();
			}

			message.success(`${selectedRowKeys.length} data berhasil dihapus`);
		} catch (error) {
			message.error("Gagal menghapus data");
			console.error(error);
		} finally {
			// Reset selectedRowKeys setelah selesai
			setSelectedRowKeys([]);
		}
	};

	const handleExportTemplateIlmuPengetahuan = async () => {
		try {
			setSaving(true);
			await downloadIlmuPengetahuanTemplate();
			message.success("Template berhasil diunduh");
		} catch (error) {
			message.error(
				`Gagal mengunduh template: ${error.message || "Terjadi kesalahan"}`
			);
		} finally {
			setSaving(false);
		}
	};

	const handleImportIlmuPengetahuan = async (file) => {
		try {
			setSaving(true);
			const formData = new FormData();
			formData.append("file", file);

			await importIlmuPengetahuan(formData);
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
		handleExportTemplateIlmuPengetahuan,
		handleImportIlmuPengetahuan,
	};
};
