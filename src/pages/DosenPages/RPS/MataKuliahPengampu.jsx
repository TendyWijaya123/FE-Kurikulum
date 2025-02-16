import { Table, Spin, Alert, Button } from "antd";
import useMataKuliahPengampu from "../../../hooks/DosenPages/RPS/useMataKuliahPengampu";
import DefaultLayout from "../../../layouts/DefaultLayout";

const MataKuliahPengampu = () => {
	const { mataKuliahPengampuData, error, loading, handleNavigate } =
		useMataKuliahPengampu();

	// Definisi kolom untuk Ant Design Table
	const columns = [
		{
			title: "Kode",
			dataIndex: "kode",
			key: "kode",
		},
		{
			title: "Nama Mata Kuliah",
			dataIndex: "nama",
			key: "nama",
		},
		{
			title: "Aksi",
			key: "aksi",
			render: (_, record, index) => {
				return (
					<Button
						type="primary"
						onClick={() => {
							handleNavigate(record.id);
						}}>
						Isi Rps
					</Button>
				);
			},
		},
	];

	return (
		<DefaultLayout title="Daftar Mata Kuliah Diampu">
			{loading ? (
				<Spin />
			) : (
				<Table
					dataSource={mataKuliahPengampuData}
					columns={columns}
					rowKey="id" // Pastikan setiap item memiliki field 'id'
					pagination={{ pageSize: 10 }} // Tambahkan pagination jika perlu
				/>
			)}
		</DefaultLayout>
	);
};

export default MataKuliahPengampu;
