import React, { useContext, useEffect, useState } from "react";
import { message } from "antd"; // Import message dari antd
import {
	createMataKuliah,
	deleteMataKuliah,
	fetchBentukPembelajaranDropdown,
	fetchFormulasiCpaDropdown,
	fetchMataKuliah,
	fetchMetodePembelajaranDropdown,
	updateMataKuliah,
} from "../../service/MataKuliah/MataKuliahService";
import {
	getMataKuliahTemplate,
	importMataKuliah,
} from "../../service/Import/ImportService";
import { ProdiContext } from "../../context/ProdiProvider";

const useMataKuliah = () => {
	const { selectedProdiId } = useContext(ProdiContext);
	const [mataKuliahData, setMataKuliahData] = useState([]);
	const [formulasiCpaDropdown, setFormulasiCpaDropdown] = useState([]);
	const [metodePembelajaranDropdown, setMetodePembelajaranDropdown] = useState(
		[]
	);
	const [bentukPembelajaranDropdown, setBentukPembelajaranDropdown] = useState(
		[]
	);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);
	const [editedData, setEditedData] = useState({});
	const [isModalImportVisible, setIsModalImportVisible] = useState(false);
	const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
	const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
	const [errors, setErrors] = useState(null);
	const [filters, setFilters] = useState({
		nama: "",
		kategori: "",
		semester: "",
	});

	const [newData, setNewData] = useState({
		nama: "",
		kode: "",
		tujuan: "",
		kategori: "",
		formulasi_cpas: [],
		kemampuan_akhir: [],
	});

	useEffect(() => {
		fetchData({
			prodiId: selectedProdiId,
			nama: filters.nama,
			kategori: filters.kategori,
			semester: filters.semester,
		});
	}, [selectedProdiId]);

	const fetchData = ({
		prodiId = null,
		nama = "",
		kategori = "",
		semester = "",
	} = {}) => {
		setLoading(true);

		Promise.all([
			fetchMataKuliah({ prodiId, nama, kategori, semester }),
			fetchFormulasiCpaDropdown(),
			fetchMetodePembelajaranDropdown(),
			fetchBentukPembelajaranDropdown(),
		])
			.then(
				([
					mataKuliahResponse,
					formulasiResponse,
					metodePembelajaranResponse,
					bentukPembelajaranResponse,
				]) => {
					setMataKuliahData(mataKuliahResponse.data);
					setFormulasiCpaDropdown(formulasiResponse.data);
					setMetodePembelajaranDropdown(metodePembelajaranResponse.data);
					setBentukPembelajaranDropdown(bentukPembelajaranResponse.data);
				}
			)
			.catch((error) => {
				console.error("Error fetching data:", error);
				setAlert(error.message || "There was an error fetching the data.");
				message.error(error.message || "Failed to load data.");
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const handleFilterChange = (key, value) => {
		setFilters((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const handleSearch = () => {
		fetchData({
			prodiId: selectedProdiId,
			nama: filters.nama,
			kategori: filters.kategori || undefined,
			semester: filters.semester || undefined,
		});
	};

	const handleModalCreateClose = () => {
		setIsModalCreateVisible(false);
		setNewData({});
		setEditedData({});
		setErrors(null);
	};

	const handleModalUpdateClose = () => {
		setIsModalUpdateVisible(false);
	};

	const handleModalImportVisible = () => {
		setIsModalImportVisible((prev) => !prev);
	};

	const handleOnEdit = (index) => {
		const mataKuliah = mataKuliahData[index];
		setEditedData({
			id: mataKuliah.id,
			nama: mataKuliah.nama,
			kode: mataKuliah.kode,
			kategori: mataKuliah.kategori,
			tujuan: mataKuliah.tujuan,
			semester: mataKuliah.semester,
			teori_bt: mataKuliah.teori_bt,
			teori_pt: mataKuliah.teori_pt,
			teori_m: mataKuliah.teori_m,
			praktek_bt: mataKuliah.praktek_bt,
			praktek_pt: mataKuliah.praktek_pt,
			praktek_m: mataKuliah.praktek_m,
			formulasi_cpas: mataKuliah.formulasi_cpas || [],
			kemampuan_akhir: mataKuliah.kemampuan_akhir.map((kemampuan) => ({
				deskripsi: kemampuan.deskripsi,
				estimasi_beban_belajar: kemampuan.estimasi_beban_belajar,
				bentuk_pembelajaran: kemampuan.bentuk_pembelajaran || [],
				metode_pembelajaran: kemampuan.metode_pembelajaran || [],
			})),
			tujuan_belajar: mataKuliah.tujuan_belajar.map((tujuan) => ({
				kode: tujuan.kode,
				deskripsi: tujuan.deskripsi,
			})),
		});
		setIsModalUpdateVisible(true);
	};

	const handleCreateSave = async (newData) => {
		setErrors(null);
		try {
			const requestData = {
				kode: newData.kode,
				nama: newData.nama,
				kategori: newData.kategori,
				tujuan: newData.tujuan,
				semester: newData.semester,
				teori_bt: newData.teori_bt,
				teori_pt: newData.teori_pt,
				teori_m: newData.teori_m,
				praktek_bt: newData.praktek_bt,
				praktek_pt: newData.praktek_pt,
				praktek_m: newData.praktek_m,
				kemampuan_akhirs: newData.kemampuan_akhir.map((kemampuanAkhir) => ({
					deskripsi: kemampuanAkhir.deskripsi,
					estimasi_beban_belajar: kemampuanAkhir.estimasi_beban_belajar,
					metode_pembelajaran_ids: kemampuanAkhir.metode_pembelajaran,
					bentuk_pembelajaran_ids: kemampuanAkhir.bentuk_pembelajaran,
				})),
				tujuan_belajar: newData.tujuan_belajar.map((tujuan) => ({
					deskripsi: tujuan.deskripsi,
				})),
				formulasi_cpa_ids: newData.formulasi_cpas,
			};
			await createMataKuliah(requestData);
			setIsModalCreateVisible(false);
			fetchData();
			message.success("Mata Kuliah created successfully!");
		} catch (error) {
			setErrors(
				error.response?.data?.errors ||
					error.response?.data?.message || {
						message: "Terjadi kesalahan saat menyimpan MataKuliah",
					}
			);
			message.error("Gagal menyimpan Mata kuliah");
		}
	};

	const handleUpdate = async (editedData) => {
		setErrors(null);
		try {
			const requestData = {
				kode: editedData.kode,
				nama: editedData.nama,
				kategori: editedData.kategori,
				tujuan: editedData.tujuan,
				semester: editedData.semester,
				teori_bt: editedData.teori_bt,
				teori_pt: editedData.teori_pt,
				teori_m: editedData.teori_m,
				praktek_bt: editedData.praktek_bt,
				praktek_pt: editedData.praktek_pt,
				praktek_m: editedData.praktek_m,
				kemampuan_akhirs: editedData.kemampuan_akhir.map((kemampuanAkhir) => ({
					deskripsi: kemampuanAkhir.deskripsi,
					estimasi_beban_belajar: kemampuanAkhir.estimasi_beban_belajar,
					metode_pembelajaran_ids: kemampuanAkhir.metode_pembelajaran,
					bentuk_pembelajaran_ids: kemampuanAkhir.bentuk_pembelajaran,
				})),
				tujuan_belajar: editedData.tujuan_belajar.map((tujuan) => ({
					deskripsi: tujuan.deskripsi,
				})),
				formulasi_cpa_ids: editedData.formulasi_cpas,
			};

			await updateMataKuliah(editedData.id, requestData);
			setIsModalUpdateVisible(false);
			fetchData();
			message.success("Mata Kuliah updated successfully!");
		} catch (error) {
			setErrors(
				error.response?.data?.errors ||
					error.response?.data?.message || {
						message: "Terjadi kesalahan saat menyimpan MataKuliah",
					}
			);
			message.error("Gagal menyimpan Mata kuliah");
		}
	};

	const handleImportMataKuliah = async (file) => {
		setLoading(true);
		try {
			await importMataKuliah(file);
			fetchData();
			message.success("Mata kuliah berhasil diimport");
		} catch (error) {
			message.error("Gagal mengunggah file. Coba lagi.");
		} finally {
			setLoading(false);
		}
	};

	const handleExportTemplateMataKuliah = async () => {
		setLoading(true);
		try {
			await getMataKuliahTemplate();
			message.success("Template berhasil diexport");
		} catch (error) {
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id) => {
		try {
			await deleteMataKuliah(id);
			fetchData();
			message.success("Mata Kuliah deleted successfully!"); // Show success message
		} catch (error) {
			console.error("Terjadi kesalahan saat menghapus Mata Kuliah:", error);
			setAlert(error.message || "Failed to delete Mata Kuliah.");
			message.error(
				error.response?.data?.message || "Failed to delete Mata Kuliah."
			);
		}
	};

	return {
		mataKuliahData,
		formulasiCpaDropdown,
		metodePembelajaranDropdown,
		bentukPembelajaranDropdown,
		loading,
		alert,
		editedData,
		isModalCreateVisible,
		isModalUpdateVisible,
		isModalImportVisible,
		errors,
		filters,
		handleFilterChange,
		handleSearch,
		setIsModalImportVisible,
		handleModalCreateClose,
		handleModalUpdateClose,
		handleModalImportVisible,
		handleOnEdit,
		handleCreateSave,
		handleUpdate,
		handleDelete,
		handleExportTemplateMataKuliah,
		handleImportMataKuliah,
		setIsModalCreateVisible,
		setIsModalUpdateVisible,
	};
};

export default useMataKuliah;
