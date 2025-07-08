import { Button, Select, Table, Tag } from "antd";
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
		filters,
		setFilters,
	} = useJejaringMK();

	const jejaringColumns = [
		{
			title: "Nama",
			dataIndex: "nama",
			key: "nama",
		},
		{
			title: "Kategori",
			dataIndex: "kategori",
			key: "kategori",
			width: 120,
			render: (text) => {
				const categoryColors = {
					Institusi: "blue",
					Prodi: "green",
					Nasional: "gold",
				};
				return text ? (
					<Tag color={categoryColors[text] || "default"}>{text}</Tag>
				) : (
					<Tag color="red">Belum Diisi</Tag>
				);
			},
		},
		{
			title: "Semester",
			dataIndex: "semester",
			key: "semester",
			width: 100,
			render: (text) => (text ? text : <Tag color="red">Belum Diisi</Tag>),
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
						filterOption={(input, option) =>
							option.label.toLowerCase().includes(input.toLowerCase())
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
						<Button onClick={cancelEdit} style={{ marginLeft: 8 }}>
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
			<div className="flex gap-3 mb-4 items-center">
				<Select
					placeholder="Semester"
					style={{ width: 120 }}
					allowClear
					value={filters.semester}
					onChange={(val) => setFilters((prev) => ({ ...prev, semester: val }))}
					options={[...Array(8)].map((_, i) => ({
						label: `Semester ${i + 1}`,
						value: i + 1,
					}))}
				/>
				<Select
					placeholder="Kategori"
					style={{ width: 160 }}
					allowClear
					value={filters.kategori}
					onChange={(val) => setFilters((prev) => ({ ...prev, kategori: val }))}
					options={[
						{ label: "Wajib", value: "Wajib" },
						{ label: "Pilihan", value: "Pilihan" },
					]}
				/>
				<input
					type="text"
					placeholder="Cari Nama Mata Kuliah"
					value={filters.nama}
					onChange={(e) =>
						setFilters((prev) => ({ ...prev, nama: e.target.value }))
					}
					className="border px-2 py-1 rounded w-60"
				/>
				<Button
					onClick={() =>
						setFilters({ semester: null, kategori: "", nama: "" })
					}>
					Reset
				</Button>
			</div>
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
