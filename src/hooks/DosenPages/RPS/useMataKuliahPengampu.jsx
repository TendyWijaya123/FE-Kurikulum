import { useEffect, useState } from "react";
import { getMataKuliahByDosenPengampu } from "../../../service/MataKuliah/MataKuliahService";
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
			console.log(data);
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

	useEffect(() => {
		fetchMataKuliahPengampuData();
	}, []);

	return { mataKuliahPengampuData, loading, error, handleNavigate };
};

export default useMataKuliahPengampu;
