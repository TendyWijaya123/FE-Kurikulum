import { useState, useEffect, useContext } from "react";
import {
	getPengetahuan,
	deletePengetahuan,
	upsertPengetahuan,
} from "../service/api";
import { AuthContext } from "../context/AuthProvider";
import {
	getPengetahuanTemplate,
	importPengetahuan,
} from "../service/Import/ImportService";
import { message } from "antd";
import { ProdiContext } from "../context/ProdiProvider";

const notifications = {
	success: {
		delete: "Data berhasil dihapus",
		create: "Data berhasil ditambahkan",
		update: "Data berhasil diperbarui",
		saveAll: "Data berhasil disimpan",
		import: "Data berhasil diimport",
	},
	error: {
		fetch: "Gagal mengambil data pengetahuan",
		delete: "Gagal menghapus data",
		create: "Gagal menambah data",
		update: "Gagal memperbarui data",
		saveAll: "Gagal menyimpan data",
		import: "Gagal mengunggah file. Coba lagi",
	},
};

export const usePengetahuan = () => {
	const { selectedProdiId } = useContext(ProdiContext);
	const [pengetahuanData, setPengetahuanData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState(null);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const { user } = useContext(AuthContext);
	const [undoStack, setUndoStack] = useState([]);

	// Function to save current state to undo stack
	const saveToUndoStack = (data) => {
		setUndoStack((prevStack) => [...prevStack, [...data]]);
	};

	// Handle Undo
	const handleUndo = () => {
		if (undoStack.length > 0) {
			const previousState = undoStack[undoStack.length - 1];
			setUndoStack(undoStack.slice(0, -1));
			setPengetahuanData(previousState);
		}
	};

	const fetchPengetahuan = async (prodiId = null) => {
		setLoading(true);
		setError(null);
		try {
			const response = await getPengetahuan(prodiId);
			setPengetahuanData(
				response.data.map((item) => ({
					...item,
					key: item.id,
				}))
			);
		} catch (err) {
			setError(err.response?.data?.message || notifications.error.fetch);
			message.error(notifications.error.fetch);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id) => {
		try {
			await deletePengetahuan(id);
			// Update local state instead of refetching
			setPengetahuanData((prevData) =>
				prevData.filter((item) => item.id !== id)
			);
			return true;
		} catch (err) {
			message.error(err.response?.data?.message || notifications.error.delete);
			return false;
		}
	};

	const handleMultiDelete = async (keys) => {
		try {
			saveToUndoStack(pengetahuanData);

			const deletePromises = keys.map((key) => deletePengetahuan(key));
			await Promise.all(deletePromises);

			setPengetahuanData((prevData) =>
				prevData.filter((item) => !keys.includes(item.key))
			);

			message.success(`${keys.length} item berhasil dihapus`);
			setSelectedRowKeys([]);
			return true;
		} catch (error) {
			message.error(notifications.error.delete);
			return false;
		}
	};

	const handleCreate = async (values) => {
		try {
			const newItem = {
				id: null,
				deskripsi: values.deskripsi,
				kode_pengetahuan: "Auto",
			};

			saveToUndoStack(pengetahuanData);
			const data = [newItem];
			await upsertPengetahuan(data);
			message.success(notifications.success.create);
			fetchPengetahuan();
			return true;
		} catch (err) {
			message.error(err.response?.data?.message || notifications.error.create);
			return false;
		}
	};

	const handleBatchCreate = async (entries) => {
		try {
			saveToUndoStack(pengetahuanData);
			const data = entries.map((entry) => ({
				id: null,
				deskripsi: entry.deskripsi,
				kode_pengetahuan: "Auto",
			}));

			await upsertPengetahuan(data);
			message.success(notifications.success.create);
			fetchPengetahuan();
			return true;
		} catch (err) {
			message.error(err.response?.data?.message || notifications.error.create);
			return false;
		}
	};

	const handleFieldEdit = (record, field, value) => {
		saveToUndoStack(pengetahuanData);
		const newData = [...pengetahuanData];
		const index = newData.findIndex((item) => record.key === item.key);
		if (index > -1) {
			const item = newData[index];
			newData.splice(index, 1, { ...item, [field]: value });
			setPengetahuanData(newData);
		}
	};

	const handleAddRow = () => {
		saveToUndoStack(pengetahuanData);
		const newRow = {
			id: null,
			key: `new-${Date.now()}`,
			kode_pengetahuan: "Auto",
			deskripsi: "",
		};
		setPengetahuanData([...pengetahuanData, newRow]);
	};

	const handleDeleteRow = async (record) => {
		if (record.id === null) {
			setPengetahuanData((prevData) =>
				prevData.filter((item) => item.key !== record.key)
			);
			message.success("Baris berhasil dihapus");
		} else {
			const success = await handleDelete(record.id);
			if (success) {
				message.success(notifications.success.delete);
			}
		}
	};

	const handleSaveAll = async () => {
		setSaving(true);
		try {
			const itemsToSave = pengetahuanData.filter(
				(item) => item.deskripsi.trim() !== ""
			);

			const payload = itemsToSave.map((item) => ({
				id: item.id,
				deskripsi: item.deskripsi,
			}));

			await upsertPengetahuan(payload);
			message.success(notifications.success.saveAll);
			fetchPengetahuan();
			return true;
		} catch (error) {
			message.error(notifications.error.saveAll);
			return false;
		} finally {
			setSaving(false);
		}
	};

	const handleExportTemplatePengetahuan = async () => {
		try {
			await getPengetahuanTemplate();
		} catch (error) {
			message.error(`Gagal mengunduh template: ${error.message || error}`);
		}
	};

	const handleImportPengetahuan = async (file) => {
		try {
			await importPengetahuan(file);
			message.success(notifications.success.import);
			fetchPengetahuan();
			return true;
		} catch (error) {
			message.error(notifications.error.import);
			return false;
		}
	};

	useEffect(() => {
		fetchPengetahuan(selectedProdiId);
	}, [selectedProdiId]);

	return {
		pengetahuanData,
		loading,
		saving,
		error,
		selectedRowKeys,
		setSelectedRowKeys,
		handleDelete,
		handleCreate,
		handleMultiDelete,
		handleExportTemplatePengetahuan,
		handleImportPengetahuan,
		handleFieldEdit,
		handleAddRow,
		handleSaveAll,
		handleUndo,
		handleBatchCreate,
		handleDeleteRow,
	};
};
