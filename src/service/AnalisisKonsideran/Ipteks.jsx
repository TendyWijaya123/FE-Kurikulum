import axios from "axios";

const API_URL = "http://localhost:8000/api";

const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

export const getIlmuPengetahuan = async (prodiId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.get("/ilmu-pengetahuan", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { prodiId },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching Ilmu Pengetahuan data:", error);
      throw error;
    }
  };
  
  export const createIlmuPengetahuan = async (data) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.post('/ilmu-pengetahuan', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error creating/updating Ilmu Pengetahuan:", error);
      throw error;
    }
  };
  
  export const deleteIlmuPengetahuan = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.delete(`/ilmu-pengetahuan/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting Ilmu Pengetahuan:", error);
      throw error;
    }
  };

  export const downloadIlmuPengetahuanTemplate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.get('/ilmu-pengetahuan/template', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });
      
      const blob = new Blob([response.data], { 
        type: response.headers['content-type'] 
      });
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'ilmu-pengetahuan-template.xlsx'); 
      document.body.appendChild(link);
      link.click();
      
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      
      return response.data;
    } catch (error) {
      console.error("Error downloading template:", error);
      throw error;
    }
  };

  export const importIlmuPengetahuan = async (formData) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.post('/ilmu-pengetahuan/import', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error importing ilmu pengetahuan data:", error);
      throw error;
    }
  };
  
  export const getTeknologi = async (prodiId) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await api.get("/teknologi", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { prodiId },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching teknologi data:", error);
        throw error;
      }
  };
  
  export const createTeknologi = async (data) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await api.post('/teknologi', data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        return response.data;
      } catch (error) {
        console.error("Error creating/updating teknologi:", error);
        throw error;
      }
  };
  
  export const deleteTeknologi = async (id) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await api.delete(`teknologi/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error deleting teknologi:", error);
        throw error;
      }
  };
  
  export const downloadTeknologiTemplate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.get('/teknologi/template', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error("Error downloading template:", error);
      throw error;
    }
  };
  
  export const importTeknologi = async (formData) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.post('/teknologi/import', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error importing ilmu pengetahuan data:", error);
      throw error;
    }
  };

  export const getSeni = async (prodiId) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await api.get("/seni", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { prodiId },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching seni data:", error);
        throw error;
      }
  };
  
  export const createSeni = async (data) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await api.post('/seni', data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        return response.data;
      } catch (error) {
        console.error("Error creating/updating seni:", error);
        throw error;
      }
  };
  
  export const deleteSeni = async (id) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await api.delete(`seni/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error deleting seni:", error);
        throw error;
      }
  };

  export const downloadSeniTemplate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.get('/seni/template', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error("Error downloading template:", error);
      throw error;
    }
  };
  
  export const importSeni = async (formData) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.post('/seni/import', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error importing seni data:", error);
      throw error;
    }
  };