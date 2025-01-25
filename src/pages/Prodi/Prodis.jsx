import { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import {
	Pagination,
	Skeleton,
	Alert,
	Button,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getProdis, updateProdi } from "../../service/api";

const Prodis = () => {
	const [prodis, setProdis] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [editingProdi, setEditingProdi] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		const fetchProdis = async () => {
			setLoading(true);
			setErrorMessage("");
			try {
				const data = await getProdis(currentPage);
				if (data && Array.isArray(data.data)) {
					setProdis(data.data);
					setTotalPage(data.last_page);
				} else {
					setErrorMessage("Data Prodi tidak valid.");
				}
			} catch (error) {
				setErrorMessage(
					error.message || "Terjadi kesalahan saat mengambil data Prodi."
				);
			} finally {
				setLoading(false);
			}
		};

		fetchProdis();
	}, [currentPage]);

	const handlePageChange = (event, page) => {
		setCurrentPage(page);
	};

	const handleEditClick = (prodiId) => {
		const prodi = prodis.find((p) => p.id === prodiId);
		setEditingProdi({ ...prodi });
	};

	const handleCancelClick = () => {
		setEditingProdi(null);
	};

	const handleSaveClick = async () => {
		setLoading(true);
		try {
			await updateProdi(editingProdi.id, editingProdi);
			setEditingProdi(null);
			const data = await getProdis(currentPage);
			setProdis(data.data);
		} catch (error) {
			setErrorMessage(
				error.response?.data?.message ||
					error.message ||
					"Terjadi kesalahan saat menyimpan data Prodi."
			);
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setEditingProdi((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<DefaultLayout title="Program Studi">
			<div className="w-full flex flex-col justify-center items-start pr-10">
				<div className="m-4 w-full mr-10 bg-white p-5 rounded-lg shadow-md">
					<h2 className="text-3xl font-semibold mb-2">Daftar Program Studi</h2>

					{/* Display error alert if there's any error message */}
					{errorMessage && (
						<Alert severity="error" className="mb-4">
							{errorMessage}
						</Alert>
					)}

					{/* Scrollable table */}
					<div className="overflow-x-auto">
						<table className="min-w-full table-auto border-separate border-spacing-0 border border-gray-300">
							<thead className="bg-gray-100">
								<tr>
									<th className="px-4 py-2 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">
										Kode
									</th>
									<th className="px-4 py-2 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">
										Nama Prodi
									</th>
									<th className="px-4 py-2 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">
										Jenjang
									</th>
									<th className="px-4 py-2 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">
										Jurusan
									</th>
									<th className="px-4 py-2 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">
										Status
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
									: prodis.map((prodi) => (
											<tr key={prodi.id} className="hover:bg-gray-50">
												<td className="border-b px-4 py-2">
													{editingProdi?.id === prodi.id ? (
														<TextField
															name="kode"
															value={editingProdi.kode}
															onChange={handleInputChange}
															size="small"
															variant="outlined"
														/>
													) : (
														prodi.kode
													)}
												</td>
												<td className="border-b px-4 py-2">
													{editingProdi?.id === prodi.id ? (
														<TextField
															name="name"
															value={editingProdi.name}
															onChange={handleInputChange}
															size="small"
															variant="outlined"
														/>
													) : (
														prodi.name
													)}
												</td>
												<td className="border-b px-4 py-2">{prodi.jenjang}</td>
												<td className="border-b px-4 py-2">
													{prodi.jurusan?.nama}
												</td>
												<td className="border-b px-4 py-2">
													{editingProdi?.id === prodi.id ? (
														<FormControl fullWidth>
															<InputLabel>Status Aktif</InputLabel>
															<Select
																name="is_active"
																value={editingProdi.is_active}
																onChange={handleInputChange}
																label="Status Aktif">
																<MenuItem value={true}>Aktif</MenuItem>
																<MenuItem value={false}>Tidak Aktif</MenuItem>
															</Select>
														</FormControl>
													) : prodi.is_active ? (
														"Aktif"
													) : (
														"Tidak Aktif"
													)}
												</td>
												<td className="border-b px-4 py-2">
													{editingProdi?.id === prodi.id ? (
														<>
															<Button
																variant="contained"
																color="primary"
																onClick={handleSaveClick}
																size="small"
																className="mr-2">
																Save
															</Button>
															<Button
																variant="contained"
																color="secondary"
																onClick={handleCancelClick}
																size="small">
																Cancel
															</Button>
														</>
													) : (
														<Button
															variant="contained"
															size="small"
															onClick={() => handleEditClick(prodi.id)}
															sx={{
																backgroundColor: "rgb(250, 204, 21)", // Warna sesuai Tailwind bg-yellow-400
																"&:hover": {
																	backgroundColor: "rgb(234, 179, 8)", // Hover sesuai Tailwind hover:bg-yellow-400
																},
															}}
															className="mr-2">
															Edit
														</Button>
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

export default Prodis;
