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
	Tooltip,
	Typography,
	Space
} from "antd";
const { Text } = Typography;
import Accordion from "../../../components/Accordion/Accordion";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined, ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import FormValidasiModal from "./FormValidasiModal";
import EditRpsModal from "./EditRpsModal";
import InlineEditableTextArea from "../../../components/Form/InlineEditableTextArea";

const Rps = () => {
	const { mata_kuliah_id } = useParams();
	const {
		rpsData,
		mataKuliahData,
		loading,
		kemampuanAkhirDropdown,
		tujuanBelajarRPS,
		tujuanBelajarDropdown,
		cplDropdown,
		detailMataKuliahRps,
		editedData,
		pembobotanData,
		totalPersentase,
		handleCreate,
		handleDelete,
		handleUpdate,
		handleOnEdit,
		handleDownloadPdf,
		handleAddRowTujuanBelajar,
		handleSaveTujuanBelajar,
		handleDeskripsiChange,
		handleRemoveTujuanBelajar,
		handleDetailMkChange,
		handleSaveDetailMKRps,
		handleEditRpsChange,
		handleAddRowRps,
		handlePembobotanChange
	} = useRps(mata_kuliah_id);

	const [zoom, setZoom] = useState(1);
	const [form] = Form.useForm();
	const [isCreateModalVisible, setIsModalCreateVisible] = useState(false);
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);

	const kategori = Form.useWatch("kategori", form);

	useEffect(() => {
		if (kategori !== undefined) {
			form.setFieldsValue({
				kemampuan_akhir_id: '',
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

	const handleOk = async (kategori) => {
		try {
			if (kategori !== "Reguler") {
				const values = await form.validateFields();
				const formData = { ...values, mata_kuliah_id };
				await handleCreate(formData);
			}
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

	const bentukOptions = [
		"Kuliah", "tutorial", "seminar/konferensi", "praktikum/studio/bengkel",
		"praktik lapangan", "praktik kerja", "magang", "kkn", "kewirausahaan",
		"penelitian", "perancangan/pengembangan", "pameran/lokakarya"
	];

	const strategiOptions = [
		"Ekspositori", "Inkuiri", "berbasis masalah", "peningkatan kemampuan berpikir",
		"kooperatif", "kontekstual", "afektif"
	];

	const metodeOptions = [
		"Diskusi Kelompok", "Simulasi/Role Play", "Studi Kasus", "Pembelajaran Kolaboratif",
		"Pembelajaran Kooperatif", "Pembelajaran Berbasis project", 
		"Pembelajaran berbasis masalah", "pembelajaran berbasis produk"
	];

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
			width: 100
		},
		{
			title: "Deskripsi",
			dataIndex: "deskripsi",
			key: "deskripsi",
			render: (_, record, index) => (
				<InlineEditableTextArea
					key={index}
					value={record.deskripsi}
					onSave={(newValue) => handleDeskripsiChange(index, newValue)}
				/>
			),
		},
		{
			title: "Aksi",
			key: "action",
			width: 100,
			render: (_, __, index) => (
				<Button danger type="text" onClick={() => handleRemoveTujuanBelajar(index)}>
					Hapus
				</Button>
			),
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
			dataIndex: "kemampuan_akhir",
			key: "kemampuan_akhir",
			width: 350,
			onCell: (record) => {
				if (record.kategori === "ETS" || record.kategori === "EAS") {
					return { colSpan: 0 };
				}
				return {};
			},
			render: (_, record, index) => {
				if (record.kategori === "ETS" || record.kategori === "EAS") {
					return null;
				}
				return (
					<InlineEditableTextArea
						key={index}
						value={record.kemampuan_akhir || "belum diisi"}
						onSave={(newValue) => handleEditRpsChange(index, newValue, 'kemampuan_akhir')}
					/>
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
						colSpan: 9,
						style: { backgroundColor: "yellow", textAlign: "center" },
					};
				}
				return {};
			},
			render: ( _, record, index, text,) => {
				if (record.kategori === "ETS" || record.kategori === "EAS") {
					return <strong>{record.kategori}</strong>;
				}
				return (
					<InlineEditableTextArea
						key={index}
						value={record.pokok_bahasan || "belum diisi"}
						onSave={(newValue) => handleEditRpsChange(index, newValue, 'pokok_bahasan')}
					/>
				);
			},
		},
		{
			title: "Modalitas, Bentuk, Strategi, dan Metode Pembelajaran (Media dan Sumber Belajar)",
			dataIndex: "modalitas_bentuk_strategi_metodepembelajaran",
			key: "modalitas_bentuk_strategi_metodepembelajaran",
			width: 400,
			onCell: (record) => {
				if (record.kategori === "ETS" || record.kategori === "EAS") {
					return { colSpan: 0 };
				}
				return {};
			},
			render: (_, record, index) => {
				if (record.kategori === "ETS" || record.kategori === "EAS") {
					return null;
				}
				return (
					<Space direction="vertical" size={4} style={{ width: "100%" }}>
						<Text strong>Modalitas:</Text>
						<Select
							value={record.modalitas_pembelajaran}
							onChange={(value) =>
								handleEditRpsChange(index, value, "modalitas_pembelajaran")
							}
							style={{ width: "100%" }}
							placeholder="Pilih Modalitas"
						>
							<Option value="luring">Luring</Option>
							<Option value="daring">Daring</Option>
							<Option value="hybrid">Hybrid</Option>
						</Select>

						<Text strong>Bentuk Pembelajaran:</Text>
						<Select
							mode="multiple"
							value={record.bentuk_pembelajaran?.split(", ") || []}
							onChange={(values) =>
								handleEditRpsChange(
									index,
									values.join(", "),
									"bentuk_pembelajaran"
								)
							}
							style={{ width: "100%" }}
							placeholder="Pilih Bentuk Pembelajaran"
						>
							{bentukOptions.map((item) => (
								<Option key={item} value={item}>
									{item}
								</Option>
							))}
						</Select>

						<Text strong>Strategi:</Text>
						<Select
							mode="multiple"
							value={record.strategi_pembelajaran?.split(", ") || []}
							onChange={(values) =>
								handleEditRpsChange(index, values.join(", "), "strategi_pembelajaran")
							}
							style={{ width: "100%" }}
							placeholder="Pilih Strategi"
						>
							{strategiOptions.map((item) => (
								<Option key={item} value={item}>
									{item}
								</Option>
							))}
						</Select>

						<Text strong>Metode:</Text>
						<Select
							mode="multiple"
							value={record.metode_pembelajaran?.split(", ") || []}
							onChange={(values) =>
								handleEditRpsChange(index, values.join(", "), "metode_pembelajaran")
							}
							style={{ width: "100%" }}
							placeholder="Pilih Metode"
						>
							{metodeOptions.map((item) => (
								<Option key={item} value={item}>
									{item}
								</Option>
							))}
						</Select>

						<Text strong>Media:</Text>
						<InlineEditableTextArea
							value={record.media_pembelajaran || "belum diisi"}
							onSave={(newValue) => handleEditRpsChange(index, newValue, 'media_pembelajaran')}
						/>

						<Text strong>Sumber Belajar:</Text>
						<InlineEditableTextArea
							value={record.sumber_belajar || "belum diisi"}
							onSave={(newValue) => handleEditRpsChange(index, newValue, 'sumber_belajar')}
						/>
					</Space>
				);
			},
		},
		{
			title: "Beban Belajar Mahasiswa",
			dataIndex: "beban_belajar",
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
			dataIndex: "instrumen_penilaian",
			key: "instrumen_penilaian",
			width: 250,
			onCell: (record) => {
				if (record.kategori === "ETS" || record.kategori === "EAS") {
					return { colSpan: 0 };
				}
				return {};
			},
			render: (_, record, index) => {
				const instrumenList = record.instrumen_penilaian;
				return (
					<Select
						value={instrumenList}
						onChange={(value) =>
							handleEditRpsChange(index, value, "instrumen_penilaian")
						}
						style={{ width: "100%" }}
						placeholder="Pilih Instrumen"
					>
						<Option value="Project">Project</Option>
						<Option value="Quiz">Quiz</Option>
						<Option value="Case Study">Case Study</Option>
						<Option value="Tugas">Tugas</Option>
						<Option value="ETS">ETS</Option>
						<Option value="EAS">EAS</Option>
					</Select>
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
			render: (_, record, index) => {
				return (
					<InlineEditableTextArea
						value={record.hasil_belajar || "belum diisi"}
						onSave={(newValue) => handleEditRpsChange(index, newValue, 'hasil_belajar')}
					/>
				)
			},
		},
		{
			title: "Capaian Pembelajaran Lulusan",
			key: "cpl_id",
			dataIndex: "cpl_id",
			width: 100,
			onCell: (record) => {
				if (record.kategori === "ETS" || record.kategori === "EAS") {
					return { colSpan: 0 };
				}
				return {};
			},
			render: (_, record, index) => {
				return (
					<>
						<Select
							value={record.cpl_id}
							onChange={(value) =>
								handleEditRpsChange(index, value, "cpl_id")
							}
							style={{ width: "100%" }}
							placeholder="Pilih cpl"
						>
							{cplDropdown.map((item) => (
								<Select.Option key={item.id} value={item.id}>
									{item.kode}
								</Select.Option>
							))}
						</Select>
					</>
				)
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
			render: (_, record, index) => {
				return (
					<>
						<Select
							value={record.tujuan_belajar_id}
							onChange={(value) =>
								handleEditRpsChange(index, value, "tujuan_belajar_id")
							}
							style={{ width: "100%" }}
							placeholder="Pilih Tujuan Belajar"
						>
							{tujuanBelajarDropdown.map((item) => (
								<Select.Option key={item.id} value={item.id}>
									{item.kode}
								</Select.Option>
							))}
						</Select>
					</>
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
			render: (_, record, index) => {
				return (
					<InputNumber
						min={0}
						max={100}
						value={record.bobot_penilaian}
						onChange={(value) =>
							handleEditRpsChange(index, value, "bobot_penilaian")
						}
						style={{ width: "100%" }}
						placeholder="Masukkan bobot"
						formatter={(value) => `${value}%`}
						parser={(value) => value.replace('%', '')}
					/>
				);
			},
		},
		{
			title: "Action",
			key: "action",
			width: 150,
			render: (_, record) => (
				<>
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

	const ringkasanPembobotanPenilaian = [
		{
			title: "Jenis Evaluasi",
			dataIndex: "jenis",
			key: "jenis",
			width: 160,
			onCell: (record, index) => {
				const rowSpanConfig = {
					0: { rowSpan: 1 },  
					1: { rowSpan: 1 },  
					2: { rowSpan: 4 },  
					3: { rowSpan: 0 },  
					4: { rowSpan: 0 },  
					5: { rowSpan: 0 },  
					6: { rowSpan: 1 }, 
				};
				return {
					rowSpan: rowSpanConfig[index]?.rowSpan || 0,
				};
				},
			},
		{
			title: "Instrumen",
			dataIndex: "instrumen",
			key: "instrumen",
			width: 220,
		},
		{
			title: "Persentase",
			dataIndex: "persentase",
			key: "persentase",
			width: 180,
			render: (_, record, index) => {
				return (
					<InputNumber
						min={0}
						max={100}
						value={record.persentase}
						onChange={(value) =>
							handlePembobotanChange(index, value, "persentase")
						}
						style={{ width: "100%" }}
						placeholder="Masukkan presentase"
						formatter={(value) => `${value}%`}
						parser={(value) => value.replace('%', '')}
					/>
				);
			},
		},
	]

	return (
		<DefaultLayout title="RPS">
			<Button type="primary" onClick={() => handleDownloadPdf(mata_kuliah_id)} style={{ marginBottom: 16 }}>
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
					dataSource={loading ? [] : mataKuliahData?.cpls || []}
					loading={loading}
					pagination={false}
					scroll={{ x: "max-content" }}
					locale={{ emptyText: "" }}
				/>
			</Accordion>

			<Accordion title={"Tujuan Belajar"}>
				<div style={{ marginBottom: 10, display: "flex", gap: "8px" }}>
					<Tooltip title="Tambah Tujuan">
						<Button
							type="primary"
							icon={<PlusOutlined />}
							onClick={handleAddRowTujuanBelajar}
						>
							Tambah Tujuan
						</Button>
					</Tooltip>
					<Button
						type="primary"
						style={{ backgroundColor: "green", borderColor: "green" }}
						onClick={() => handleSaveTujuanBelajar(tujuanBelajarRPS)}
					>
						Simpan Tujuan
					</Button>
				</div>
				<Table
					columns={tujuanBelajarColumn}
					dataSource={loading ? [] : tujuanBelajarRPS || []}
					loading={loading}
					pagination={false}
					scroll={{ x: "max-content" }}
					locale={{ emptyText: "" }}
					rowKey={(record, index) => index}
				/>
			</Accordion>

			<Accordion title="Detail Mata Kuliah">
				<Spin spinning={loading}>
					<Button 
						type="primary"
						style={{ backgroundColor: "green", borderColor: "green", marginBottom: 10 }}
						onClick={() => handleSaveDetailMKRps(detailMataKuliahRps)}
					>
						Simpan Detail MK
					</Button>
					<Descriptions
						bordered
						column={1}
						labelStyle={{ width: 300, fontWeight: "bold" }}
						contentStyle={{ width: 600 }}
					>
						<Descriptions.Item label="Deskripsi Singkat MK">
							<InlineEditableTextArea
								value={detailMataKuliahRps?.deskripsi_singkat || ""}
								onSave={(newValue) => handleDetailMkChange("deskripsi_singkat", newValue)}
							/>
							{mataKuliahData?.deskripsi_singkat_inggris && (
								<>
									<br />
									<br />
									<i>{mataKuliahData.deskripsi_singkat_inggris}</i>
								</>
							)}
						</Descriptions.Item>
						<Descriptions.Item label="Bahan Kajian/Materi Pembelajaran">
							<InlineEditableTextArea
								value={detailMataKuliahRps?.materi_pembelajaran || ""}
								onSave={(newValue) =>
									handleDetailMkChange("materi_pembelajaran", newValue)
								}
							/>
							{mataKuliahData?.materi_pembelajaran_inggris && (
								<>
									<br />
									<br />
									<i>{mataKuliahData.materi_pembelajaran_inggris}</i>
								</>
							)}
						</Descriptions.Item>
						<Descriptions.Item label="Daftar Referensi">
							{mataKuliahData?.buku_referensis?.length > 0 ? (
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
							{mataKuliahData?.dosens?.length > 0 ? (
								<ul className="list-disc pl-5 space-y-2">
									{mataKuliahData.dosens.map((dosen, index) => (
										<li key={index}>{dosen.nama}</li>
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
					onClick={() => setIsModalCreateVisible(true)}
				>
					Tambah RPS
				</Button>
				<Button
					type="primary"
					style={{ backgroundColor: "green", borderColor: "green", marginBottom: 10, marginLeft: 8 }}
					onClick={() => handleUpdate(rpsData)}
				>
					Simpan RPS
				</Button>
				<Button
					icon={<ZoomInOutlined />}
					onClick={() => setZoom(zoom + 0.1)}
					style={{ marginLeft: 10 }}
				>
				</Button>

				<Button
					icon={<ZoomOutOutlined />}
					onClick={() => setZoom(zoom - 0.1)}
					disabled={zoom <= 0.5}
					style={{ marginLeft: 10 }}
				>
				</Button>
				<div style={{ overflowX: "auto", width: "100%" }}>
					<div style={{
						display: "inline-block",
						transform: `scale(${zoom})`,
						transformOrigin: "top left",
					}}>
						<Table
						columns={rpsColumn}
						dataSource={rpsData || []}
						loading={loading}
						pagination={false}
						scroll={{ x: "max-content" }}
						/>
					</div>
					</div>
			</Accordion>

			<Accordion title={"Ringkasan"}>
				<div style={{ width: "100%", display: "block" }}>
					{/* Tabel Evaluasi */}
					<Table
						bordered
						pagination={false}
						style={{ width: "100%", marginBottom: 24 }}
						columns={ringkasanPembobotanPenilaian}
						dataSource={pembobotanData}
						showHeader={true}
						summary={() => (
							<Table.Summary.Row>
								<Table.Summary.Cell index={0} colSpan={2} style={{ textAlign: 'right', fontWeight: 'bold' }}>
								Total
								</Table.Summary.Cell>
								<Table.Summary.Cell index={2} style={{ fontWeight: 'bold' }}>
								{totalPersentase}% 
								</Table.Summary.Cell>
							</Table.Summary.Row>
							)}
					/>
					

					{/* Tabel CPL */}
					<Table
						bordered
						pagination={false}
						style={{ width: "100%" }}
						columns={[
							{
								title: (
									<div style={{ textAlign: "center", fontWeight: "bold" }}>
										Capaian Pembelajaran Lulusan
									</div>
								),
								children: [
									{
										title: (
											<div style={{ textAlign: "center", fontWeight: "bold" }}>
												CPL Prodi
											</div>
										),
										dataIndex: "cpl",
										key: "cpl",
										width: 100,
										align: "center",
									},
									{
										title: (
											<div style={{ textAlign: "center", fontWeight: "bold" }}>
												Tujuan Belajar
											</div>
										),
										children: [
											{
												title: "TB",
												dataIndex: "tb",
												key: "tb",
												width: 80,
												align: "center",
											},
											{
												title: "Instrumen pengukur",
												dataIndex: "instrumen",
												key: "instrumen",
												width: 220,
											},
										],
									},
									{
										title: (
											<div style={{ textAlign: "center", fontWeight: "bold" }}>
												Persentase
											</div>
										),
										dataIndex: "persentase",
										key: "persentase",
										width: 80,
										align: "center",
									},
									{
										title: (
											<div style={{ textAlign: "center", fontWeight: "bold" }}>
												Total Persentase CPL Prodi
											</div>
										),
										dataIndex: "total",
										key: "total",
										width: 120,
										align: "center",
									},
								],
							},
						]}
						dataSource={[
							{
								key: 1,
								cpl: "CPL 3",
								tb: "TB 1",
								instrumen: "Quiz 1 No 1",
								persentase: "5%",
								total: "",
							},
							{
								key: 2,
								cpl: "",
								tb: "",
								instrumen: "Quiz 2 No 1-3",
								persentase: "5%",
								total: "",
							},
							{
								key: 3,
								cpl: "CPL 4",
								tb: "TB 2",
								instrumen: "Project based/case method",
								persentase: "50%",
								total: "",
							},
						]}
						showHeader={true}
						rowClassName={(record, index) => {
							if (index === 0) return "cpl3-row";
							if (index === 2) return "cpl4-row";
							return "";
						}}
						components={{
							body: {
								cell: (props) => {
									const { children, ...restProps } = props;
									if (restProps["data-row-key"] === 1 && restProps["data-col-key"] === "cpl") {
										return <td rowSpan={2} {...restProps}>{children}</td>;
									}
									if (restProps["data-row-key"] === 2 && restProps["data-col-key"] === "cpl") {
										return null;
									}
									if (restProps["data-row-key"] === 3 && restProps["data-col-key"] === "cpl") {
										return <td rowSpan={1} {...restProps}>{children}</td>;
									}
									return <td {...restProps}>{children}</td>;
								},
							},
						}}
					/>
				</div>
			</Accordion>

			<FormValidasiModal
				isVisible={isCreateModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				form={form}
				kemampuanAkhirDropdown={kemampuanAkhirDropdown}
				tujuanBelajarDropdown={tujuanBelajarDropdown}
				cplDropdown={cplDropdown}
				handleAddRowRps={handleAddRowRps}
				statusModal={setIsModalCreateVisible}
			/>

			<EditRpsModal
				isVisible={isEditModalVisible}
				onOk={handleEditOk}
				onCancel={handleCancel}
				form={form}
				editedData={editedData}
				kemampuanAkhirDropdown={kemampuanAkhirDropdown}
				tujuanBelajarDropdown={tujuanBelajarDropdown}
				cplDropdown={cplDropdown}
			/>
		</DefaultLayout>
	);
};

export default Rps;
