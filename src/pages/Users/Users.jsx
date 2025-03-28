import { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { deleteUser, getUsers } from "../../service/api";
import { Table, Pagination, message, Button, Spin, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import DeleteButton from "../../components/Button/DeleteButton";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

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
			message.error("Gagal mengambil data pengguna");
		} finally {
			setLoading(false);
		}
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const handleEditClick = (userId) => {
		navigate(`/user/edit/${userId}`);
	};

	const handleDeleteClick = async (userId) => {
		try {
			await deleteUser(userId);
			message.success("User berhasil dihapus");
			fetchUsers(); // Refresh data setelah hapus
		} catch (error) {
			message.error("Gagal menghapus user");
		}
	};

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<div>
					<Button
						type="primary"
						icon={<EditOutlined />}
						onClick={() => handleEditClick(record.id)}
						className="mr-2"></Button>
					<Popconfirm
						title="Yakin ingin menghapus?"
						onConfirm={() => handleDeleteClick(record.id)}
						okText="Ya"
						cancelText="Tidak">
						<Button type="primary" danger icon={<DeleteOutlined />}></Button>
					</Popconfirm>
				</div>
			),
		},
	];

	return (
		<DefaultLayout title="Users">
			<div className="w-full flex flex-col justify-center items-start pr-10">
				<div className="m-4 w-full mr-10 bg-white p-5 rounded-lg shadow-md">
					<h2 className="text-3xl font-semibold mb-2">All Users</h2>
					{loading ? (
						<Spin size="large" className="flex justify-center" />
					) : (
						<Table
							columns={columns}
							dataSource={users}
							rowKey="id"
							pagination={false}
						/>
					)}
					<div className="flex justify-start mt-4">
						<Pagination
							current={currentPage}
							total={totalPage * 10}
							onChange={handlePageChange}
							simple
						/>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
};

export default Users;
