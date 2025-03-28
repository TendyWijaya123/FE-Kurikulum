import DefaultLayout from "../layouts/DefaultLayout";
import {
	Table,
	Input,
	Button,
	Popconfirm,
	Select,
	Tooltip,
	Spin,
	Tag,
} from "antd";
import {
	DeleteOutlined,
	DownloadOutlined,
	PlusOutlined,
	SaveOutlined,
	UndoOutlined,
	UploadOutlined,
} from "@ant-design/icons";
import { useMPData } from "../hooks/useMPData";
import { useContext, useState } from "react";
import ImportModal from "../components/Modal/ImportModal";
import { ProdiContext } from "../context/ProdiProvider";
import VisibleMenu from "../components/Menu/VisibleMenu";

const MateriPembelajaran = () => {
	const { prodiDropdown, handleChangeSelectedProdiId, selectedProdiId } =
		useContext(ProdiContext);
	const {
		knowledgeDropdown,
		loading,
		dataSource,
		saving,
		rowSelection,
		selectedRowKeys,
		handleUndo,
		handleSave,
		handleAddRow,
		handleDeleteRow,
		handleSaveData,
		handleDeleteMateriPembelajarans,
		handleProdiChange,
		handleImportMateriPembelajaran,
		handleExportTemplateMateriPembelajaran,
	} = useMPData();

	const [isModalImportOpen, setIsModalImportOpen] = useState(false);

	const columns = [
		{
			title: "Kode",
			dataIndex: "code",
			key: "code",
			render: (text) => (
				<span style={{ padding: 0 }}>{text}</span> // Hanya menampilkan teks tanpa input
			),
		},
		{
			title: "Deskripsi",
			dataIndex: "description",
			key: "description",
			render: (text, record) => (
				<Input.TextArea
					value={text}
					onChange={(e) =>
						handleSave({ ...record, description: e.target.value })
					}
					autoSize={{ minRows: 1, maxRows: 5 }} // Menentukan jumlah baris minimal dan maksimal
					style={{
						border: "none",
						outline: "none",
						boxShadow: "none",
						padding: 0,
						resize: "none", // Mencegah pengguna meresize secara manual
					}}
				/>
			),
		},
		{
			title: "Cognitif Proses",
			dataIndex: "cognitifProses",
			key: "cognitifProses",
			render: (cognitifProses, record) => {
				// Warna berdasarkan proses kognitif
				const cognitiveColors = {
					Remembering: "blue",
					Understanding: "green",
					Applying: "orange",
					Analyzing: "red",
					Evaluating: "purple",
					Creating: "magenta",
				};

				return (
					<Select
						value={cognitifProses}
						style={{ width: "100%" }}
						onChange={(value) =>
							handleSave({ ...record, cognitifProses: value })
						}
						options={[
							{
								value: "Remembering",
								label: <Tag color="blue">Remembering</Tag>,
							},
							{
								value: "Understanding",
								label: <Tag color="green">Understanding</Tag>,
							},
							{
								value: "Applying",
								label: <Tag color="orange">Applying</Tag>,
							},
							{
								value: "Analyzing",
								label: <Tag color="red">Analyzing</Tag>,
							},
							{
								value: "Evaluating",
								label: <Tag color="purple">Evaluating</Tag>,
							},
							{
								value: "Creating",
								label: <Tag color="magenta">Creating</Tag>,
							},
						]}
					/>
				);
			},
		},
		{
			title: "Knowledge Dimension",
			dataIndex: "knowledgeDimension",
			key: "knowledgeDimension",
			render: (knowledgeDimension, record) => (
				<Select
					mode="multiple"
					value={knowledgeDimension}
					style={{ width: "100%" }}
					onChange={(value) =>
						handleSave({ ...record, knowledgeDimension: value })
					}
					options={knowledgeDropdown.map((knowledge) => ({
						label: knowledge.name,
						value: knowledge.code,
					}))}
				/>
			),
		},
		{
			title: "Aksi",
			key: "aksi",
			render: (_, record) => (
				<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
					<Popconfirm
						title="Yakin ingin menghapus baris ini?"
						onConfirm={() => handleDeleteRow(record.key)}
						okText="Ya"
						cancelText="Tidak">
						<Button icon={<DeleteOutlined />} type="primary" danger></Button>
					</Popconfirm>
				</VisibleMenu>
			),
		},
	];

	return (
		<DefaultLayout title="Materi Pembelajaran">
			<VisibleMenu allowedRoles={["P2MPP"]}>
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
			<div style={{ padding: "15px", background: "#fff9", minHeight: "100%" }}>
				<div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
					<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
						<Button
							onClick={handleExportTemplateMateriPembelajaran}
							type="primary"
							icon={<DownloadOutlined />}>
							Download Template MP
						</Button>
						<Button
							icon={<UploadOutlined />}
							onClick={() => setIsModalImportOpen(true)}
							type="default">
							Import MP
						</Button>
						<ImportModal
							isOpen={isModalImportOpen}
							setIsOpen={setIsModalImportOpen}
							handleImport={handleImportMateriPembelajaran}
							title="Import Materi Pembelajaran"
						/>
						<Button
							icon={<PlusOutlined />}
							onClick={handleAddRow}
							type="primary">
							Tambah MP
						</Button>
						<Button
							icon={<SaveOutlined />}
							onClick={handleSaveData}
							type="primary"
							style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
							loading={saving}>
							Simpan Data
						</Button>
						<Tooltip title="Undo">
							<Button
								onClick={handleUndo}
								type="default"
								icon={<UndoOutlined />}
							/>
						</Tooltip>
					</VisibleMenu>
					{selectedRowKeys.length > 0 && (
						<Button
							onClick={handleDeleteMateriPembelajarans}
							type="primary"
							danger
							style={{ marginBottom: "16px" }}
							loading={loading}>
							Hapus MP Terpilih
						</Button>
					)}
				</div>
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
						dataSource={dataSource}
						rowSelection={rowSelection}
						columns={columns}
						pagination={{ pageSize: 5 }}
						bordered
					/>
				)}
			</div>
		</DefaultLayout>
	);
};

export default MateriPembelajaran;
