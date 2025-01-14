import { useEffect, useState } from "react";
import {
	deleteCpl,
	fetchCpls,
	upsertCpl,
} from "../../service/ModelKonstruksi/CPLPPMVM/CPLPPMVM";

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
	};
};

export default useCpl;
