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
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [editingBuku, setEditingBuku] = useState(null);

	useEffect(() => {
		fetchData();
	}, []);

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
			if (editingBuku) {
				await updateBukuReferensi(editingBuku.id, values);
				message.success("Buku referensi berhasil diperbarui");
			} else {
				await createBukuReferensi(values);
				message.success("Buku referensi berhasil ditambahkan");
			}
			setModalOpen(false);
			fetchData();
		} catch (error) {
			message.error("Gagal menyimpan data buku referensi");
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
		buku,
		loading,
		modalOpen,
		editingBuku,
		setModalOpen,
		handleAdd,
		handleEdit,
		handleDelete,
		handleSubmit,
		handleExportTemplate,
		handleImportBukuReferensi
	};
};

export default useBukuReferensi;
