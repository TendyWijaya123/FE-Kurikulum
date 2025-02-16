import { useParams } from "react-router-dom";
import DefaultLayout from "../../../layouts/DefaultLayout";
import useRps from "../../../hooks/DosenPages/RPS/useRps";
import {
	Button,
	Descriptions,
	Form,
	Input,
	InputNumber,
	Modal,
	Popconfirm,
	Select,
	Spin,
	Table,
	message,
} from "antd";
import Accordion from "../../../components/Accordion/Accordion";
import { useState } from "react";

const Rps = () => {
	const { mata_kuliah_id } = useParams();
	const {
		rpsData,
		mataKuliahData,
		loading,
		kemampuanAkhirDropdown,
		tujuanBelajarDropdown,
		cplDropdown,
		handleCreate,
		handleDelete,
		handleUpdate,
		editedData,
		handleOnEdit,
	} = useRps(mata_kuliah_id);
	const [form] = Form.useForm();
	const [isCreateModalVisible, setIsModalCreateVisible] = useState(false);
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);

	const handleCancel = () => {
		setIsEditModalVisible(false);
		setIsModalCreateVisible(false);
		form.resetFields();
	};

	const handleEdit = (record) => {
		handleOnEdit(record);
		setIsEditModalVisible(true);
		form.setFieldsValue(record);
	};

	const handleOk = async () => {
		try {
			const values = await form.validateFields();
			const formData = { ...values, mata_kuliah_id };
			await handleCreate(formData);

			setIsModalCreateVisible(false);
		} catch (error) {
			console.error("Error during creation:", error);
			message.error("Gagal menambahkan RPS. Silakan coba lagi.");
		}
	};

	const handleEditOk = async () => {
		try {
			const values = await form.validateFields();

			await handleUpdate(editedData.id, values);

			setIsEditModalVisible(false);
		} catch (error) {}
	};

	const mataKuliahColumn = [
		{
			title: "Nama Mata Kuliah",
			key: "nama",
			dataIndex: "nama",
		},
		{
			title: "Kode Mata  Kuliah",
			key: "kode",
			dataIndex: "kode",
		},
		{
			title: "Satuan Kredit Semester",
			key: "sks",
			dataIndex: "sks",
			render: (value) => Number(value),
		},
		{
			title: "Semester",
			key: "semester",
			dataIndex: "semester",
		},
		{
			title: "Tanggal Penyusunan",
			key: "tanggal",
		},
	];

	const cplColumn = [
		{
			title: "Kode",
			dataIndex: "kode",
			key: "kode",
		},
		{
			title: "Deskripsi",
			dataIndex: "deskripsi",
			key: "deskripsi",
		},
	];

	const tujuanBelajarColumn = [
		{
			title: "Kode",
			dataIndex: "kode",
			key: "kode",
		},
		{
			title: "Deskripsi",
			dataIndex: "deskripsi",
			key: "deskripsi",
		},
	];

	const rpsColumn = [
		{
			title: "Minggu",
			dataIndex: "minggu",
			key: "minggu",
		},
		{
			title: "Pokok Bahasan",
			dataIndex: "pokok_bahasan",
			key: "pokok_bahasan",
		},
		{
			title: "Bobot Penilaian",
			dataIndex: "bobot_penilaian",
			key: "bobot_penilaian",
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<>
					<Button onClick={() => handleEdit(record)} type="link">
						Edit
					</Button>
					<Popconfirm
						title="Are you sure to delete this RPS?"
						onConfirm={() => handleDelete(record.id)}>
						<Button type="link" danger>
							Delete
						</Button>
					</Popconfirm>
				</>
			),
		},
	];

	return (
		<DefaultLayout title="RPS">
			<Table
				columns={mataKuliahColumn}
				dataSource={
					mataKuliahData ? [{ ...mataKuliahData, key: mataKuliahData.id }] : []
				}
				loading={loading}
				pagination={false}
				scroll={{ x: "max-content" }}
			/>
			<br />
			<Accordion title="Capaian Pembelajaran Lulusan">
				<Table
					columns={cplColumn}
					dataSource={loading ? [] : mataKuliahData?.cpls || []} // Pastikan data ada sebelum dipakai
					loading={loading}
					pagination={false}
					scroll={{ x: "max-content" }}
					locale={{ emptyText: "" }}
				/>
			</Accordion>

			<Accordion title="Tujuan Belajar">
				<Table
					columns={tujuanBelajarColumn}
					dataSource={loading ? [] : mataKuliahData?.tujuan_belajars || []}
					loading={loading}
					pagination={false}
					scroll={{ x: "max-content" }}
					locale={{ emptyText: "" }}
				/>
			</Accordion>

			<Accordion title="Detail Mata Kuliah">
				<Spin spinning={loading}>
					<Descriptions bordered column={1}>
						<Descriptions.Item label="Deskripsi Singkat MK">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque,
							possimus animi aut recusandae doloribus amet quis sunt velit
							assumenda at error inventore eum dicta? Officia aliquam soluta
							minima rem quas.
						</Descriptions.Item>

						<Descriptions.Item label="Bahan Kajian/Materi Pembelajaran">
							{mataKuliahData?.materi_pembelajarans &&
								mataKuliahData.materi_pembelajarans.length > 0 && (
									<ul className="list-disc pl-5 space-y-2">
										{mataKuliahData.materi_pembelajarans.map(
											(materi, index) => (
												<li key={index} className="">
													{materi.description}{" "}
												</li>
											)
										)}
									</ul>
								)}
						</Descriptions.Item>

						<Descriptions.Item label="Daftar Referensi">
							{mataKuliahData?.buku_referensis &&
							mataKuliahData.buku_referensis.length > 0 ? (
								<ul className="list-disc pl-5 space-y-2">
									{mataKuliahData.buku_referensis.map((buku, index) => (
										<li key={index}>
											{buku.judul} {/* Ganti dengan properti yang sesuai */}
										</li>
									))}
								</ul>
							) : (
								<span>Tidak ada referensi</span>
							)}
						</Descriptions.Item>

						<Descriptions.Item label="Nama Dosen">
							{mataKuliahData?.dosens && mataKuliahData.dosens.length > 0 ? (
								<ul className="list-disc pl-5 space-y-2">
									{mataKuliahData.dosens.map((dosen, index) => (
										<li key={index} className="">
											{dosen.nama}
										</li>
									))}
								</ul>
							) : (
								<span>Tidak ada dosen</span>
							)}
						</Descriptions.Item>
					</Descriptions>
				</Spin>
			</Accordion>

			<Accordion title="RPS">
				<Button
					className="mb-2"
					type="primary"
					onClick={() => setIsModalCreateVisible(true)}>
					Tambah RPS
				</Button>
				<Table
					columns={rpsColumn}
					dataSource={rpsData || []}
					loading={loading}
					pagination={false}
					scroll={{ x: "max-content" }}
				/>
			</Accordion>

			<Modal
				title="Form Validasi"
				open={isCreateModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				okText="Submit"
				cancelText="Cancel">
				<Form
					form={form}
					layout="vertical"
					initialValues={{
						mata_kuliah_id: "",
						kemampuan_akhir_id: "",
						minggu: "",
						pokok_bahasan: "",
						modalitas_bentuk_strategi_metodepembelajaran: "",
						instrumen_penilaian: "",
						hasil_belajar: "",
						tujuan_belajar_id: "",
						cpl_id: "",
						bobot_penilaian: "",
					}}>
					<Form.Item
						label="Kemampuan Akhir"
						name="kemampuan_akhir_id"
						rules={[
							{ required: true, message: "Kemampuan akhir wajib dipilih!" },
						]}>
						<Select
							placeholder="Pilih Kemampuan Akhir"
							optionFilterProp="children"
							allowClear>
							{kemampuanAkhirDropdown.map((item) => (
								<Select.Option key={item.id} value={item.id}>
									{item.deskripsi} {/* Atur sesuai yang ingin ditampilkan */}
								</Select.Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item
						label="Minggu"
						name="minggu"
						rules={[{ required: true, message: "Minggu wajib diisi!" }]}>
						<InputNumber />
					</Form.Item>

					<Form.Item
						label="Pokok Bahasan"
						name="pokok_bahasan"
						rules={[{ required: true, message: "Pokok bahasan wajib diisi!" }]}>
						<Input.TextArea />
					</Form.Item>

					<Form.Item
						label="Modalitas, Bentuk Strategi, dan Metode Pembelajaran"
						name="modalitas_bentuk_strategi_metodepembelajaran">
						<Input.TextArea />
					</Form.Item>

					<Form.Item label="Instrumen Penilaian" name="instrumen_penilaian">
						<Input.TextArea />
					</Form.Item>

					<Form.Item label="Hasil Belajar" name="hasil_belajar">
						<Input.TextArea />
					</Form.Item>

					<Form.Item label="Tujuan Belajar" name="tujuan_belajar_id" rules={[]}>
						<Select
							placeholder="Pilih Tujuan Belajar"
							optionFilterProp="children"
							allowClear>
							{tujuanBelajarDropdown.map((item) => (
								<Select.Option key={item.id} value={item.id}>
									{item.kode}
								</Select.Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item label="CPL ID" name="cpl_id" rules={[]}>
						<Select
							placeholder="Pilih Capaian Pembelajaran Lulusan"
							optionFilterProp="children"
							allowClear>
							{cplDropdown.map((item) => (
								<Select.Option key={item.id} value={item.id}>
									{item.kode} {/* Atur sesuai yang ingin ditampilkan */}
								</Select.Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item label="Bobot Penilaian" name="bobot_penilaian" rules={[]}>
						<InputNumber />
					</Form.Item>
				</Form>
			</Modal>

			<Modal
				title="Edit RPS"
				open={isEditModalVisible}
				onOk={handleEditOk}
				onCancel={handleCancel}
				okText="Update"
				cancelText="Cancel">
				<Form form={form} layout="vertical" initialValues={editedData}>
					<Form.Item
						label="Kemampuan Akhir"
						name="kemampuan_akhir_id"
						rules={[
							{ required: true, message: "Kemampuan akhir wajib dipilih!" },
						]}>
						<Select
							placeholder="Pilih Kemampuan Akhir"
							optionFilterProp="children"
							allowClear>
							{kemampuanAkhirDropdown.map((item) => (
								<Select.Option key={item.id} value={item.id}>
									{item.deskripsi} {/* Atur sesuai yang ingin ditampilkan */}
								</Select.Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item
						label="Minggu"
						name="minggu"
						rules={[{ required: true, message: "Minggu wajib diisi!" }]}>
						<InputNumber />
					</Form.Item>

					<Form.Item
						label="Pokok Bahasan"
						name="pokok_bahasan"
						rules={[{ required: true, message: "Pokok bahasan wajib diisi!" }]}>
						<Input.TextArea />
					</Form.Item>

					<Form.Item
						label="Modalitas, Bentuk Strategi, dan Metode Pembelajaran"
						name="modalitas_bentuk_strategi_metodepembelajaran">
						<Input.TextArea />
					</Form.Item>

					<Form.Item label="Instrumen Penilaian" name="instrumen_penilaian">
						<Input.TextArea />
					</Form.Item>

					<Form.Item label="Hasil Belajar" name="hasil_belajar">
						<Input.TextArea />
					</Form.Item>

					<Form.Item label="Tujuan Belajar" name="tujuan_belajar_id" rules={[]}>
						<Select
							placeholder="Pilih Tujuan Belajar"
							optionFilterProp="children"
							allowClear>
							{tujuanBelajarDropdown.map((item) => (
								<Select.Option key={item.id} value={item.id}>
									{item.kode}
								</Select.Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item label="CPL ID" name="cpl_id" rules={[]}>
						<Select
							placeholder="Pilih Capaian Pembelajaran Lulusan"
							optionFilterProp="children"
							allowClear>
							{cplDropdown.map((item) => (
								<Select.Option key={item.id} value={item.id}>
									{item.kode} {/* Atur sesuai yang ingin ditampilkan */}
								</Select.Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item label="Bobot Penilaian" name="bobot_penilaian" rules={[]}>
						<InputNumber />
					</Form.Item>
				</Form>
			</Modal>
		</DefaultLayout>
	);
};

export default Rps;
