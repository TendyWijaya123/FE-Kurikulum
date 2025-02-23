import { Table, Button, Modal, Form, Input } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DefaultLayout from "../../layouts/DefaultLayout";
import useBukuReferensi from "../../hooks/BukuReferensi/useBukuReferensi";
import ImportModal from "../../components/Modal/ImportModal";
import { useState } from "react";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";

const BukuReferensi = () => {
	const {
		buku,
		loading,
		modalOpen,
		editingBuku,
		setModalOpen,
		handleAdd,
		handleEdit,
		handleDelete,
		handleSubmit,
		handleExportTemplate,
		handleImportBukuReferensi
	} = useBukuReferensi();

	const [form] = Form.useForm();
	const [isModalImportOpen, setIsModalImportOpen] = useState(false);

	return (
		<DefaultLayout title="Buku Referensi">
			<div className="p-4 bg-white rounded-lg shadow-md">
				<div className="flex space-x-2 mb-4">
					<Button
						type="primary"
						icon={<DownloadOutlined />}
						onClick={handleExportTemplate}>
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
						onClick={() => {
							form.resetFields();
							handleAdd();
						}}
						className="mb-4">
						Tambah Buku
					</Button>
				</div>
				<Table
					columns={[
						{ title: "Judul", dataIndex: "judul", key: "judul" },
						{ title: "Penulis", dataIndex: "penulis", key: "penulis" },
						{ title: "Penerbit", dataIndex: "penerbit", key: "penerbit" },
						{
							title: "Tahun Terbit",
							dataIndex: "tahun_terbit",
							key: "tahun_terbit",
						},
						{
							title: "Aksi",
							key: "aksi",
							render: (_, record) => (
								<div className="flex gap-2">
									<Button
										icon={<EditOutlined />}
										onClick={() => handleEdit(record)}
									/>
									<Button
										danger
										icon={<DeleteOutlined />}
										onClick={() => handleDelete(record.id)}
									/>
								</div>
							),
						},
					]}
					dataSource={buku}
					loading={loading}
					rowKey="id"
				/>
			</div>

			<ImportModal	
				isOpen={isModalImportOpen}
				setIsOpen={setIsModalImportOpen}
				handleImport={handleImportBukuReferensi}
				title="Import Buku Referensi"
				/>

			<Modal
				title={editingBuku ? "Edit Buku Referensi" : "Tambah Buku Referensi"}
				open={modalOpen}
				onCancel={() => setModalOpen(false)}
				onOk={() => form.submit()}>
				<Form
					form={form}
					layout="vertical"
					onFinish={(values) => handleSubmit(values)}>
					<Form.Item
						name="judul"
						label="Judul"
						rules={[{ required: true, message: "Harap masukkan judul" }]}>
						<Input />
					</Form.Item>
					<Form.Item
						name="penulis"
						label="Penulis"
						rules={[{ required: true, message: "Harap masukkan penulis" }]}>
						<Input />
					</Form.Item>
					<Form.Item name="penerbit" label="Penerbit">
						<Input />
					</Form.Item>
					<Form.Item name="tahun_terbit" label="Tahun Terbit">
						<Input type="number" />
					</Form.Item>
				</Form>
			</Modal>
		</DefaultLayout>
	);
};

export default BukuReferensi;
