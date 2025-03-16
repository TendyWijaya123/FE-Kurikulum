import { useState, useEffect, useContext } from "react";
import {
	getBenchKurikulums,
	deleteBenchKurikulums,
	postBenchKurikulms,
	deleteBK,
} from "../../service/AnalisisKonsideran/benchKurikulums";
import { getProdiDropdown } from "../../service/api";
import { AuthContext } from "../../context/AuthProvider";
import { message } from "antd";
import { data } from "react-router-dom";
import { set } from "react-hook-form";
import {
	getBenchKurikulumTemplate,
	importBenchKurikulum,
} from "../../service/Import/ImportService";
import { ProdiContext } from "../../context/ProdiProvider";

export const useBCData = () => {
	const { selectedProdiId } = useContext(ProdiContext);
	const [benchKurikulums, setBenchKurikulums] = useState([]);
	const [loading, setLoading] = useState(false);
	const { user } = useContext(AuthContext);
	const [dataSource, setDataSource] = useState([]);
	const [saving, setSaving] = useState(false);
	const [undoStack, setUndoStack] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [prodiDropdown, setProdiDropdown] = useState([]);
	const [selectedProdi, setSelectedProdi] = useState(null);

	const fetchBenchKurikulums = async (prodiId = null) => {
		setLoading(true);
		try {
			const data = await getBenchKurikulums(prodiId);
			setBenchKurikulums(data);
		} catch (error) {
			console.error("Error fetching bench kurikulums:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchBenchKurikulums(selectedProdiId);
	}, [selectedProdiId]);

	useEffect(() => {
		if (benchKurikulums.length > 0) {
			setDataSource(
				benchKurikulums.map((item, index) => ({
					key: "benchKurikulums" + index + 1,
					_id: item.id,
					programStudi: item.program_studi,
					kategori: item.kategori,
					prodiId: user.prodiId,
					cpl: item.cpl,
					ppm: item.ppm,
				}))
			);
		} else {
			setDataSource([]);
		}
	}, [benchKurikulums]);

	const handleProdiChange = async (value) => {
		setSelectedProdi(value);
		setLoading(true);
		try {
			const data = await getBenchKurikulums(value); // Ambil data berdasarkan prodiId
			setBenchKurikulums(data);
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

	const handleExportTemplateBenchKurikulum = async () => {
		try {
			await getBenchKurikulumTemplate();
		} catch (error) {
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		}
	};

	const handleImportBenchKurikulum = async (file) => {
		try {
			await importBenchKurikulum(file);
			message.success("berhasil mengimport data");
			await fetchBenchKurikulums();
		} catch (error) {
			message.error("Gagal mengunggah file. Coba lagi.");
		}
	};

	// Add row
	const handleAddRow = () => {
		saveToUndoStack([...dataSource]);

		// Cari key yang hilang dalam urutan
		const existingKeys = dataSource
			.map((item) => parseInt(item.key.replace("benchKurikulums", "")))
			.sort((a, b) => a - b);
		let newKeyNumber = 1; // Mulai dari 1

		for (let i = 0; i < existingKeys.length; i++) {
			if (existingKeys[i] !== newKeyNumber) {
				break; // Key yang hilang ditemukan
			}
			newKeyNumber++;
		}

		const newRow = {
			key: "benchKurikulums" + newKeyNumber,
			_id: null,
			programStudi: "",
			kategori: "",
			cpl: "",
			ppm: "",
			prodiId: selectedProdi || user.prodiId,
		};

		setDataSource([...dataSource, newRow]);
	};

	// Delete row
	const handleDeleteRow = async (key) => {
		saveToUndoStack([...dataSource]);

		const deleteData = dataSource.find((item) => item.key === key); // Mengambil item yang ingin dihapus

		if (deleteData?._id !== null) {
			try {
				await deleteBK(deleteData._id); // Menunggu hingga penghapusan selesai
				console.log(
					`Item dengan ID ${deleteData._id} berhasil dihapus dari server.`
				);
			} catch (error) {
				console.error(
					`Gagal menghapus item dengan ID ${deleteData._id}:`,
					error
				);
				return; // Berhenti di sini jika ada error
			}
		}

		const newData = dataSource.filter((item) => item.key !== key); // Memperbarui data lokal
		setDataSource(newData); // Mengatur ulang dataSource
	};

	// Save data to server
	const handleSaveData = async () => {
		setSaving(true);
		try {
			await postBenchKurikulms(dataSource);
			message.success("Data berhasil disimpan!");
			await fetchBenchKurikulums();
		} catch (error) {
			message.error("Gagal menyimpan data!");
			console.error("Error saving bench kurikulums:", error);
		} finally {
			setSaving(false);
		}
	};

	const rowSelection = {
		selectedRowKeys,
		onChange: (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys),
	};

	const handleDeleteBenchKurikulums = async () => {
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

			await deleteBenchKurikulums(toDelete); // Menghapus data ke server
			message.success("Data berhasil dihapus!");

			setDataSource(toKeep); // Memperbarui data tanpa data yang dihapus
			setSelectedRowKeys([]);
			await fetchBenchKurikulums();
		} catch (error) {
			message.error("Gagal menghapus data!");
			console.error("Error hapus bench kurikulum:", error);
		} finally {
			setLoading(false);
		}
	};

	return {
		prodiDropdown,
		selectedProdi,
		benchKurikulums,
		loading,
		dataSource,
		saving,
		undoStack,
		rowSelection,
		selectedRowKeys,
		handleUndo,
		handleSave,
		handleAddRow,
		handleDeleteRow,
		handleSaveData,
		handleDeleteBenchKurikulums,
		handleProdiChange,
		handleExportTemplateBenchKurikulum,
		handleImportBenchKurikulum,
	};
};
