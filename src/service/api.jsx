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
		// Log error for debugging
		if (error.response) {
			console.error("Error updating user:", error.response.data);
		} else {
			console.error("Error updating user:", error.message);
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
		return response.data;
	} catch (error) {
		console.error("Error deleting Prodi:", error);
		throw error;
	}
};

export const getProdiDropdown = async () => {
	try {
		const response = await api.get("/prodi/dropdown");
		return response.data;
	} catch (error) {
		console.error("Error fetching Prodi dropdown:", error);
		throw error;
	}
};

/* ----------------------------------Role API------------------------------------ */
export const getRoleDropdown = async () => {
	try {
		const response = await api.get("/role/dropdown");
		return response.data;
	} catch (error) {
		console.error("Error fetching Role dropdown:", error);
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
		console.error("Error upserting Misi Jurusan:", error);
		throw error;
	}
};

// Delete Misi Jurusan
export const deleteMisiJurusan = async (id) => {
	try {
		const response = await api.delete(`/misi-jurusan/delete/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting Misi Jurusan:", error);
		throw error;
	}
};

/* -----------------------------Vmt Jurusan API----------------------------- */

export const firstOrCreateVmtJurusan = async () => {
	try {
		const response = await api.post("/vmt-jurusans", {});
		return response.data;
	} catch (error) {
		console.error(
			"Error creating Vmt Jurusan:",
			error.response?.data || error.message
		);
		throw error;
	}
};

export const updateVmtJurusan = async (id, vmtJurusanData) => {
	try {
		const response = await api.put(`/vmt-jurusan/${id}`, vmtJurusanData);
		return response.data;
	} catch (error) {
		console.error("Error updating Vmt Jurusan:", error);
		throw error;
	}
};


/* -----------------------------IPTEKS API----------------------------- */
export const getIpteks = async (prodiId) => {
    try {
		console.log(prodiId);
        const token = localStorage.getItem("authToken");
        
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        const response = await api.get("/ipteks", { headers, params:{prodiId}});
        return response.data;
    } catch (error) {
        console.error("Error fetching IPTEKS data:", error);
        throw error;
    }
};

export const createIpteks = async (type, data) => {
    try {
        const token = localStorage.getItem("authToken");
        
        const headers = {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        // Kirim data langsung tanpa parameter prodiId
        const response = await api.post(`/ipteks/${type}`, data, { headers });
        return response.data;
    } catch (error) {
        console.error(`Error creating IPTEKS ${type}:`, error);
        throw error;
    }
};


export const updateIpteks = async (type, id, data) => {
    try {
        const token = localStorage.getItem("authToken");

        const headers = {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        const response = await api.put(`/ipteks/${type}/${id}`, data, { headers });
        return response.data;
    } catch (error) {
        console.error(`Error updating IPTEKS ${type}:`, error);
        throw error;
    }
};

export const deleteIpteks = async (type, id) => {
    try {
        const token = localStorage.getItem("authToken");

        const headers = {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        const response = await api.delete(`/ipteks/${type}/${id}`, { headers });
        return response.data;
    } catch (error) {
        console.error(`Error deleting IPTEKS ${type}:`, error);
        throw error;
    }
};

/* -----------------------------Vmt Polban API----------------------------- */

// Create or Get First Vmt Polban
export const firstOrCreateVmtPolban = async () => {
	try {
		const response = await api.post("/vmt-polban", {});
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
		console.error("Error updating Vmt Polban:", error);
		throw error;
	}
};

/* -----------------------------Tujuan Polban API----------------------------- */

// Upsert Tujuan Polban
export const upsertTujuanPolban = async (tujuanPolbanData) => {
	try {
		const response = await api.post("/tujuan-polban/upsert", tujuanPolbanData);
		return response.data;
	} catch (error) {
		console.error("Error upserting Tujuan Polban:", error);
		throw error;
	}
};

// Delete Tujuan Polban
export const deleteTujuanPolban = async (id) => {
	try {
		const response = await api.delete(`/tujuan-polban/delete/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting Tujuan Polban:", error);
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
		console.error("Error upserting Misi Polban:", error);
		throw error;
	}
};

// Delete Misi Polban
export const deleteMisiPolban = async (id) => {
	try {
		const response = await api.delete(`/misi-polban/delete/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting Misi Polban:", error);
		throw error;
	}
};
