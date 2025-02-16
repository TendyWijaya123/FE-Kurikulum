import React, { useState } from "react";
import { Table, Input, Button, Spin, Modal, message } from "antd";
import usePpm from "../../../../hooks/ModelKonstruksi/usePpm";
import ImportModal from "../../../Modal/ImportModal";
import {
	PlusOutlined,
	SaveOutlined,
	UploadOutlined,
	DownloadOutlined,
	DeleteOutlined,
} from "@ant-design/icons";

const PpmTable = () => {
	const {
		loading,
		ppmData,
		alert,
		rowSelection,
		handleAddPpmPoint,
		handleChangePpmPoint,
		handleDeletePpmPoint,
		handleSavePpms,
		handleImportPpm,
		handleExportTemplatePpm,
		handleDestroyPpms,
		selectedRowKeys,
	} = usePpm();

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
			title: "Kode",
			dataIndex: "kode",
			key: "kode",
			render: (text) => text || "Masukkan PPM yang baru",
			filterDropdown: true,
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
					onChange={(e) => handleChangePpmPoint(index, e)}
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
					onClick={() => handleDeletePpmPoint(index)}></Button>
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
					onClick={handleExportTemplatePpm}>
					Download Template
				</Button>
				<Button
					type="default"
					icon={<UploadOutlined />}
					onClick={() => setIsModalImportOpen(true)}>
					Import PPM
				</Button>
				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={handleAddPpmPoint}>
					Tambah PPM
				</Button>
				<Button
					type="primary"
					icon={<SaveOutlined />}
					onClick={handleSavePpms}
					style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}>
					Simpan
				</Button>
				{selectedRowKeys.length > 0 && (
					<Button danger type="primary" onClick={handleDestroyPpms}>
						Hapus PPM terpilih
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
						dataSource={ppmData.map((item, index) => ({
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
				handleImport={handleImportPpm}
				title="Import CPL"
				/>
		</div>
	);
};

export default PpmTable;
