import api from "../../../utils/axiosInstance";

export const updateMatrixCplP = async (matrixCplP) => {
	try {
		const response = await api.put("/matrix-cpl-p", matrixCplP);
		return response.data;
	} catch (error) {
		console.error("Error updating Matrix CPL-P:", error);
		throw error;
	}
};

export const getMatrixCplP = async (prodiId = null) => {
	try {
		const params = prodiId ? { prodiId } : {};
		const response = await api.get("/matrix-cpl-p", { params });
		return response.data;
	} catch (error) {
		console.error("Error getting Matrix CPL-P:", error);
		throw error;
	}
};
