import { useState, useEffect, useContext } from "react";
import {
	getMateriPembelajarans,
	postMateriPembelajaran,
	deleteMateriPembelajaran,
	deleteMateriPembelajarans,
} from "../service/materiPembelajaran";
import { AuthContext } from "../context/AuthProvider";
import { message } from "antd";
import { data } from "react-router-dom";
import { getProdiDropdown } from "../service/api";
import {
	getMateriPembelajaranTemplate,
	importMateriPembelajaran,
} from "../service/Import/ImportService";
import { ProdiContext } from "../context/ProdiProvider";

export const useMPData = () => {
	const { selectedProdiId } = useContext(ProdiContext);
	const [materiPembelajaran, setMateriPembelajaran] = useState([]);
	const [loading, setLoading] = useState(false);
	const { user } = useContext(AuthContext);
	const [dataSource, setDataSource] = useState([]);
	const [saving, setSaving] = useState(false);
	const [undoStack, setUndoStack] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [prodiDropdown, setProdiDropdown] = useState([]);
	const [knowledgeDropdown, setKnowledgeDropdown] = useState([]);
	const [selectedProdi, setSelectedProdi] = useState(null);
	const [errors, setErrors] = useState(null);

	const fetchMateriPembelajaran = async (prodiId = null) => {
		setLoading(true);
		try {
			const { data, knowledge } = await getMateriPembelajarans(prodiId);
			setKnowledgeDropdown(knowledge);
			setMateriPembelajaran(data);
		} catch (error) {
			console.error("Error fetching materi pembelajaran:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMateriPembelajaran(selectedProdiId);
	}, [selectedProdiId]);

	useEffect(() => {
		if (materiPembelajaran.length > 0) {
			setDataSource(
				materiPembelajaran.map((item, index) => ({
					key: "MP-" + index + 1,
					_id: item.id,
					code: item.code,
					description: item.description,
					cognitifProses: item.cognitif_proses,
					knowledgeDimension: item.knowledge_dimension?.length
						? item.knowledge_dimension.map((k) => k.code)
						: [],
					prodiId: user.prodiId,
				}))
			);
		} else {
			setDataSource([]);
		}
	}, [materiPembelajaran]);

	const handleProdiChange = async (value) => {
		setSelectedProdi(value);
		setLoading(true);
		try {
			const data = await getMateriPembelajarans(value); // Ambil data berdasarkan prodiId
			setMateriPembelajaran(data);
		} catch (error) {
			console.error("Error fetching SKSU for selected prodi:", error);
		} finally {
			setLoading(false);
		}
	};

	const saveToUndoStack = (data) => {
		setUndoStack((prevStack) => [...prevStack, data]);
	};

	const handleUndo = () => {
		if (undoStack.length > 0) {
			const previousState = undoStack[undoStack.length - 1];
			setUndoStack(undoStack.slice(0, -1));
			setDataSource(previousState);
		}
	};

	const handleSave = (row) => {
		saveToUndoStack([...dataSource]);
		const newData = [...dataSource];
		const index = newData.findIndex((item) => item.key === row.key);
		if (index > -1) {
			newData[index] = { ...newData[index], ...row };
			setDataSource(newData);
		}
	};

	const handleAddRow = () => {
		saveToUndoStack([...dataSource]);

		const newRow = {
			key: "",
			_id: null,
			code: "",
			description: "",
			cognitifProses: "",
			knowledgeDimension: [],
			prodiId: selectedProdi || user.prodiId,
		};

		const updatedDataSource = [...dataSource, newRow];

		updatedDataSource.forEach((item, index) => {
			item.key = "MP-" + (index + 1); // Key baru: kkni1, kkni2, dst.
			item.code = "MP-" + (index + 1); // Code baru: CPL1, CPL2, dst.
		});

		setDataSource(updatedDataSource);
	};

	const handleDeleteRow = async (key) => {
		saveToUndoStack([...dataSource]);

		const deleteData = dataSource.find((item) => item.key === key);

		if (deleteData?._id !== null) {
			try {
				await deleteMateriPembelajaran(deleteData._id); // Tunggu hingga penghapusan selesai
			} catch (error) {
				console.error(
					`Gagal menghapus item dengan ID ${deleteData._id}:`,
					error
				);
				return; // Keluar jika ada error
			}
		}

		// Hapus item dari data lokal
		const newData = dataSource.filter((item) => item.key !== key);

		// Perbarui ulang key dan code agar tetap urut
		const updatedDataSource = newData.map((item, index) => ({
			...item,
			key: "MP-" + (index + 1), // Update key: kkni1, kkni2, dst.
			code: "MP-" + (index + 1), // Update code: CPL1, CPL2, dst.
		}));

		// Simpan data baru ke state
		setDataSource(updatedDataSource);
	};

	const handleSaveData = async () => {
		setSaving(true);
		setErrors(null);

		try {
			await postMateriPembelajaran(dataSource);
			message.success("Data berhasil disimpan!");
		} catch (error) {
			setErrors(
				error.response?.data?.errors ||
					error.response?.data?.message || {
						message: "Terjadi kesalahan saat menyimpan materi pembelajaran.",
					}
			);
			message.error("Gagal menyimpan materi pembelajaran");
		} finally {
			setSaving(false);
		}
	};

	const rowSelection = {
		selectedRowKeys,
		onChange: (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys),
	};

	const handleExportTemplateMateriPembelajaran = async () => {
		try {
			await getMateriPembelajaranTemplate();
		} catch (error) {
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		}
	};

	const handleImportMateriPembelajaran = async (file) => {
		try {
			await importMateriPembelajaran(file);
			message.success("Data berhasil disimpan!");
			await fetchMateriPembelajaran();
		} catch (error) {
			message.error("Gagal mengunggah file. Coba lagi.");
		}
	};

	const handleDeleteMateriPembelajarans = async () => {
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

			// Hapus data dari server
			if (toDelete.length > 0) {
				await deleteMateriPembelajarans(toDelete); // Pastikan fungsi ini menerima array
				message.success("Data berhasil dihapus!");
			}

			// Perbarui ulang key dan code agar tetap terurut
			const updatedDataSource = toKeep.map((item, index) => ({
				...item,
				key: "MP-" + (index + 1), // Update key: kkni1, kkni2, dst.
				code: "MP-" + (index + 1), // Update code: CPL1, CPL2, dst.
			}));

			// Simpan data baru ke state
			setDataSource(updatedDataSource);
			setSelectedRowKeys([]); // Hapus pilihan row
		} catch (error) {
			message.error("Gagal menghapus data!");
			console.error("Error hapus bench kurikulum:", error);
		} finally {
			setLoading(false);
		}
	};

	return {
		knowledgeDropdown,
		selectedProdi,
		prodiDropdown,
		materiPembelajaran,
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
		handleDeleteMateriPembelajarans,
		handleProdiChange,
		handleImportMateriPembelajaran,
		handleExportTemplateMateriPembelajaran,
	};
};
