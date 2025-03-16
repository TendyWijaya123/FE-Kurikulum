import { createContext, useEffect, useState } from "react";
import { getProdiDropdown } from "../service/api";

export const ProdiContext = createContext();

const ProdiProvider = ({ children }) => {
	const initialSelectedProdiId = (() => {
		const storedId = localStorage.getItem("selectedProdiId");
		const parsedId = storedId ? parseInt(storedId, 10) : null;
		return isNaN(parsedId) ? null : parsedId;
	})();

	const [prodiDropdown, setProdiDropdown] = useState(
		JSON.parse(localStorage.getItem("prodiDropdown")) || []
	);
	const [selectedProdiId, setSelectedProdiId] = useState(
		initialSelectedProdiId
	);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (prodiDropdown.length === 0) {
			fetchProdiDropdown();
		}
	}, []);

	const fetchProdiDropdown = async () => {
		setLoading(true);
		try {
			const data = await getProdiDropdown();
			setProdiDropdown(data);
			localStorage.setItem("prodiDropdown", JSON.stringify(data)); // Simpan ke localStorage
		} catch (error) {
			console.error("Error fetching Prodi dropdown:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleChangeSelectedProdiId = (id) => {
		const newValue = id ? parseInt(id, 10) : null;
		setSelectedProdiId(newValue);
		if (newValue !== null) {
			localStorage.setItem("selectedProdiId", newValue);
		} else {
			localStorage.removeItem("selectedProdiId");
		}
	};

	return (
		<ProdiContext.Provider
			value={{
				prodiDropdown,
				selectedProdiId,
				handleChangeSelectedProdiId,
				loading,
			}}>
			{children}
		</ProdiContext.Provider>
	);
};

export default ProdiProvider;
