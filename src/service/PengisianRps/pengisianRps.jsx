import api from "../../utils/axiosInstance";

/* --------------------------------CPL API-------------------------------------------- */
export const getMatkulDropdown = async (id) => {
	try {
		const response = await api.get(`rps/matkul-dropdown/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching CPLs:", error);
		throw error;
	}
};
