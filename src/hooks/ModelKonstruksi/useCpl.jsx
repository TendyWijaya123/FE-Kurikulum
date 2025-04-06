import { useContext, useEffect, useState } from "react";
import {
	deleteCpl,
	deleteCpls,
	fetchCpls,
	upsertCpl,
} from "../../service/ModelKonstruksi/CPLPPMVM/CPLPPMVM";
import { getCPLTemplate, importCPL } from "../../service/Import/ImportService";
import { ProdiContext } from "../../context/ProdiProvider";
import { message } from "antd";

const useCpl = () => {
	const { selectedProdiId } = useContext(ProdiContext);
	const [loading, setLoading] = useState(false);
	const [cplData, setCplData] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [alert, setAlert] = useState();
	const [error, setError] = useState(null);

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

	const fetchData = async (prodiId = null) => {
		setLoading(true);
		try {
			const data = await fetchCpls(prodiId);
			setCplData(data.data);
		} catch (error) {
			console.error(error);
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		} finally {
			setLoading(false);
		}
	};

	const handleSaveCpls = async () => {
		setError(null);
		setLoading(true);
		try {
			await upsertCpl({ cpls: cplData });
			fetchData();
			message.success("Berhasil Menyimpan CPL");
		} catch (error) {
			setError(
				error.response?.data?.errors ||
					error.response?.data?.message || {
						message: "Terjadi kesalahan saat menyimpan CPL.",
					}
			);
			message.error("Gagal menyimpan CPL");
		} finally {
			setLoading(false);
		}
	};

	const handleExportTemplateCpl = async () => {
		setLoading(true);
		try {
			await getCPLTemplate();
			message.success("Template berhasil diexport");
		} catch (error) {
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		} finally {
			setLoading(false);
		}
	};

	const handleImportCpl = async (file) => {
		setLoading(true);
		try {
			await importCPL(file);
			fetchData();
			message.success("CPL berhasil diimport");
		} catch (error) {
			message.error("Gagal mengunggah file. Coba lagi.");
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
			message.success("CPL  Berhasil dihapus");
		} catch (error) {
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		} finally {
			setLoading(false);
		}
	};

	const handleDestroyCpls = async () => {
		if (!Array.isArray(selectedRowKeys) || selectedRowKeys.length === 0) {
			console.error("Error: Tidak ada data yang dipilih untuk dihapus.");
			return;
		}

		setLoading(true);
		try {
			const itemsToDelete = selectedRowKeys.map((key) => cplData[key]);
			const validIds = itemsToDelete.map((item) => item.id).filter(Boolean); // Ambil ID yang valid saja

			if (validIds.length > 0) {
				await deleteCpls({ cpls_id: validIds });
			}

			fetchData();
			setSelectedRowKeys([]);
			message.success("CPL  Berhasil dihapus");
		} catch (error) {
			console.error(
				"Error deleting CPL:",
				error.response?.data || error.message
			);
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
		handleDestroyCpls,
		rowSelection,
		selectedRowKeys,
		error,
	};
};

export default useCpl;
