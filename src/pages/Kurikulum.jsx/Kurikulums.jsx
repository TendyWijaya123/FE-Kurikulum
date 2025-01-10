import { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import {
	Pagination,
	Skeleton,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	Alert, // Import Alert dari MUI
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getKurikulums, updateKurikulum } from "../../service/api"; // Pastikan API sesuai backend Anda

const Kurikulums = () => {
	const [kurikulums, setKurikulums] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [editingKurikulum, setEditingKurikulum] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		const fetchKurikulums = async () => {
			setLoading(true);
			setErrorMessage(""); // Reset error message setiap kali data dimuat
			try {
				const { data } = await getKurikulums(currentPage);
				setKurikulums(data.data);
				setTotalPage(data.last_page);
			} catch (error) {
				setErrorMessage(
					error.message || "Terjadi kesalahan saat mengambil data kurikulum."
				);
			} finally {
				setLoading(false);
			}
		};

		fetchKurikulums();
	}, [currentPage]);

	const handlePageChange = (event, page) => {
		setCurrentPage(page);
	};

	const handleEditClick = (kurikulumId) => {
		const kurikulum = kurikulums.find((k) => k.id === kurikulumId);
		setEditingKurikulum({ ...kurikulum });
	};

	const handleCancelClick = () => {
		setEditingKurikulum(null);
	};

	const handleSaveClick = async () => {
		setLoading(true);
		try {
			await updateKurikulum(editingKurikulum.id, editingKurikulum);
			setEditingKurikulum(null); // Setelah disimpan, keluar dari mode edit
			// Refetch data
			const { data } = await getKurikulums(currentPage);
			setKurikulums(data.data);
		} catch (error) {
			setErrorMessage(
				error.response?.data?.message ||
					error.message ||
					"Terjadi kesalahan saat menyimpan data kurikulum."
			);
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setEditingKurikulum((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<DefaultLayout title="Kurikulums">
			<div className="w-full flex flex-col justify-center items-start pr-10">
				<div className="m-4 w-full mr-10 bg-white p-5 rounded-lg shadow-md">
					<h2 className="text-3xl font-semibold mb-2">Daftar Kurikulum</h2>

					{/* Menampilkan error alert jika ada error message */}
					{errorMessage && (
						<Alert severity="error" className="mb-4">
							{errorMessage}
						</Alert>
					)}

					{/* Scrollable table */}
					<div className="overflow-x-auto">
						<table className="min-w-full table-auto border-separate border-spacing-0 border border-gray-300">
							<thead className="bg-gray-100 ">
								<tr>
									<th className="px-4 py-2 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">
										Tahun Awal
									</th>
									<th className="px-4 py-2 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">
										Tahun Akhir
									</th>
									<th className="px-4 py-2 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">
										Prodi
									</th>
									<th className="px-4 py-2 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">
										Status Aktif
									</th>
									<th className="px-4 py-2 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">
										Aksi
									</th>
								</tr>
							</thead>
							<tbody>
								{/* Loading state */}
								{loading
									? Array.from({ length: 5 }).map((_, index) => (
											<tr key={index} className="hover:bg-gray-50">
												<td className="border-b px-4 py-2">
													<Skeleton variant="text" width="100%" />
												</td>
												<td className="border-b px-4 py-2">
													<Skeleton variant="text" width="100%" />
												</td>
												<td className="border-b px-4 py-2">
													<Skeleton variant="text" width="100%" />
												</td>
												<td className="border-b px-4 py-2">
													<Skeleton variant="text" width="100%" />
												</td>
												<td className="border-b px-4 py-2">
													<Skeleton
														variant="rectangular"
														width={80}
														height={35}
													/>
												</td>
											</tr>
									  ))
									: kurikulums.map((kurikulum) => (
											<tr key={kurikulum.id} className="hover:bg-gray-50">
												<td className="border-b px-4 py-2">
													{editingKurikulum?.id === kurikulum.id ? (
														<input
															type="text"
															name="tahun_awal"
															value={editingKurikulum.tahun_awal}
															onChange={handleInputChange}
															className="border px-2 py-1 rounded"
														/>
													) : (
														kurikulum.tahun_awal
													)}
												</td>
												<td className="border-b px-4 py-2">
													{editingKurikulum?.id === kurikulum.id ? (
														<input
															type="text"
															name="tahun_akhir"
															value={editingKurikulum.tahun_akhir}
															onChange={handleInputChange}
															className="border px-2 py-1 rounded"
														/>
													) : (
														kurikulum.tahun_akhir
													)}
												</td>
												<td className="border-b px-4 py-2">
													{/* Prodi tidak dapat diubah */}
													{kurikulum.prodi?.name || "Tidak Ada"}
												</td>
												<td className="border-b px-4 py-2">
													{editingKurikulum?.id === kurikulum.id ? (
														<FormControl fullWidth>
															<InputLabel>Status Aktif</InputLabel>
															<Select
																name="is_active"
																value={editingKurikulum.is_active}
																onChange={handleInputChange}
																label="Status Aktif">
																<MenuItem value={true}>Aktif</MenuItem>
																<MenuItem value={false}>Tidak Aktif</MenuItem>
															</Select>
														</FormControl>
													) : kurikulum.is_active ? (
														"Aktif"
													) : (
														"Tidak Aktif"
													)}
												</td>
												<td className="border-b px-4 py-2">
													{editingKurikulum?.id === kurikulum.id ? (
														<>
															<button
																className="px-4 py-2 bg-green-500 text-white rounded mr-2 hover:bg-green-600"
																onClick={handleSaveClick}>
																Simpan
															</button>
															<button
																className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
																onClick={handleCancelClick}>
																Cancel
															</button>
														</>
													) : (
														<button
															className="px-4 py-2 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600"
															onClick={() => handleEditClick(kurikulum.id)}>
															Edit
														</button>
													)}
												</td>
											</tr>
									  ))}
							</tbody>
						</table>
					</div>

					{/* Pagination */}
					<div className="flex justify-between mt-4 items-center">
						<Pagination
							count={totalPage}
							page={currentPage}
							onChange={handlePageChange}
						/>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
};

export default Kurikulums;
