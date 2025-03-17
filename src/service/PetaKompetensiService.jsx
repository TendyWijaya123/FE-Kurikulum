import api from "../utils/axiosInstance";

export const getPetaKompetensi = async (prodiId) => {
    try {
        if (!prodiId) {
            throw new Error("Prodi ID is required");
        }
        const response = await api.get(`/peta-kompetensi/${prodiId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching peta kompetensi:", error);
        throw error;
    }
};

export const uploadPetaKompetensi = async (formData) => {
    try {
        // Tambahkan logging untuk melihat konten formData
        console.log("FormData contents:");
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        
        const response = await api.post('/peta-kompetensi', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading peta kompetensi:", error);
        
        // Tambahkan logging untuk melihat detail error
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
        }
        
        throw error;
    }
};

export const deletePetaKompetensi = async (id) => {
    try {
        const response = await api.delete(`/peta-kompetensi/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting peta kompetensi:", error);
        throw error;
    }
};