import api from "../../utils/axiosInstance";

/* -------------------------------------RPS API -------------------------------------------------- */

export const getRps = async (id) => {
	try {
		const response = await api.get(`rps/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const storeRps = async (data) => {
	try {
		const response = await api.post("rps", data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const updateRps = async (id, data) => {
	try {
		const response = await api.put(`rps/${id}`, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deleteRps = async (id) => {
	try {
		const response = await api.delete(`rps/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};
