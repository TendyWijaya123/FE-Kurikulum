import api from "../../utils/axiosInstance";

export const getKkni = async (prodiId) => {
    try {

        const response = await api.get(`/kkni`, {
            params: { prodiId }
        });
        return response.data;
    } catch (error) {
        if(error.response) {
            console.error("Error Get kkni:", error.response.data);
		} else {
			// Jika error tidak berasal dari server (misalnya, masalah jaringan)
			console.error("Error Get kkni:", error.message);
		}
		throw error;
    }
};

export const postKkni = async (data) => {
    try
    {
        const response = await api.post(`/kkni`, data);

        return response.data;
    } catch (error) {
        if(error.response) {
            console.error("Error creating kkni:", error.response.data);
		} else {
			// Jika error tidak berasal dari server (misalnya, masalah jaringan)
			console.error("Error creating kkni:", error.message);
		}
		throw error;
    }

}

export const deleteKknis = async (data) => {
    try{

        const response = await api.delete(`/kkni`, {
            data,
        });

        return response.data;
    }catch (error){
        if(error.response) {
            console.error("Error delete materi pembelajaran:", error.response.data);
		} else {
			// Jika error tidak berasal dari server (misalnya, masalah jaringan)
			console.error("Error delete materi pembelajaran:", error.message);
		}
		throw error;
    }
    
}

export const deleteKkni = async (id) => {
    try{
        const response = await api.delete(`/kkni/${id}`);
        return response.data;
    }catch (error){
        if(error.response) {
            console.error("Error delete kkni:", error.response.data);
		} else {
			// Jika error tidak berasal dari server (misalnya, masalah jaringan)
			console.error("Error delete kkni:", error.message);
		}
		throw error;
    }
}

export const autoCpl = async (prodiId, pengatahuanId, kemampuanKerjaId) => {
    try {
        const response = await api.get(`/kkni/auto`, {
            params: { prodiId, pengatahuanId, kemampuanKerjaId  }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error fetching KKNI:", error.response.data);
        } else {
            console.error("Error fetching KKNI:", error.message);
        }
        throw error;
    }
};