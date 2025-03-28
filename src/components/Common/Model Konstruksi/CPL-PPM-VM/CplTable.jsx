import React, { useState } from "react";
import {
	Table,
	Input,
	Button,
	Spin,
	Modal,
	message,
	Form,
	Popconfirm,
} from "antd";
import useCpl from "../../../../hooks/ModelKonstruksi/useCpl";
import ImportModal from "../../../Modal/ImportModal";
import {
	PlusOutlined,
	SaveOutlined,
	UploadOutlined,
	DownloadOutlined,
	DeleteOutlined,
} from "@ant-design/icons";
import VisibleMenu from "../../../Menu/VisibleMenu";

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
		error,
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
			render: (_, record, index) => {
				const errorMsg = error?.[`cpls.${index}.keterangan`]?.[0];
				return (
					<Form.Item
						validateStatus={errorMsg ? "error" : ""}
						help={errorMsg || ""}
						style={{ marginBottom: 0 }}>
						<Input.TextArea
							name="keterangan"
							value={record.keterangan || ""}
							onChange={(e) => handleChangeCplPoint(index, e)}
							autoSize={{ minRows: 1, maxRows: 5 }}
						/>
					</Form.Item>
				);
			},
			width: "75%",
		},
		{
			title: "Aksi",
			key: "aksi",
			render: (_, __, index) => (
				<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
					<Popconfirm
						title="Yakin ingin menghapus?"
						onConfirm={() => handleDeleteCplPoint(index)}
						okText="Ya"
						cancelText="Tidak">
						<Button type="primary" danger icon={<DeleteOutlined />}></Button>
					</Popconfirm>
				</VisibleMenu>
			),
			width: 100,
		},
	];

	return (
		<div className="p-6 bg-white shadow-lg rounded-lg">
			<div className="mb-4 flex flex-wrap gap-2">
				<VisibleMenu allowedRoles={"Penyusun Kurikulum"}>
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
				</VisibleMenu>
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
							key: index,
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
				handleImport={handleImportCpl}
				title="Import CPL"
			/>
		</div>
	);
};

export default CplTable;
