import { useEffect, useState } from "react";
import {
	deleteCpl,
	fetchCpls,
	upsertCpl,
} from "../../service/ModelKonstruksi/CPLPPMVM/CPLPPMVM";
import { getCPLTemplate, importCPL } from "../../service/Import/ImportService";

const useCpl = () => {
	const [loading, setLoading] = useState(false);
	const [cplData, setCplData] = useState([]);
	const [alert, setAlert] = useState();

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);
		try {
			const data = await fetchCpls();
			setCplData(data.data);
		} catch (error) {
			console.error(error);
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		} finally {
			setLoading(false);
		}
	};

	const handleSaveCpls = async () => {
		setLoading(true);
		try {
			await upsertCpl({ cpls: cplData });
			fetchData();
		} catch (error) {
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		} finally {
			setLoading(false);
		}
	};

	const handleExportTemplateCpl = async () => {
		try {
			await getCPLTemplate();
		} catch (error) {
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		}
	};

	const handleImportCpl = async (file) => {
		try {
			await importCPL(file);
			fetchData();
		} catch (error) {
			message.error("Gagal mengunggah file. Coba lagi.");
		}
	};

	const handleDeleteCpls = async (id) => {
		setLoading(true);
		try {
			await deleteCpl(id);
			fetchData();
		} catch (error) {
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		} finally {
			setLoading(false);
		}
	};

	const handleAddCplPoint = () => {
		setCplData((prev) => {
			return [...prev, { keterangan: "" }];
		});
	};

	const handleChangeCplPoint = (index, event) => {
		setCplData((prev) => {
			const updatedCplData = [...prev];
			updatedCplData[index] = {
				...updatedCplData[index],
				[event.target.name]: event.target.value,
			};
			return updatedCplData;
		});
	};

	const handleDeleteCplPoint = async (index) => {
		setLoading(true);
		try {
			const updatedCplData = [...cplData];
			const itemToDelete = updatedCplData[index];

			if (itemToDelete.id) {
				await handleDeleteCpls(itemToDelete.id);
			}

			updatedCplData.splice(index, 1);
			setCplData(updatedCplData);
		} catch (error) {
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		cplData,
		alert,
		handleAddCplPoint,
		handleChangeCplPoint,
		handleDeleteCplPoint,
		handleSaveCpls,
		handleDeleteCpls,
		handleExportTemplateCpl,
		handleImportCpl,
	};
};

export default useCpl;
