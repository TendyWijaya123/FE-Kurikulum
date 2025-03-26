import api from "../utils/axiosInstance";

/* -----------------------------Users API----------------------------- */
export const getUsers = async (page) => {
	try {
		const response = await api.get(`/users`, {
			params: { page },
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching users:", error);
		throw error;
	}
};

export const getUserById = async (id) => {
	try {
		const response = await api.get(`/users/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching user by ID:", error);
		throw error;
	}
};

export const createUser = async (userData) => {
	try {
		const response = await api.post("/users", userData);
		return response.data;
	} catch (error) {
		// Log error for debugging
		if (error.response) {
			console.error("Error creating user:", error.response.data);
		} else {
			console.error("Error creating user:", error.message);
		}
		throw error;
	}
};

export const updateUser = async (id, userData) => {
	try {
		const response = await api.put(`/users/${id}`, userData);
		return response.data;
	} catch (error) {
		if (error.response) {
			console.error("Error updating user:", error.response.data);
		} else {
			console.error("Error updating user:", error.message);
		}
		throw error;
	}
};

export const deleteUser = async (id) => {
	try {
		const response = await api.delete(`/users/${id}`);
		return response.data;
	} catch (error) {
		if (error.response) {
			console.error("Error deleting user:", error.response.data);
		} else {
			console.error("Error deleting user:", error.message);
		}
		throw error;
	}
};

/* -----------------------------Prodi API----------------------------- */
export const getProdis = async (page) => {
	try {
		const response = await api.get("/prodis", {
			params: { page },
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching Prodi list:", error);
		throw error;
	}
};

export const getProdiById = async (id) => {
	try {
		const response = await api.get(`/prodis/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching Prodi by ID:", error);
		throw error;
	}
};

export const createProdi = async (prodiData) => {
	try {
		const response = await api.post("/prodis", prodiData);
		return response.data;
	} catch (error) {
		console.error("Error creating Prodi:", error);
		throw error;
	}
};

export const updateProdi = async (id, prodiData) => {
	try {
		const response = await api.put(`/prodis/${id}`, prodiData);
		return response.data;
	} catch (error) {
		console.error("Error updating Prodi:", error);
		throw error;
	}
};

export const deleteProdi = async (id) => {
	try {
		const response = await api.delete(`/prodis/${id}`);
	} catch (error) {
		console.error("Error deleting Prodi:", error);
		throw error;
	}
};

export const getProdiDropdown = async () => {
	try {
		const response = await api.get("/prodi/dropdown");
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching Prodi dropdown:", error);
		throw error;
	}
};

export const getProdiKurikulumDropdown = async () => {
	try {
		const response = await api.get("/prodi/dropdown-prodi-kurikulum");
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching Prodi dropdown:", error);
		throw error;
	}
};

/* -----------------------------Jurusan API----------------------------- */
export const getJurusans = async (page) => {
	try {
		const response = await api.get("/jurusans", {
			params: { page },
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching Jurusan list:", error);
		throw error;
	}
};

export const getJurusanById = async (id) => {
	try {
		const response = await api.get(`/jurusans/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching Jurusan by ID:", error);
		throw error;
	}
};

export const createJurusan = async (jurusanData) => {
	try {
		const response = await api.post("/jurusans", jurusanData);
		return response.data;
	} catch (error) {
		console.error("Error creating Jurusan:", error);
		throw error;
	}
};

export const updateJurusan = async (id, jurusanData) => {
	try {
		const response = await api.put(`/jurusans/${id}`, jurusanData);
		return response.data;
	} catch (error) {
		console.error("Error updating Jurusan:", error);
		throw error;
	}
};

export const deleteJurusan = async (id) => {
	try {
		const response = await api.delete(`/jurusans/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting Jurusan:", error);
		throw error;
	}
};

export const getJurusanDropdown = async () => {
	try {
		const response = await api.get("/jurusans/dropdown");
		return response.data;
	} catch (error) {
		console.error("Error fetching Jurusan dropdown:", error);
		throw error;
	}
};

/* -----------------------------Kurikulum API----------------------------- */
export const getKurikulums = async (page) => {
	try {
		const response = await api.get("/kurikulum", {
			params: { page },
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching Kurikulum list:", error);
		throw error;
	}
};

export const createKurikulum = async (kurikulumData) => {
	try {
		const response = await api.post("/kurikulum", kurikulumData);
		return response.data;
	} catch (error) {
		console.error("Error creating Kurikulum:", error);
		throw error;
	}
};

export const updateKurikulum = async (id, kurikulumData) => {
	try {
		const response = await api.put(`/kurikulum/${id}`, kurikulumData);
		return response.data;
	} catch (error) {
		console.error("Error updating Kurikulum:", error);
		throw error;
	}
};

/* -----------------------------Misi Jurusan API----------------------------- */

// Upsert Misi Jurusan
export const upsertMisiJurusan = async (misiJurusanData) => {
	try {
		const response = await api.post("/misi-jurusan/upsert", misiJurusanData);
		return response.data;
	} catch (error) {
		throw error;
	}
};

// Delete Misi Jurusan
export const deleteMisiJurusan = async (id) => {
	try {
		const response = await api.delete(`/misi-jurusan/delete/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

/* -----------------------------Vmt Jurusan API----------------------------- */

export const firstOrCreateVmtJurusan = async (prodiId = null) => {
	try {
		const response = await api.post("/vmt-jurusans", { prodiId });
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const updateVmtJurusan = async (id, vmtJurusanData) => {
	try {
		const response = await api.put(`/vmt-jurusan/${id}`, vmtJurusanData);
		return response.data;
	} catch (error) {
		throw error;
	}
};

/* -----------------------------IPTEKS API----------------------------- */
export const getIpteks = async (prodiId = null) => {
	try {
		const params = prodiId ? { prodiId } : {};
		const token = localStorage.getItem("authToken");
		const response = await api.get("/ipteks", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params,
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const createIpteks = async (data) => {
	try {
		const token = localStorage.getItem("authToken");
		const response = await api.post("/ipteks", data, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const updateIpteks = async (id, data) => {
	try {
		const token = localStorage.getItem("authToken");
		const response = await api.put(`/ipteks/${id}`, data, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deleteIpteks = async (id) => {
	try {
		const token = localStorage.getItem("authToken");
		const response = await api.delete(`/ipteks/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error deleting IPTEKS:", error);
		throw error;
	}
};

export const getIpteksTemplate = async () => {
	try {
		const token = localStorage.getItem("authToken");
		const response = await api.get("/ipteks/template", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			responseType: "blob", // Important for downloading files
		});

		// Create a URL for the blob and trigger download
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "ipteks-template.xlsx"); // or whatever file extension you're using
		document.body.appendChild(link);
		link.click();
		link.remove();
		window.URL.revokeObjectURL(url);

		return response.data;
	} catch (error) {
		console.error("Error downloading IPTEKS template:", error);
		throw error;
	}
};

export const importIpteks = async (file) => {
	try {
		const token = localStorage.getItem("authToken");
		const formData = new FormData();
		formData.append("file", file);

		const response = await api.post("/ipteks/import", formData, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error importing IPTEKS:", error);
		throw error;
	}
};

/* -----------------------------Vmt Polban API----------------------------- */

export const firstOrCreateVmtPolban = async (prodiId) => {
	try {
		const response = await api.post("/vmt-polban", { prodiId });
		return response.data;
	} catch (error) {
		console.error(
			"Error creating Vmt Polban:",
			error.response?.data || error.message
		);
		throw error;
	}
};

// Update Vmt Polban
export const updateVmtPolban = async (id, vmtPolbanData) => {
	try {
		const response = await api.put(`/vmt-polban/${id}`, vmtPolbanData);
		return response.data;
	} catch (error) {
		throw error;
	}
};

/* -----------------------------Tujuan Polban API----------------------------- */

export const upsertTujuanPolban = async (tujuanPolbanData) => {
	try {
		const response = await api.post("/tujuan-polban/upsert", tujuanPolbanData);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deleteTujuanPolban = async (id) => {
	try {
		const response = await api.delete(`/tujuan-polban/delete/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

/* -----------------------------Misi Polban API----------------------------- */

// Upsert Misi Polban
export const upsertMisiPolban = async (misiPolbanData) => {
	try {
		const response = await api.post("/misi-polban/upsert", misiPolbanData);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deleteMisiPolban = async (id) => {
	try {
		const response = await api.delete(`/misi-polban/delete/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

/* -----------------------------Pengetahuan API----------------------------- */
export const getPengetahuan = async (prodiId = null) => {
	try {
		const params = prodiId ? { prodiId } : {};
		const response = await api.get("/pengetahuan", { params });
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const upsertPengetahuan = async (data) => {
	try {
		const response = await api.post("/pengetahuan/upsert", data);
		return response.data;
	} catch (error) {
		throw error.response?.data || error;
	}
};

export const deletePengetahuan = async (id) => {
	try {
		const response = await api.delete(`/pengetahuan/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting Pengetahuan:", error);
		throw error;
	}
};
