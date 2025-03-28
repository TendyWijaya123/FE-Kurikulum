import api from "../../../utils/axiosInstance";

export const updateMatrixMpPMK = async (data) => {
	try {
		const response = await api.put("/matrix-mp-p-mk", data);
		return response.data;
	} catch (error) {
		if (error.response) {
			console.error("Error Put matrix mp p mk:", error.response.data);
		} else {
			console.error("Error Put matrix mp p mk:", error.message);
		}
		throw error;
	}
};

export const getMatrixMpPMK = async (prodiId = null) => {
	try {
		const params = prodiId ? { prodiId } : {};

		const response = await api.get("/matrix-mp-p-mk", { params });
		return response.data;
	} catch (error) {
		if (error.response) {
			console.error("Error Get matriks matrix mp p mk:", error.response.data);
		} else {
			console.error("Error Get matrix mp p mk:", error.message);
		}
		throw error;
	}
};
