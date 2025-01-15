import api from "../utils/axiosInstance";

export const getIea = async (prodiId) => {
	try {
		const response = await api.get("/iea", {params: { prodiId },});
		return response.data;
	} catch (error) {
		console.error("Error getting iea:", error);
		throw error;
	}
};