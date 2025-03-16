import { useContext, useEffect, useState } from "react";
import {
	deletePpm,
	deletePpms,
	fetchPpms,
	upsertPpm,
} from "../../service/ModelKonstruksi/CPLPPMVM/CPLPPMVM";
import { getPPMTemplate, importPpm } from "../../service/Import/ImportService";
import { ProdiContext } from "../../context/ProdiProvider";

const usePpm = () => {
	const { selectedProdiId } = useContext(ProdiContext);
	const [loading, setLoading] = useState(false);
	const [ppmData, setPpmData] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [alert, setAlert] = useState();

	useEffect(() => {
		fetchData(selectedProdiId);
	}, [selectedProdiId]);

	const rowSelection = {
		selectedRowKeys,
		onChange: (selectedKeys) => {
			setSelectedRowKeys(selectedKeys);
		},
		getCheckboxProps: (record) => ({
			disabled: !record.id,
		}),
	};

	const handleDestroyPpms = async () => {
		console.log("Data yang dikirim:", { ppms_id: selectedRowKeys });

		if (!Array.isArray(selectedRowKeys) || selectedRowKeys.length === 0) {
			console.error(
				"Error: ppms_id harus berupa array dengan setidaknya satu elemen."
			);
			return;
		}

		try {
			await deletePpms({ ppms_id: selectedRowKeys });
			await fetchData();
			setSelectedRowKeys([]);
		} catch (error) {
			console.error(
				"Error deleting PPM:",
				error.response?.data || error.message
			);
		}
	};

	const fetchData = async (prodiId = null) => {
		setLoading(true);
		try {
			const data = await fetchPpms(prodiId);
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

	const handleExportTemplatePpm = async () => {
		try {
			await getPPMTemplate();
		} catch (error) {
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		}
	};

	const handleImportPpm = async (file) => {
		try {
			await importPpm(file);
			fetchData();
		} catch (error) {
			message.error("Gagal mengunggah file. Coba lagi.");
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
		handleExportTemplatePpm,
		handleImportPpm,
		rowSelection,
		selectedRowKeys,
		handleDestroyPpms,
	};
};

export default usePpm;
