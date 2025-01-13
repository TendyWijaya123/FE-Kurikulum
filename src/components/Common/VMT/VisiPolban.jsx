import { useState, useEffect } from "react";
import useVmt from "../../../hooks/Vmt/useVmt";

const VisiPolban = () => {
	const { loading, alert, vmtPolban, handleUpdateVmtPolban } = useVmt();

	// State untuk visi_polban
	const [visiPolbanInput, setVisiPolbanInput] = useState({
		visi_polban: vmtPolban?.visi_polban || "",
	});

	const handleChangeVisiPolban = (e) => {
		const { name, value } = e.target;
		setVisiPolbanInput((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSaveVisiPolban = async () => {
		await handleUpdateVmtPolban(vmtPolban.id, visiPolbanInput);
	};

	useEffect(() => {
		setVisiPolbanInput({
			visi_polban: vmtPolban?.visi_polban || "",
		});
	}, [vmtPolban]);

	if (loading) {
		return (
			<div className="w-full bg-white flex justify-center items-center min-h-screen">
				<div className="spinner-border animate-spin border-t-4 border-blue-600 rounded-full w-16 h-16 border-4"></div>
			</div>
		);
	}

	return (
		<div className="w-full bg-white p-6 rounded-lg shadow-lg mb-4">
			<div className="space-y-4">
				{/* Input untuk Visi Polban */}
				<h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
					Visi Polban
				</h2>
				<div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm bg-gray-50">
					<input
						type="text"
						name="visi_polban"
						value={visiPolbanInput.visi_polban}
						onChange={handleChangeVisiPolban}
						className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
						placeholder="Masukkan Visi Polban"
					/>
				</div>
			</div>

			<div className="flex justify-center mt-6">
				<button
					onClick={handleSaveVisiPolban}
					className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300">
					Simpan Visi Polban
				</button>
			</div>
		</div>
	);
};

export default VisiPolban;