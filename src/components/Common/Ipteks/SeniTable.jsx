import React, { useState } from "react";
import { Table, Button, Popconfirm, Input } from "antd";
import {
	DeleteOutlined,
	PlusOutlined,
	DownloadOutlined,
	ImportOutlined,
	UploadOutlined,
	SaveOutlined,
} from "@ant-design/icons";
import { useSeni } from "../../../hooks/Ipteks/useSeni";
import ImportModal from "../../Modal/ImportModal";
import VisibleMenu from "../../Menu/VisibleMenu";

const SeniTable = () => {
	const [isModalImportOpen, setIsModalImportOpen] = useState(false);

	const {
		data,
		loading,
		saving,
		selectedRowKeys,
		rowSelection,
		handleSave,
		handleDelete,
		handleCreate,
		handleSaveData,
		handleMultiDelete,
		handleImportSeni,
		handleExportTemplateSeni,
	} = useSeni();

	const columns = [
		{
			title: "Deskripsi",
			dataIndex: "deskripsi",
			key: "deskripsi",
			width: "70%",
			render: (text, record) => (
				<Input.TextArea
					value={text}
					onChange={(e) => handleSave({ ...record, deskripsi: e.target.value })}
					autoSize={{ minRows: 3 }}
				/>
			),
		},
		{
			title: "Link",
			dataIndex: "link_sumber",
			key: "link_sumber",
			width: "25%",
			render: (text, record) => (
				<Input
					value={text}
					onChange={(e) =>
						handleSave({ ...record, link_sumber: e.target.value })
					}
				/>
			),
		},
		{
			title: "Aksi",
			key: "action",
			width: "5%",
			render: (_, record) => (
				<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
					<Popconfirm
						title="Yakin ingin menghapus?"
						onConfirm={() => handleDelete(record)}
						okText="Ya"
						cancelText="Tidak">
						<Button type="primary" danger icon={<DeleteOutlined />} />
					</Popconfirm>
				</VisibleMenu>
			),
		},
	];

	return (
		<div>
			<div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
				<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
					<Button
						onClick={handleExportTemplateSeni}
						icon={<DownloadOutlined />}
						type="primary">
						Download Template
					</Button>

					<Button
						onClick={() => setIsModalImportOpen(true)}
						icon={<UploadOutlined />}
						type="default">
						Import
					</Button>

					<Button onClick={handleCreate} type="primary" icon={<PlusOutlined />}>
						Tambah Baris
					</Button>

					<Button
						icon={<SaveOutlined />}
						style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
						onClick={handleSaveData}
						type="primary"
						loading={saving}>
						Simpan Data
					</Button>

					{selectedRowKeys.length > 0 && (
						<Button
							onClick={() => handleMultiDelete(selectedRowKeys)}
							type="primary"
							danger
							icon={<DeleteOutlined />}>
							Hapus Seni Terpilih
						</Button>
					)}
				</VisibleMenu>
			</div>

			<ImportModal
				isOpen={isModalImportOpen}
				setIsOpen={setIsModalImportOpen}
				handleImport={handleImportSeni}
				title="Import Seni"
			/>

			<Table
				rowSelection={rowSelection}
				columns={columns}
				dataSource={data.map((item) => ({ ...item, key: item.id }))}
				pagination={{ pageSize: 5 }}
				bordered
				loading={loading}
			/>
		</div>
	);
};

export default SeniTable;
