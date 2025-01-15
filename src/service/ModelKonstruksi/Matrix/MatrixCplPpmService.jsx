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

export const getMatrixCplPpm = async () => {
	try {
		const response = await api.get("/matrix-cpl-ppm");
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error("Error upserting CPL:", error);
		throw error;
	}
};
