import api from "../../../utils/axiosInstance";

export const updateMatrixCplIea = async (data) => {
	try {
		const response = await api.put("/matrix-cpl-iea", data);
		return response.data;
	} catch (error) {
		if(error.response) {
            console.error("Error Put matriks cpl iea:", error.response.data);
		} else {
			// Jika error tidak berasal dari server (misalnya, masalah jaringan)
			console.error("Error Put matriks cpl iea:", error.message);
		}
		throw error;
	}
};

export const getMatrixCplIea = async (prodiId) => {
	try {
		const response = await api.get("/matrix-cpl-iea", {params: {prodiId}});
		return response.data;
	} catch (error) {
		if(error.response) {
            console.error("Error Get matriks cpl iea:", error.response.data);
		} else {
			// Jika error tidak berasal dari server (misalnya, masalah jaringan)
			console.error("Error Get matriks cpl iea:", error.message);
		}
		throw error;
	}
};
