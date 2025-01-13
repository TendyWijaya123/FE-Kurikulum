import React from "react";
import usePpm from "../../../../hooks/ModelKonstruksi/usePpm";
import DeleteButton from "../../../Button/DeleteButton";

const PpmTable = () => {
	const {
		loading,
		ppmData,
		alert,
		handleAddPpmPoint,
		handleChangePpmPoint,
		handleDeletePpmPoint,
		handleSavePpms,
	} = usePpm();

	return (
		<div className="p-6 bg-white shadow-lg rounded-lg">
			<h1 className="text-2xl font-semibold mb-4 text-gray-800">Daftar PPM</h1>
			{alert && <div className="text-red-500 mb-4">{alert}</div>}
			{loading ? (
				<p className="text-center text-gray-500">Loading...</p>
			) : (
				<div className="overflow-x-auto max-h-[400px]">
					<table className="min-w-full bg-white border-collapse shadow-sm rounded-lg overflow-hidden">
						<thead>
							<tr className="bg-blue-100 text-gray-700">
								<th className="px-4 py-3 border-b min-w-[50px] text-left">
									No
								</th>
								<th className="px-4 py-3 border-b min-w-[100px] text-left">
									Kode
								</th>
								<th className="px-4 py-3 border-b min-w-[200px] text-left">
									Deskripsi
								</th>
								<th className="px-4 py-3 border-b min-w-[100px] text-left">
									Aksi
								</th>
							</tr>
						</thead>
						<tbody>
							{ppmData.length === 0 ? (
								<tr>
									<td colSpan="4" className="text-center py-4 text-gray-500">
										Tidak ada data
									</td>
								</tr>
							) : (
								ppmData.map((ppm, index) => (
									<tr key={index} className="hover:bg-gray-50">
										<td className="px-4 py-3 border-b text-gray-600">
											{index + 1}
										</td>
										<td className="px-4 py-3 border-b text-gray-600">
											{ppm.kode || "Masukkan PPM yang baru"}
										</td>
										<td className="px-4 py-3 border-b">
											<input
												type="text"
												name="deskripsi"
												value={ppm.deskripsi || ""}
												onChange={(e) => handleChangePpmPoint(index, e)}
												className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
											/>
										</td>
										<td className="px-4 py-3 border-b text-center">
											<DeleteButton
												onDelete={() => handleDeletePpmPoint(index)}
												className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-auto">
												Hapus
											</DeleteButton>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			)}
			<div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
				<button
					onClick={handleAddPpmPoint}
					className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto">
					Tambah PPM
				</button>
				<button
					onClick={handleSavePpms}
					className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto">
					Simpan
				</button>
			</div>
		</div>
	);
};

export default PpmTable;
