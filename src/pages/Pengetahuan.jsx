import React, { useState, useContext } from "react";
import {
	Table,
	Button,
	Popconfirm,
	Spin,
	Input,
	Form,
	Tooltip,
	Card,
	Select,
	Row,
	Col,
} from "antd";
import {
	DeleteOutlined,
	ImportOutlined,
	DownloadOutlined,
	PlusOutlined,
	SaveOutlined,
	UndoOutlined,
} from "@ant-design/icons";
import DefaultLayout from "../layouts/DefaultLayout";
import { usePengetahuan } from "../hooks/usePengetahuan";
import { AuthContext } from "../context/AuthProvider";
import ImportModal from "../components/Modal/ImportModal";
import VisibleMenu from "../components/Menu/VisibleMenu";
import { ProdiContext } from "../context/ProdiProvider";

const Pengetahuan = () => {
	const { user } = useContext(AuthContext);
	const [isModalImportOpen, setIsModalImportOpen] = useState(false);
	const { prodiDropdown, handleChangeSelectedProdiId, selectedProdiId } =
		useContext(ProdiContext);
	const {
		pengetahuanData,
		loading,
		saving,
		selectedRowKeys,
		setSelectedRowKeys,
		handleDelete,
		handleCreate,
		handleMultiDelete,
		handleExportTemplatePengetahuan,
		handleImportPengetahuan,
		handleFieldEdit,
		handleAddRow,
		handleSaveAll,
		handleDeleteRow,
	} = usePengetahuan();

	const columns = [
		{
			title: "Kode",
			dataIndex: "kode_pengetahuan",
			key: "kode_pengetahuan",
			width: "15%",
			render: (text) => <span>{text || "Auto-generated"}</span>,
		},
		{
			title: "Deskripsi",
			dataIndex: "deskripsi",
			key: "deskripsi",
			width: "75%",
			render: (text, record) => (
				<Input.TextArea
					value={text}
					onChange={(e) => handleFieldEdit(record, "deskripsi", e.target.value)}
					autoSize={{ minRows: 1, maxRows: 5 }}
					style={{
						border: "none",
						outline: "none",
						boxShadow: "none",
						padding: 0,
						background: "transparent",
						resize: "none",
					}}
				/>
			),
		},
		{
			title: "Aksi",
			key: "action",
			width: "10%",
			align: "center",
			render: (_, record) => (
				<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
					<Popconfirm
						title="Yakin ingin menghapus?"
						onConfirm={() => handleDeleteRow(record)}
						okText="Ya"
						cancelText="Tidak">
						<Button icon={<DeleteOutlined />} type="primary" danger></Button>
					</Popconfirm>
				</VisibleMenu>
			),
		},
	];

	const rowSelection = {
		selectedRowKeys,
		onChange: setSelectedRowKeys,
	};

	return (
		<DefaultLayout title="Pengetahuan">
			<VisibleMenu allowedRoles={"P2MPP"}>
				<Select
					placeholder="Pilih Program Studi"
					options={prodiDropdown.map((prodi) => ({
						label: prodi.name,
						value: prodi.id,
					}))}
					defaultValue={selectedProdiId}
					onChange={(value) => handleChangeSelectedProdiId(value)}
					style={{ width: 250 }}
					allowClear
					onClear={() => handleChangeSelectedProdiId(null)}
				/>
			</VisibleMenu>
			<div style={{ padding: "15px", background: "#fff", minHeight: "100%" }}>
				<div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
					<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
						<Button
							onClick={handleExportTemplatePengetahuan}
							icon={<DownloadOutlined />}
							type="primary">
							Download Template
						</Button>
						<Button
							onClick={() => setIsModalImportOpen(true)}
							icon={<ImportOutlined />}
							type="default">
							Import
						</Button>
						<Button
							onClick={() => handleAddRow()}
							icon={<PlusOutlined />}
							type="primary">
							Tambah Baris
						</Button>
						<Button
							onClick={handleSaveAll}
							icon={<SaveOutlined />}
							type="primary"
							loading={saving}
							style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}>
							Simpan Data
						</Button>

						{selectedRowKeys.length > 0 && (
							<Button
								onClick={() => handleMultiDelete(selectedRowKeys)}
								type="primary"
								danger>
								Hapus Terpilih
							</Button>
						)}
					</VisibleMenu>
				</div>

				<ImportModal
					isOpen={isModalImportOpen}
					setIsOpen={setIsModalImportOpen}
					handleImport={handleImportPengetahuan}
					title="Import Pengetahuan"
				/>

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
						columns={columns}
						dataSource={pengetahuanData}
						pagination={{ pageSize: 5, position: ["bottomRight"] }}
						bordered
					/>
				)}
			</div>
		</DefaultLayout>
	);
};

export default Pengetahuan;
