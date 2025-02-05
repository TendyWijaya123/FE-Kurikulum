import api from "../utils/axiosInstance";

/* --------------------------------CPL API-------------------------------------------- */
export const getPermission = async () => {
	try {
		const response = await api.get("/permissions");
		return response.data;
	} catch (error) {
		console.error("Error fetching CPLs:", error);
		throw error;
	}
};

export const upsertPermission = async (id) => {
	try {
		const response = await api.post("/permissions", id);
		return response.data;
	} catch (error) {
		console.error("Error update permissions:", error);
		throw error;
	}
};

export const deletePermission = async (id) => {
	try {
		const response = await api.delete(`/permissions/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting permissions:", error);
		throw error;
	}
};

export const deletePermissions = async (data) => {
    try{
        const token = localStorage.getItem("authToken");

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await api.delete(`/permissions`, {
            headers,
            data,
        });

        return response.data;
    }catch (error){
        if(error.response) {
            console.error("Error delete permissions:", error.response.data);
        } else {
            // Jika error tidak berasal dari server (misalnya, masalah jaringan)
            console.error("Error delete permissions:", error.message);
        }
        throw error;
    }
    
}

