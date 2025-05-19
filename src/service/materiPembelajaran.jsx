import api from "../utils/axiosInstance";

export const getMateriPembelajarans = async (prodiId = null) => {
	try {
		const params = prodiId ? { prodiId } : {};
		const response = await api.get(`/materi-pembelajaran`, {
			params,
		});
		return response.data;
	} catch (error) {
		if (error.response) {
			console.error("Error Get materi pembelajaran:", error.response.data);
		} else {
			// Jika error tidak berasal dari server (misalnya, masalah jaringan)
			console.error("Error Get materi pembelajaran:", error.message);
		}
		throw error;
	}
};

export const postMateriPembelajaran = async (data) => {
	try {
		const response = await api.post(`/materi-pembelajaran`, data);
		return response.data;
	} catch (error) {
		if (error.response) {
			console.error("Error creating materi pembelajaran:", error.response.data);
		} else {
			// Jika error tidak berasal dari server (misalnya, masalah jaringan)
			console.error("Error creating materi pembelajaran:", error.message);
		}
		throw error;
	}
};

export const deleteMateriPembelajarans = async (data) => {
	try {
		const response = await api.delete(`/materi-pembelajaran`, {
			data,
		});

		return response.data;
	} catch (error) {
		if (error.response) {
			console.error("Error delete materi pembelajaran:", error.response.data);
		} else {
			// Jika error tidak berasal dari server (misalnya, masalah jaringan)
			console.error("Error delete materi pembelajaran:", error.message);
		}
		throw error;
	}
};

export const deleteMateriPembelajaran = async (id) => {
	try {
		const response = await api.delete(`/materi-pembelajaran/${id}`);
		return response.data;
	} catch (error) {
		if (error.response) {
			console.error("Error delete materi pembelajaran:", error.response.data);
		} else {
			// Jika error tidak berasal dari server (misalnya, masalah jaringan)
			console.error("Error delete materi pembelajaran:", error.message);
		}
		throw error;
	}
};
