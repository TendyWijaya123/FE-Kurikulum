import api from "../../utils/axiosInstance";

export const getIlmuPengetahuan = async (prodiId = null) => {
	try {
		const params = prodiId ? { prodiId } : {};

		const response = await api.get("/ilmu-pengetahuan", {
			params,
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching Ilmu Pengetahuan data:", error);
		throw error;
	}
};

export const createIlmuPengetahuan = async (data) => {
	try {
		const response = await api.post("/ilmu-pengetahuan", data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deleteIlmuPengetahuan = async (id) => {
	try {
		const response = await api.delete(`/ilmu-pengetahuan/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const downloadIlmuPengetahuanTemplate = async () => {
	try {
		const response = await api.get("/ilmu-pengetahuan/template", {
			responseType: "blob",
		});

		const blob = new Blob([response.data], {
			type: response.headers["content-type"],
		});
		const url = window.URL.createObjectURL(blob);

		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "ilmu-pengetahuan-template.xlsx");
		document.body.appendChild(link);
		link.click();

		window.URL.revokeObjectURL(url);
		document.body.removeChild(link);

		return response.data;
	} catch (error) {
		console.error("Error downloading template:", error);
		throw error;
	}
};

export const importIlmuPengetahuan = async (formData) => {
	try {
		const response = await api.post("/ilmu-pengetahuan/import", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error importing ilmu pengetahuan data:", error);
		throw error;
	}
};

export const getTeknologi = async (prodiId = null) => {
	try {
		const params = prodiId ? { prodiId } : {};
		const response = await api.get("/teknologi", {
			params,
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const createTeknologi = async (data) => {
	try {
		const response = await api.post("/teknologi", data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deleteTeknologi = async (id) => {
	try {
		const response = await api.delete(`teknologi/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const downloadTeknologiTemplate = async () => {
	try {
		const response = await api.get("/teknologi/template", {
			responseType: "blob",
		});
		return response.data;
	} catch (error) {
		console.error("Error downloading template:", error);
		throw error;
	}
};

export const importTeknologi = async (formData) => {
	try {
		const response = await api.post("/teknologi/import", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error importing ilmu pengetahuan data:", error);
		throw error;
	}
};

export const getSeni = async (prodiId = null) => {
	try {
		const params = prodiId ? { prodiId } : {};
		const response = await api.get("/seni", {
			params,
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const createSeni = async (data) => {
	try {
		const response = await api.post("/seni", data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deleteSeni = async (id) => {
	try {
		const response = await api.delete(`seni/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting seni:", error);
		throw error;
	}
};

export const downloadSeniTemplate = async () => {
	try {
		const response = await api.get("/seni/template", {
			responseType: "blob",
		});
		return response.data;
	} catch (error) {
		console.error("Error downloading template:", error);
		throw error;
	}
};

export const importSeni = async (formData) => {
	try {
		const response = await api.post("/seni/import", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error importing seni data:", error);
		throw error;
	}
};
