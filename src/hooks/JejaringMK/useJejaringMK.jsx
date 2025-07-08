import { useContext, useEffect, useState } from "react";
import {
	getJejaringMataKuliah,
	updateJejaringMataKuliah,
} from "../../service/JejaringMataKuliah/JejaringMataKuliahService";
import { getMataKuliahDropdown } from "../../service/MataKuliah/MataKuliahService";
import { message } from "antd";
import { AppDataContext } from "../../context/AppDataProvider";

const useJejaringMK = () => {
	const { selectedProdiId } = useContext(AppDataContext);

	const [filters, setFilters] = useState({
		semester: null,
		kategori: "",
		nama: "",
	});

	const [matakuliahData, setMataKuliahData] = useState([]);
	const [matakuliahDropdown, setMatakuliahDropdown] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [editingId, setEditingId] = useState(null);
	const [editedPrasyarat, setEditedPrasyarat] = useState({});

	const fetchMataKuliahData = async (prodiId = null, filters = {}) => {
		setLoading(true);
		setError(null);
		try {
			const data = await getJejaringMataKuliah(prodiId, filters);
			setMataKuliahData(data.data);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	const fetchMataKuliahDropdown = async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await getMataKuliahDropdown();
			setMatakuliahDropdown(data.data);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMataKuliahData(selectedProdiId, filters);
		fetchMataKuliahDropdown();
	}, [selectedProdiId, filters]);

	const startEdit = (id, prasyaratIds) => {
		setEditingId(id);
		setEditedPrasyarat({ ...editedPrasyarat, [id]: prasyaratIds });
	};

	const cancelEdit = () => {
		setEditingId(null);
		setEditedPrasyarat({});
	};

	const saveEdit = async (id) => {
		setLoading(true);
		try {
			await updateJejaringMataKuliah(id, {
				prasyarat_ids: editedPrasyarat[id],
			});
			fetchMataKuliahData(selectedProdiId, filters);
			setEditingId(null);
			setEditedPrasyarat({});
			message.success("Prasyarat berhasil diupdate");
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		matakuliahData,
		matakuliahDropdown,
		editingId,
		editedPrasyarat,
		startEdit,
		cancelEdit,
		saveEdit,
		setEditedPrasyarat,
		filters,
		setFilters,
	};
};

export default useJejaringMK;
