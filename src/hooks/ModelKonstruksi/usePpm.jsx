import { useContext, useEffect, useState } from "react";
import {
	deletePpm,
	deletePpms,
	fetchPpms,
	upsertPpm,
} from "../../service/ModelKonstruksi/CPLPPMVM/CPLPPMVM";
import { getPPMTemplate, importPpm } from "../../service/Import/ImportService";
import { ProdiContext } from "../../context/ProdiProvider";
import { message } from "antd";

const usePpm = () => {
	const { selectedProdiId } = useContext(ProdiContext);
	const [loading, setLoading] = useState(false);
	const [ppmData, setPpmData] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [alert, setAlert] = useState();
	const [errors, setErrors] = useState(null);

	useEffect(() => {
		fetchData(selectedProdiId);
	}, [selectedProdiId]);

	const rowSelection = {
		selectedRowKeys,
		onChange: (selectedKeys) => {
			setSelectedRowKeys(selectedKeys);
		},
		getCheckboxProps: (record) => ({
			disabled: record.index,
		}),
	};

	const handleDestroyPpms = async () => {
		if (!Array.isArray(selectedRowKeys) || selectedRowKeys.length === 0) {
			console.error("Error: Tidak ada item yang dipilih.");
			return;
		}

		try {
			const idsToDelete = selectedRowKeys
				.map((key) => ppmData[key]?.id)
				.filter(Boolean);

			if (idsToDelete.length > 0) {
				await deletePpms({ ppms_id: idsToDelete });
			}

			fetchData();
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
		setErrors(null);
		try {
			await upsertPpm({ ppms: ppmData });
			fetchData();
			message.success("Berhasil Menyimpan PPM");
		} catch (error) {
			setErrors(
				error.response?.data?.errors ||
					error.response?.data?.message || {
						message: "Terjadi kesalahan saat menyimpan CPL.",
					}
			);
			message.error("Gagal menyimpan PPM");
		} finally {
			setLoading(false);
		}
	};

	const handleExportTemplatePpm = async () => {
		setLoading(true);
		try {
			await getPPMTemplate();
			message.success("Template PPM berhasil diexport");
		} catch (error) {
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		} finally {
			setLoading(false);
		}
	};

	const handleImportPpm = async (file) => {
		setLoading(true);
		try {
			await importPpm(file);
			fetchData();
			message.success("PPM berhasil diimport");
		} catch (error) {
			message.error("Gagal mengunggah file. Coba lagi.");
		} finally {
			setLoading(false);
		}
	};

	const handleDeletePpms = async (id) => {
		setLoading(true);
		try {
			await deletePpm(id);
			fetchData();
			message.success("PPM  Berhasil dihapus");
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
			message.success("PPM  Berhasil dihapus");
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
		errors,
	};
};

export default usePpm;
