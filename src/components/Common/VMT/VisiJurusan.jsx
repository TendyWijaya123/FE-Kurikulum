import { useState, useEffect } from "react";
import useVmt from "../../../hooks/Vmt/useVmt";
import { Spin } from "antd";

const VisiJurusan = () => {
	const { loading, alert, vmtJurusan, handleUpdateVmtJurusan } = useVmt();

	// State untuk visi_jurusan dan visi_keilmuan_prodi
	const [visiJurusanInput, setVisiJurusanInput] = useState({
		visi_jurusan: vmtJurusan?.visi_jurusan || "",
		visi_keilmuan_prodi: vmtJurusan?.visi_keilmuan_prodi || "",
	});

	const handleChangeVisiJurusan = (e) => {
		const { name, value } = e.target;
		setVisiJurusanInput((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSaveVisiJurusan = async () => {
		await handleUpdateVmtJurusan(vmtJurusan.id, visiJurusanInput);
	};

	useEffect(() => {
		setVisiJurusanInput({
			visi_jurusan: vmtJurusan?.visi_jurusan || "",
			visi_keilmuan_prodi: vmtJurusan?.visi_keilmuan_prodi || "",
		});
	}, [vmtJurusan]);

	return (
		<div className="w-full bg-white p-6 rounded-lg shadow-lg mb-4">
			<div className="space-y-4">
				{/* Input untuk Visi Jurusan */}
				<h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
					Visi Jurusan
				</h2>
				{loading ? (
					<Spin />
				) : (
					<div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm bg-gray-50">
						<input
							type="text"
							name="visi_jurusan"
							value={visiJurusanInput.visi_jurusan}
							onChange={handleChangeVisiJurusan}
							className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
							placeholder="Masukkan Visi Jurusan"
						/>
					</div>
				)}
				{/* Input untuk Visi Keilmuan Prodi */}
				<h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
					Visi Keilmuan Prodi
				</h2>
				{loading ? (
					<Spin />
				) : (
					<div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm bg-gray-50">
						<input
							type="text"
							name="visi_keilmuan_prodi"
							value={visiJurusanInput.visi_keilmuan_prodi}
							onChange={handleChangeVisiJurusan}
							className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
							placeholder="Masukkan Visi Keilmuan Prodi"
						/>
					</div>
				)}
			</div>

			<div className="flex mt-6">
				<button
					onClick={handleSaveVisiJurusan}
					className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300">
					Simpan Visi Jurusan dan Keilmuan Prodi
				</button>
			</div>
		</div>
	);
};

export default VisiJurusan;
