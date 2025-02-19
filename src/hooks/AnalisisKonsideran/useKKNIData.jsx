import { useState, useEffect, useContext } from "react";
import {
	getKkni,
	deleteKkni,
	postKkni,
	deleteKknis,
	autoCpl,
} from "../../service/AnalisisKonsideran/kkni";
import { getProdiDropdown } from "../../service/api";
import { AuthContext } from "../../context/AuthProvider";
import { message } from "antd";
import { data } from "react-router-dom";
import {
	getKkniTemplate,
	importKkni,
} from "../../service/Import/ImportService";
import { ContactPageSharp } from "@mui/icons-material";

export const useKKNIData = () => {
	const [kkni, setKkni] = useState([]);
	const [loading, setLoading] = useState(false);
	const { user } = useContext(AuthContext);
	const [dataSource, setDataSource] = useState([]);
	const [saving, setSaving] = useState(false);
	const [undoStack, setUndoStack] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [selectedRowKeysCpl, setSelectedRowKeysCpl] = useState([]);
	const [prodiDropdown, setProdiDropdown] = useState([]);
	const [selectedProdi, setSelectedProdi] = useState(null);
	const [pengetahuanKkni, setPengetahuanKkni] = useState([]);
	const [kemampuanKerjaKkni, setkemampuanKerjaKkni] = useState([]);
	const [selectedPengetahuan, setSelectedPengetahuan] = useState(null);
	const [selectedKemampuanKerja, setSelectedKemampuanKerja] = useState(null);
	const [dataSaranCpl, setDataSaranCpl] = useState([]);
	const [dataSourceCpl, setDataSourceCpl] = useState([]);
	const [isAutoCpl, setAutoCpl] = useState(false);

	const fetchKkni = async () => {
		setLoading(true);
		try {
			if (user?.prodiId) {
				const data = await getKkni(user.prodiId);
				setKkni(data.kkni);
				setPengetahuanKkni(data.pengetahuan);
				setkemampuanKerjaKkni(data.kemampuanKerja);
				if (data.kkni?.length > 0) {
					setSelectedKemampuanKerja(data.kkni[0]?.kemampuan_kerja_id || null);
					setSelectedPengetahuan(data.kkni[0]?.pengetahuan_kkni_id || null);
				}
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
		} else {
			setDataSource([]);
		}
	}, [kkni]);

	useEffect(() => {
		if (dataSaranCpl?.length > 0) {
			setDataSourceCpl(
				dataSaranCpl.map((item, index) => ({
					key: "saran cpl " + index + 1,
					_id: null,
					code: item.kode,
					description: item.deskripsi,
					prodiId: user.prodiId,
				}))
			);
		} else {
			setDataSourceCpl([]);
		}
	}, [dataSaranCpl]);

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
		if (!deleteData){
			const newDataCpl = dataSourceCpl.filter((item) => item.key !== key);

			// Perbarui ulang key dan code agar tetap urut
			const updatedDataSource = newDataCpl.map((item, index) => ({
				...item,
				key: "saran cpl " + (index + 1), 
				code: "CPL-" + (index + 1), 
			}));

			// Simpan data baru ke state
			setDataSourceCpl(updatedDataSource);
			return;
		}

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
				return;
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
			const data = {
				dataSource: dataSource, 
				selectedKemampuanKerja, 
				selectedPengetahuan
			};
			await postKkni(data);
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

	const rowSelectionCpl = {
		selectedRowKeysCpl,
		onChange: (newSelectedRowKeys) => setSelectedRowKeysCpl(newSelectedRowKeys),
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

	const handleautocpl = async ()=>{
		setAutoCpl(true);
		try{
			const data = await autoCpl(user.prodiId, selectedPengetahuan,selectedKemampuanKerja);
			setDataSaranCpl(data.data);
			if(dataSaranCpl == null){
				message.warning(' rancangan cpl kosong lengkapi analisis konsideran');
			}else {
				message.success('berhasil membuat rancangan cpl berdasarkan analisis konsideran');
			}
		}catch(error){
			message.error('gagal membuat rancangan cpl');
			console.error('error membuat rancangan cpl:', error);
		}finally{
			setAutoCpl(false);
		}
	};

	const addToDataSource = () => {
		setLoading(true);
		try {
			// Pisahkan data yang akan ditambahkan dan yang tetap disimpan
			const { toAdd, toKeep } = dataSourceCpl.reduce(
				(acc, item) => {
					if (selectedRowKeysCpl.includes(item.key)) {
						acc.toAdd.push(item);
					} else {
						acc.toKeep.push(item);
					}
					return acc;
				},
				{ toAdd: [], toKeep: [] }
			);
	
			if (toAdd.length > 0) {
				// Gabungkan data lama dengan data baru yang ditambahkan
				const newDataSource = [...dataSource, ...toAdd].map((item, index) => ({
					...item,
					key: `kkni${index + 1}`, // Update key
					code: `CPL-${index + 1}`, // Update code
				}));
	
				setDataSource(newDataSource);
				message.success("Data berhasil ditambahkan!");
			}
	
			// Perbarui ulang data yang tersisa di dataSourceCpl agar tetap terurut
			const updatedDataSourceCpl = toKeep.map((item, index) => ({
				...item,
				key: `kkni${index + 1}`, // Update key
				code: `CPL-${index + 1}`, // Update code
			}));
	
			setDataSourceCpl(updatedDataSourceCpl);
			setSelectedRowKeysCpl([]); // Reset pilihan row
		} catch (error) {
			message.error("Gagal menghapus data!");
			console.error("Error hapus bench kurikulum:", error);
		} finally {
			setLoading(false);
		}
	};	

	return {
		kemampuanKerjaKkni,
		pengetahuanKkni,
		selectedProdi,
		prodiDropdown,
		kkni,
		loading,
		dataSource,
		dataSourceCpl,
		saving,
		undoStack,
		rowSelection,
		rowSelectionCpl,
		selectedRowKeysCpl,
		selectedRowKeys,
		selectedKemampuanKerja,
		selectedPengetahuan,
		dataSaranCpl,
		isAutoCpl,
		addToDataSource,
		handleautocpl,
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
		setSelectedPengetahuan,
		setSelectedKemampuanKerja
	};
};
