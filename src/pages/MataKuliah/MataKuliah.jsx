import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import {
	createMataKuliah,
	fetchBentukPembelajaranDropdown,
	fetchFormulasiCpaDropdown,
	fetchMataKuliah,
	fetchMetodePembelajaranDropdown,
	updateMataKuliah,
} from "../../service/MataKuliah/MataKuliahService";
import { Select, Button, Input, Modal, Spin } from "antd"; // Import Spin from Ant Design
import ModalCreateMataKuliah from "../../components/Common/MataKuliah/ModalCreateMataKuliah";
import ModalEditMataKuliah from "../../components/Common/MataKuliah/ModalEditMataKuliah";
import useMataKuliah from "../../hooks/MataKuliah/useMataKuliah";
import DeleteButton from "../../components/Button/DeleteButton";

const MataKuliah = () => {
	const {
		mataKuliahData,
		formulasiCpaDropdown,
		metodePembelajaranDropdown,
		bentukPembelajaranDropdown,
		loading,
		error,
		alert,
		editedData,
		isModalCreateVisible,
		isModalUpdateVisible,
		handleModalCreateClose,
		handleModalUpdateClose,
		handleOnEdit,
		handleCreateSave,
		handleUpdate,
		handleDelete,
		setIsModalCreateVisible,
		setIsModalUpdateVisible,
	} = useMataKuliah();

	return (
		<DefaultLayout title="Mata Kuliah">
			<div className="bg-white p-4 rounded-lg shadow-md">
				<h1 className="text-3xl font-bold mb-4">Mata Kuliah</h1>
				{/* Loading Indicator */}
				{loading ? (
					<div className="flex justify-center items-center h-64">
						<Spin size="large" /> {/* Show loading spinner */}
					</div>
				) : (
					<>
						<button
							className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200"
							onClick={() => {
								setIsModalCreateVisible(true);
							}}>
							Tambah Mata Kuliah
						</button>
						<div className="w-full overflow-x-auto">
							<table className="min-w-[1600px] table-auto border-collapse bg-white shadow-md rounded-lg border border-gray-300">
								<thead>
									<tr className="bg-gray-100 text-gray-700">
										<th className="px-6 py-3 border-b border-gray-200 text-left">
											Kode
										</th>
										<th className="px-6 py-3 border-b border-gray-200 text-left">
											Tujuan
										</th>
										<th className="px-6 py-3 border-b border-gray-200 text-left">
											Formulasi
										</th>
										<th className="px-6 py-3 border-b border-gray-200 text-left">
											Total Beban Belajar
										</th>
										<th className="px-6 py-3 border-b border-gray-200 text-left">
											SKS
										</th>
										<th className="px-6 py-3 border-b border-gray-200 text-left">
											Kemampuan Akhir yang Direncanakan
										</th>
										<th className="px-6 py-3 border-b border-gray-200 text-left">
											Estimasi Beban Belajar
										</th>
										<th className="px-6 py-3 border-b border-gray-200 text-left">
											Metode Pembelajaran
										</th>
										<th className="px-6 py-3 border-b border-gray-200 text-left">
											Bentuk Pembelajaran
										</th>
										<th className="px-6 py-3 border-b border-gray-200 text-left">
											Aksi
										</th>
									</tr>
								</thead>
								<tbody>
									{mataKuliahData.map((mataKuliah, indexMataKuliah) => (
										<React.Fragment key={indexMataKuliah}>
											{mataKuliah.kemampuan_akhir.length > 0 ? (
												mataKuliah.kemampuan_akhir.map(
													(kemampuanAkhir, indexKemampuanAkhir) => (
														<tr
															key={indexKemampuanAkhir}
															className="hover:bg-gray-50 hover:text-gray-800 transition-all duration-200">
															{indexKemampuanAkhir === 0 && (
																<>
																	<td
																		className="px-6 py-3 border-b border-gray-200 text-center"
																		rowSpan={mataKuliah.kemampuan_akhir.length}>
																		{mataKuliah.kode}
																	</td>
																	<td
																		className="px-6 py-3 border-b border-gray-200 text-center"
																		rowSpan={mataKuliah.kemampuan_akhir.length}>
																		{mataKuliah.tujuan}
																	</td>
																	<td
																		className="px-6 py-3 border-b border-gray-200"
																		rowSpan={mataKuliah.kemampuan_akhir.length}>
																		<Select
																			mode="multiple"
																			value={mataKuliah.formulasi_cpas || []}
																			options={formulasiCpaDropdown.map(
																				(item) => ({
																					value: item.id,
																					label: item.kode,
																				})
																			)}
																			style={{ width: "100%" }}
																			disabled
																		/>
																	</td>
																	<td
																		className="px-6 py-3 border-b border-gray-200 text-center"
																		rowSpan={mataKuliah.kemampuan_akhir.length}>
																		{mataKuliah.total_beban_belajar}
																	</td>
																	<td
																		className="px-6 py-3 border-b border-gray-200 text-center"
																		rowSpan={mataKuliah.kemampuan_akhir.length}>
																		{mataKuliah.sks}
																	</td>
																</>
															)}
															<td className="px-6 py-3 border-b border-gray-200">
																{kemampuanAkhir.deskripsi}
															</td>
															<td className="px-6 py-3 border-b border-gray-200">
																{kemampuanAkhir.estimasi_beban_belajar}
															</td>
															<td className="px-6 py-3 border-b border-gray-200">
																<Select
																	mode="multiple"
																	value={
																		kemampuanAkhir.bentuk_pembelajaran || []
																	}
																	options={bentukPembelajaranDropdown.map(
																		(item) => ({
																			value: item.id,
																			label: item.nama,
																		})
																	)}
																	style={{ width: "100%" }}
																	disabled
																/>
															</td>
															<td className="px-6 py-3 border-b border-gray-200">
																<Select
																	mode="multiple"
																	value={
																		kemampuanAkhir.metode_pembelajaran || []
																	}
																	options={metodePembelajaranDropdown.map(
																		(item) => ({
																			value: item.id,
																			label: item.nama,
																		})
																	)}
																	style={{ width: "100%" }}
																	disabled
																/>
															</td>
															{indexKemampuanAkhir === 0 && (
																<td
																	className="px-6 py-3 border-b border-gray-200 text-center"
																	rowSpan={mataKuliah.kemampuan_akhir.length}>
																	<button
																		onClick={() =>
																			handleOnEdit(indexMataKuliah)
																		}
																		className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200">
																		Edit
																	</button>

																	<DeleteButton
																		onDelete={() => handleDelete(mataKuliah.id)}
																		className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200">
																		Hapus
																	</DeleteButton>
																</td>
															)}
														</tr>
													)
												)
											) : (
												<tr className="hover:bg-gray-50 hover:text-gray-800 transition-all duration-200">
													<td className="px-6 py-3 border-b border-gray-200 text-center">
														{mataKuliah.kode}
													</td>
													<td className="px-6 py-3 border-b border-gray-200 text-center">
														{mataKuliah.tujuan}
													</td>
													<td className="px-6 py-3 border-b border-gray-200 text-center">
														<Select
															mode="multiple"
															defaultValue={mataKuliah.formulasi_cpas || []}
															options={formulasiCpaDropdown.map((item) => ({
																value: item.id,
																label: item.kode,
															}))}
															style={{ width: "100%" }}
															disabled
														/>
													</td>
													<td className="px-6 py-3 border-b border-gray-200 text-center">
														{mataKuliah.total_beban_belajar}
													</td>
													<td className="px-6 py-3 border-b border-gray-200 text-center">
														{mataKuliah.sks}
													</td>
													<td
														className="px-6 py-3 border-b border-gray-200 text-center"
														colSpan={4}>
														Tidak ada data kemampuan akhir
													</td>
													<td className="px-6 py-3 border-b border-gray-200 text-center">
														<button
															onClick={() => handleOnEdit(indexMataKuliah)}
															className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200">
															Edit
														</button>
														<DeleteButton
															onDelete={() => handleDelete(mataKuliah.id)}
															className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200">
															Hapus
														</DeleteButton>
													</td>
												</tr>
											)}
										</React.Fragment>
									))}
								</tbody>
							</table>
						</div>
					</>
				)}
			</div>
			<ModalEditMataKuliah
				isOpen={isModalUpdateVisible}
				editData={editedData}
				onClose={handleModalUpdateClose}
				formulasiCpaDropdown={formulasiCpaDropdown}
				metodePembelajaranDropdown={metodePembelajaranDropdown}
				bentukPembelajaranDropdown={bentukPembelajaranDropdown}
				handleUpdate={handleUpdate}
			/>
			<ModalCreateMataKuliah
				isOpen={isModalCreateVisible}
				onClose={handleModalCreateClose}
				formulasiCpaDropdown={formulasiCpaDropdown}
				metodePembelajaranDropdown={metodePembelajaranDropdown}
				bentukPembelajaranDropdown={bentukPembelajaranDropdown}
				onSave={handleCreateSave}
			/>
		</DefaultLayout>
	);
};

export default MataKuliah;
