import { useState, useEffect } from "react";
import {
	deletePeranIndustri,
	fetchPeranIndustri,
	upsertPeranIndustri,
} from "../../service/ModelKonstruksi/CPLPPMVM/CPLPPMVM";
import {
	getPeranIndustriTemplate,
	importPeranIndustri,
} from "../../service/Import/ImportService";

const usePeranIndustri = () => {
	const [peranIndustriData, setPeranIndustriData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [alert, setAlert] = useState(null);

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await fetchPeranIndustri();
			setPeranIndustriData(response.data);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleSavePeranIndustri = async () => {
		setLoading(true);
		try {
			console.log(peranIndustriData);
			await upsertPeranIndustri({ peran_industri: peranIndustriData });
			fetchData();
		} catch (error) {
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		} finally {
			setLoading(false);
		}
	};

	const handleExportTemplatePeranIndustri = async () => {
		try {
			await getPeranIndustriTemplate();
		} catch (error) {
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		}
	};

	const handleImportPeranIndustri = async (file) => {
		setLoading(true);
		try {
			await importPeranIndustri(file);
			fetchData();
		} catch (error) {
			setAlert("Gagal mengunggah file. Coba lagi.");
		} finally {
			setLoading(false);
		}
	};

	const handleDeletePeranIndustri = async (id) => {
		setLoading(true);
		try {
			await deletePeranIndustri(id);
			fetchData();
		} catch (error) {
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		} finally {
			setLoading(false);
		}
	};

	const handleAddPeranIndustri = () => {
		setPeranIndustriData((prev) => [...prev, { deskripsi: "", jabatan: "" }]);
	};

	const handlePeranIndustriChange = (index, event) => {
		const { name, value } = event.target;
		setPeranIndustriData((prev) => {
			const updatedData = [...prev];
			updatedData[index] = {
				...updatedData[index],
				[name]: value,
			};
			return updatedData;
		});
	};

	const handleDeletePeranIndustriPoint = async (index) => {
		setLoading(true);
		try {
			const updatedData = [...peranIndustriData];
			const itemToDelete = updatedData[index];

			if (itemToDelete.id) {
				await handleDeletePeranIndustri(itemToDelete.id);
			}

			updatedData.splice(index, 1);
			setPeranIndustriData(updatedData);
		} catch (error) {
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		} finally {
			setLoading(false);
		}
	};

	return {
		peranIndustriData,
		loading,
		error,
		handleSavePeranIndustri,
		handleExportTemplatePeranIndustri,
		handleImportPeranIndustri,
		handleDeletePeranIndustri,
		handleAddPeranIndustri,
		handlePeranIndustriChange,
		handleDeletePeranIndustriPoint,
		alert,
	};
};

export default usePeranIndustri;
