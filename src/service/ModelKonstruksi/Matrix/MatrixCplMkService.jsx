import api from "../../../utils/axiosInstance";

export const updateMatrixCplMk = async (matrixCplMk) => {
	try {
		const response = await api.put("/matrix-mk-cpl", matrixCplMk);
		return response.data;
	} catch (error) {
		console.error("Error upserting CPL:", error);
		throw error;
	}
};

export const getMatrixCplMk = async (prodiId = null) => {
	try {
		const params = prodiId ? { prodiId } : {};
		const response = await api.get("/matrix-mk-cpl", { params });
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error("Error upserting CPL:", error);
		throw error;
	}
};
