import { useState, useEffect } from "react";
import useVmt from "../../../hooks/Vmt/useVmt";
import DeleteButton from "../../Button/DeleteButton";
import { Spin } from "antd";

const MisiPolban = () => {
	const {
		vmtPolban,
		handleDeleteMisiPolban,
		handleUpsertMisiPolbans,
		loading,
	} = useVmt();

	const [misiPolban, setMisiPolban] = useState([]);

	useEffect(() => {
		if (vmtPolban?.misi_polbans) {
			setMisiPolban(vmtPolban.misi_polbans);
		}
	}, [vmtPolban]);

	const handleAddPoint = () => {
		setMisiPolban([
			...misiPolban,
			{ misi_polban: "", vmt_polban_id: vmtPolban.id },
		]);
	};

	const handleChangePoint = (index, event) => {
		const newMisiPolban = event.target.value;
		setMisiPolban((prevMisiPolban) =>
			prevMisiPolban.map((item, idx) =>
				idx === index ? { ...item, misi_polban: newMisiPolban } : item
			)
		);
	};

	const handleDeletePoint = async (index) => {
		const misi = misiPolban[index];

		if (!misi.id) {
			setMisiPolban((prevMisiPolban) =>
				prevMisiPolban.filter((_, idx) => idx !== index)
			);
		} else {
			await handleDeleteMisiPolban(misi.id);

			setMisiPolban((prevMisiPolban) =>
				prevMisiPolban.filter((_, idx) => idx !== index)
			);
		}
	};

	return (
		<div className="w-full bg-white p-6 rounded-lg shadow-lg mb-4">
			<h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
				Misi Polban
			</h2>

			{loading ? (
				<Spin />
			) : (
				<div className="space-y-4">
					{misiPolban.map((item, index) => (
						<div
							key={index}
							className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm bg-gray-50">
							<input
								type="text"
								value={item.misi_polban}
								onChange={(e) => handleChangePoint(index, e)}
								className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
								placeholder="Masukkan Misi Polban"
							/>
							<DeleteButton
								className="text-red-500 hover:text-red-700 transition-colors duration-200"
								onDelete={() => handleDeletePoint(index)}>
								Hapus
							</DeleteButton>
						</div>
					))}
				</div>
			)}

			<div className="flex gap-2 ">
				<div className="flex justify-center mt-6">
					<button
						onClick={handleAddPoint}
						className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300">
						Tambah Point
					</button>
				</div>

				<div className="mt-6 text-center">
					<button
						onClick={() => handleUpsertMisiPolbans(misiPolban)}
						className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300">
						Simpan
					</button>
				</div>
			</div>
		</div>
	);
};

export default MisiPolban;
