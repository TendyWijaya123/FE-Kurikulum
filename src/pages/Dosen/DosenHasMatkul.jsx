import { useState } from "react";
import { useDosenData } from "../../hooks/Dosen/useDosenData";
import { useDosenHasMatkuluData } from "../../hooks/Dosen/useDosenHasMatkuluData";
import DefaultLayout from "../../layouts/DefaultLayout";
import { UndoOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Table, Input, Button, Popconfirm, Select, Tooltip, Spin } from "antd";
import { SaveOutlined } from "@mui/icons-material";

const DosenHasMatkul = () => {
	const {
		dosenDropdown,
		loading,
		dataSource,
		setDataSource, 
		saving,
		rowSelection,
		selectedRowKeys,
		handleSave,
		handleDeleteRow,
		handleSaveData,
		fetchDosenHasMatkul,
	} = useDosenHasMatkuluData();

	const { prodiDropdown } = useDosenData();

	const [editingKey, setEditingKey] = useState(null);
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
	});
	const [filters, setFilters] = useState({
		nama: "",
		kode: "",
		dosen: "",
		prodi_id: undefined, 
	});

	const isEditing = (record) => record.key === editingKey;

	const handleEdit = (key) => {
		setEditingKey(key);
	};

	const handleCancelEdit = () => {
		setEditingKey(null);
	};

	const handleSearch = () => {
		const isFiltersEmpty = !filters.kode && !filters.nama && !filters.dosen && !filters.prodi_id;
		
		if (isFiltersEmpty) {
			fetchDosenHasMatkul();
			return;
		}

		const filteredData = dataSource.filter((item) => {
			const matchKode = filters.kode
				? item.kode.toLowerCase().includes(filters.kode.toLowerCase())
				: true;
			const matchNama = filters.nama
				? item.nama.toLowerCase().includes(filters.nama.toLowerCase())
				: true;
			const matchDosen = filters.dosen
				? (item.dosen
					? item.dosen.some((dosen) =>
						dosen.toLowerCase().includes(filters.dosen.toLowerCase())
					)
					: false)
				: true;
			const matchProdi = filters.prodi_id
					? item.prodi
						.split(", ")
						.map(p => p.trim())
						.includes(prodiDropdown.find(p => p.id === filters.prodi_id)?.name)
					: true;

			return matchKode && matchNama && matchDosen && matchProdi;
		});

		setDataSource(filteredData);
	};

	const columns = [
		{
			title: "No",
			dataIndex: "no",
			key: "no",
			render: (_, __, index) =>
				(pagination.current - 1) * pagination.pageSize + index + 1,
		},
		{
			title: "Kode",
			dataIndex: "kode",
			key: "kode",
			render: (text) => text,
		},
		{
			title: "Nama",
			dataIndex: "nama",
			key: "nama",
			render: (text) => text,
		},
		{
			title: "Program Studi",
			dataIndex: "prodi",
			key: "prodi",
			render: (text) => text,
		},
		{
			title: "Dosen Pengampu",
			dataIndex: "dosen",
			key: "dosen",
			render: (text, record) =>
				isEditing(record) ? (
					<Select
						mode="multiple"
						value={
							record.dosen_id !== undefined
								? record.dosen_id
								: (record.dosen || [])
										.map((nama) => {
											const foundDosen = dosenDropdown.find(
												(d) => d.nama === nama
											);
											return foundDosen ? foundDosen.id : null;
										})
										.filter(Boolean)
						}
						onChange={(value) => handleSave({ ...record, dosen_id: value })}
						style={{ width: "100%" }}
						options={dosenDropdown.map((dosen) => ({
							label: dosen.nama,
							value: dosen.id,
						}))}
					/>
				) : (
					<ul style={{ margin: 0, paddingLeft: "1rem" }}>
						{record.dosen && record.dosen.length > 0 ? (
							record.dosen.map((namaDosen, index) => (
								<li key={index}>{namaDosen}</li>
							))
						) : (
							<i style={{ color: "gray" }}>Belum ada dosen</i>
						)}
					</ul>
				),
		},
		{
			title: "Aksi",
			key: "aksi",
			render: (_, record) =>
				isEditing(record) ? (
					<>
						<Button
							type="primary"
							danger
							onClick={handleCancelEdit}
							style={{ marginRight: 8 }}>
							Batal
						</Button>
					</>
				) : (
					<Button
						type="primary"
						style={{
							backgroundColor: "#faad14",
							borderColor: "#faad14",
							color: "white",
						}}
						onClick={() => handleEdit(record.key)}>
						<EditOutlined />
					</Button>
				),
		},
	];

	return (
		<DefaultLayout title="Dosen Mengampu Mata Kuliah">
				<div className="p-6 bg-white shadow-lg rounded-lg">
					<h1 className="text-xl font-bold mb-4">
						Dosen Mengampu Mata Kuliah
					</h1>

					{/* Buttons Section */}
					<div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
						<>
							<Button
								icon={<SaveOutlined />}
								style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
								onClick={handleSaveData}
								type="primary"
								loading={saving}>
								Simpan Data
							</Button>
						</>
						{selectedRowKeys.length > 0 && (
							<Button
								onClick={handleDeleteRow}
								type="primary"
								danger
								loading={loading}>
								Hapus Dosen Terpilih
							</Button>
						)}
					</div>

					{/* Filter Section */}
					<div className="mb-4 flex gap-4">
						<Input
							placeholder="Cari Kode Mata Kuliah"
							value={filters.kode}
							onChange={(e) =>
								setFilters((prev) => ({ ...prev, kode: e.target.value }))
								}
						/>
						<Input
							placeholder="Cari Nama Mata Kuliah"
							value={filters.nama}
							onChange={(e) =>
								setFilters((prev) => ({ ...prev, nama: e.target.value }))
								}
						/>
						<Input
							placeholder="Cari Nama Dosen"
							value={filters.dosen}
							onChange={(e) =>
								setFilters((prev) => ({ ...prev, dosen: e.target.value }))
								}
						/>
						<Select
							placeholder="Pilih Prodi"
							allowClear
							style={{ width: 200 }}
							value={filters.prodi_id}
							onChange={(value) =>
								setFilters((prev) => ({ ...prev, prodi_id: value }))
							}
						>
							{prodiDropdown.map((prodi) => (
								<Select.Option key={prodi.id} value={prodi.id}>
									{prodi.name}
								</Select.Option>
							))}
						</Select>
						<Button type="primary" onClick={handleSearch}>
							<SearchOutlined />
						</Button>
					</div>

					{/* Table Section */}
					<Table
						className="overflow-x-auto"
						rowSelection={rowSelection}
						dataSource={dataSource}
						columns={columns}
						loading={loading}
						pagination={{
							...pagination,
							total: dataSource.length,
							showSizeChanger: false,
							onChange: (page, pageSize) => {
								setPagination({
									...pagination,
									current: page,
									pageSize: pageSize,
								});
							},
						}}
						bordered
					/>
				</div>
		</DefaultLayout>
	);
};

export default DosenHasMatkul;
