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
        await api.get('dashboard/refresh-curriculum-data');
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

export const fetchMatakuliahDashboard = async () => {
    try{
        const response = await api.get('/dashboard/get-matakuliah');
        return response.data;
    }catch(error){
        throw new Error("Error fetching Matakuliah data: " + error.message);
    }
};

export const fetchMatakuliahDetailDashboard = async (prodi_id) => {
    try{
        const response = await api.get(`/dashboard/get-matakuliah-detail/${prodi_id}`);
        return response.data;
    }catch(error){
        throw new Error("Error fetching Matakuliah data: " + error.message);
    }
};

//------------------------------------Penyusun Kurikulum------------------------------------//

export const sendNotification = async (data) => {
    try {
        if (!data || typeof data !== 'object') {
            throw new Error("Invalid data: Notification payload must be an object.");
        }
        const response = await api.post('/notifikasi', data);
        return response.data;
    } catch (error) {
        console.error("Error sending notification:", error);
        throw new Error("Error sending notification: " + error.message);
    }
}

export const fetchNotifikasi = async () => {
    try {
        const response = await api.get(`/notifikasi`);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching notification: " + error.message);
    }
}

export const changeStatus = async (ids) => {
    try {
        console.log(ids);
        const response = await api.put(`/notifikasi/change-status`, {ids});
        return response.data;
    } catch (error) {
        throw new Error("Error marking notification as read: " + error.message);
    }
}
