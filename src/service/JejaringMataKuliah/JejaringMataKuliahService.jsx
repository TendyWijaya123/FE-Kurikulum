import api from "../../utils/axiosInstance";

export const getJejaringMataKuliah = async (prodiId = null) => {
	try {
		const params = prodiId ? { prodiId } : {};
		const response = await api.get("/jejaring-matakuliah", { params });
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getJejaringPrasyarat = async (prodiId = null) => {
	try {
		const params = prodiId ? { prodiId } : {};
		const response = await api.get("/jejaring-matakuliah/jejaring-prasyarat", {
			params,
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const updateJejaringMataKuliah = async (id, jejaringData) => {
	try {
		const response = await api.post(
			`jejaring-matakuliah/assign/${id}`,
			jejaringData
		);

		return response.data;
	} catch (error) {
		throw error;
	}
};

export const uploadJejaringMataKuliahDiagram = async (gambarData) => {
	try {
		const response = await api.post(`jejaring-matakuliah/upload`, gambarData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return response.data;
	} catch (error) {
		throw error;
	}
};
