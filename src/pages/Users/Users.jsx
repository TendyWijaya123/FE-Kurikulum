import { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { deleteUser, getUsers } from "../../service/api";
import { Pagination, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import DeleteButton from "../../components/Button/DeleteButton";

const Users = () => {
	const [users, setUsers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		fetchUsers();
	}, [currentPage]);

	const fetchUsers = async () => {
		setLoading(true);
		try {
			const data = await getUsers(currentPage);
			setUsers(data.data);
			setTotalPage(data.last_page);
		} catch (error) {
			console.error("Error fetching users:", error);
		} finally {
			setLoading(false);
		}
	};

	const handlePageChange = (event, page) => {
		setCurrentPage(page);
	};

	const handleEditClick = (userId) => {
		navigate(`/user/edit/${userId}`);
	};

	const handleDeleteClick = async (userId) => {
		try {
			await deleteUser(userId);
			message.success("User Berhasil Dihapus");
		} catch (error) {
			message.error("Gagal  Menghapus User");
		}
	};

	return (
		<DefaultLayout title="Users">
			<div className="w-full flex flex-col justify-center items-start pr-10">
				<div className="m-4 w-full mr-10 bg-white p-5 rounded-lg shadow-md">
					<h2 className="text-3xl font-semibold mb-2">All Users</h2>

					{/* Scrollable table */}
					<div className="overflow-x-auto">
						<table className="min-w-full table-auto border-separate border-spacing-0 border border-gray-300">
							<thead className="bg-gray-100">
								<tr>
									<th className="px-4 py-2 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">
										Name
									</th>
									<th className="px-4 py-2 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">
										Email
									</th>
									<th className="px-4 py-2 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">
										Role
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
									: users.map((user) => (
											<tr key={user.id} className="hover:bg-gray-50">
												<td className="border-b px-4 py-2">{user.name}</td>
												<td className="border-b px-4 py-2">{user.email}</td>
												<td className="border-b px-4 py-2">
													{user.role?.name}
												</td>

												{/* Action column */}
												<td className="border-b px-4 py-2">
													<button
														className="px-2 py-2 bg-yellow-300 text-white rounded mr-2 hover:bg-yellow-400"
														onClick={() => handleEditClick(user.id)} // Call handleEditClick with user.id
													>
														Edit
													</button>
													<DeleteButton
														className="px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600"
														onDelete={() => {
															handleDeleteClick(user.id);
														}}>
														Delete
													</DeleteButton>
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

export default Users;
