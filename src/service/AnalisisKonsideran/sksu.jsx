import api from "../../utils/axiosInstance";

export const getSksu = async (prodiId = null) => {
	try {
		const params = prodiId ? { prodiId } : {};

		const response = await api.get(`/sksu`, {
			params,
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching sksu:", error);
		throw error;
	}
};

export const postSksu = async (data) => {
	try {
		const response = await api.post(`/sksu`, data);

		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deleteSksus = async (data) => {
	try {
		const response = await api.delete(`/sksu`, {
			data,
		});

		return response.data;
	} catch (error) {
		if (error.response) {
			console.error("Error delete sksu:", error.response.data);
		} else {
			// Jika error tidak berasal dari server (misalnya, masalah jaringan)
			console.error("Error delete sksu:", error.message);
		}
		throw error;
	}
};

export const deleteSksu = async (id) => {
	try {
		const response = await api.delete(`/sksu/${id}`);
		return response.data;
	} catch (error) {
		if (error.response) {
			console.error("Error delete sksu:", error.response.data);
		} else {
			// Jika error tidak berasal dari server (misalnya, masalah jaringan)
			console.error("Error delete sksu:", error.message);
		}
		throw error;
	}
};
