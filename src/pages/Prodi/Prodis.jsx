import { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { getProdis } from "../../service/api";
import { Pagination, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Prodis = () => {
	const [prodis, setProdis] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchProdis = async () => {
			setLoading(true);
			try {
				const data = await getProdis(currentPage);
				setProdis(data.data);
				setTotalPage(data.last_page);
			} catch (error) {
				console.error("Error fetching Prodi list:", error);
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
		navigate(`/prodi/edit/${prodiId}`);
	};

	return (
		<DefaultLayout title="Program Studi">
			<div className="w-full flex flex-col justify-center items-start pr-10">
				<div className="m-4 w-full mr-10 bg-white p-5 rounded-lg shadow-md">
					<h2 className="text-3xl font-semibold mb-2">Daftar Program Studi</h2>

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
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{/* If loading, display Skeleton rows */}
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
												<td className="border-b px-4 py-2">{prodi.kode}</td>
												<td className="border-b px-4 py-2">{prodi.name}</td>
												<td className="border-b px-4 py-2">{prodi.jenjang}</td>
												<td className="border-b px-4 py-2">
													{prodi.jurusan?.nama}
												</td>

												{/* Action column */}
												<td className="border-b px-4 py-2">
													<button
														className="px-4 py-2 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600"
														onClick={() => handleEditClick(prodi.id)}>
														Edit
													</button>
													<button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
														Delete
													</button>
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
