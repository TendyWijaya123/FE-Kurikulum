import axios from "axios";

const API_URL = "http://localhost:8000/api";

const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

/* -----------------------------Users API----------------------------- */
export const getUsers = async (page) => {
	try {
		const token = localStorage.getItem("authToken");

		const headers = token ? { Authorization: `Bearer ${token}` } : {};
		const response = await api.get(`/users`, {
			params: { page },
			headers,
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching users:", error);
		throw error;
	}
};

export const getUserById = async (id) => {
	try {
		const token = localStorage.getItem("authToken"); // Get token from localStorage

		const headers = token ? { Authorization: `Bearer ${token}` } : {};

		const response = await api.get(`/users/${id}`, { headers });

		return response.data;
	} catch (error) {
		console.error("Error fetching user by ID:", error);
		throw error;
	}
};

export const createUser = async (userData) => {
	try {
		const token = localStorage.getItem("authToken"); // Mendapatkan token dari localStorage

		const headers = {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		};

		const response = await api.post("/users", userData, { headers });

		return response.data;
	} catch (error) {
		// Log error lengkap untuk debugging
		if (error.response) {
			// Jika ada response dari server, log response data
			console.error("Error creating user:", error.response.data);
		} else {
			// Jika error tidak berasal dari server (misalnya, masalah jaringan)
			console.error("Error creating user:", error.message);
		}
		throw error;
	}
};

export const updateUser = async (id, userData) => {
	try {
		const token = localStorage.getItem("authToken");

		const headers = {
			"Content-Type": "application/json",
			Accept: "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		};

		const response = await api.put(`/users/${id}`, userData, { headers });

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
		const token = localStorage.getItem("authToken");

		const headers = token ? { Authorization: `Bearer ${token}` } : {};

		const response = await api.get("/prodis", {
			params: { page },
			headers,
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching Prodi list:", error);
		throw error;
	}
};

export const getProdiById = async (id) => {
	try {
		const token = localStorage.getItem("authToken");

		const headers = token ? { Authorization: `Bearer ${token}` } : {};

		const response = await api.get(`/prodis/${id}`, { headers });

		return response.data;
	} catch (error) {
		console.error("Error fetching Prodi by ID:", error);
		throw error;
	}
};

export const createProdi = async (prodiData) => {
	try {
		const token = localStorage.getItem("authToken");

		const headers = {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		};

		const response = await api.post("/prodis", prodiData, { headers });

		return response.data;
	} catch (error) {
		console.error("Error creating Prodi:", error);
		throw error;
	}
};

export const updateProdi = async (id, prodiData) => {
	try {
		const token = localStorage.getItem("authToken");

		const headers = {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		};

		const response = await api.put(`/prodis/${id}`, prodiData, { headers });

		return response.data;
	} catch (error) {
		console.error("Error updating Prodi:", error);
		throw error;
	}
};

export const deleteProdi = async (id) => {
	try {
		const token = localStorage.getItem("authToken");

		const headers = token ? { Authorization: `Bearer ${token}` } : {};

		const response = await api.delete(`/prodis/${id}`, { headers });

		return response.data;
	} catch (error) {
		console.error("Error deleting Prodi:", error);
		throw error;
	}
};

export const getProdiDropdown = async () => {
	try {
		const token = localStorage.getItem("authToken");

		const headers = token ? { Authorization: `Bearer ${token}` } : {};

		const response = await api.get("/prodi/dropdown", { headers });

		return response.data;
	} catch (error) {
		console.error("Error fetching Prodi dropdown:", error);
		throw error;
	}
};

/* ----------------------------------Role API------------------------------------ */
export const getRoleDropdown = async () => {
	try {
		const token = localStorage.getItem("authToken");

		const headers = token ? { Authorization: `Bearer ${token}` } : {};

		const response = await api.get("/role/dropdown", { headers });

		return response.data;
	} catch (error) {
		console.error("Error fetching Role dropdown:", error);
		throw error;
	}
};

/* -----------------------------Jurusan API----------------------------- */
export const getJurusans = async (page) => {
	try {
		const token = localStorage.getItem("authToken");

		const headers = token ? { Authorization: `Bearer ${token}` } : {};

		const response = await api.get("/jurusans", {
			params: { page },
			headers,
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching Jurusan list:", error);
		throw error;
	}
};

export const getJurusanById = async (id) => {
	try {
		const token = localStorage.getItem("authToken");

		const headers = token ? { Authorization: `Bearer ${token}` } : {};

		const response = await api.get(`/jurusans/${id}`, { headers });

		return response.data;
	} catch (error) {
		console.error("Error fetching Jurusan by ID:", error);
		throw error;
	}
};

export const createJurusan = async (jurusanData) => {
	try {
		const token = localStorage.getItem("authToken");

		const headers = {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		};

		const response = await api.post("/jurusans", jurusanData, { headers });

		return response.data;
	} catch (error) {
		console.error("Error creating Jurusan:", error);
		throw error;
	}
};

export const updateJurusan = async (id, jurusanData) => {
	try {
		const token = localStorage.getItem("authToken");

		const headers = {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		};

		const response = await api.put(`/jurusans/${id}`, jurusanData, { headers });

		return response.data;
	} catch (error) {
		console.error("Error updating Jurusan:", error);
		throw error;
	}
};

export const deleteJurusan = async (id) => {
	try {
		const token = localStorage.getItem("authToken");

		const headers = token ? { Authorization: `Bearer ${token}` } : {};

		const response = await api.delete(`/jurusans/${id}`, { headers });

		return response.data;
	} catch (error) {
		console.error("Error deleting Jurusan:", error);
		throw error;
	}
};

export const getJurusanDropdown = async () => {
	try {
		const token = localStorage.getItem("authToken");

		const headers = token ? { Authorization: `Bearer ${token}` } : {};

		const response = await api.get("/jurusans/dropdown", { headers });

		return response.data;
	} catch (error) {
		console.error("Error fetching Jurusan dropdown:", error);
		throw error;
	}
};

/* -----------------------------Kurikulum API----------------------------- */
export const getKurikulums = async (page) => {
	try {
		const token = localStorage.getItem("authToken");

		const headers = token ? { Authorization: `Bearer ${token}` } : {};

		const response = await api.get("/kurikulum", {
			params: { page },
			headers,
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching Kurikulum list:", error);
		throw error;
	}
};

export const createKurikulum = async (kurikulumData) => {
	try {
		const token = localStorage.getItem("authToken");

		const headers = {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		};

		const response = await api.post("/kurikulum", kurikulumData, { headers });

		return response.data;
	} catch (error) {
		console.error("Error creating Kurikulum:", error);
		throw error;
	}
};

export const updateKurikulum = async (id, kurikulumData) => {
	try {
		const token = localStorage.getItem("authToken");

		const headers = {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		};

		const response = await api.put(`/kurikulum/${id}`, kurikulumData, {
			headers,
		});

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
		const token = localStorage.getItem("authToken");

		const headers = {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		};

		const response = await api.post("/misi-jurusan/upsert", misiJurusanData, {
			headers,
		});
		return response.data;
	} catch (error) {
		console.error("Error upserting Misi Jurusan:", error);
		throw error;
	}
};

// Delete Misi Jurusan
export const deleteMisiJurusan = async (id) => {
	try {
		const token = localStorage.getItem("authToken");

		const headers = token ? { Authorization: `Bearer ${token}` } : {};

		const response = await api.delete(`/misi-jurusan/delete/${id}`, {
			headers,
		});
		return response.data;
	} catch (error) {
		console.error("Error deleting Misi Jurusan:", error);
		throw error;
	}
};

/* -----------------------------Vmt Jurusan API----------------------------- */

export const firstOrCreateVmtJurusan = async () => {
	try {
		const token = localStorage.getItem("authToken");

		const headers = {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		};

		const response = await api.post("/vmt-jurusans", {}, { headers });
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
		const token = localStorage.getItem("authToken");

		const headers = {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		};

		const response = await api.put(`/vmt-jurusan/${id}`, vmtJurusanData, {
			headers,
		});
		return response.data;
	} catch (error) {
		console.error("Error updating Vmt Jurusan:", error);
		throw error;
	}
};
