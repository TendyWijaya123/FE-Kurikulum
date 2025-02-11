import api from "../../utils/axiosInstance";

/* --------------------------------CPL API-------------------------------------------- */
export const getDosen = async () => {
	try {
		const response = await api.get("/dosen");
		return response.data;
	} catch (error) {
		console.error("Error fetching CPLs:", error);
		throw error;
	}
};

export const upsertDosen = async (id) => {
	try {
		const response = await api.post("/dosen", id);
		return response.data;
	} catch (error) {
		console.error("Error update dosen:", error);
		throw error;
	}
};

export const deleteDosen = async (id) => {
	try {
		const response = await api.delete(`/dosen/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting dosen:", error);
		throw error;
	}
};

export const deleteDosens = async (data) => {
    try{
        const response = await api.delete(`/dosen`, {
            headers,
            data,
        });

        return response.data;
    }catch (error){
        if(error.response) {
            console.error("Error delete dosen:", error.response.data);
        } else {
            // Jika error tidak berasal dari server (misalnya, masalah jaringan)
            console.error("Error delete dosen:", error.message);
        }
        throw error;
    }
    
}

