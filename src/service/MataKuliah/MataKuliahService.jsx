import api from "../../utils/axiosInstance";

/* -------------------------------------Mata Kuliah API -------------------------------------------------- */
export const fetchMataKuliah = async (prodiId = null) => {
	try {
		const params = prodiId ? { prodiId } : {};
		const response = await api.get("/mata-kuliah", { params });
		return response.data;
	} catch (error) {
		console.error("Error fetching Mata Kuliah:", error);
		throw error;
	}
};

export const getMataKuliahDropdown = async () => {
	try {
		const response = await api.get("/mata-kuliah/dropdown-by-kurikulum");
		return response.data;
	} catch (error) {
		console.error("Error fetching Mata Kuliah:", error);
		throw error;
	}
};

export const fetchMataKuliahByJurusan = async () => {
	try {
		const response = await api.get("/mata-kuliah/show-jurusan");
		return response.data;
	} catch (error) {
		console.error("Error fetching Mata Kuliah by Jurusan:", error);
		throw error;
	}
};

export const getMataKuliahByDosenPengampu = async () => {
	const response = await api.get("/mata-kuliah/pengampu");
	return response.data;
};

export const createMataKuliah = async (mataKuliahData) => {
	try {
		const response = await api.post("/mata-kuliah", mataKuliahData);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const updateMataKuliah = async (id, mataKuliahData) => {
	try {
		const response = await api.put(`/mata-kuliah/${id}`, mataKuliahData);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const updateDeskripsiSingkatMK = async (id, deskripsi) => {
	try {
		const response = await api.put(`/mata-kuliah/pengampu/${id}`, {
			deskripsi_singkat: deskripsi,
		});
		return response.data;
	} catch (error) {
		console.error("Error updating Mata Kuliah:", error);
		throw error;
	}
};

export const assignReferensiKeMataKuliah = async (
	mataKuliahId,
	bukuReferensiId
) => {
	try {
		const response = await api.post("/mata-kuliah/assign-referensi", {
			mata_kuliah_id: mataKuliahId,
			buku_referensi_id: bukuReferensiId,
		});
		return response.data;
	} catch (error) {
		console.error("Error assigning Buku Referensi to Mata Kuliah:", error);
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
