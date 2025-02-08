import api from "../../../utils/axiosInstance";

/* --------------------------------CPL API-------------------------------------------- */
export const fetchCpls = async () => {
	try {
		const response = await api.get("/cpls");
		return response.data;
	} catch (error) {
		console.error("Error fetching CPLs:", error);
		throw error;
	}
};

export const upsertCpl = async (cplData) => {
	try {
		const response = await api.post("/cpls/upsert", cplData);
		return response.data;
	} catch (error) {
		console.error("Error upserting CPL:", error);
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

/* --------------------------------PPM API-------------------------------------------- */
export const fetchPpms = async () => {
	try {
		const response = await api.get("/ppms");
		return response.data;
	} catch (error) {
		console.error("Error fetching PPMs:", error);
		throw error;
	}
};

export const upsertPpm = async (ppmData) => {
	try {
		const response = await api.post("/ppms/upsert", ppmData);
		return response.data;
	} catch (error) {
		console.error("Error upserting PPM:", error);
		throw error;
	}
};

export const deletePpm = async (id) => {
	try {
		const response = await api.delete(`/ppms/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting PPM:", error);
		throw error;
	}
};

/* --------------------------------Peran Industri API-------------------------------------------- */

export const fetchPeranIndustri = async () => {
	try {
		const response = await api.get("/peran-industri");
		return response.data;
	} catch (error) {
		console.error("Error fetching Peran Industri:", error);
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
		console.error("Error upserting Peran Industri:", error);
		throw error;
	}
};

export const deletePeranIndustri = async (id) => {
	try {
		const response = await api.delete(`/peran-industri/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting Peran Industri:", error);
		throw error;
	}
};
