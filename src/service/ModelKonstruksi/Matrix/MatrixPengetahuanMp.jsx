import api from "../../../utils/axiosInstance";

export const updateMatrixPengetahuanMp = async (data) => {
	try {
		const response = await api.put("/matrix-p-mp", data);
		return response.data;
	} catch (error) {
		if (error.response) {
			console.error("Error Put matriks p mp:", error.response.data);
		} else {
			// Jika error tidak berasal dari server (misalnya, masalah jaringan)
			console.error("Error Put matriks p mp:", error.message);
		}
		throw error;
	}
};

export const getMatrixPengetahuanMp = async (prodiId = null) => {
	try {
		const params = prodiId ? { prodiId } : {};
		const response = await api.get("/matrix-p-mp", { params });
		return response.data;
	} catch (error) {
		if (error.response) {
			console.error("Error Get matriks p mp:", error.response.data);
		} else {
			// Jika error tidak berasal dari server (misalnya, masalah jaringan)
			console.error("Error Get matriks p mp:", error.message);
		}
		throw error;
	}
};
