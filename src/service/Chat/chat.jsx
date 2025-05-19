import api from "../../utils/axiosInstance";

export const sendChat = async (data) => {
    try {
        console.log("Sending chat data:", data);
        const response = await api.post("/chat/send", data);
        return response.data;
    } catch (error) {
        console.error("Error sending chat:", error);
        throw error;
    }
}