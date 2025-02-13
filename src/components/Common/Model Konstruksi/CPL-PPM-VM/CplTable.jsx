import React, { useState } from "react";
import { Table, Input, Button, Spin, Modal, message } from "antd";
import useCpl from "../../../../hooks/ModelKonstruksi/useCpl";
import {
	PlusOutlined,
	SaveOutlined,
	UploadOutlined,
	DownloadOutlined,
	DeleteOutlined,
} from "@ant-design/icons";

const CplTable = () => {
	const {
		loading,
		cplData,
		alert,
		handleAddCplPoint,
		handleChangeCplPoint,
		handleDeleteCplPoint,
		handleSaveCpls,
		handleExportTemplateCpl,
		handleImportCpl,
		handleDestroyCpls,
		rowSelection,
		selectedRowKeys,
	} = useCpl();

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
			width: "20%",
		},
		{
			title: "Keterangan",
			dataIndex: "keterangan",
			key: "keterangan",
			render: (_, record, index) => (
				<Input.TextArea
					name="keterangan"
					value={record.keterangan || ""}
					onChange={(e) => handleChangeCplPoint(index, e)}
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
					onClick={() => handleDeleteCplPoint(index)}></Button>
			),
			width: 100,
		},
	];

	return (
		<div className="p-6 bg-white shadow-lg rounded-lg">
			<h1 className="text-2xl font-semibold mb-4 text-gray-800">Daftar CPL</h1>

			<div className="mb-4 flex flex-wrap gap-2">
				<Button
					type="primary"
					icon={<DownloadOutlined />}
					onClick={handleExportTemplateCpl}>
					Download Template
				</Button>
				<Button
					type="default"
					icon={<UploadOutlined />}
					onClick={() => setIsModalImportOpen(true)}>
					Import CPL
				</Button>
				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={handleAddCplPoint}>
					Tambah CPL
				</Button>
				<Button
					type="primary"
					icon={<SaveOutlined />}
					onClick={handleSaveCpls}
					style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}>
					Simpan
				</Button>
				{selectedRowKeys.length > 0 && (
					<Button danger type="primary" onClick={handleDestroyCpls}>
						Hapus CPL terpilih
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
						dataSource={cplData.map((item, index) => ({
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
			<Modal
				title="Import CPL"
				open={isModalImportOpen}
				onCancel={() => setIsModalImportOpen(false)}
				onOk={() => {
					handleImportCpl();
					message.success("Import berhasil");
					setIsModalImportOpen(false);
				}}
				okText="Import"
				cancelText="Batal">
				<p>Silakan unggah file template untuk mengimpor data CPL.</p>
			</Modal>
		</div>
	);
};

export default CplTable;
