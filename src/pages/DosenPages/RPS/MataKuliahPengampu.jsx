import {
	Table,
	Spin,
	Button,
	Modal,
	Input,
	Form,
	message,
	Tag,
	Select,
} from "antd";
import { useState } from "react";
import useMataKuliahPengampu from "../../../hooks/DosenPages/RPS/useMataKuliahPengampu";
import DefaultLayout from "../../../layouts/DefaultLayout";
import { SearchOutlined } from "@ant-design/icons";

const MataKuliahPengampu = () => {
	const {
		mataKuliahPengampuData,
		error,
		loading,
		pagination,
		prodiDropdown,
		handleNavigate,
		handleUpdateSingkatMataKuliah,
		handlePaginationChange,
		handleSearchChange,
	} = useMataKuliahPengampu();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedMataKuliah, setSelectedMataKuliah] = useState(null);
	const [form] = Form.useForm();
	const [searchParams, setSearchParams] = useState({
		nama: "",
		kode: "",
		prodi_id: null,
	});

	const handleSearch = () => {
		handleSearchChange("nama", searchParams.nama);
		handleSearchChange("kode", searchParams.kode);
		handleSearchChange("prodi_id", searchParams.prodi_id);
	};

	const handleEditClick = (record) => {
		setSelectedMataKuliah(record);
		form.setFieldsValue({
			deskripsi_singkat: record.deskripsi_singkat,
			deskripsi_singkat_inggris: record.deskripsi_singkat_inggris,
			nama_inggris: record.nama_inggris,
			materi_pembelajaran_inggris: record.materi_pembelajaran_inggris,
		});
		setIsModalOpen(true);
	};

	const handleSave = async () => {
		try {
			const values = await form.validateFields();
			await handleUpdateSingkatMataKuliah(
				selectedMataKuliah.id,
				values.deskripsi_singkat,
				values.deskripsi_singkat_inggris,
				values.nama_inggris,
				values.materi_pembelajaran_inggris
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
			title: "Nama Mata Kuliah(Inggris)",
			dataIndex: "nama_inggris",
			key: "nama_inggris",
			render: (text) =>
				text ? <i>{text}</i> : <Tag color="error">Belum diisi</Tag>,
		},
		{
			title: "Prodi",
			dataIndex: ["kurikulum", "prodi", "name"],
			key: "prodi",
		},
		{
			title: "Deskripsi Singkat MK",
			dataIndex: "deskripsi_singkat",
			key: "deskripsi_singkat",
			render: (text) => (text ? text : <Tag color="error">Belum diisi</Tag>),
		},
		{
			title: "Deskripsi Singkat MK (Inggris)",
			dataIndex: "deskripsi_singkat_inggris",
			key: "deskripsi_singkat_inggris",
			render: (text) =>
				text ? <i>{text}</i> : <Tag color="error">Belum diisi</Tag>,
		},
		{
			title: "Materi Pembelajaran",
			dataIndex: "materi_pembelajarans",
			key: "materi_pembelajarans",
			render: (items) =>
				items && items.length > 0 ? (
					items.map((item) => item.description).join("; ")
				) : (
					<Tag color="error">Tidak ada</Tag>
				),
		},
		{
			title: "Materi Pembelajaran (Inggris)",
			dataIndex: "materi_pembelajaran_inggris",
			key: "materi_pembelajaran_inggris",
			render: (text) =>
				text ? <i>{text}</i> : <Tag color="error">Belum diisi</Tag>,
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
		<DefaultLayout title="Daftar Mata Kuliah ">
			<div className="w-full mb-4">
				<Input
					placeholder="Cari Mata Kuliah"
					value={searchParams.nama}
					onChange={(e) =>
						setSearchParams({ ...searchParams, nama: e.target.value })
					}
					style={{ width: 200, marginRight: 8 }}
				/>
				<Input
					placeholder="Cari Kode"
					value={searchParams.kode}
					onChange={(e) =>
						setSearchParams({ ...searchParams, kode: e.target.value })
					}
					style={{ width: 200, marginRight: 8 }}
				/>
				<Select
					placeholder="Pilih Prodi"
					allowClear
					style={{ width: 200, marginRight: 8 }}
					value={searchParams.prodi_id}
					onChange={(value) =>
						setSearchParams({ ...searchParams, prodi_id: value })
					}>
					{prodiDropdown.map((prodi) => (
						<Select.Option key={prodi.id} value={prodi.id}>
							{prodi.name}
						</Select.Option>
					))}
				</Select>
				<Button type="primary" onClick={handleSearch}>
					<SearchOutlined />
				</Button>
			</div>
			<Table
				className="overflow-x-auto"
				dataSource={mataKuliahPengampuData}
				columns={columns}
				rowKey="id"
				loading={loading}
				pagination={{
					current: pagination.currentPage,
					total: pagination.total,
					onChange: handlePaginationChange,
					showSizeChanger: false,
				}}
			/>

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
					<Form.Item name="nama_inggris" label="Nama Mata Kuliah (Inggris)">
						<Input placeholder="Masukkan nama mata kuliah (Inggris)" />
					</Form.Item>

					<Form.Item name="deskripsi_singkat" label="Deskripsi Singkat">
						<Input.TextArea rows={4} placeholder="Masukkan deskripsi singkat" />
					</Form.Item>

					<Form.Item
						name="deskripsi_singkat_inggris"
						label="Deskripsi Singkat Mata Kuliah(Inggris)">
						<Input.TextArea
							rows={4}
							placeholder="Masukkan deskripsi singkat dalam bahasa inggris"
						/>
					</Form.Item>

					<Form.Item
						name="materi_pembelajaran_inggris"
						label="Materi Pembelajaran(Inggris)">
						<Input.TextArea
							rows={4}
							placeholder="Masukkan materi pembelajaran dalam inggris"
						/>
					</Form.Item>
				</Form>
			</Modal>
		</DefaultLayout>
	);
};

export default MataKuliahPengampu;
