import { useState } from "react";

const useCreateJurusan = () => {
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);

	const [formData, setFormData] = useState({
		nama: "",
		kategori: "",
	});
};
