import { useState, useEffect } from "react";
import {
	createPeranIndustri,
	deletePeranIndustri,
	updatePeranIndustri,
	fetchPeranIndustri,
} from "../../service/ModelKonstruksi/CPLPPMVM/CPLPPMVM";
import {
	getPeranIndustriTemplate,
	importPeranIndustri,
} from "../../service/Import/ImportService";

const usePeranIndustri = () => {
	const [peranIndustriList, setPeranIndustriList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [editingId, setEditingId] = useState(null);
	const [formData, setFormData] = useState({
		jabatan: "",
		descriptions: [{ deskripsi_point: "" }],
	});

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await fetchPeranIndustri();
			setPeranIndustriList(response.data);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleDescriptionChange = (e, index) => {
		const { name, value } = e.target;
		const newDescriptions = [...formData.descriptions];
		newDescriptions[index][name] = value;
		setFormData((prev) => ({
			...prev,
			descriptions: newDescriptions,
		}));
	};

	const handleAddDescription = () => {
		setFormData((prev) => ({
			...prev,
			descriptions: [...prev.descriptions, { deskripsi_point: "" }],
		}));
	};

	const handleDeleteDescription = (index) => {
		const newDescriptions = formData.descriptions.filter((_, i) => i !== index);
		setFormData((prev) => ({
			...prev,
			descriptions: newDescriptions,
		}));
	};

	const handleCancel = () => {
		setEditingId(null);
		setFormData({ jabatan: "", descriptions: [{ deskripsi_point: "" }] });
	};

	const handleEdit = (id, jabatan, descriptions) => {
		setEditingId(id);
		setFormData({ jabatan, descriptions });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (editingId) {
			await updatePeranIndustriItem(editingId, formData);
		} else {
			await addPeranIndustri(formData);
		}
		handleCancel();
	};

	const handleExportTemplatePeranIndustri = async () => {
		try {
			await getPeranIndustriTemplate();
		} catch (error) {
			setAlert(`Terjadi kesalahan: ${error.message || error}`);
		}
	};

	const handleImportPeranIndustri = async (file) => {
		try {
			await importPeranIndustri(file);
			fetchData();
		} catch (error) {
			message.error("Gagal mengunggah file. Coba lagi.");
		}
	};

	const addPeranIndustri = async (data) => {
		setLoading(true);
		try {
			const response = await createPeranIndustri(data);
			setPeranIndustriList((prevList) => [...prevList, response.data]);
			fetchData();
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	const removePeranIndustri = async (id) => {
		setLoading(true);
		try {
			await deletePeranIndustri(id);
			setPeranIndustriList((prevList) =>
				prevList.filter((item) => item.id !== id)
			);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	const updatePeranIndustriItem = async (id, data) => {
		setLoading(true);
		try {
			const response = await updatePeranIndustri(id, data);
			setPeranIndustriList((prevList) =>
				prevList.map((item) =>
					item.id === id ? { ...item, ...response.data } : item
				)
			);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	return {
		peranIndustriList,
		loading,
		error,
		formData,
		editingId,
		setFormData,
		handleInputChange,
		handleDescriptionChange,
		handleAddDescription,
		handleDeleteDescription,
		handleCancel,
		handleEdit,
		handleSubmit,
		addPeranIndustri,
		removePeranIndustri,
		updatePeranIndustriItem,
		handleExportTemplatePeranIndustri,
		handleImportPeranIndustri,
	};
};

export default usePeranIndustri;
