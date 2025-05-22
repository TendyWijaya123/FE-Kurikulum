import { useEffect, useState } from "react";
import { message } from "antd";
import {
	getBukuReferensi,
	createBukuReferensi,
	updateBukuReferensi,
	deleteBukuReferensi,
} from "../../service/BukuReferensi/BukuReferensiService";
import { getBukuReferensiTemplate, importBukuReferensi } from "../../service/Import/ImportService";

const useBukuReferensi = () => {
	const [buku, setBuku] = useState([]);
	const [filteredBuku, setFilteredBuku] = useState([]);
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [editingBuku, setEditingBuku] = useState(null);

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		setFilteredBuku(buku);
	}, [buku]);

	const fetchData = async () => {
		setLoading(true);
		try {
			const data = await getBukuReferensi();
			setBuku(data);
		} catch (error) {
			message.error("Gagal mengambil data buku referensi");
		}
		setLoading(false);
	};

	const handleAdd = () => {
		setEditingBuku(null);
		setModalOpen(true);
	};

	const handleEdit = (record) => {
		setEditingBuku(record);
		setModalOpen(true);
	};

	const handleDelete = async (id) => {
		try {
			await deleteBukuReferensi(id);
			message.success("Buku referensi berhasil dihapus");
			fetchData();
		} catch (error) {
			message.error("Gagal menghapus buku referensi");
		}
	};

	const handleSubmit = async (values) => {
		try {
			// Validate and format the data before sending
			const formattedData = {
				judul: values.judul.trim(),
				penulis: values.penulis.trim(),
				penerbit: values.penerbit?.trim() || '',
				tahun_terbit: values.tahun_terbit ? parseInt(values.tahun_terbit) : null
			};

			// Validate required fields
			if (!formattedData.judul || !formattedData.penulis) {
				message.error("Judul dan penulis harus diisi!");
				return;
			}

			if (editingBuku) {
				await updateBukuReferensi(editingBuku.id, formattedData);
				message.success("Buku referensi berhasil diperbarui");
			} else {
				await createBukuReferensi(formattedData);
				message.success("Buku referensi berhasil ditambahkan");
			}
			setModalOpen(false);
			fetchData();
		} catch (error) {
			// Show more specific error message from server if available
			const errorMessage = error.response?.data?.message || "Gagal menyimpan data buku referensi";
			message.error(errorMessage);
		}
	};

	const handleExportTemplate = async () => {
        try {
            await getBukuReferensiTemplate();
			message.success("Berhasil mengunduh template");
        } catch (error) {
            message.error(`Terjadi kesalahan: ${error.message || error}`);
        }
    };

    const handleImportBukuReferensi = async (file) => {
        try {
            await importBukuReferensi(file);
            message.success("Data berhasil diimport");
            fetchData();
        } catch (error) {
            message.error("Gagal mengunggah file. Coba lagi.");
        }
    };

	return {
		buku: filteredBuku,
		loading,
		modalOpen,
		editingBuku,
		setModalOpen,
		handleAdd,
		handleEdit,
		handleDelete,
		handleSubmit,
		handleExportTemplate,
		handleImportBukuReferensi,
		setFilteredBuku,
		fetchData
	};
};

export default useBukuReferensi;
