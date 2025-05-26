import { useContext, useEffect, useState } from "react";
import { getJejaringPrasyarat } from "../../service/JejaringMataKuliah/JejaringMataKuliahService";
import { AppDataContext } from "../../context/AppDataProvider";

const useJejaringPrasyaratMK = () => {
	const { selectedProdiId } = useContext(AppDataContext);
	const [mataKuliahData, setMataKuliahData] = useState({});
	const [jejaringData, setJejaringData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchJejaringPrasyarat = async (prodiId = null) => {
		setLoading(true);
		try {
			const data = await getJejaringPrasyarat(prodiId);

			setMataKuliahData(data.data.matakuliah || {});
			setJejaringData(data.data.jejaring || []);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchJejaringPrasyarat(selectedProdiId);
	}, [selectedProdiId]);
	return { loading, jejaringData, mataKuliahData, fetchJejaringPrasyarat };
};

export default useJejaringPrasyaratMK;
