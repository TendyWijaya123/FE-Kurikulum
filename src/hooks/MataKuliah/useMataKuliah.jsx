import React, { useEffect, useState } from "react";
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

const useMataKuliah = () => {
	const [mataKuliahData, setMataKuliahData] = useState([]);
	const [formulasiCpaDropdown, setFormulasiCpaDropdown] = useState([]);
	const [metodePembelajaranDropdown, setMetodePembelajaranDropdown] = useState(
		[]
	);
	const [bentukPembelajaranDropdown, setBentukPembelajaranDropdown] = useState(
		[]
	);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [alert, setAlert] = useState(null);
	const [editedData, setEditedData] = useState({});
	const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
	const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);

	const [newData, setNewData] = useState({
		nama: "",
		kode: "",
		tujuan: "",
		formulasi_cpas: [],
		kemampuan_akhir: [],
	});

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		setLoading(true);

		Promise.all([
			fetchMataKuliah(),
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
				setError(error);
				setAlert(error.message || "There was an error fetching the data.");
				message.error(error.message || "Failed to load data.");
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handleModalCreateClose = () => {
		setIsModalCreateVisible(false);
	};

	const handleModalUpdateClose = () => {
		setIsModalUpdateVisible(false);
	};

	const handleOnEdit = (index) => {
		const mataKuliah = mataKuliahData[index];
		setEditedData({
			id: mataKuliah.id,
			nama: mataKuliah.nama,
			kode: mataKuliah.kode,
			tujuan: mataKuliah.tujuan,
			formulasi_cpas: mataKuliah.formulasi_cpas || [],
			kemampuan_akhir: mataKuliah.kemampuan_akhir.map((kemampuan) => ({
				deskripsi: kemampuan.deskripsi,
				estimasi_beban_belajar: kemampuan.estimasi_beban_belajar,
				bentuk_pembelajaran: kemampuan.bentuk_pembelajaran || [],
				metode_pembelajaran: kemampuan.metode_pembelajaran || [],
			})),
		});
		setIsModalUpdateVisible(true);
	};

	const handleCreateSave = async (newData) => {
		try {
			const requestData = {
				kode: newData.kode,
				nama: newData.nama,
				tujuan: newData.tujuan,
				kemampuan_akhirs: newData.kemampuan_akhir.map((kemampuanAkhir) => ({
					deskripsi: kemampuanAkhir.deskripsi,
					estimasi_beban_belajar: kemampuanAkhir.estimasi_beban_belajar,
					metode_pembelajaran_ids: kemampuanAkhir.metode_pembelajaran,
					bentuk_pembelajaran_ids: kemampuanAkhir.bentuk_pembelajaran,
				})),
				formulasi_cpa_ids: newData.formulasi_cpas,
			};

			await createMataKuliah(requestData);
			setIsModalCreateVisible(false);
			fetchData();
			message.success("Mata Kuliah created successfully!"); // Show success message
		} catch (error) {
			console.error("Error Creating Mata Kuliah:", error);
			setAlert(error.message || "Failed to create Mata Kuliah.");
			message.error(
				error.response?.data?.message || "Failed to create Mata Kuliah."
			);
		}
	};

	const handleUpdate = async (editedData) => {
		try {
			const requestData = {
				kode: editedData.kode,
				nama: editedData.nama,
				tujuan: editedData.tujuan,
				kemampuan_akhirs: editedData.kemampuan_akhir.map((kemampuanAkhir) => ({
					deskripsi: kemampuanAkhir.deskripsi,
					estimasi_beban_belajar: kemampuanAkhir.estimasi_beban_belajar,
					metode_pembelajaran_ids: kemampuanAkhir.metode_pembelajaran,
					bentuk_pembelajaran_ids: kemampuanAkhir.bentuk_pembelajaran,
				})),
				formulasi_cpa_ids: editedData.formulasi_cpas,
			};

			await updateMataKuliah(editedData.id, requestData);
			setIsModalUpdateVisible(false);
			fetchData();
			message.success("Mata Kuliah updated successfully!");
		} catch (error) {
			console.error("Error updating Mata Kuliah:", error);
			setAlert(error.message || "Failed to update Mata Kuliah.");
			message.error(
				error.response?.data?.message || "Failed to update Mata Kuliah."
			);
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
		error,
		alert,
		editedData,
		isModalCreateVisible,
		isModalUpdateVisible,
		handleModalCreateClose,
		handleModalUpdateClose,
		handleOnEdit,
		handleCreateSave,
		handleUpdate,
		handleDelete,
		setIsModalCreateVisible,
		setIsModalUpdateVisible,
	};
};

export default useMataKuliah;
