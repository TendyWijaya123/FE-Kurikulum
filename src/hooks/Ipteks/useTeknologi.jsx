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
			message.error(
				"Gagal mengambil data: " +
					(error.response?.data?.message || error.message)
			);
		} finally {
			setLoading(false);
		}
	};

	const handleSave = (updatedRecord) => {
		const newData = data.map((item) =>
			item.id === updatedRecord.id ? updatedRecord : item
		);
		setData(newData);
	};

	const handleSaveData = async () => {
		setSaving(true);
		try {
			await createTeknologi(data);
			message.success("Data berhasil disimpan");
			await fetchData();
		} catch (error) {
			message.error(
				"Gagal menyimpan data: " +
					(error.response?.data?.message || error.message)
			);
		} finally {
			setSaving(false);
		}
	};

	const handleCreate = () => {
		const newId = `new-${Date.now()}`;
		const newData = {
			id: newId,
			deskripsi: "",
			link_sumber: "",
			key: newId,
		};
		setData([...data, newData]);
		return newId;
	};

	const handleDelete = async (record) => {
		try {
			if (record.id.toString().startsWith("new-")) {
				setData(data.filter((item) => item.id !== record.id));
			} else {
				await deleteTeknologi(record.id);
				await fetchData();
			}
			message.success("Data berhasil dihapus");
		} catch (error) {
			message.error("Gagal menghapus data");
		}
	};

	const handleMultiDelete = async (ids) => {
		try {
			for (const id of ids) {
				if (!id.toString().startsWith("new-")) {
					await deleteTeknologi(id);
				}
			}
			await fetchData();
			setSelectedRowKeys([]);
			message.success(`${ids.length} data berhasil dihapus`);
		} catch (error) {
			message.error("Gagal menghapus data");
		}
	};

	const handleExportTemplateTeknologi = async () => {
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
		} catch (error) {
			message.error(
				"Gagal mengunduh template: " +
					(error.response?.data?.message || error.message)
			);
		}
	};

	const handleImportTeknologi = async (file) => {
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
		handleSave,
		handleDelete,
		handleCreate,
		handleSaveData,
		handleMultiDelete,
		handleImportTeknologi,
		handleExportTemplateTeknologi,
	};
};
