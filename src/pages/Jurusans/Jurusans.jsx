import { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { getJurusans } from "../../service/api";
import { Table, Pagination, message, Skeleton, Tag } from "antd";
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
				message.error("Gagal Mengambil data Jurusan");
			} finally {
				setLoading(false);
			}
		};

		fetchJurusans();
	}, [currentPage]);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const columns = [
		{
			title: "Nama Jurusan",
			dataIndex: "nama",
			key: "nama",
		},
		{
			title: "Kategori",
			dataIndex: "kategori",
			key: "kategori",
			render: (kategori) => (
				<Tag color={kategori === "Rekayasa" ? "blue" : "green"}>{kategori}</Tag>
			),
		},
	];

	return (
		<DefaultLayout title="Semua Jurusan">
			<div className="w-full flex flex-col justify-center items-start pr-10">
				<div className="m-4 w-full mr-10 bg-white p-5 rounded-lg shadow-md">
					<h2 className="text-3xl font-semibold mb-2">Jurusan</h2>
					<Table
						columns={columns}
						dataSource={jurusans}
						loading={loading}
						pagination={false}
						rowKey={(record) => record.id}
					/>
					<div className="flex justify-start mt-4">
						<Pagination
							current={currentPage}
							total={totalPage * 10}
							pageSize={10}
							onChange={handlePageChange}
						/>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
};

export default Jurusans;
