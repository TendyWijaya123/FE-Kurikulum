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
	Tag,
	message,
} from "antd";
import Accordion from "../../../components/Accordion/Accordion";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

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
		handleDownloadPdf,
	} = useRps(mata_kuliah_id);
	const [form] = Form.useForm();
	const [isCreateModalVisible, setIsModalCreateVisible] = useState(false);
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);

	const kategori = Form.useWatch("kategori", form);

	useEffect(() => {
		if (kategori !== undefined) {
			form.setFieldsValue({
				kemampuan_akhir_id: null,
				pokok_bahasan: null,
				modalitas_bentuk_strategi_metodepembelajaran: null,
				instrumen_penilaian: null,
				hasil_belajar: null,
				tujuan_belajar_id: null,
				cpl_id: null,
				bobot_penilaian: null,
				instrumen_penilaians: [],
			});
		}
	}, [kategori]);

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
			render: (_, record) => (
				<>
					{record.nama}{" "}
					{record.nama_inggris ? (
						<i>({record.nama_inggris})</i>
					) : (
						<Tag color="error">Nama Inggris belum diisi</Tag>
					)}
				</>
			),
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
			title: "Keterangan",
			dataIndex: "keterangan",
			key: "keterangan",
		},

		{
			title: "Level Of Learning",
			dataIndex: ["pivot", "kategori"],
			key: "keterangan",
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
			width: 80,
		},
		{
			title: "Kemampuan Akhir yang Direncanakan(KAD)",
			dataIndex: ["kemampuan_akhir", "deskripsi"],
			key: "kemampuan_akhir",
			width: 350,
			onCell: (record) => {
				if (record.kategori === "ETS" || record.kategori === "EAS") {
					return { colSpan: 0 };
				}
				return {};
			},
			render: (_, record) => {
				if (record.kategori === "ETS" || record.kategori === "EAS") {
					return null;
				}
				return (
					record.kemampuan_akhir?.deskripsi || (
						<Tag color="error">Belum Diisi</Tag>
					)
				);
			},
		},
		{
			title: "Pokok Bahasan",
			dataIndex: "pokok_bahasan",
			key: "pokok_bahasan",
			width: 300,
			onCell: (record) => {
				if (record.kategori === "ETS" || record.kategori === "EAS") {
					return {
						colspan: 9,
						style: { backgroundColor: "yellow", textAlign: "center" },
					};
				}
				return {};
			},
			render: (text, record) => {
				if (record.kategori === "ETS" || record.kategori === "EAS") {
					return <strong>{record.kategori}</strong>;
				}
				return text;
			},
		},
		{
			title:
				"Modalitas, Bentuk, Strategi, dan Metode Pembelajaran (Media dan Sumber Belajar)",
			dataIndex: "modalitas_bentuk_strategi_metodepembelajaran",
			key: "modalitas_bentuk_strategi_metodepembelajaran",
			width: 350,
			onCell: (record) => {
				if (record.kategori === "ETS" || record.kategori === "EAS") {
					return { colSpan: 0 };
				}
				return {};
			},
			render: (_, record) => {
				if (record.kategori === "ETS" || record.kategori === "EAS") {
					return null;
				}
				return (
					record.modalitas_bentuk_strategi_metodepembelajaran || (
						<Tag color="error">Belum Diisi</Tag>
					)
				);
			},
		},
		{
			title: "Beban Belajar Mahasiswa",
			dataIndex: "",
			key: "beban_belajar",
			width: 250,
			onCell: (record) => {
				if (record.kategori === "ETS" || record.kategori === "EAS") {
					return { colSpan: 0 };
				}
				return {};
			},
			render: () => {
				return (
					<>
						<h1 className="font-bold">Teori</h1>
						<ul>
							<li>BT: {mataKuliahData.teori_bt}</li>
							<li>PT: {mataKuliahData.teori_pt}</li>
							<li>M: {mataKuliahData.teori_m}</li>
						</ul>
						<h1 className="font-bold">Praktek</h1>
						<ul>
							<li>BT: {mataKuliahData.praktek_bt}</li>
							<li>PT: {mataKuliahData.praktek_pt}</li>
							<li>M: {mataKuliahData.praktek_m}</li>
						</ul>
					</>
				);
			},
		},
		{
			title: "Instrumen Penilaian",
			dataIndex: "instrumen_penilaians",
			key: "instrumen_penilaian",
			width: 250,
			onCell: (record) => {
				if (record.kategori === "ETS" || record.kategori === "EAS") {
					return { colSpan: 0 };
				}
				return {};
			},
			render: (_, record) => {
				const instrumenList = record.instrumen_penilaians;

				if (!instrumenList || instrumenList.length === 0) {
					return <Tag color="error">Belum Diisi</Tag>;
				}

				return (
					<div>
						{instrumenList.map((item, index) => (
							<div key={index} style={{ marginBottom: 8 }}>
								<div style={{ fontWeight: "bold" }}>{item.jenis_evaluasi}</div>
								<div>{item.deskripsi}</div>
							</div>
						))}
					</div>
				);
			},
		},
		{
			title: "Hasil Belajar",
			dataIndex: "hasil_belajar",
			key: "hasil_belajar",
			width: 300,
			onCell: (record) => {
				if (record.kategori === "ETS" || record.kategori === "EAS") {
					return { colSpan: 0 };
				}
				return {};
			},
			render: (_, record) => {
				return record.hasil_belajar || <Tag color="error">Belum Diisi</Tag>;
			},
		},
		{
			title: "Capaian Pembelajaran Lulusan",
			key: "cpl",
			dataIndex: "cpl",
			width: 100,
			onCell: (record) => {
				if (record.kategori === "ETS" || record.kategori === "EAS") {
					return { colSpan: 0 };
				}
				return {};
			},
			render: (_, record) => {
				return record.cpl?.kode || <Tag color="error">Belum Diisi</Tag>;
			},
		},
		{
			title: "Tujuan Belajar",
			key: "tujuan_belajar",
			dataIndex: "tujuan_belajar",
			width: 50,
			onCell: (record) => {
				if (record.kategori === "ETS" || record.kategori === "EAS") {
					return { colSpan: 0 };
				}
				return {};
			},
			render: (_, record) => {
				return (
					record.tujuan_belajar?.kode || <Tag color="error">Belum Diisi</Tag>
				);
			},
		},
		{
			title: "Bobot Penilaian",
			dataIndex: "bobot_penilaian",
			key: "bobot_penilaian",
			width: 50,
			onCell: (record) => {
				if (record.kategori === "ETS" || record.kategori === "EAS") {
					return { colSpan: 0 };
				}
				return {};
			},
			render: (_, record) => {
				return record.bobot_penilaian || <Tag color="error">Belum Diisi</Tag>;
			},
		},
		{
			title: "Action",
			key: "action",
			width: 150,
			render: (_, record) => (
				<>
					<Button onClick={() => handleEdit(record)} type="primary">
						<EditOutlined />
					</Button>
					<Popconfirm
						title="Are you sure to delete this RPS?"
						onConfirm={() => handleDelete(record.id)}>
						<Button type="primary" danger>
							<DeleteOutlined />
						</Button>
					</Popconfirm>
				</>
			),
		},
	];

	return (
		<DefaultLayout title="RPS">
			<Button type="primary" onClick={() => handleDownloadPdf(mata_kuliah_id)}>
				Generate RPS PDF
			</Button>
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
							{mataKuliahData.deskripsi_singkat ||
								"Belum Mengisikan Deskripsi Singkat"}
							{mataKuliahData.deskripsi_singkat_inggris && (
								<>
									<br />
									<br />
									<i>{mataKuliahData.deskripsi_singkat_inggris}</i>
								</>
							)}
						</Descriptions.Item>

						<Descriptions.Item label="Bahan Kajian/Materi Pembelajaran">
							{mataKuliahData?.materi_pembelajarans &&
								mataKuliahData.materi_pembelajarans.length > 0 &&
								mataKuliahData.materi_pembelajarans
									.map((materi) => materi.description)
									.join("; ")}
							{mataKuliahData?.materi_pembelajaran_inggris && (
								<>
									<br />
									<br />
									<i>{mataKuliahData.materi_pembelajaran_inggris}</i>
								</>
							)}
						</Descriptions.Item>

						<Descriptions.Item label="Daftar Referensi">
							{mataKuliahData?.buku_referensis &&
							mataKuliahData.buku_referensis.length > 0 ? (
								<ul className="list-disc pl-5 space-y-2">
									{mataKuliahData.buku_referensis.map((buku, index) => {
										const parts = [
											buku.penulis,
											buku.judul,
											buku.penerbit?.trim() ? buku.penerbit : null,
											buku.tahun_terbit,
										].filter(Boolean);
										return <li key={index}>{parts.join(", ")}</li>;
									})}
								</ul>
							) : (
								<Tag color="error">Tidak ada referensi</Tag>
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
				cancelText="Cancel"
				width={800}>
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
						label="Kategori"
						name="kategori"
						rules={[{ required: true, message: "Kategori wajib diisi!" }]}>
						<Select placeholder="Pilih Kategori" allowClear>
							<Select.Option value="ETS">ETS</Select.Option>
							<Select.Option value="EAS">EAS</Select.Option>
							<Select.Option value="Reguler">Reguler</Select.Option>
						</Select>
					</Form.Item>

					<Form.Item shouldUpdate>
						{() => {
							const kategori = form.getFieldValue("kategori");

							if (!kategori) return null;

							return (
								<>
									{kategori === "Reguler" && (
										<>
											<Form.Item
												label="Kemampuan Akhir"
												name="kemampuan_akhir_id">
												<Select placeholder="Pilih Kemampuan Akhir" allowClear>
													{kemampuanAkhirDropdown.map((item) => (
														<Select.Option key={item.id} value={item.id}>
															{item.deskripsi}
														</Select.Option>
													))}
												</Select>
											</Form.Item>

											<Form.Item
												label="Tujuan Belajar"
												name="tujuan_belajar_id">
												<Select placeholder="Pilih Tujuan Belajar" allowClear>
													{tujuanBelajarDropdown.map((item) => (
														<Select.Option key={item.id} value={item.id}>
															{item.kode}
														</Select.Option>
													))}
												</Select>
											</Form.Item>

											<Form.Item label="CPL" name="cpl_id">
												<Select placeholder="Pilih CPL" allowClear>
													{cplDropdown.map((item) => (
														<Select.Option key={item.id} value={item.id}>
															{item.kode}
														</Select.Option>
													))}
												</Select>
											</Form.Item>

											<Form.Item
												label="Pokok Bahasan"
												name="pokok_bahasan"
												rules={[
													{
														required: true,
														message: "Pokok bahasan wajib diisi!",
													},
												]}>
												<Input.TextArea rows={3} />
											</Form.Item>

											<Form.Item
												label="Modalitas, Bentuk Strategi, dan Metode Pembelajaran"
												name="modalitas_bentuk_strategi_metodepembelajaran">
												<Input.TextArea rows={3} />
											</Form.Item>

											<Form.Item label="Hasil Belajar" name="hasil_belajar">
												<Input.TextArea rows={3} />
											</Form.Item>
										</>
									)}

									<Form.Item
										label="Minggu"
										name="minggu"
										rules={[
											{ required: true, message: "Minggu wajib diisi!" },
										]}>
										<InputNumber className="w-full" />
									</Form.Item>

									<Form.Item label="Bobot Penilaian" name="bobot_penilaian">
										<InputNumber className="w-full" />
									</Form.Item>

									{kategori === "Reguler" && (
										<div className="mt-6 border-t border-gray-200 pt-4">
											<p className="font-semibold mb-2">Instrumen Penilaian</p>
											<Form.List name="instrumen_penilaians">
												{(fields, { add, remove }) => (
													<>
														{fields.map(({ key, name, ...restField }) => (
															<div
																key={key}
																className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4 items-center">
																<Form.Item
																	{...restField}
																	name={[name, "jenis_evaluasi"]}
																	rules={[
																		{
																			required: true,
																			message: "Jenis evaluasi wajib diisi",
																		},
																	]}>
																	<Select placeholder="Jenis Evaluasi">
																		<Select.Option value="Quiz">
																			Quiz
																		</Select.Option>
																		<Select.Option value="Project">
																			Project
																		</Select.Option>
																		<Select.Option value="Case Study">
																			Case Study
																		</Select.Option>
																		<Select.Option value="Tugas">
																			Tugas
																		</Select.Option>
																	</Select>
																</Form.Item>

																<Form.Item
																	{...restField}
																	name={[name, "deskripsi"]}
																	rules={[
																		{
																			required: true,
																			message: "Deskripsi wajib diisi",
																		},
																	]}>
																	<Input placeholder="Deskripsi" />
																</Form.Item>

																<Form.Item
																	{...restField}
																	name={[name, "bobot_penilaian"]}
																	rules={[
																		{
																			required: true,
																			message: "Bobot wajib diisi",
																		},
																	]}>
																	<InputNumber
																		className="w-full"
																		placeholder="Bobot"
																		min={0}
																	/>
																</Form.Item>

																<div className="flex justify-end">
																	<Button
																		type="link"
																		onClick={() => remove(name)}
																		danger>
																		Hapus
																	</Button>
																</div>
															</div>
														))}

														<Form.Item>
															<Button type="dashed" onClick={() => add()} block>
																+ Tambah Instrumen Penilaian
															</Button>
														</Form.Item>
													</>
												)}
											</Form.List>
										</div>
									)}
								</>
							);
						}}
					</Form.Item>
				</Form>
			</Modal>

			<Modal
				title={
					<span className="text-xl font-semibold text-gray-800">Edit RPS</span>
				}
				open={isEditModalVisible}
				onOk={handleEditOk}
				onCancel={handleCancel}
				okText="Update"
				cancelText="Cancel"
				className="rounded-xl"
				width={800}>
				<div className="p-2">
					<Form form={form} layout="vertical" initialValues={editedData}>
						<Form.Item
							label="Kategori"
							name="kategori"
							rules={[{ required: true, message: "Kategori wajib diisi!" }]}>
							<Select placeholder="Pilih Kategori" allowClear>
								<Select.Option value="ETS">ETS</Select.Option>
								<Select.Option value="EAS">EAS</Select.Option>
								<Select.Option value="Reguler">Reguler</Select.Option>
							</Select>
						</Form.Item>

						<Form.Item shouldUpdate>
							{() => {
								const kategori = form.getFieldValue("kategori");

								if (!kategori) return null;

								return (
									<>
										{kategori === "Reguler" && (
											<>
												<Form.Item
													label="Kemampuan Akhir"
													name="kemampuan_akhir_id">
													<Select
														placeholder="Pilih Kemampuan Akhir"
														allowClear>
														{kemampuanAkhirDropdown.map((item) => (
															<Select.Option key={item.id} value={item.id}>
																{item.deskripsi}
															</Select.Option>
														))}
													</Select>
												</Form.Item>

												<Form.Item
													label="Tujuan Belajar"
													name="tujuan_belajar_id">
													<Select placeholder="Pilih Tujuan Belajar" allowClear>
														{tujuanBelajarDropdown.map((item) => (
															<Select.Option key={item.id} value={item.id}>
																{item.kode}
															</Select.Option>
														))}
													</Select>
												</Form.Item>

												<Form.Item label="CPL" name="cpl_id">
													<Select placeholder="Pilih CPL" allowClear>
														{cplDropdown.map((item) => (
															<Select.Option key={item.id} value={item.id}>
																{item.kode}
															</Select.Option>
														))}
													</Select>
												</Form.Item>
												<Form.Item
													label="Pokok Bahasan"
													name="pokok_bahasan"
													rules={[
														{
															required: true,
															message: "Pokok bahasan wajib diisi!",
														},
													]}>
													<Input.TextArea rows={3} />
												</Form.Item>

												<Form.Item
													label="Modalitas, Bentuk Strategi, dan Metode Pembelajaran"
													name="modalitas_bentuk_strategi_metodepembelajaran">
													<Input.TextArea rows={3} />
												</Form.Item>

												<Form.Item label="Hasil Belajar" name="hasil_belajar">
													<Input.TextArea rows={3} />
												</Form.Item>
											</>
										)}

										<Form.Item
											label="Minggu"
											name="minggu"
											rules={[
												{ required: true, message: "Minggu wajib diisi!" },
											]}>
											<InputNumber className="w-full" />
										</Form.Item>

										<Form.Item label="Bobot Penilaian" name="bobot_penilaian">
											<InputNumber className="w-full" />
										</Form.Item>

										{kategori === "Reguler" && (
											<div className="mt-6 border-t border-gray-200 pt-4">
												<p className="font-semibold mb-2">
													Instrumen Penilaian
												</p>
												<Form.List name="instrumen_penilaians">
													{(fields, { add, remove }) => (
														<>
															{fields.map(({ key, name, ...restField }) => (
																<div
																	key={key}
																	className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4 items-center">
																	<Form.Item
																		{...restField}
																		name={[name, "jenis_evaluasi"]}
																		rules={[
																			{
																				required: true,
																				message: "Jenis evaluasi wajib diisi",
																			},
																		]}>
																		<Select placeholder="Jenis Evaluasi">
																			<Select.Option value="Quiz">
																				Quiz
																			</Select.Option>
																			<Select.Option value="Project">
																				Project
																			</Select.Option>
																			<Select.Option value="Case Study">
																				Case Study
																			</Select.Option>
																			<Select.Option value="Tugas">
																				Tugas
																			</Select.Option>
																		</Select>
																	</Form.Item>

																	<Form.Item
																		{...restField}
																		name={[name, "deskripsi"]}
																		rules={[
																			{
																				required: true,
																				message: "Deskripsi wajib diisi",
																			},
																		]}>
																		<Input placeholder="Deskripsi" />
																	</Form.Item>

																	<Form.Item
																		{...restField}
																		name={[name, "bobot_penilaian"]}
																		rules={[
																			{
																				required: true,
																				message: "Bobot wajib diisi",
																			},
																		]}>
																		<InputNumber
																			className="w-full"
																			placeholder="Bobot"
																			min={0}
																		/>
																	</Form.Item>

																	<div className="flex justify-end">
																		<Button
																			type="link"
																			onClick={() => remove(name)}
																			danger>
																			Hapus
																		</Button>
																	</div>
																</div>
															))}

															<Form.Item>
																<Button
																	type="dashed"
																	onClick={() => add()}
																	block>
																	+ Tambah Instrumen Penilaian
																</Button>
															</Form.Item>
														</>
													)}
												</Form.List>
											</div>
										)}
									</>
								);
							}}
						</Form.Item>
					</Form>
				</div>
			</Modal>
		</DefaultLayout>
	);
};

export default Rps;
