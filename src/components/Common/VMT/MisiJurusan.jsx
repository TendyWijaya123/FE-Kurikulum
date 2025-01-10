import { useState, useEffect } from "react";
import useVmt from "../../../hooks/Vmt/useVmt";

const MisiJurusan = () => {
	const {
		vmtJurusan,
		handleDeleteMisiJurusan,
		handleUpsertMisiJurusans,
		loading,
	} = useVmt();

	const [misiJurusan, setMisiJurusan] = useState([]);

	useEffect(() => {
		if (vmtJurusan?.misi_jurusans) {
			setMisiJurusan(vmtJurusan.misi_jurusans);
		}
	}, [vmtJurusan]);

	const handleAddPoint = () => {
		setMisiJurusan([
			...misiJurusan,
			{ misi_jurusan: "", vmt_jurusan_id: vmtJurusan.id },
		]);
	};

	const handleChangePoint = (index, event) => {
		const newMisiJurusan = event.target.value;
		setMisiJurusan((prevMisiJurusan) =>
			prevMisiJurusan.map((item, idx) =>
				idx === index ? { ...item, misi_jurusan: newMisiJurusan } : item
			)
		);
	};

	const handleDeletePoint = async (index) => {
		const misi = misiJurusan[index];

		if (!misi.id) {
			setMisiJurusan((prevMisiJurusan) =>
				prevMisiJurusan.filter((_, idx) => idx !== index)
			);
		} else {
			await handleDeleteMisiJurusan(misi.id);

			setMisiJurusan((prevMisiJurusan) =>
				prevMisiJurusan.filter((_, idx) => idx !== index)
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
		<div className="w-full bg-white p-6 rounded-lg shadow-lg">
			<h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
				Misi Jurusan
			</h2>

			<div className="space-y-4">
				{misiJurusan.map((item, index) => (
					<div
						key={index}
						className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm bg-gray-50">
						<input
							type="text"
							value={item.misi_jurusan}
							onChange={(e) => handleChangePoint(index, e)}
							className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
							placeholder="Masukkan Misi Jurusan"
						/>
						<button
							onClick={() => handleDeletePoint(index)}
							className="text-red-500 hover:text-red-700 transition-colors duration-200">
							Hapus
						</button>
					</div>
				))}
			</div>

			<div className="flex gap-2">
				<div className="flex justify-center mt-6">
					<button
						onClick={handleAddPoint}
						className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300">
						Tambah Point
					</button>
				</div>

				<div className="mt-6 text-center">
					<button
						onClick={() => handleUpsertMisiJurusans(misiJurusan)}
						className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300">
						Simpan
					</button>
				</div>
			</div>
		</div>
	);
};

export default MisiJurusan;
