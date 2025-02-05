import api from "../utils/axiosInstance";

/* --------------------------------CPL API-------------------------------------------- */
export const getRole = async () => {
	try {
		const response = await api.get("/roles");
		return response.data;
	} catch (error) {
		console.error("Error fetching CPLs:", error);
		throw error;
	}
};

export const upsertRole = async (id) => {
	try {
		const response = await api.post("/roles", id);
		return response.data;
	} catch (error) {
		console.error("Error update Role:", error);
		throw error;
	}
};

export const deleteRole = async (id) => {
	try {
		const response = await api.delete(`/roles/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting Role:", error);
		throw error;
	}
};

export const deleteroles = async (data) => {
    try{
        const token = localStorage.getItem("authToken");

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await api.delete(`/roles`, {
            headers,
            data,
        });

        return response.data;
    }catch (error){
        if(error.response) {
            console.error("Error delete Role:", error.response.data);
        } else {
            // Jika error tidak berasal dari server (misalnya, masalah jaringan)
            console.error("Error delete Role:", error.message);
        }
        throw error;
    }
    
}

