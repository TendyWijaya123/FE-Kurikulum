import axios from "axios";

const API_URL = "http://localhost:8000/api";

const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

export const getBenchKurikulums = async (prodiId = null) => {
	try {
		const params = prodiId ? { prodiId } : {};
		const token = localStorage.getItem("authToken");

		const headers = token ? { Authorization: `Bearer ${token}` } : {};

		const response = await api.get(`/bench-kurikulums`, {
			params,
			headers,
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const postBenchKurikulms = async (data) => {
	try {
		const token = localStorage.getItem("authToken");

		const headers = token ? { Authorization: `Bearer ${token}` } : {};
		const response = await api.post(`/bench-kurikulums`, data, { headers });

		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deleteBenchKurikulums = async (data) => {
	try {
		const token = localStorage.getItem("authToken");

		const headers = token ? { Authorization: `Bearer ${token}` } : {};

		const response = await api.delete(`/bench-kurikulums`, {
			headers,
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
		const token = localStorage.getItem("authToken");

		const headers = token ? { Authorization: `Bearer ${token}` } : {};

		const response = await api.delete(`/bench-kurikulums/${id}`, { headers });
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
