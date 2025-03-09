import api from "../../utils/axiosInstance";

export const exportPenyusunanKurikulum = async (kurikulumId) => {
	try {
		const response = await api.get(
			`/penyusunan-kurikulum/export/${kurikulumId}`,
			{ responseType: "blob" }
		);
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "penyusunan_kurikulum.xlsx");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} catch (error) {
		console.error("Error saat mendownload penyusunan kurikulum", error);
		throw error;
	}
};
