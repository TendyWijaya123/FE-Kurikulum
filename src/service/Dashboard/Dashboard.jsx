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

export const fetchCurriculumData = async () => {
    try {
        const response = await api.get(`/dashboard/proses-curriculum-data`);
        return response.data;
    } catch (error) {
        throw new Error("Error starting curriculum processing: " + error.message);
    }
};

export const getDataCurriculum = async () => {
    try {
        const response = await api.get(`/dashboard/get-curriculum-data`);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching curriculum data: " + error.message);
    }
};

export const progresGetData = async () => {
    try {
        const response = await api.get(`/dashboard/progres-curriculum-data`);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching curriculum data: " + error.message);
    }
}
