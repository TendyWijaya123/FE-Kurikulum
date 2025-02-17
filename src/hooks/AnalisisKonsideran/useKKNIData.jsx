import { useState, useEffect, useContext } from "react";
import {
	getKkni,
	deleteKkni,
	postKkni,
	deleteKknis,
} from "../../service/AnalisisKonsideran/kkni";
import { getProdiDropdown } from "../../service/api";
import { AuthContext } from "../../context/AuthProvider";
import { message } from "antd";
import { data } from "react-router-dom";
import {
	getKkniTemplate,
	importKkni,
} from "../../service/Import/ImportService";

export const useKKNIData = () => {
	const [kkni, setKkni] = useState([]);
	const [loading, setLoading] = useState(false);
	const { user } = useContext(AuthContext);
	const [dataSource, setDataSource] = useState([]);
	const [saving, setSaving] = useState(false);
	const [undoStack, setUndoStack] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [prodiDropdown, setProdiDropdown] = useState([]);
	const [selectedProdi, setSelectedProdi] = useState(null);

	const dataKemampuanKerjaKKNI = [
		{ 
			"level": 9,
			"deskripsi": "Mampu mengembangkan pengetahuan, teknologi, dan/atau seni baru di dalam bidang keilmuannya atau praktek profesionalnya melalui riset, hingga menghasilkan karya kreatif, original, dan teruji.",
			"jenjang": "Doktor"
		},
		{ 
			"level": 8,
			"deskripsi": "Mampu mengembangkan pengetahuan, teknologi, dan/atau seni di dalam bidang keilmuannya atau praktek profesionalnya melalui riset, hingga menghasilkan karya inovatif dan teruji.",
			"jenjang": "Magister"
		},
		{ 
			"level": 7,
			"deskripsi": "Mampu merencanakan dan mengelola sumberdaya di bawah tanggung jawabnya, dan mengevaluasi secara komprehensif kerjanya dengan memanfaatkan ilmu pengetahuan, teknologi, dan/atau seni untuk menghasilkan langkah-langkah pengembangan strategis organisasi.",
			"jenjang": "Profesi"
		},
		{ 
			"level": 6,
			"deskripsi": "Mampu mengaplikasikan bidang keahliannya dan memanfaatkan ilmu pengetahuan, teknologi, dan/atau seni pada bidangnya dalam penyelesaian masalah serta mampu beradaptasi terhadap situasi yang dihadapi.",
			"jenjang": "Sarjana"
		},
		{ 
			"level": 5,
			"deskripsi": "Mampu menyelesaikan pekerjaan berlingkup luas, memilih metode yang sesuai dari beragam pilihan yang sudah maupun belum baku dengan menganalisis data, serta mampu menunjukkan kinerja dengan mutu dan kuantitas yang terukur.",
			"jenjang": "Diploma 3"
		},
		{ 
			"level": 4,
			"deskripsi": "Mampu menyelesaikan tugas berlingkup luas dan kasus spesifik dengan mengadaptasi secara terbatas, memilih metode yang sesuai dari beberapa pilihan yang baku, serta mampu menunjukkan kinerja dengan mutu dan kuantitas yang terukur.",
			"jenjang": "Diploma 2"
		},
		{ 
			"level": 3,
			"deskripsi": "Mampu melaksanakan serangkaian tugas spesifik, dengan menerjemahkan informasi dan menggunakan alat, berdasarkan sejumlah pilihan prosedur kerja, serta mampu menunjukkan kinerja dengan mutu dan kuantitas yang terukur, yang sebagian merupakan hasil kerja sendiri dengan pengawasan tidak langsung.",
			"jenjang": "Diploma 1"
		}
	];

	const dataPengetahuanKKNI = [
		{ 
			"level": 9,
			"deskripsi": "Mampu memecahkan permasalahan sains, teknologi, dan/atau seni di dalam bidang keilmuannya melalui pendekatan inter, multi atau transdisipliner.",
			"jenjang": "Doktor"
		},
		{ 
			"level": 8,
			"deskripsi": "Mampu memecahkan permasalahan ilmu pengetahuan, teknologi, dan/atau seni di dalam bidang keilmuannya melalui pendekatan inter atau multidisipliner.",
			"jenjang": "Magister"
		},
		{ 
			"level": 7,
			"deskripsi": "Mampu memecahkan permasalahan sains, teknologi, dan/atau seni di dalam bidang keilmuannya melalui pendekatan monodisipliner.",
			"jenjang": "Profesi"
		},
		{ 
			"level": 6,
			"deskripsi": "Menguasai konsep teoritis bidang pengetahuan tertentu secara umum dan konsep teoritis bagian khusus dalam bidang pengetahuan tersebut secara mendalam, serta mampu memformulasikan penyelesaian masalah prosedural.",
			"jenjang": "Sarjana"
		},
		{ 
			"level": 5,
			"deskripsi": "Menguasai konsep teoritis bidang pengetahuan tertentu secara umum, serta mampu memformulasikan penyelesaian masalah prosedural.",
			"jenjang": "Diploma 3"
		},
		{ 
			"level": 4,
			"deskripsi": "Menguasai beberapa prinsip dasar bidang keahlian tertentu dan mampu menyelaraskan dengan permasalahan faktual di bidang kerjanya.",
			"jenjang": "Diploma 2"
		},
		{ 
			"level": 3,
			"deskripsi": "Memiliki pengetahuan operasional yang lengkap, prinsip-prinsip serta konsep umum yang terkait dengan fakta bidang keahlian tertentu, sehingga mampu menyelesaikan berbagai masalah yang lazim dengan metode yang sesuai.",
			"jenjang": "Diploma 1"
		}
	];

	const fetchKkni = async () => {
		setLoading(true);
		try {
			if (user?.prodiId) {
				const data = await getKkni(user.prodiId);
				setKkni(data);
			} else {
				const prodis = await getProdiDropdown();
				setProdiDropdown(prodis);
			}
		} catch (error) {
			console.error("Error fetching kkni:", error);
		} finally {
			setLoading(false);
		}
	};

	// Fetch data
	useEffect(() => {
		fetchKkni();
	}, [user?.prodiId]);

	useEffect(() => {
		if (kkni.length > 0) {
			setDataSource(
				kkni.map((item, index) => ({
					key: "kkni" + index + 1,
					_id: item.id,
					code: item.code,
					description: item.description,
					prodiId: user.prodiId,
				}))
			);
			console.log(dataSource);
		} else {
			setDataSource([]);
		}
	}, [kkni]);

	const handleProdiChange = async (value) => {
		setSelectedProdi(value);
		setLoading(true);
		try {
			const data = await getKkni(value); // Ambil data berdasarkan prodiId
			setKkni(data);
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

	// Add row
	const handleAddRow = () => {
		// Simpan kondisi sebelum perubahan untuk undo
		saveToUndoStack([...dataSource]);

		// Tambahkan baris baru
		const newRow = {
			key: "", // Akan diperbarui nanti
			_id: null,
			code: "", // Akan diperbarui nanti
			kategori: "",
			prodiId: selectedProdi || user.prodiId,
		};

		// Gabungkan data baru ke dalam dataSource
		const updatedDataSource = [...dataSource, newRow];

		// Perbarui urutan key dan code berdasarkan posisi baru
		updatedDataSource.forEach((item, index) => {
			item.key = "kkni" + (index + 1); // Key baru: kkni1, kkni2, dst.
			item.code = "CPL-" + (index + 1); // Code baru: CPL1, CPL2, dst.
		});

		// Simpan kembali dataSource
		setDataSource(updatedDataSource);
	};

	// Delete row
	const handleDeleteRow = async (key) => {
		saveToUndoStack([...dataSource]);

		// Temukan data yang akan dihapus
		const deleteData = dataSource.find((item) => item.key === key);

		// Jika data memiliki `_id`, hapus dari server terlebih dahulu
		if (deleteData?._id !== null) {
			try {
				await deleteKkni(deleteData._id); // Tunggu hingga penghapusan selesai
				console.log(
					`Item dengan ID ${deleteData._id} berhasil dihapus dari server.`
				);
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
			key: "kkni" + (index + 1), // Update key: kkni1, kkni2, dst.
			code: "CPL-" + (index + 1), // Update code: CPL1, CPL2, dst.
		}));

		// Simpan data baru ke state
		setDataSource(updatedDataSource);
	};

	const handleExportTemplateKkni = async () => {
		try {
			await getKkniTemplate();
		} catch (error) {
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		}
	};

	const handleImportKkni = async (file) => {
		try {
			await importKkni(file);
			message.success('berhasil inport kkni');
			await fetchKkni();
		} catch (error) {
			message.error("Gagal mengunggah file. Coba lagi.");
		}
	};

	// Save data to server
	const handleSaveData = async () => {
		setSaving(true);
		try {
			await postKkni(dataSource);
			message.success("Data berhasil disimpan!");
			await fetchKkni();
		} catch (error) {
			message.error("Gagal menyimpan data!");
			console.error("Error saving kkni:", error);
		} finally {
			setSaving(false);
		}
	};

	const rowSelection = {
		selectedRowKeys,
		onChange: (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys),
	};

	const handleDeleteKknis = async () => {
		setLoading(true);
		try {
			// Pisahkan data yang akan dihapus dan yang akan disimpan
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
				await deleteKknis(toDelete); // Pastikan fungsi ini menerima array
				message.success("Data berhasil dihapus!");
			}

			// Perbarui ulang key dan code agar tetap terurut
			const updatedDataSource = toKeep.map((item, index) => ({
				...item,
				key: "kkni" + (index + 1), // Update key: kkni1, kkni2, dst.
				code: "CPL-" + (index + 1), // Update code: CPL1, CPL2, dst.
			}));

			// Simpan data baru ke state
			setDataSource(updatedDataSource);
			setSelectedRowKeys([]); // Hapus pilihan row
			await fetchKkni();
		} catch (error) {
			message.error("Gagal menghapus data!");
			console.error("Error hapus bench kurikulum:", error);
		} finally {
			setLoading(false);
		}
	};

	return {
		selectedProdi,
		prodiDropdown,
		kkni,
		loading,
		dataSource,
		saving,
		undoStack,
		rowSelection,
		selectedRowKeys,
		dataKemampuanKerjaKKNI,
		dataPengetahuanKKNI,
		handleUndo,
		handleSave,
		handleAddRow,
		handleDeleteRow,
		handleSaveData,
		handleDeleteKknis,
		handleProdiChange,
		handleExportTemplateKkni,
		handleImportKkni,
		setDataSource,
	};
};
