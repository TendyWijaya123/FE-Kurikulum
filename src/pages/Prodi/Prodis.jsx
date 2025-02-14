import { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { Table, Pagination, Alert, Button, Input, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { getProdis, updateProdi } from "../../service/api";

const { Option } = Select;

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

	const handlePageChange = (page) => {
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
			message.success("Data Prodi berhasil diperbarui.");
			setEditingProdi(null);
			const data = await getProdis(currentPage);
			setProdis(data.data);
		} catch (error) {
			message.error(
				error.response?.data?.message ||
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

	const columns = [
		{
			title: "Kode",
			dataIndex: "kode",
			render: (text, record) =>
				editingProdi?.id === record.id ? (
					<Input
						name="kode"
						value={editingProdi.kode}
						onChange={handleInputChange}
					/>
				) : (
					text
				),
		},
		{
			title: "Nama Prodi",
			dataIndex: "name",
			render: (text, record) =>
				editingProdi?.id === record.id ? (
					<Input
						name="name"
						value={editingProdi.name}
						onChange={handleInputChange}
					/>
				) : (
					text
				),
		},
		{
			title: "Jenjang",
			dataIndex: "jenjang",
		},
		{
			title: "Jurusan",
			dataIndex: ["jurusan", "nama"],
		},
		{
			title: "Status",
			dataIndex: "is_active",
			render: (text, record) =>
				editingProdi?.id === record.id ? (
					<Select
						name="is_active"
						value={editingProdi.is_active}
						onChange={(value) =>
							setEditingProdi({ ...editingProdi, is_active: value })
						}>
						<Option value={1}>Aktif</Option>
						<Option value={0}>Tidak Aktif</Option>
					</Select>
				) : text ? (
					"Aktif"
				) : (
					"Tidak Aktif"
				),
		},
		{
			title: "Aksi",
			render: (_, record) =>
				editingProdi?.id === record.id ? (
					<>
						<Button type="primary" onClick={handleSaveClick} loading={loading}>
							Save
						</Button>
						<Button onClick={handleCancelClick} style={{ marginLeft: 8 }}>
							Cancel
						</Button>
					</>
				) : (
					<Button onClick={() => handleEditClick(record.id)} type="default">
						Edit
					</Button>
				),
		},
	];

	return (
		<DefaultLayout title="Program Studi">
			<div className="w-full flex flex-col justify-center items-start pr-10">
				<div className="m-4 w-full mr-10 bg-white p-5 rounded-lg shadow-md">
					<h2 className="text-3xl font-semibold mb-2">Daftar Program Studi</h2>

					{errorMessage && (
						<Alert type="error" message={errorMessage} className="mb-4" />
					)}
					<div className="overflow-x-auto">
						<Table
							columns={columns}
							dataSource={prodis}
							loading={loading}
							pagination={false}
							rowKey="id"
						/>
					</div>

					<div className="flex justify-between mt-4 items-center">
						<Pagination
							current={currentPage}
							total={totalPage * 10}
							onChange={handlePageChange}
						/>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
};

export default Prodis;
