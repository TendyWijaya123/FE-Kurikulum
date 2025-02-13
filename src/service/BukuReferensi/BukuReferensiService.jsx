import api from "../../utils/axiosInstance";

export const getBukuReferensi = async () => {
	try {
		const response = await api.get("/buku-referensi");
		return response.data;
	} catch (error) {
		console.error("Error fetching buku referensi:", error);
		throw error;
	}
};

export const createBukuReferensi = async (data) => {
	try {
		const response = await api.post("/buku-referensi", data);
		return response.data;
	} catch (error) {
		console.error("Error creating buku referensi:", error);
		throw error;
	}
};

export const getDropDownBukuReferensiByJurusan = async () => {
	try {
		const response = await api.get("/buku-referensi/dropdown-by-jurusan");
		return response.data;
	} catch (error) {
		console.error("Error creating buku referensi:", error);
		throw error;
	}
};

// Update buku referensi berdasarkan ID
export const updateBukuReferensi = async (id, data) => {
	try {
		const response = await api.put(`/buku-referensi/${id}`, data);
		return response.data;
	} catch (error) {
		console.error("Error updating buku referensi:", error);
		throw error;
	}
};

// Hapus buku referensi berdasarkan ID
export const deleteBukuReferensi = async (id) => {
	try {
		const response = await api.delete(`/buku-referensi/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting buku referensi:", error);
		throw error;
	}
};
