import api from "../../utils/axiosInstance";

export const fetchJurusan = async () => {
    try{
        const response = await api.get('/dashboard/jurusans');
        return response.data;
    }catch(error){
        console.error("Error fetching jurusan:", error);
		throw error;
    }
};

export const fetchProdi = async () => {
    try{
        const response = await api.get('/dashboard/prodis');
        return response.data;
    }catch(error){
        console.error("Error fetching prodi:", error);
		throw error;
    }
};

export const fetchCurriculumData = async (id) => {
    try{
        const response = await api.get(`/dashboard/curriculum-data/${id}`);
        return response.data;
    }catch(error){
		throw error;
    }
};