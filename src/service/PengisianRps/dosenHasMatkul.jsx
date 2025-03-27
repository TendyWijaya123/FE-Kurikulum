import api from "../../utils/axiosInstance";

/* --------------------------------CPL API-------------------------------------------- */
export const getDosenHasMatkul = async (prodiId) => {
	try {
		const response = await api.get("/dosen-has-matkul", {
            params: {id : prodiId },
        });

        
		return response.data;
	} catch (error) {
		console.error("Error fetching CPLs:", error);
		throw error;
	}
};

export const upsertDosenHasMatkul = async (data) => {
	try {
		const response = await api.post("/dosen-has-matkul", data);
		return response.data;
	} catch (error) {
		console.error("Error update dosen:", error);
		throw error;
	}
};

export const deleteDosenHasMatkul = async (id) => {
	try {
		const response = await api.delete(`/dosen/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting dosen:", error);
		throw error;
	}
};

export const deleteDosenHasMatkuls = async (data) => {
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

