import api from "../../../utils/axiosInstance";

export const updateMatrixCplP = async (matrixCplP) => {
  try {
    const response = await api.put("/matrix-cpl-p", matrixCplP);
    return response.data;
  } catch (error) {
    console.error("Error updating Matrix CPL-P:", error);
    throw error;
  }
};

export const getMatrixCplP = async () => {
  try {
    const response = await api.get("/matrix-cpl-p");
    return response.data;
  } catch (error) {
    console.error("Error getting Matrix CPL-P:", error);
    throw error;
  }
};