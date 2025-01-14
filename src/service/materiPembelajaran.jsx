import axios from "axios";

const API_URL = "http://localhost:8000/api";

const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

export const getMateriPembelajarans = async (prodiId) => {
    try {
        const token = localStorage.getItem("authToken");

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await api.get(`/materi-pembelajaran`, {
            params: { prodiId },
            headers,
        });
        return response.data;
    } catch (error) {
        if(error.response) {
            console.error("Error Get materi pembelajaran:", error.response.data);
		} else {
			// Jika error tidak berasal dari server (misalnya, masalah jaringan)
			console.error("Error Get materi pembelajaran:", error.message);
		}
		throw error;
    }
};

export const postMateriPembelajaran = async (data) => {
    try
    {
        const token = localStorage.getItem("authToken");

        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await api.post(`/materi-pembelajaran`, data, {headers});

        return response.data;
    } catch (error) {
        if(error.response) {
            console.error("Error creating materi pembelajaran:", error.response.data);
		} else {
			// Jika error tidak berasal dari server (misalnya, masalah jaringan)
			console.error("Error creating materi pembelajaran:", error.message);
		}
		throw error;
    }

}

export const deleteMateriPembelajarans = async (data) => {
    try{
        const token = localStorage.getItem("authToken");

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await api.delete(`/materi-pembelajaran`, {
            headers,
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

export const deleteMateriPembelajaran = async (id) => {
    try{
        const token = localStorage.getItem("authToken");

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await api.delete(`/materi-pembelajaran/${id}`, {headers});
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