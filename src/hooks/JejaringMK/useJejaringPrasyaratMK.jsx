import { useContext, useEffect, useState } from "react";
import { getJejaringPrasyarat } from "../../service/JejaringMataKuliah/JejaringMataKuliahService";
import { AppDataContext } from "../../context/AppDataProvider";

const useJejaringPrasyaratMK = () => {
	const { selectedProdiId } = useContext(AppDataContext);

	const [mataKuliahData, setMataKuliahData] = useState({});
	const [jejaringData, setJejaringData] = useState([]);
	const [prodiData, setProdiData] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const [filters, setFilters] = useState({
		semester: null,
		kategori: "",
		nama: "",
	});

	const fetchJejaringPrasyarat = async (prodiId = null, filters = {}) => {
		setLoading(true);
		try {
			const res = await getJejaringPrasyarat(prodiId, filters);
			setMataKuliahData(res.data.matakuliah || {});
			setJejaringData(res.data.jejaring || []);
			setProdiData(res.data.prodi || {});
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchJejaringPrasyarat(selectedProdiId, filters);
	}, [selectedProdiId, filters]);

	return {
		loading,
		jejaringData,
		mataKuliahData,
		prodiData,
		filters,
		setFilters,
		fetchJejaringPrasyarat,
	};
};

export default useJejaringPrasyaratMK;
