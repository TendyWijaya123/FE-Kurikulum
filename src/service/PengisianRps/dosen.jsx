import api from "../../utils/axiosInstance";

export const getDosen = async () => {
	try {
		const response = await api.get("/dosen");
		return response.data;
	} catch (error) {
		console.error("Error fetching CPLs:", error);
		throw error;
	}
};

export const addDosen = async (data) => {
	try {
		const response = await api.post("/dosen", data);
		return response.data;
	} catch (error) {
		console.error("Error update dosen:", error);
		throw error;
	}
};

export const updateDosen = async (id, data) => {
	try {
		const payload = { id, ...data };
		const response = await api.put("/dosen", payload);
		return response.data;
	} catch (error) {
		console.error("Error updating dosen:", error);
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

export const getProdiDropdown = async (id) => {
    try{
        const response = await api.get(`/rps/prodi-dropdown/${id}`);
        return response.data;
    }catch (error){
        console.error("Error get prodi:", error);
		throw error;
    }
}

