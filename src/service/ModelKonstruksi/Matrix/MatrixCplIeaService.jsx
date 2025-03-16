import api from "../../../utils/axiosInstance";

export const updateMatrixCplIea = async (data) => {
	try {
		const response = await api.put("/matrix-cpl-iea", data);
		return response.data;
	} catch (error) {
		if (error.response) {
			console.error("Error Put matriks cpl iea:", error.response.data);
		} else {
			// Jika error tidak berasal dari server (misalnya, masalah jaringan)
			console.error("Error Put matriks cpl iea:", error.message);
		}
		throw error;
	}
};

export const getMatrixCplIea = async (prodiId = null) => {
	try {
		const params = prodiId ? { prodiId } : {};
		const response = await api.get("/matrix-cpl-iea", { params });
		return response.data;
	} catch (error) {
		if (error.response) {
			console.error("Error Get matriks cpl iea:", error.response.data);
		} else {
			// Jika error tidak berasal dari server (misalnya, masalah jaringan)
			console.error("Error Get matriks cpl iea:", error.message);
		}
		throw error;
	}
};
