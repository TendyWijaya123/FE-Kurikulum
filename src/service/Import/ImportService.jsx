import api from "../../utils/axiosInstance";

/* -----------------------------CPL IMPORT----------------------------- */
export const getCPLTemplate = async () => {
	try {
		const response = await api.get(`/cpls/template`, { responseType: "blob" });
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "cpl_template.xlsx");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} catch (error) {
		console.error("Error saat mendownload template", error);
		throw error;
	}
};

export const importCPL = async (file) => {
	const formData = new FormData();
	formData.append("file", file);

	try {
		const response = await api.post("/cpls/import", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error saat mengupload file", error);
		throw error;
	}
};

/* -----------------------------PPM Import----------------------------- */

export const getPPMTemplate = async () => {
	try {
		const response = await api.get(`/ppms/template`, { responseType: "blob" });
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "ppm_template.xlsx");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} catch (error) {
		console.error("Error saat mendownload template", error);
		throw error;
	}
};

export const importPpm = async (file) => {
	const formData = new FormData();
	formData.append("file", file);

	try {
		const response = await api.post("/ppms/import", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error saat mengupload file", error);
		throw error;
	}
};

/* -----------------------------Peran Industri Import----------------------------- */

export const getPeranIndustriTemplate = async () => {
	try {
		const response = await api.get(`/peran-industri/template`, {
			responseType: "blob",
		});
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "peranindustri_template.xlsx");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} catch (error) {
		console.error("Error saat mendownload template", error);
		throw error;
	}
};

export const importPeranIndustri = async (file) => {
	const formData = new FormData();
	formData.append("file", file);

	try {
		const response = await api.post("/peran-industri/import", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error saat mengupload file", error);
		throw error;
	}
};

export const getPengetahuanTemplate = async () => {
	try {
		const response = await api.get(`/pengetahuan/template`, {
			responseType: "blob",
		});
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "pengetahuan_template.xlsx");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} catch (error) {
		console.error("Error saat mendownload template", error);
		throw error;
	}
};

export const importPengetahuan = async (file) => {
	const formData = new FormData();
	formData.append("file", file);

	try {
		const response = await api.post("/pengetahuan/import", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error saat mengupload file", error);
		throw error;
	}
};

export const getIpteksTemplate = async () => {
	try {
		const response = await api.get(`/ipteks/template`, {
			responseType: "blob",
		});
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "ipteks_template.xlsx");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} catch (error) {
		console.error("Error saat mendownload template", error);
		throw error;
	}
};

export const importIpteks = async (file) => {
	const formData = new FormData();
	formData.append("file", file);

	try {
		const response = await api.post("/ipteks/import", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error saat mengupload file", error);
		throw error;
	}
};

export const getMateriPembelajaranTemplate = async () => {
	try {
		const response = await api.get(`/materi-pembelajaran/template`, {
			responseType: "blob",
		});
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "materi-pembelajaran.xlsx");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} catch (error) {
		console.error("Error saat mendownload template", error);
		throw error;
	}
};

export const importMateriPembelajaran = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    
    console.log('File yang akan diupload:', file);
    
    try {
        const response = await api.post("/materi-pembelajaran/import", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        
        console.log('Response dari server:', response.data);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return response.data;
    } catch (error) {
        console.error("Error detail:", {
            message: error.message,
            response: error.response?.data
        });
        throw error;
    }
};

export const getKkniTemplate = async () => {
	try {
		const response = await api.get(`/kkni/template`, {
			responseType: "blob",
		});
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "Kkni.xlsx");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} catch (error) {
		console.error("Error saat mendownload template", error);
		throw error;
	}
};

export const importKkni = async (file) => {
	const formData = new FormData();
	formData.append("file", file);

	try {
		const response = await api.post("/kkni/import", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error saat mengupload file", error);
		throw error;
	}
};

export const getSksuTemplate = async () => {
	try {
		const response = await api.get(`/sksu/template`, {
			responseType: "blob",
		});
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "sksu.xlsx");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} catch (error) {
		console.error("Error saat mendownload template", error);
		throw error;
	}
};

export const importSksu = async (file) => {
	const formData = new FormData();
	formData.append("file", file);

	try {
		const response = await api.post("/sksu/import", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error saat mengupload file", error);
		throw error;
	}
};

export const getBenchKurikulumTemplate = async () => {
	try {
		const response = await api.get(`/bench-kurikulums/template`, {
			responseType: "blob",
		});
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "bench-kurikulums.xlsx");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} catch (error) {
		console.error("Error saat mendownload template", error);
		throw error;
	}
};

export const importBenchKurikulum = async (file) => {
	const formData = new FormData();
	formData.append("file", file);

	try {
		const response = await api.post("/bench-kurikulums/import", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error saat mengupload file", error);
		throw error;
	}
};
export const getBukuReferensiTemplate = async () => {
	try {
		const response = await api.get(`/buku-referensi/template`, { responseType: "blob" });
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "buku_referensi_template.xlsx");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} catch (error) {
		console.error("Error saat mendownload template", error);
		throw error;
	}
};

export const importBukuReferensi = async (file) => {
	const formData = new FormData();
	formData.append("file", file);

	try {
		const response = await api.post("/buku-referensi/import", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error saat mengupload file", error);
		throw error;
	}
};
	
