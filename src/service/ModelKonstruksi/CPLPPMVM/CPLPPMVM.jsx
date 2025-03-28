import api from "../../../utils/axiosInstance";

/* --------------------------------CPL API-------------------------------------------- */
export const fetchCpls = async (prodiId = null) => {
	try {
		const params = prodiId ? { prodiId } : {};
		const response = await api.get("/cpls", { params });
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const upsertCpl = async (cplData) => {
	try {
		const response = await api.post("/cpls/upsert", cplData);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deleteCpl = async (id) => {
	try {
		const response = await api.delete(`/cpls/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting CPL:", error);
		throw error;
	}
};

export const deleteCpls = async (cplData) => {
	try {
		const response = await api.delete("/cpls/multiple-delete", {
			data: cplData,
			headers: { "Content-Type": "application/json" },
		});
		return response.data;
	} catch (error) {
		console.error("Error deleting Cpl:", error);
		throw error;
	}
};

/* --------------------------------PPM API-------------------------------------------- */
export const fetchPpms = async (prodiId = null) => {
	try {
		const params = prodiId ? { prodiId } : {};
		const response = await api.get("/ppms", { params });
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const upsertPpm = async (ppmData) => {
	try {
		const response = await api.post("/ppms/upsert", ppmData);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deletePpms = async (ppmData) => {
	try {
		const response = await api.delete("/ppms/multiple-delete", {
			data: ppmData,
			headers: { "Content-Type": "application/json" },
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deletePpm = async (id) => {
	try {
		const response = await api.delete(`/ppms/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

/* --------------------------------Peran Industri API-------------------------------------------- */

export const fetchPeranIndustri = async (prodiId = null) => {
	try {
		const params = prodiId ? { prodiId } : {};
		const response = await api.get("/peran-industri", { params });
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const upsertPeranIndustri = async (peranIndustriData) => {
	try {
		const response = await api.post(
			"/peran-industri/upsert",
			peranIndustriData
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deletePeranIndustri = async (id) => {
	try {
		const response = await api.delete(`/peran-industri/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deletePeranIndustris = async (peranIndustriData) => {
	try {
		const response = await api.delete("/peran-industri/multiple-delete", {
			data: peranIndustriData,
			headers: { "Content-Type": "application/json" },
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};
