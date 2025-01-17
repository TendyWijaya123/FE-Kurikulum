import axios from "axios";

const API_URL = "http://localhost:8000/api";

const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

export const getKkni = async (prodiId) => {
    try {
        const token = localStorage.getItem("authToken");

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await api.get(`/kkni`, {
            params: { prodiId },
            headers,
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
        const token = localStorage.getItem("authToken");

        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        console.log(data);
        const response = await api.post(`/kkni`, data, {headers});

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
        const token = localStorage.getItem("authToken");

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await api.delete(`/kkni`, {
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

export const deleteKkni = async (id) => {
    try{
        const token = localStorage.getItem("authToken");

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await api.delete(`/kkni/${id}`, {headers});
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