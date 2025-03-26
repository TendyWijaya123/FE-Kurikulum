import React, { useState } from "react";
import { Table, Button, Popconfirm, Input, Form } from "antd";
import {
	DeleteOutlined,
	PlusOutlined,
	DownloadOutlined,
	ImportOutlined,
	UploadOutlined,
	SaveOutlined,
} from "@ant-design/icons";
import { useTeknologi } from "../../../hooks/Ipteks/useTeknologi";
import ImportModal from "../../Modal/ImportModal";
import VisibleMenu from "../../Menu/VisibleMenu";

const TeknologiTable = () => {
	const [isModalImportOpen, setIsModalImportOpen] = useState(false);

	const {
		data,
		loading,
		saving,
		selectedRowKeys,
		rowSelection,
		errors,
		handleSave,
		handleDelete,
		handleCreate,
		handleSaveData,
		handleMultiDelete,
		handleImportTeknologi,
		handleExportTemplateTeknologi,
	} = useTeknologi();

	const columns = [
		{
			title: "Deskripsi",
			dataIndex: "deskripsi",
			key: "deskripsi",
			width: "70%",
			render: (text, record, index) => {
				const errorMsg = errors?.[`${index}.deskripsi`]?.[0];

				return (
					<Form.Item
						validateStatus={errorMsg ? "error" : ""}
						help={errorMsg || ""}
						style={{ marginBottom: 0 }}>
						<Input.TextArea
							value={text}
							onChange={(e) => handleSave(index, "deskripsi", e.target.value)}
							autoSize={{ minRows: 3 }}
						/>
					</Form.Item>
				);
			},
		},
		{
			title: "Link",
			dataIndex: "link_sumber",
			key: "link_sumber",
			width: "25%",
			render: (text, record, index) => {
				const errorMsg = errors?.[`${index}.link_sumber`]?.[0];

				return (
					<Form.Item
						validateStatus={errorMsg ? "error" : ""}
						help={errorMsg || ""}
						style={{ marginBottom: 0 }}>
						<Input
							value={text}
							onChange={(e) => handleSave(index, "link_sumber", e.target.value)}
						/>
					</Form.Item>
				);
			},
		},
		{
			title: "Aksi",
			key: "action",
			width: "5%",
			render: (_, record, index) => (
				<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
					<Popconfirm
						title="Yakin ingin menghapus?"
						onConfirm={() => handleDelete(index)}
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
						onClick={handleExportTemplateTeknologi}
						icon={<DownloadOutlined />}
						type="primary">
						Download Template
					</Button>

					<Button
						onClick={() => setIsModalImportOpen(true)}
						icon={<UploadOutlined />}
						type="default">
						Import Teknologi
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
							Hapus Teknologi Terpilih
						</Button>
					)}
				</VisibleMenu>
			</div>

			<ImportModal
				isOpen={isModalImportOpen}
				setIsOpen={setIsModalImportOpen}
				handleImport={handleImportTeknologi}
				title="Import Teknologi"
			/>

			<Table
				rowSelection={rowSelection}
				columns={columns}
				dataSource={data.map((item, index) => ({ ...item, key: index }))}
				pagination={{ pageSize: 5 }}
				bordered
				loading={loading}
			/>
		</div>
	);
};

export default TeknologiTable;
