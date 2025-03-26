import { useState, useEffect, useContext } from "react";
import {
	deleteSksu,
	getSksu,
	postSksu,
	deleteSksus,
} from "../../service/AnalisisKonsideran/sksu";
import { getProdiDropdown } from "../../service/api";
import { AuthContext } from "../../context/AuthProvider";
import { message } from "antd";
import * as XLSX from "xlsx";
import {
	getSksuTemplate,
	importSksu,
} from "../../service/Import/ImportService";
import { ProdiContext } from "../../context/ProdiProvider";

export const useSKSUData = () => {
	const { selectedProdiId } = useContext(ProdiContext);
	const [sksu, setSksu] = useState([]);
	const [loading, setLoading] = useState(false);
	const { user } = useContext(AuthContext);
	const [dataSource, setDataSource] = useState([]);
	const [saving, setSaving] = useState(false);
	const [undoStack, setUndoStack] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [prodiDropdown, setProdiDropdown] = useState([]);
	const [selectedProdi, setSelectedProdi] = useState(null);
	const [errors, setErrors] = useState(null);

	const fetchSKSU = async (prodiId = null) => {
		setLoading(true);
		try {
			const data = await getSksu(prodiId);
			setSksu(data);
		} catch (error) {
			console.error("Error fetching SKSU:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchSKSU(selectedProdiId);
	}, [selectedProdiId]);

	useEffect(() => {
		if (sksu.length > 0) {
			setDataSource(
				sksu.map((item, index) => ({
					key: "sksu" + (index + 1),
					_id: item.id,
					profilLulusan: item.profil_lulusan,
					kualifikasi: item.kualifikasi,
					kategori: item.kategori,
					prodiId: user.prodiId,
					kompetensiKerja: item.kompetensi_kerja,
				}))
			);
		} else {
			setDataSource([]);
		}
	}, [sksu]);

	// Handle prodi change
	const handleProdiChange = async (value) => {
		setSelectedProdi(value);
		setLoading(true);
		try {
			const data = await getSksu(value); // Ambil data berdasarkan prodiId
			setSksu(data);
			console.log(sksu);
		} catch (error) {
			console.error("Error fetching SKSU for selected prodi:", error);
		} finally {
			setLoading(false);
		}
	};

	// Save undo state
	const saveToUndoStack = (data) => {
		setUndoStack((prevStack) => [...prevStack, data]);
	};

	// Handle Undo
	const handleUndo = () => {
		if (undoStack.length > 0) {
			const previousState = undoStack[undoStack.length - 1];
			setUndoStack(undoStack.slice(0, -1));
			setDataSource(previousState);
		}
	};

	// Handle save
	const handleSave = (row) => {
		saveToUndoStack([...dataSource]);
		const newData = [...dataSource];
		const index = newData.findIndex((item) => item.key === row.key);
		if (index > -1) {
			newData[index] = { ...newData[index], ...row };
			setDataSource(newData);
		}
	};

	const handleExportTemplateSksu = async () => {
		try {
			await getSksuTemplate();
		} catch (error) {
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		}
	};

	const handleImportSksu = async (file) => {
		setLoading(true);
		try {
			await importSksu(file);
			message.success("Data berhasil disimpan!");
			await fetchSKSU();
		} catch (error) {
			message.error("Gagal mengunggah file. Coba lagi.");
		} finally {
			setLoading(false);
		}
	};

	// Add row
	const handleAddRow = () => {
		saveToUndoStack([...dataSource]);

		const existingKeys = dataSource
			.map((item) => parseInt(item.key.replace("sksu", "")))
			.sort((a, b) => a - b);
		let newKeyNumber = 1;

		for (let i = 0; i < existingKeys.length; i++) {
			if (existingKeys[i] !== newKeyNumber) {
				break;
			}
			newKeyNumber++;
		}

		const newRow = {
			key: "sksu" + newKeyNumber,
			_id: null,
			profilLulusan: "",
			kualifikasi: "",
			kategori: "",
			kompetensiKerja: "",
			prodiId: selectedProdi || user.prodiId, // Gunakan prodi terpilih
		};

		setDataSource([...dataSource, newRow]);
	};

	// Delete row
	const handleDeleteRow = async (key) => {
		saveToUndoStack([...dataSource]);

		const deleteData = dataSource.find((item) => item.key === key);

		if (deleteData?._id !== null) {
			try {
				await deleteSksu(deleteData._id);
			} catch (error) {
				console.error("Error deleting SKSU:", error);
				return;
			}
		}

		const newData = dataSource.filter((item) => item.key !== key);
		setDataSource(newData);
		await fetchSKSU();
	};

	// Save data to server
	const handleSaveData = async () => {
		setSaving(true);
		setErrors(null);
		try {
			await postSksu(dataSource);
			message.success("Berhasil Menyimpan SKSU");
			await fetchSKSU();
		} catch (error) {
			setErrors(
				error.response?.data?.errors ||
					error.response?.data?.message || {
						message: "Terjadi kesalahan saat menyimpan SKSU.",
					}
			);
			message.error("Gagal menyimpan SKSU");
		} finally {
			setSaving(false);
		}
	};

	const rowSelection = {
		selectedRowKeys,
		onChange: (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys),
	};

	const handleDeleteSksus = async () => {
		setLoading(true);
		try {
			const { toDelete, toKeep } = dataSource.reduce(
				(acc, item) => {
					if (selectedRowKeys.includes(item.key)) {
						acc.toDelete.push(item);
					} else {
						acc.toKeep.push(item);
					}
					return acc;
				},
				{ toDelete: [], toKeep: [] }
			);

			await deleteSksus(toDelete);
			message.success("Data berhasil dihapus!");

			setDataSource(toKeep);
			setSelectedRowKeys([]);
			await fetchSKSU();
		} catch (error) {
			message.error("Gagal menghapus data!");
			console.error("Error hapus SKSU:", error);
		} finally {
			setLoading(false);
		}
	};

	return {
		prodiDropdown,
		selectedProdi,
		sksu,
		loading,
		dataSource,
		saving,
		undoStack,
		rowSelection,
		selectedRowKeys,
		errors,
		handleUndo,
		handleSave,
		handleAddRow,
		handleDeleteRow,
		handleSaveData,
		handleDeleteSksus,
		handleProdiChange,
		handleExportTemplateSksu,
		handleImportSksu,
	};
};
