import React, { useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { Table, Input, Button, Popconfirm, Select, Tooltip, Spin } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import { useKKNIData } from "../../hooks/AnalisisKonsideran/useKKNIData";
import ImportModal from "../../components/Modal/ImportModal";

const KKNI = () => {
	const {
		prodiDropdown,
		selectedProdi,
		loading,
		dataSource,
		saving,
		rowSelection,
		selectedRowKeys,
		handleUndo,
		handleSave,
		handleAddRow,
		handleDeleteRow,
		handleSaveData,
		handleDeleteKknis,
		handleProdiChange,
		handleExportTemplateKkni,
		handleImportKkni,
	} = useKKNIData();
	const [isModalImportOpen, setIsModalImportOpen] = useState(false);

	// Kolom tabel
	const columns = [
		{
			title: "Code",
			dataIndex: "code",
			key: "code",
			render: (text) => (
				<span style={{ padding: 0 }}>{text}</span> // Hanya menampilkan teks tanpa input
			),
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
			render: (text, record) => (
				<Input.TextArea
					value={text}
					onChange={(e) =>
						handleSave({ ...record, description: e.target.value })
					}
					autoSize={{ minRows: 1, maxRows: 5 }} // Menentukan jumlah baris minimal dan maksimal
					style={{
						border: "none",
						outline: "none",
						boxShadow: "none",
						padding: 0,
						resize: "none", // Mencegah pengguna meresize secara manual
					}}
				/>
			),
		},
		{
			title: "Aksi",
			key: "aksi",
			render: (_, record) => (
				<Popconfirm
					title="Yakin ingin menghapus baris ini?"
					onConfirm={() => handleDeleteRow(record.key)}
					okText="Ya"
					cancelText="Tidak">
					<Button type="primary" danger>
						Hapus
					</Button>
				</Popconfirm>
			),
		},
	];

	return (
		<DefaultLayout title="CPL KKNI">
			<div style={{ padding: "15px", background: "#fff9", minHeight: "100%" }}>
				<div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
					{prodiDropdown.length > 0 ? (
						// Jika `prodiDropdown` ada isinya, tampilkan dropdown
						<Select
							placeholder="Pilih Program Studi"
							options={prodiDropdown.map((prodi) => ({
								label: prodi.name,
								value: prodi.id,
							}))}
							value={selectedProdi}
							onChange={handleProdiChange}
							style={{ width: 200 }}
						/>
					) : (
						// Jika `prodiDropdown` kosong, tampilkan tombol
						<>
							<Button onClick={handleExportTemplateKkni} type="primary">
								Download Template Kkni
							</Button>
							<Button
								onClick={() => setIsModalImportOpen(true)}
								className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto">
								Import Kkni
							</Button>
							<Button onClick={handleAddRow} type="primary">
								Tambah Baris
							</Button>
							<ImportModal
								isOpen={isModalImportOpen}
								setIsOpen={setIsModalImportOpen}
								handleImport={handleImportKkni}
								title="Import KKNI"
							/>
							<Button onClick={handleSaveData} type="primary" loading={saving}>
								Simpan Data
							</Button>
							<Tooltip title="Undo">
								<Button
									onClick={handleUndo}
									type="default"
									icon={<UndoOutlined />}
								/>
							</Tooltip>
						</>
					)}
					{selectedRowKeys.length > 0 && (
						<Button
							onClick={handleDeleteKknis}
							type="primary"
							danger
							style={{ marginBottom: "16px" }}
							loading={loading}>
							Hapus CPL Terpilih
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
						dataSource={dataSource}
						rowSelection={rowSelection}
						columns={columns}
						pagination={{ pageSize: 5 }}
						bordered
					/>
				)}
			</div>
		</DefaultLayout>
	);
};

export default KKNI;
