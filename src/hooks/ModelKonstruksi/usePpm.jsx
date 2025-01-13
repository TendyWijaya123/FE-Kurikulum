import { useEffect, useState } from "react";
import {
	deletePpm,
	fetchPpms,
	upsertPpm,
} from "../../service/ModelKonstruksi/CPLPPMVM/CPLPPMVM";

const usePpm = () => {
	const [loading, setLoading] = useState(false);
	const [ppmData, setPpmData] = useState([]);
	const [alert, setAlert] = useState();

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);
		try {
			const data = await fetchPpms();
			setPpmData(data.data);
		} catch (error) {
			console.error(error);
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		} finally {
			setLoading(false);
		}
	};

	const handleSavePpms = async () => {
		setLoading(true);
		try {
			await upsertPpm({ ppms: ppmData });
			fetchData();
		} catch (error) {
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		} finally {
			setLoading(false);
		}
	};

	const handleDeletePpms = async (id) => {
		setLoading(true);
		try {
			await deletePpm(id);
			fetchData();
		} catch (error) {
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		} finally {
			setLoading(false);
		}
	};

	const handleAddPpmPoint = () => {
		setPpmData((prev) => {
			return [...prev, { deskripsi: "" }];
		});
	};

	const handleChangePpmPoint = (index, event) => {
		setPpmData((prev) => {
			const updatedPpmData = [...prev];
			updatedPpmData[index] = {
				...updatedPpmData[index],
				[event.target.name]: event.target.value,
			};
			return updatedPpmData;
		});
	};

	const handleDeletePpmPoint = async (index) => {
		setLoading(true);
		try {
			const updatedPpmData = [...ppmData];
			const itemToDelete = updatedPpmData[index];

			if (itemToDelete.id) {
				await handleDeletePpms(itemToDelete.id);
			}

			updatedPpmData.splice(index, 1);
			setPpmData(updatedPpmData);
		} catch (error) {
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		ppmData,
		alert,
		handleAddPpmPoint,
		handleChangePpmPoint,
		handleDeletePpmPoint,
		handleSavePpms,
		handleDeletePpms,
	};
};

export default usePpm;
