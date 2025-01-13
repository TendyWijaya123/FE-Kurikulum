import { useState, useEffect } from "react";
import useVmt from "../../../hooks/Vmt/useVmt";
import DeleteButton from "../../Button/DeleteButton";

const TujuanPolban = () => {
	const {
		vmtPolban,
		handleDeleteTujuanPolban,
		handleUpsertTujuanPolbans,
		loading,
	} = useVmt();

	const [tujuanPolban, setTujuanPolban] = useState([]);

	useEffect(() => {
		if (vmtPolban?.tujuan_polbans) {
			setTujuanPolban(vmtPolban.tujuan_polbans);
		}
	}, [vmtPolban]);

	const handleAddPoint = () => {
		setTujuanPolban([
			...tujuanPolban,
			{ tujuan_polban: "", vmt_polban_id: vmtPolban.id },
		]);
	};

	const handleChangePoint = (index, event) => {
		const newTujuanPolban = event.target.value;
		setTujuanPolban((prevTujuanPolban) =>
			prevTujuanPolban.map((item, idx) =>
				idx === index ? { ...item, tujuan_polban: newTujuanPolban } : item
			)
		);
	};

	const handleDeletePoint = async (index) => {
		const tujuan = tujuanPolban[index];

		if (!tujuan.id) {
			setTujuanPolban((prevTujuanPolban) =>
				prevTujuanPolban.filter((_, idx) => idx !== index)
			);
		} else {
			await handleDeleteTujuanPolban(tujuan.id);

			setTujuanPolban((prevTujuanPolban) =>
				prevTujuanPolban.filter((_, idx) => idx !== index)
			);
		}
	};

	if (loading) {
		return (
			<div className="w-full bg-white flex justify-center items-center min-h-screen">
				<div className="spinner-border animate-spin border-t-4 border-blue-600 rounded-full w-16 h-16 border-4"></div>
			</div>
		);
	}

	return (
		<div className="w-full bg-white p-6 rounded-lg shadow-lg mb-4">
			<h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
				Tujuan Polban
			</h2>

			<div className="space-y-4">
				{tujuanPolban.map((item, index) => (
					<div
						key={index}
						className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm bg-gray-50">
						<input
							type="text"
							value={item.tujuan_polban}
							onChange={(e) => handleChangePoint(index, e)}
							className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
							placeholder="Masukkan Tujuan Polban"
						/>
						<DeleteButton
							onDelete={() => handleDeletePoint(index)}
							className="text-red-500 hover:text-red-700 transition-colors duration-200">
							Hapus
						</DeleteButton>
					</div>
				))}
			</div>

			<div className="flex gap-2 justify-between">
				<div className="flex justify-center mt-6">
					<button
						onClick={handleAddPoint}
						className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300">
						Tambah Point
					</button>
				</div>

				<div className="mt-6 text-center">
					<button
						onClick={() => handleUpsertTujuanPolbans(tujuanPolban)}
						className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300">
						Simpan
					</button>
				</div>
			</div>
		</div>
	);
};

export default TujuanPolban;
