import React, { useState } from "react";
import { Table, Input, Button, Spin, Modal, message } from "antd";
import usePeranIndustri from "../../../../hooks/ModelKonstruksi/usePeranIndustri";
import ImportModal from "../../../Modal/ImportModal";
import {
	PlusOutlined,
	SaveOutlined,
	UploadOutlined,
	DownloadOutlined,
	DeleteOutlined,
} from "@ant-design/icons";

const PeranIndustriTable = () => {
	const {
		loading,
		peranIndustriData,
		alert,
		handleAddPeranIndustri,
		handlePeranIndustriChange,
		handleDeletePeranIndustriPoint,
		handleSavePeranIndustri,
		handleImportPeranIndustri,
		handleExportTemplatePeranIndustri,
		handleDestroyPeranIndustris,
		selectedRowKeys,
		rowSelection,
	} = usePeranIndustri();

	const [isModalImportOpen, setIsModalImportOpen] = useState(false);

	const columns = [
		{
			title: "No",
			dataIndex: "no",
			key: "no",
			render: (_, __, index) => index + 1,
			width: 50,
		},
		{
			title: "Jabatan",
			dataIndex: "jabatan",
			key: "jabatan",
			render: (_, record, index) => (
				<Input
					name="jabatan"
					value={record.jabatan || ""}
					onChange={(e) => handlePeranIndustriChange(index, e)}
				/>
			),
			filterDropdown: true,
			filterSearch: true,
			width: "20%",
		},
		{
			title: "Deskripsi",
			dataIndex: "deskripsi",
			key: "deskripsi",
			render: (_, record, index) => (
				<Input.TextArea
					name="deskripsi"
					value={record.deskripsi || ""}
					onChange={(e) => handlePeranIndustriChange(index, e)}
					autoSize={{ minRows: 1, maxRows: 5 }}
				/>
			),
			width: "75%",
		},
		{
			title: "Aksi",
			key: "aksi",
			render: (_, __, index) => (
				<Button
					type="primary"
					danger
					icon={<DeleteOutlined />}
					onClick={() =>
						Modal.confirm({
							title: "Konfirmasi Hapus",
							content: "Apakah Anda yakin ingin menghapus item ini?",
							okText: "Hapus",
							okType: "danger",
							cancelText: "Batal",
							onOk: () => handleDeletePeranIndustriPoint(index),
						})
					}></Button>
			),
			width: 100,
		},
	];

	return (
		<div className="p-6 bg-white shadow-lg rounded-lg">
			<div className="mb-4 flex flex-wrap gap-2">
				<Button
					type="primary"
					icon={<DownloadOutlined />}
					onClick={handleExportTemplatePeranIndustri}>
					Download Template
				</Button>
				<Button
					type="default"
					icon={<UploadOutlined />}
					onClick={() => setIsModalImportOpen(true)}>
					Import Peran Industri
				</Button>
				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={handleAddPeranIndustri}>
					Tambah Peran
				</Button>
				<Button
					type="primary"
					icon={<SaveOutlined />}
					onClick={handleSavePeranIndustri}
					style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}>
					Simpan
				</Button>
				{selectedRowKeys.length > 0 && (
					<Button danger type="primary" onClick={handleDestroyPeranIndustris}>
						Hapus Peran Industri terpilih
					</Button>
				)}
			</div>

			{alert && <div className="text-red-500 mb-4">{alert}</div>}

			{loading ? (
				<Spin />
			) : (
				<div className="overflow-x-auto">
					<Table
						columns={columns}
						dataSource={peranIndustriData.map((item, index) => ({
							...item,
							key: item.id,
						}))}
						rowSelection={rowSelection}
						pagination={false}
						bordered
						style={{ minWidth: "400px" }}
					/>
				</div>
			)}

			{/* Modal Import */}
			<ImportModal	
				isOpen={isModalImportOpen}
				setIsOpen={setIsModalImportOpen}
				handleImport={handleImportPeranIndustri}
				title="Import Peran Industri"
				/>
		</div>
	);
};

export default PeranIndustriTable;
