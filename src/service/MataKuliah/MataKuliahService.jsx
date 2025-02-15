import api from "../../utils/axiosInstance";

/* -------------------------------------Mata Kuliah API -------------------------------------------------- */
export const fetchMataKuliah = async () => {
	try {
		const response = await api.get("/mata-kuliah");
		return response.data;
	} catch (error) {
		console.error("Error fetching Mata Kuliah:", error);
		throw error;
	}
};

export const createMataKuliah = async (mataKuliahData) => {
	try {
		const response = await api.post("/mata-kuliah", mataKuliahData);
		return response.data;
	} catch (error) {
		console.error("Error creating Mata Kuliah:", error);
		throw error;
	}
};

export const updateMataKuliah = async (id, mataKuliahData) => {
	try {
		const response = await api.put(`/mata-kuliah/${id}`, mataKuliahData);
		return response.data;
	} catch (error) {
		console.error("Error updating Mata Kuliah:", error);
		throw error;
	}
};

export const deleteMataKuliah = async (id) => {
	try {
		const response = await api.delete(`/mata-kuliah/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error updating Mata Kuliah:", error);
		throw error;
	}
};

/* -------------------------------------Bentuk Pembelajaran API -------------------------------------------------- */
export const fetchBentukPembelajaranDropdown = async () => {
	try {
		const response = await api.get("bentuk-pembelajaran/dropdown");
		return response.data;
	} catch (error) {
		console.error("Error fetching Bentuk Pembelajaran dropdown:", error);
		throw error;
	}
};

/* -------------------------------------Metode Pembelajaran API -------------------------------------------------- */
export const fetchMetodePembelajaranDropdown = async () => {
	try {
		const response = await api.get("metode-pembelajaran/dropdown");
		return response.data;
	} catch (error) {
		console.error("Error fetching Metode Pembelajaran dropdown:", error);
		throw error;
	}
};

/* -------------------------------------Formulasi CPA API -------------------------------------------------- */
export const fetchFormulasiCpaDropdown = async () => {
	try {
		const response = await api.get("formulasi-cpa/dropdown");
		return response.data;
	} catch (error) {
		console.error("Error fetching Formulasi CPA dropdown:", error);
		throw error;
	}
};
