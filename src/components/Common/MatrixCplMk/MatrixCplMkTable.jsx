import React from "react";
import useMatrixCplMk from "../../../hooks/ModelKonstruksi/useMatrixCplMk";
import { Spin } from "antd";

const MatrixCplMkTable = () => {
	const {
		cpls,
		mataKuliahs,
		matrixData,
		loading,
		error,
		updateMatrix,
		handleCheckboxChange,
	} = useMatrixCplMk();

	if (error) return <p>Error: {error.message}</p>;

	const handleCategoryChange = (cplId, mkId, newKategori) => {
		handleCheckboxChange(cplId, mkId, newKategori);
	};

	return (
		<div className="p-4 bg-white">
			<h1 className="text-xl font-semibold mb-4">Matriks CPL-Mata Kuliah</h1>
			<div className="mb-4">
				<button
					onClick={updateMatrix}
					className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
					Simpan Perubahan
				</button>
			</div>
			{loading ? (
				<Spin />
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full table-auto border-collapse border border-gray-200">
						<thead>
							<tr className="bg-gray-100">
								<th
									rowSpan="2"
									className="px-4 py-2 text-left font-semibold text-gray-700 sticky left-0 bg-gray-100 border border-gray-200 z-10">
									Mata Kuliah
								</th>
								<th
									colSpan={cpls.length}
									className="px-4 py-2 text-center font-semibold text-gray-700 border border-gray-200">
									CPL
								</th>
							</tr>
							<tr className="bg-gray-100">
								{cpls.map((cpl) => (
									<th
										key={cpl.id}
										className="px-4 py-2 text-left font-semibold text-gray-700 border border-gray-200">
										{cpl.kode}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{mataKuliahs.map((mataKuliah) => (
								<tr key={mataKuliah.id} className="hover:bg-gray-50">
									<td className="px-4 py-2 text-gray-700 sticky left-0 bg-white border border-gray-200 z-10">
										{mataKuliah.kode}
									</td>
									{cpls.map((cpl) => {
										// Mendapatkan kategori yang dipilih untuk MK pada CPL tertentu
										const selectedKategori =
											matrixData
												.find((item) => item.cpl_id === cpl.id)
												?.mk_ids.find((mk) => mk.mk_id === mataKuliah.id)
												?.kategori || "";

										return (
											<td
												key={`${cpl.id}-${mataKuliah.id}`}
												className="px-4 py-2 border border-gray-200">
												<select
													value={selectedKategori}
													onChange={(e) =>
														handleCategoryChange(
															cpl.id,
															mataKuliah.id,
															e.target.value
														)
													}
													className="border border-gray-300 rounded px-2 py-1">
													<option value=""></option>
													<option value="I">I</option>
													<option value="R">R</option>
													<option value="M">M</option>
													<option value="A">A</option>
												</select>
											</td>
										);
									})}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default MatrixCplMkTable;
