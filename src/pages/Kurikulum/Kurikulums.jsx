import { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import {
	Table,
	Pagination,
	Skeleton,
	Select,
	Alert,
	Button,
	Switch,
	message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { getKurikulums, updateKurikulum } from "../../service/api";

const { Option } = Select;

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
			setErrorMessage("");
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

	const handleEditClick = (kurikulum) => {
		setEditingKurikulum({ ...kurikulum });
	};

	const handleCancelClick = () => {
		setEditingKurikulum(null);
	};

	const handleSaveClick = async () => {
		setLoading(true);
		try {
			await updateKurikulum(editingKurikulum.id, editingKurikulum);
			setEditingKurikulum(null);
			const { data } = await getKurikulums(currentPage);
			setKurikulums(data.data);
			message.success("kurikulum berhasil diupdate");
		} catch (error) {
			setErrorMessage(
				error.response?.data?.message ||
					error.message ||
					"Terjadi kesalahan saat menyimpan data kurikulum."
			);

			message.error("Kurikulum gagal diupdate");
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange = (key, value) => {
		setEditingKurikulum((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const columns = [
		{
			title: "Tahun Awal",
			dataIndex: "tahun_awal",
			render: (text, record) =>
				editingKurikulum?.id === record.id ? (
					<input
						type="text"
						value={editingKurikulum.tahun_awal}
						onChange={(e) => handleInputChange("tahun_awal", e.target.value)}
						className="border px-2 py-1 rounded"
					/>
				) : (
					text
				),
		},
		{
			title: "Tahun Akhir",
			dataIndex: "tahun_akhir",
			render: (text, record) =>
				editingKurikulum?.id === record.id ? (
					<input
						type="text"
						value={editingKurikulum.tahun_akhir}
						onChange={(e) => handleInputChange("tahun_akhir", e.target.value)}
						className="border px-2 py-1 rounded"
					/>
				) : (
					text
				),
		},
		{
			title: "Prodi",
			dataIndex: "prodi",
			render: (prodi) => prodi?.name || "Tidak Ada",
		},
		{
			title: "Status Aktif",
			dataIndex: "is_active",
			render: (text, record) =>
				editingKurikulum?.id === record.id ? (
					<Switch
						checked={editingKurikulum?.is_active}
						onChange={(checked) => handleInputChange("is_active", checked)}
						checkedChildren="Aktif"
						unCheckedChildren="Tidak Aktif"
					/>
				) : (
					<Switch
						checked={record.is_active}
						checkedChildren="Aktif"
						unCheckedChildren="Tidak Aktif"
						disabled
					/>
				),
		},
		{
			title: "Aksi",
			render: (_, record) =>
				editingKurikulum?.id === record.id ? (
					<>
						<Button type="primary" onClick={handleSaveClick} className="mr-2">
							Simpan
						</Button>
						<Button danger onClick={handleCancelClick}>
							Batal
						</Button>
					</>
				) : (
					<Button onClick={() => handleEditClick(record)} type="default">
						Edit
					</Button>
				),
		},
	];

	return (
		<DefaultLayout title="Kurikulums">
			<div className="m-4 bg-white p-5 rounded-lg shadow-md">
				<h2 className="text-3xl font-semibold mb-4">Daftar Kurikulum</h2>
				{errorMessage && (
					<Alert message={errorMessage} type="error" className="mb-4" />
				)}
				<Table
					columns={columns}
					dataSource={kurikulums}
					rowKey="id"
					loading={loading}
					pagination={false}
				/>
				<Pagination
					current={currentPage}
					total={totalPage * 10}
					onChange={setCurrentPage}
					className="mt-4"
				/>
			</div>
		</DefaultLayout>
	);
};

export default Kurikulums;
