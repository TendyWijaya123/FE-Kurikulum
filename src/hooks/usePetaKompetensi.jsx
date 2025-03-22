import { useState, useEffect, useContext } from "react";
import { message } from "antd";
import {
	getPetaKompetensi,
	uploadPetaKompetensi,
	deletePetaKompetensi,
} from "../service/PetaKompetensiService";
import { AuthContext } from "../context/AuthProvider";

export const usePetaKompetensi = () => {
	const [loading, setLoading] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [petaData, setPetaData] = useState(null);
	const [imageVisible, setImageVisible] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);

	// Fetch peta kompetensi data
	const fetchPetaData = async () => {
		setLoading(true);
		try {
			const response = await getPetaKompetensi();
			if (response.success) {
				setPetaData(response.data);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
			message.error("Gagal memuat data peta kompetensi");
		} finally {
			setLoading(false);
		}
	};

	// Initial data fetch
	useEffect(() => {
		fetchPetaData();
	}, []);

	// Upload image
	const handleUpload = async (file) => {
		setUploading(true);
		try {
			const formData = new FormData();
			formData.append("gambar", file);

			// Log formData for debugging
			console.log("Form data created, attempting upload...");

			const response = await uploadPetaKompetensi(formData);
			console.log("Upload response:", response);

			if (response.success) {
				message.success("Gambar berhasil diunggah");
				fetchPetaData();
			}
		} catch (error) {
			console.error("Upload error:", error);

			// More detailed error message
			if (
				error.response &&
				error.response.data &&
				error.response.data.message
			) {
				message.error(
					`Gagal mengunggah gambar: ${error.response.data.message}`
				);
			} else {
				message.error("Gagal mengunggah gambar");
			}
		} finally {
			setUploading(false);
		}
	};

	// Delete image
	const handleDelete = async (id) => {
		setDeleting(id); // Track which item is being deleted
		try {
			const response = await deletePetaKompetensi(id);
			if (response.success) {
				message.success("Gambar berhasil dihapus");
				setPetaData(null);
			}
		} catch (error) {
			console.error("Delete error:", error);
			message.error("Gagal menghapus gambar");
		} finally {
			setDeleting(false);
		}
	};

	// Show image in modal
	const showImage = (imageUrl) => {
		setSelectedImage(imageUrl);
		setImageVisible(true);
	};

	return {
		loading,
		uploading,
		deleting,
		petaData,
		imageVisible,
		selectedImage,
		handleUpload,
		handleDelete,
		showImage,
	};
};
