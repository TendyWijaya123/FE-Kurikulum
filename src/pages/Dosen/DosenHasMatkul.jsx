import { useState } from "react";
import { useDosenData } from "../../hooks/Dosen/useDosenData";
import { useDosenHasMatkuluData } from "../../hooks/Dosen/useDosenHasMatkuluData";
import DefaultLayout from "../../layouts/DefaultLayout";
import { UndoOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Input, Button, Popconfirm, Select, Tooltip, Spin } from "antd";
import { SaveOutlined } from "@mui/icons-material";

const DosenHasMatkul = () => {
	const {
		dosenDropdown,
		loading,
		dataSource,
		saving,
		rowSelection,
		selectedRowKeys,
		handleSave,
		handleDeleteRow,
		handleSaveData,
	} = useDosenHasMatkuluData();

	const [editingKey, setEditingKey] = useState(null);

	const isEditing = (record) => record.key === editingKey;

	const handleEdit = (key) => {
		setEditingKey(key);
	};

	const handleCancelEdit = () => {
		setEditingKey(null);
	};

	const columns = [
		{
			title: "No",
			dataIndex: "no",
			key: "no",
			render: (_, __, index) => index + 1,
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
			title: "Prodi",
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
			<div style={{ padding: "24px", background: "#fff", minHeight: "100%" }}>
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
				{loading ? (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							marginTop: "50px",
						}}>
						<Spin size="large" />
					</div>
				) : (
					<Table
						rowSelection={rowSelection}
						dataSource={dataSource}
						columns={columns}
						pagination={{ pageSize: 5 }}
						bordered
					/>
				)}
			</div>
		</DefaultLayout>
	);
};

export default DosenHasMatkul;
