import { useEffect, useState } from "react";
import {
	getMataKuliahByDosenPengampu,
	updateDeskripsiSingkatMK,
} from "../../../service/MataKuliah/MataKuliahService";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const useMataKuliahPengampu = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [mataKuliahPengampuData, setMataKuliahPengampuData] = useState([]);
	const navigate = useNavigate();

	const fetchMataKuliahPengampuData = async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await getMataKuliahByDosenPengampu();
			setMataKuliahPengampuData(data);
		} catch (err) {
			setError(err);
			message.error("Gagal mengambil data");
		} finally {
			setLoading(false);
		}
	};

	const handleNavigate = (id) => {
		navigate(`/rps/${id}`);
	};

	const handleUpdateSingkatMataKuliah = async (id, deskripsi) => {
		await updateDeskripsiSingkatMK(id, deskripsi);
		fetchMataKuliahPengampuData();
	};

	useEffect(() => {
		fetchMataKuliahPengampuData();
	}, []);

	return {
		mataKuliahPengampuData,
		loading,
		error,
		handleUpdateSingkatMataKuliah,
		handleNavigate,
	};
};

export default useMataKuliahPengampu;
