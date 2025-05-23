import { useEffect, useState } from "react";
import {
	deleteRps,
	generateRpsPdf,
	getRps,
	storeRps,
	updateRps,
} from "../../../service/PengisianRps/RPSService";
import { message } from "antd";

const useRps = (id) => {
	const [rpsData, setRpsData] = useState([]);
	const [mataKuliahData, setMataKuliahData] = useState({});
	const [kemampuanAkhirDropdown, setKemampuanAkhirDropdown] = useState([]);
	const [tujuanBelajarDropdown, setTujuanBelajarDropdown] = useState([]);
	const [cplDropdown, setCplDropdown] = useState([]);
	const [editedData, setEditedData] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchRpsMataKuliahData = async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await getRps(id);
			console.log(data?.data);
			setRpsData(data?.data?.rps || null);
			setMataKuliahData(data?.data?.mataKuliah || null);
			setCplDropdown(data?.data?.mataKuliah?.cpls || null);
			setTujuanBelajarDropdown(data?.data?.mataKuliah?.tujuan_belajars);
			setKemampuanAkhirDropdown(data?.data?.mataKuliah?.kemampuan_akhirs);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	const handleCreate = async (data) => {
		setLoading(true);
		setError(null);
		try {
			await storeRps(data);
			fetchRpsMataKuliahData();
			message.success("Berhasil Menambahkan RPS");
		} catch (err) {
			setError(err.response.data.errors);
			console.error(err);
			message.error(err.response.data.message || "Gagal Menambahkan RPS");
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const handleUpdate = async (id, data) => {
		setLoading(true);
		setError(null);
		try {
			const updatedData = await updateRps(id, data);
			fetchRpsMataKuliahData();
		} catch (err) {
			setError(err);
			message.error(err.response.data.message || "Gagal Menambahkan RPS");
			console.error(error);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const handleDownloadPdf = async (id, payload) => {
		setLoading(true);
		setError(null);

		try {
			const response = await generateRpsPdf(id, payload);
		} catch (err) {
			setError(err);
			console.error("Gagal mengunduh PDF:", err);

			// Pesan error lebih informatif
			const messageText =
				err.response?.data?.message || "Terjadi kesalahan saat mengunduh PDF";
			message.error(messageText);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id) => {
		setLoading(true);
		setError(null);
		try {
			await deleteRps(id);
			setRpsData((prevData) => prevData.filter((item) => item.id !== id));
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	const handleOnEdit = (record) => {
		setEditedData(record);
	};

	useEffect(() => {
		if (id) {
			fetchRpsMataKuliahData();
		}
	}, [id]);

	return {
		rpsData,
		mataKuliahData,
		loading,
		error,
		kemampuanAkhirDropdown,
		tujuanBelajarDropdown,
		cplDropdown,
		handleCreate,
		handleUpdate,
		handleDelete,
		editedData,
		handleOnEdit,
		handleDownloadPdf,
	};
};

export default useRps;
