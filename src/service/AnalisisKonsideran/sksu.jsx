import axios from "axios";

const API_URL = "http://localhost:8000/api";

const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

export const getSksu = async (prodiId) => {
    try {
        console.log(prodiId);
        const token = localStorage.getItem("authToken");

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await api.get(`/sksu`, {
            params: { prodiId },
            headers,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching sksu:", error);
        throw error;
    }
};

export const postSksu = async (data) => {
    try
    {
        const token = localStorage.getItem("authToken");

        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await api.post(`/sksu`, data, {headers});

        return response.data;
    } catch (error) {
        if(error.response) {
            console.error("Error creating sksu:", error.response.data);
		} else {
			// Jika error tidak berasal dari server (misalnya, masalah jaringan)
			console.error("Error creating sksu:", error.message);
		}
		throw error;
    }

}

export const deleteSksus = async (data) => {
    try{
        const token = localStorage.getItem("authToken");

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await api.delete(`/sksu`, {
            headers,
            data,
        });

        return response.data;
    }catch (error){
        if(error.response) {
            console.error("Error delete sksu:", error.response.data);
		} else {
			// Jika error tidak berasal dari server (misalnya, masalah jaringan)
			console.error("Error delete sksu:", error.message);
		}
		throw error;
    }
    
}

export const deleteSksu = async (id) => {
    try{
        const token = localStorage.getItem("authToken");

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await api.delete(`/sksu/${id}`, {headers});
        return response.data;
    }catch (error){
        if(error.response) {
            console.error("Error delete sksu:", error.response.data);
		} else {
			// Jika error tidak berasal dari server (misalnya, masalah jaringan)
			console.error("Error delete sksu:", error.message);
		}
		throw error;
    }
}