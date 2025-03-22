import { useContext, useEffect, useState } from "react";
import { getJejaringPrasyarat } from "../../service/JejaringMataKuliah/JejaringMataKuliahService";
import { ProdiContext } from "../../context/ProdiProvider";

const useJejaringPrasyaratMK = () => {
	const { selectedProdiId } = useContext(ProdiContext);
	const [mataKuliahData, setMataKuliahData] = useState({});
	const [jejaringData, setJejaringData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchJejaringPrasyarat = async (prodiId = null) => {
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
	return { loading, jejaringData, mataKuliahData };
};

export default useJejaringPrasyaratMK;
