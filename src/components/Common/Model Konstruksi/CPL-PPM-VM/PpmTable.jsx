import React, { useState } from "react";
import { Table, Input, Button, Spin, Modal, message } from "antd";
import usePpm from "../../../../hooks/ModelKonstruksi/usePpm";
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
		handleAddPpmPoint,
		handleChangePpmPoint,
		handleDeletePpmPoint,
		handleSavePpms,
		handleImportPpm,
		handleExportTemplatePpm,
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
			render: (text) => text || "Masukkan CPL yang baru",
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
			<h1 className="text-2xl font-semibold mb-4 text-gray-800">Daftar PPM</h1>

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
							key: index,
						}))}
						pagination={false}
						bordered
						style={{ minWidth: "400px" }}
					/>
				</div>
			)}

			{/* Modal Import */}
			<Modal
				title="Import PPM"
				open={isModalImportOpen}
				onCancel={() => setIsModalImportOpen(false)}
				onOk={() => {
					handleImportPpm();
					message.success("Import berhasil");
					setIsModalImportOpen(false);
				}}
				okText="Import"
				cancelText="Batal">
				<p>Silakan unggah file template untuk mengimpor data PPM.</p>
			</Modal>
		</div>
	);
};

export default PpmTable;
