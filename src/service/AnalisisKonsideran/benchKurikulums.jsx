import api from "../../utils/axiosInstance";

export const getBenchKurikulums = async (prodiId = null) => {
	try {
		const params = prodiId ? { prodiId } : {};

		const response = await api.get(`/bench-kurikulums`, {
			params,
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const postBenchKurikulms = async (data) => {
	try {
		const response = await api.post(`/bench-kurikulums`, data);

		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deleteBenchKurikulums = async (data) => {
	try {
		const response = await api.delete(`/bench-kurikulums`, {
			data,
		});

		return response.data;
	} catch (error) {
		if (error.response) {
			console.error("Error delete bench kurikulums:", error.response.data);
		} else {
			// Jika error tidak berasal dari server (misalnya, masalah jaringan)
			console.error("Error delete bench kurikulums:", error.message);
		}
		throw error;
	}
};

export const deleteBK = async (id) => {
	try {
		const response = await api.delete(`/bench-kurikulums/${id}`);
		return response.data;
	} catch (error) {
		if (error.response) {
			console.error("Error delete bench kurikulum:", error.response.data);
		} else {
			// Jika error tidak berasal dari server (misalnya, masalah jaringan)
			console.error("Error delete benchkurikulum:", error.message);
		}
		throw error;
	}
};
