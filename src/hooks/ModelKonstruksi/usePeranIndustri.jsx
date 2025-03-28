import { useState, useEffect, useContext } from "react";
import {
	deletePeranIndustri,
	deletePeranIndustris,
	fetchPeranIndustri,
	upsertPeranIndustri,
} from "../../service/ModelKonstruksi/CPLPPMVM/CPLPPMVM";
import {
	getPeranIndustriTemplate,
	importPeranIndustri,
} from "../../service/Import/ImportService";
import { ProdiContext } from "../../context/ProdiProvider";
import { message } from "antd";

const usePeranIndustri = () => {
	const { selectedProdiId } = useContext(ProdiContext);
	const [peranIndustriData, setPeranIndustriData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [errors, setErrors] = useState(null);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [alert, setAlert] = useState(null);

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
			const response = await fetchPeranIndustri(prodiId);
			setPeranIndustriData(response.data);
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData(selectedProdiId);
	}, [selectedProdiId]);

	const handleSavePeranIndustri = async () => {
		setErrors(null);
		setLoading(true);
		try {
			await upsertPeranIndustri({ peran_industri: peranIndustriData });
			fetchData();
			message.success("Berhasil Menyimpan Peran Industri");
		} catch (error) {
			setErrors(
				error.response?.data?.errors ||
					error.response?.data?.message || {
						message: "Terjadi kesalahan saat menyimpan CPL.",
					}
			);
			message.error("Gagal menyimpan Peran Industri");
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

	const handleDestroyPeranIndustris = async () => {
		if (!selectedRowKeys.length) {
			setAlert("Pilih minimal satu peran industri untuk dihapus.");
			return;
		}

		// Ambil ID dari selectedRowKeys (yang merupakan index dalam peranIndustriData)
		const idsToDelete = selectedRowKeys
			.map((index) => peranIndustriData[index]?.id)
			.filter((id) => id); // Hanya ambil ID yang valid (bukan undefined/null)

		if (!idsToDelete.length) {
			setAlert("Tidak ada ID valid untuk dihapus.");
			return;
		}

		setLoading(true);
		try {
			await deletePeranIndustris({ peran_industris_id: idsToDelete });

			// Hapus dari state setelah berhasil
			setPeranIndustriData((prevData) =>
				prevData.filter((_, index) => !selectedRowKeys.includes(index))
			);

			setSelectedRowKeys([]); // Reset pilihan
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
		errors,
		handleSavePeranIndustri,
		handleExportTemplatePeranIndustri,
		handleImportPeranIndustri,
		handleDeletePeranIndustri,
		handleAddPeranIndustri,
		handlePeranIndustriChange,
		handleDeletePeranIndustriPoint,
		handleDestroyPeranIndustris,
		rowSelection,
		selectedRowKeys,
		alert,
	};
};

export default usePeranIndustri;
