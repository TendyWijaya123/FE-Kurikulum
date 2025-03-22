import { Button, Select, Table } from "antd";
import useJejaringMK from "../../../hooks/JejaringMK/useJejaringMK";

const JejaringMKTable = () => {
	const {
		loading,
		matakuliahData,
		matakuliahDropdown,
		editingId,
		editedPrasyarat,
		startEdit,
		cancelEdit,
		saveEdit,
		setEditedPrasyarat,
	} = useJejaringMK();

	const jejaringColumns = [
		{
			title: "Nama",
			dataIndex: "nama",
			key: "nama",
		},
		{
			title: "Semester",
			dataIndex: "semester",
			key: "semester",
		},
		{
			title: "Prasyarat Mata Kuliah",
			key: "prasyarat_mata_kuliah",
			render: (_, record) =>
				editingId === record.id ? (
					<Select
						mode="multiple"
						value={editedPrasyarat[record.id] || []}
						options={matakuliahDropdown.map((item) => ({
							value: item.id,
							label: item.nama,
						}))}
						onChange={(value) =>
							setEditedPrasyarat((prev) => ({
								...prev,
								[record.id]: value,
							}))
						}
						showSearch
						filterOption={
							(input, option) =>
								option.label.toLowerCase().includes(input.toLowerCase()) // Hanya cari berdasarkan label
						}
						style={{ width: "100%" }}
					/>
				) : (
					<Select
						mode="multiple"
						value={record.prasyaratIds}
						options={matakuliahDropdown.map((item) => ({
							value: item.id,
							label: item.nama,
						}))}
						style={{ width: "100%" }}
						disabled
					/>
				),
		},
		{
			title: "Aksi",
			render: (_, record) =>
				editingId === record.id ? (
					<>
						<Button type="primary" onClick={() => saveEdit(record.id)}>
							Simpan
						</Button>
						<Button style={{ marginLeft: 8 }} onClick={cancelEdit}>
							Batal
						</Button>
					</>
				) : (
					<Button onClick={() => startEdit(record.id, record.prasyaratIds)}>
						Edit
					</Button>
				),
		},
	];

	return (
		<div className="w-full bg-white p-4 rounded-lg overflow-x-auto">
			<Table
				loading={loading}
				columns={jejaringColumns}
				dataSource={matakuliahData}
				rowKey="id"
			/>
		</div>
	);
};

export default JejaringMKTable;
