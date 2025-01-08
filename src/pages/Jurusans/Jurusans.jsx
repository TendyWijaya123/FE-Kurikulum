import { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { getJurusans } from "../../service/api";
import { Pagination, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Jurusans = () => {
	const [jurusans, setJurusans] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchJurusans = async () => {
			setLoading(true);
			try {
				const data = await getJurusans(currentPage);
				setJurusans(data.data);
				setTotalPage(data.last_page);
			} catch (error) {
				console.error("Error fetching jurusans:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchJurusans();
	}, [currentPage]);

	const handlePageChange = (event, page) => {
		setCurrentPage(page);
	};

	const handleEditClick = (jurusanId) => {
		navigate(`/jurusan/edit/${jurusanId}`);
	};

	return (
		<DefaultLayout>
			<div className="w-full flex flex-col justify-center items-start pr-10">
				<div className="m-3 py-3 w-full">
					<h1 className="text-4xl font-semibold font-sans text-start">
						Jurusans
					</h1>
				</div>

				<div className="m-4 w-full mr-10 bg-white p-5 rounded-lg shadow-md">
					<h2 className="text-3xl font-semibold mb-2">All Jurusans</h2>

					{/* Scrollable table */}
					<div className="overflow-x-auto">
						<table className="min-w-full table-auto border-separate border-spacing-0 border border-gray-300">
							<thead className="bg-gray-100">
								<tr>
									<th className="px-4 py-2 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">
										Name
									</th>
									<th className="px-4 py-2 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">
										Category
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
													<Skeleton
														variant="rectangular"
														width={80}
														height={35}
													/>
													<Skeleton
														variant="rectangular"
														width={80}
														height={35}
													/>
												</td>
											</tr>
									  ))
									: jurusans.map((jurusan) => (
											<tr key={jurusan.id} className="hover:bg-gray-50">
												<td className="border-b px-4 py-2">{jurusan.nama}</td>
												<td className="border-b px-4 py-2">
													{jurusan.kategori}
												</td>

												{/* Action column */}
												<td className="border-b px-4 py-2">
													<button
														className="px-4 py-2 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600"
														onClick={() => handleEditClick(jurusan.id)} // Call handleEditClick with jurusan.id
													>
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

export default Jurusans;
