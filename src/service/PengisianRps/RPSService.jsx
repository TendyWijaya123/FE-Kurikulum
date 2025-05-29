import api from "../../utils/axiosInstance";

/* -------------------------------------RPS API -------------------------------------------------- */

export const getRps = async (id) => {
	try {
		const response = await api.get(`rps/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const storeRps = async (data) => {
	try {
		const response = await api.post("rps", data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const updateRps = async (data) => {
	try {
		const response = await api.post(`rps/bulk-update`, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deleteRps = async (id) => {
	try {
		const response = await api.delete(`rps/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const generateRpsPdf = async (id) => {
	try {
		const response = await api.get(`rps-pdf/${id}`, {
			responseType: "blob",
		});

		const url = window.URL.createObjectURL(
			new Blob([response.data], { type: "application/pdf" })
		);
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "rps.pdf");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} catch (error) {
		console.error("Gagal mendownload PDF RPS:", error);
		throw error;
	}
};

export const saveTujuanBelajar = async (data) => {
	try{
		console.log(data);
		const response = await api.post('rps/tujuan-belajar', data);
		return response.data;
	} catch(error){
		throw error;
	}
}

export const removeTujuanBelajar = async (id) => {
	try{
		const response = await api.delete(`rps/remove-tujuan-belajar/${id}`);
		return response.data;
	}catch(error){
		throw error;
	}
}

export const saveDetailMataKuliahRps = async (data) => {
	try {
		const response = await api.post("rps/detail-mk", data);
		return response.data;
	} catch (error) {
		throw error;
	}
}
