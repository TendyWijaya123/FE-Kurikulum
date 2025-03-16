import api from "../../../utils/axiosInstance";

export const updateMatrixCplPpm = async (matrixCplPpm) => {
	try {
		const response = await api.put("/matrix-cpl-ppm", matrixCplPpm);
		return response.data;
	} catch (error) {
		console.error("Error upserting CPL:", error);
		throw error;
	}
};

export const getMatrixCplPpm = async (prodiId) => {
	try {
		const params = prodiId ? { prodiId } : {};
		const response = await api.get("/matrix-cpl-ppm", { params });
		return response.data;
	} catch (error) {
		console.error("Error upserting CPL:", error);
		throw error;
	}
};
