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

export const useSKSUData = () => {
	const [sksu, setSksu] = useState([]);
	const [loading, setLoading] = useState(false);
	const { user } = useContext(AuthContext);
	const [dataSource, setDataSource] = useState([]);
	const [saving, setSaving] = useState(false);
	const [undoStack, setUndoStack] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [prodiDropdown, setProdiDropdown] = useState([]);
	const [selectedProdi, setSelectedProdi] = useState(null);

	// Fetch data
	useEffect(() => {
		const fetchSKSU = async () => {
			setLoading(true);
			try {
				if (user?.prodiId) {
					const data = await getSksu(user.prodiId);
					setSksu(data);
				} else {
					const prodis = await getProdiDropdown();
					setProdiDropdown(prodis);
				}
			} catch (error) {
				console.error("Error fetching SKSU:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchSKSU();
	}, [user?.prodiId]);

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
	};

	// Save data to server
	const handleSaveData = async () => {
		setSaving(true);
		try {
			await postSksu(dataSource);
			message.success("Data berhasil disimpan!");
		} catch (error) {
			message.error("Gagal menyimpan data!");
			console.error("Error saving SKSU:", error);
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
		} catch (error) {
			message.error("Gagal menghapus data!");
			console.error("Error hapus SKSU:", error);
		} finally {
			setLoading(false);
		}
	};

	const props = {
		beforeUpload: (file) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				const data = new Uint8Array(e.target.result);
				const workbook = XLSX.read(data, { type: "array" });

				// Nama sheet yang ingin diakses
				const targetSheetName = "4a_AK-SKSU";
				const sheetNames = workbook.SheetNames;

				if (!sheetNames.includes(targetSheetName)) {
					message.error(`Sheet ${targetSheetName} tidak ditemukan.`);
					return;
				}

				const worksheet = workbook.Sheets[targetSheetName];
				const jsonData = XLSX.utils.sheet_to_json(worksheet);

				// Proses data untuk menghasilkan format
				jsonData
					.filter((row) => row.__EMPTY_1 && row.__EMPTY_2)
					.map((row, index) => {
						// Menghitung nomor key terbaru berdasarkan dataSource
						setDataSource((prevDataSource) => {
							const existingKeys = prevDataSource
								.map((item) => parseInt(item.key.replace("sksu", "")))
								.sort((a, b) => a - b);

							let newKeyNumber = 1;
							for (let i = 0; i < existingKeys.length; i++) {
								if (existingKeys[i] !== newKeyNumber) {
									break;
								}
								newKeyNumber++;
							}

							// Menambahkan baris baru ke dataSource
							const newData = {
								kategori:
									typeof row.__EMPTY_1 === "string" &&
									row.__EMPTY_1.includes("Siap Kerja")
										? "Siap Kerja"
										: "Siap Usaha",
								key: `sksu${newKeyNumber}`,
								profilLulusan: row.__EMPTY_2,
								kualifikasi: row.__EMPTY_3,
								kompetensiKerja: row.__EMPTY_5
									? row.__EMPTY_5
											.split(/\r?\n/)
											.map((item) => item.trim())
											.filter(Boolean)
									: [],
								prodiId: user.prodiId,
								_id: null,
							};

							// Kembalikan dataSource yang diperbarui
							return [...prevDataSource, newData];
						});
					});
				message.success("Data berhasil diproses.");
			};
			reader.readAsArrayBuffer(file);

			// Return false agar file tidak diunggah ke server
			return false;
		},
	};

	return {
		props,
		prodiDropdown,
		selectedProdi,
		sksu,
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
		handleDeleteSksus,
		handleProdiChange,
		handleExportTemplateSksu,
		handleImportSksu,
	};
};
