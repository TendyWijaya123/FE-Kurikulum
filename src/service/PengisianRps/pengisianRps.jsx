import api from "../../utils/axiosInstance";

/* --------------------------------CPL API-------------------------------------------- */
export const getMatkulDropdown = async (id) => {
	try {
        console.log(id);
		const response = await api.get(`rps/matkul-dropdown/${id}`);
        console.log(response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching CPLs:", error);
		throw error;
	}
};

