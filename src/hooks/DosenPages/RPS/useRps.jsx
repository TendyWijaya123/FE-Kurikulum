import { useEffect, useState, useRef } from "react";
import {
	deleteRps,
	generateRpsPdf,
	getRps,
	storeRps,
	updateRps,
	saveTujuanBelajar,
	removeTujuanBelajar,
	saveDetailMataKuliahRps
} from "../../../service/PengisianRps/RPSService";
import { message, Form, Input } from "antd";

const useRps = (id) => {
	const [rpsData, setRpsData] = useState([]);
	const [mataKuliahData, setMataKuliahData] = useState({});
	const [kemampuanAkhirDropdown, setKemampuanAkhirDropdown] = useState([]);
	const [tujuanBelajarDropdown, setTujuanBelajarDropdown] = useState([]);
	const [cplDropdown, setCplDropdown] = useState([]);
	const [editedData, setEditedData] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [tujuanBelajarRPS, setTujuanBelajarRPS] = useState([]);
	const [detailMataKuliahRps, setDetailMataKuliahRps] = useState();

	const fetchRpsMataKuliahData = async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await getRps(id);
			console.log(data?.data);
			setRpsData(data?.data?.rps || null);
			setMataKuliahData(data?.data?.mataKuliah || null);
			setTujuanBelajarRPS(data?.data?.mataKuliah?.tujuan_belajar_rps? data?.data?.mataKuliah?.tujuan_belajar_rps : data?.data?.mataKuliah?.tujuan_belajars )
			setCplDropdown(data?.data?.mataKuliah?.cpls || null);
			setTujuanBelajarDropdown(data?.data?.mataKuliah?.tujuan_belajar_rps? data.data.mataKuliah.tujuan_belajar_rps : data?.data?.mataKuliah?.tujuan_belajars);
			setKemampuanAkhirDropdown(data?.data?.mataKuliah?.kemampuan_akhirs);
			setDetailMataKuliahRps({
				deskripsi_singkat: data?.data?.mataKuliah?.deskripsi_singkat || "",
				materi_pembelajaran: data?.data?.mataKuliah?.materi_pembelajaran || "",
			});
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

	const handleDownloadPdf = async (id) => {
		setLoading(true);
		setError(null);
		try {
			const response = await generateRpsPdf(id);
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

	//--------------------------------TUjuan Belajars Table-------------------------------------//
	const handleAddRowTujuanBelajar = () => {
		const newRow = {
			kode: "TB-",
			deskripsi: "",
		};

		setTujuanBelajarRPS([...tujuanBelajarRPS, newRow]);
	};

	const handleDeskripsiChange = (index, newValue) => {
		const updated = [...tujuanBelajarRPS];
		updated[index].deskripsi = newValue;
		setTujuanBelajarRPS(updated);
	};


	const handleSaveTujuanBelajar = async (tujuanData) => {
		try{
			const sendData = {
				'mataKuliahId' : mataKuliahData.id,
				'tujuanBelajar' : tujuanData
			}
			await saveTujuanBelajar(sendData);
			message.success('berhasil menyimpan tujuan belajar');
		} catch(error){
			message.error(`gagal menyimpan tujuan belajar : ${error}`);
		}
	}

	const handleRemoveTujuanBelajar = async (indexToRemove) => {
		const data = tujuanBelajarRPS[indexToRemove];
		if(data.id){
			try{
				await removeTujuanBelajar(data.id);
				message.success('berhasil menghapus tujuan');
			}catch(error){
				message.error('gagal hapus tujuan belajar');
			}
		}
		const updated = tujuanBelajarRPS.filter((_, index) => index !== indexToRemove);
		setTujuanBelajarRPS(updated);
	};
	//--------------------------------------------------------------------------------------------//

	//-----------------------------------------------Detail MK------------------------------------//
	const handleDetailMkChange = (field, newValue) => {
		if (!detailMataKuliahRps) return;
		const updated = { ...detailMataKuliahRps, [field]: newValue };
		setDetailMataKuliahRps(updated);
	};

	const handleSaveDetailMKRps = async (dataDetailMK) =>{
		try{
			const sendData = {
				'mataKuliahId' : mataKuliahData.id,
				'detailMkRps' : dataDetailMK
			}
			await saveDetailMataKuliahRps(sendData);
			message.success('berhasil menyimpan detail mata kuliah');
		}catch(error){
			message.error(`gagal menyimpan detail mata kuliah : ${error}`);
		}
	}
	//--------------------------------------------------------------------------------------------//

	//-----------------------------------------------Edit RPS---------------------------------------//
	const handleEditRpsChange = (index, newValue, field) => {
		if (!rpsData || !Array.isArray(rpsData)) return;

		const updated = [...rpsData];
		updated[index] = { ...updated[index], [field]: newValue };
		setRpsData(updated);
	};


	const handleUpdate = async (data) => {
		setLoading(true);
		setError(null);
		try {
			await updateRps(data);
			fetchRpsMataKuliahData();
			message.success("Berhasil Memperbarui RPS");
		} catch (err) {
			setError(err);
			message.error(err.response.data.message || "Gagal Menambahkan RPS");
			console.error(error);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const handleAddRowRps = () => {
		const usedWeeks = rpsData
			.map(row => parseInt(row.minggu))
			.filter(week => !isNaN(week))
			.sort((a, b) => a - b);

		let nextWeek = 1;
		for (let i = 0; i < usedWeeks.length; i++) {
			if (usedWeeks[i] === nextWeek) {
				nextWeek++;
			} else if (usedWeeks[i] > nextWeek) {
				break;
			}
		}

		const newRow = {
			mata_kuliah_id: mataKuliahData.id,
			kategori: "Reguler",
			minggu: String(nextWeek), 
			kemampuan_akhir: "",
			pokok_bahasan: "",
			modalitas_pembelajaran: "",
			bentuk_pembelajaran: "",
			strategi_pembelajaran: "",
			metode_pembelajaran: "",
			media_pembelajaran: "",
			sumber_belajar: "",
			instrumen_penilaian: "",
			hasil_belajar: "",
			cpl: null,
			tujuan_belajar_id: null,
			bobot_penilaian: 0,
		};

		setRpsData((prevData) => [...prevData, newRow]);
	};

//----------------------------------------------------------------------------------------//

//-------------------------------------RIngkasan Pembobotan Penilaian---------------------//
const ringkasanPembobotanData = 
	[
		{
			key: 1,
			jenis: "Aktivitas Partisipatif",
			instrumen: "Case Method/ Problem Based",
			persentase: "",
		},
		{
			key: 2,
			jenis: "Hasil Proyek",
			instrumen: "Project Based",
			persentase: "",
		},
		{
			key: 3,
			jenis: "Kognitif",
			instrumen: "Tugas",
			persentase: "",
		},
		{
			key: 4,
			jenis: "",
			instrumen: "Quiz",
			persentase: "",
		},
		{
			key: 5,
			jenis: "",
			instrumen: "UTS",
			persentase: "",
		},
		{
			key: 6,
			jenis: "",
			instrumen: "UAS",
			persentase: "",
		},
	]

	const [pembobotanData, setPembobotanData] = useState([]);
	const [totalPersentase, setTotalPersentase] = useState(0);

	useEffect(() => {
		setPembobotanData(ringkasanPembobotanData);
	}, []);

	useEffect(() => {
		const total = pembobotanData.reduce(
			(acc, curr) => acc + (Number(curr.persentase) || 0),
			0
		);
		setTotalPersentase(total);
	}, [pembobotanData]);

	const handlePembobotanChange = (index, newValue, field) => {
		if (!pembobotanData || !Array.isArray(pembobotanData)) return;
		const updated = [...pembobotanData];
		updated[index] = { ...updated[index], [field]: Number(newValue) || 0 };
		setPembobotanData(updated);
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
		tujuanBelajarRPS,
		detailMataKuliahRps,
		pembobotanData,
		totalPersentase,
		handleCreate,
		handleUpdate,
		handleDelete,
		editedData,
		handleOnEdit,
		handleDownloadPdf,
		handleAddRowTujuanBelajar,
		setTujuanBelajarRPS,
		handleSaveTujuanBelajar,
		handleDeskripsiChange,
		handleRemoveTujuanBelajar,
		handleDetailMkChange,
		handleSaveDetailMKRps,
		handleEditRpsChange,
		handleAddRowRps,
		handlePembobotanChange
	};
};

export default useRps;
