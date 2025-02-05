import api from "../utils/axiosInstance";

export const updatePermissionRole = async (data) => {
	try {
		const response = await api.put("/permission-role", data);
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

export const getPermissionRole = async () => {
	try {
		const response = await api.get("/permission-role");
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
