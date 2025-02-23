import { Table, Spin, Button, Modal, Input, Form, message } from "antd";
import { useState } from "react";
import useMataKuliahPengampu from "../../../hooks/DosenPages/RPS/useMataKuliahPengampu";
import DefaultLayout from "../../../layouts/DefaultLayout";

const MataKuliahPengampu = () => {
	const {
		mataKuliahPengampuData,
		error,
		loading,
		handleNavigate,
		handleUpdateSingkatMataKuliah,
	} = useMataKuliahPengampu();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedMataKuliah, setSelectedMataKuliah] = useState(null);
	const [form] = Form.useForm();

	const handleEditClick = (record) => {
		setSelectedMataKuliah(record);
		form.setFieldsValue({
			deskripsi_singkat: record.deskripsi_singkat,
		});
		setIsModalOpen(true);
	};

	const handleSave = async () => {
		try {
			const values = await form.validateFields();
			await handleUpdateSingkatMataKuliah(
				selectedMataKuliah.id,
				values.deskripsi_singkat
			);
			message.success("Deskripsi singkat berhasil diperbarui!");
			setIsModalOpen(false);
		} catch (error) {
			message.error("Terjadi kesalahan saat memperbarui deskripsi!");
		}
	};

	const columns = [
		{
			title: "Kode",
			dataIndex: "kode",
			key: "kode",
		},
		{
			title: "Nama Mata Kuliah",
			dataIndex: "nama",
			key: "nama",
		},
		{
			title: "Deskripsi Singkat MK",
			dataIndex: "deskripsi_singkat",
			key: "deskripsi_singkat",
		},
		{
			title: "Aksi",
			key: "aksi",
			render: (_, record) => (
				<>
					<Button type="primary" onClick={() => handleNavigate(record.id)}>
						Isi RPS
					</Button>
					<Button
						style={{ marginLeft: 8 }}
						onClick={() => handleEditClick(record)}>
						Edit
					</Button>
				</>
			),
		},
	];

	return (
		<DefaultLayout title="Daftar Mata Kuliah Diampu">
			<div className="w-full overflow-x-auto">
				<Table
					dataSource={mataKuliahPengampuData}
					columns={columns}
					rowKey="id"
					loading={loading}
					pagination={false}
				/>
			</div>

			{/* Modal Edit Deskripsi Singkat */}
			<Modal
				title="Edit Deskripsi Singkat"
				open={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				footer={[
					<Button key="cancel" onClick={() => setIsModalOpen(false)}>
						Batal
					</Button>,
					<Button key="save" type="primary" onClick={handleSave}>
						Simpan
					</Button>,
				]}>
				<Form form={form} layout="vertical">
					<Form.Item
						name="deskripsi_singkat"
						label="Deskripsi Singkat"
						rules={[
							{ required: true, message: "Deskripsi tidak boleh kosong!" },
						]}>
						<Input.TextArea rows={4} placeholder="Masukkan deskripsi singkat" />
					</Form.Item>
				</Form>
			</Modal>
		</DefaultLayout>
	);
};

export default MataKuliahPengampu;
