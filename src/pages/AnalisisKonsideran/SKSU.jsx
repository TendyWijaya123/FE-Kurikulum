import DefaultLayout from "../../layouts/DefaultLayout";
import {
	Table,
	Input,
	Button,
	Popconfirm,
	Select,
	Tooltip,
	Spin,
	Form,
	Tag,
} from "antd";
import {
	UndoOutlined,
	DeleteOutlined,
	DownloadOutlined,
	UploadOutlined,
	PlusOutlined,
	SaveOutlined,
} from "@ant-design/icons";
import { useSKSUData } from "../../hooks/AnalisisKonsideran/useSKSUData";
import { useContext, useState } from "react";
import ImportModal from "../../components/Modal/ImportModal";
import VisibleMenu from "../../components/Menu/VisibleMenu";
import { ProdiContext } from "../../context/ProdiProvider";

const SKSU = () => {
	const { prodiDropdown, handleChangeSelectedProdiId, selectedProdiId } =
		useContext(ProdiContext);
	const {
		dataSource,
		loading,
		saving,
		rowSelection,
		selectedRowKeys,
		selectedProdi,
		errors,
		handleUndo,
		handleSave,
		handleAddRow,
		handleDeleteRow,
		handleSaveData,
		handleDeleteSksus,
		handleProdiChange,
		handleImportSksu,
		handleExportTemplateSksu,
	} = useSKSUData();
	const [isModalImportOpen, setIsModalImportOpen] = useState(false);

	const columns = [
		{
			title: "Profil Lulusan",
			dataIndex: "profilLulusan",
			key: "profilLulusan",
			sorter: (a, b) => a.profilLulusan.localeCompare(b.profilLulusan),
			width: 200,
			render: (_, record, index) => {
				const errorMsg = errors?.[`${index}.profilLulusan`]?.[0];

				return (
					<Form.Item
						validateStatus={errorMsg ? "error" : ""}
						help={errorMsg || ""}
						style={{ marginBottom: 0 }}>
						<Input.TextArea
							value={record.profilLulusan}
							autoSize={{ minRows: 1 }}
							onChange={(e) =>
								handleSave({ ...record, profilLulusan: e.target.value })
							}
							style={{
								border: "none",
								outline: "none",
								boxShadow: "none",
								padding: 0,
							}}
						/>
					</Form.Item>
				);
			},
		},
		{
			title: "Kualifikasi",
			dataIndex: "kualifikasi",
			key: "kualifikasi",
			width: 150,
			render: (_, record, index) => {
				const errorMsg = errors?.[`${index}.kualifikasi`]?.[0];

				return (
					<Form.Item
						validateStatus={errorMsg ? "error" : ""}
						help={errorMsg || ""}
						style={{ marginBottom: 0 }}>
						<Input
							value={record.kualifikasi}
							onChange={(e) =>
								handleSave({ ...record, kualifikasi: e.target.value })
							}
							style={{
								border: "none",
								outline: "none",
								boxShadow: "none",
								padding: 0,
							}}
						/>
					</Form.Item>
				);
			},
		},
		{
			title: "Kategori",
			dataIndex: "kategori",
			key: "kategori",
			filters: [
				{ text: "Siap Kerja", value: "Siap Kerja" },
				{ text: "Siap Usaha", value: "Siap Usaha" },
			],
			onFilter: (value, record) => record.kategori === value,
			width: 150,
			render: (_, record, index) => {
				const errorMsg = errors?.[`${index}.kategori`]?.[0];

				// Warna berdasarkan kategori
				const kategoriColor = {
					"Siap Kerja": "green",
					"Siap Usaha": "blue",
				};

				return (
					<Form.Item
						validateStatus={errorMsg ? "error" : ""}
						help={errorMsg || ""}
						style={{ marginBottom: 0 }}>
						<Select
							value={record.kategori}
							style={{ width: "100%" }}
							onChange={(value) => handleSave({ ...record, kategori: value })}
							options={[
								{
									value: "Siap Kerja",
									label: <Tag color="green">Siap Kerja</Tag>,
								},
								{
									value: "Siap Usaha",
									label: <Tag color="blue">Siap Usaha</Tag>,
								},
							]}
						/>
					</Form.Item>
				);
			},
		},
		{
			title: "Kompetensi Kerja",
			dataIndex: "kompetensiKerja",
			key: "kompetensiKerja",
			render: (_, record, index) => {
				const kompetensiArray = record.kompetensiKerja
					? record.kompetensiKerja.split("\n")
					: [];

				const formattedText = kompetensiArray
					.map((text, i) => `${i + 1}. ${text}`)
					.join("\n");

				const handleKeyDown = (e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						const newKompetensiArray = [...kompetensiArray, ""];
						const newValue = newKompetensiArray.join("\n");
						handleSave({ ...record, kompetensiKerja: newValue });
					}
				};

				const handleChange = (e) => {
					const newValue = e.target.value
						.split("\n")
						.map((line) => line.replace(/^\d+\.\s*/, "")) // Hapus numbering sebelum menyimpan
						.filter((line) => line !== "")
						.join("\n");

					handleSave({ ...record, kompetensiKerja: newValue });
				};

				const errorMsg = errors?.[`${index}.kompetensiKerja`]?.[0];

				return (
					<Form.Item
						validateStatus={errorMsg ? "error" : ""}
						help={errorMsg || ""}
						style={{ marginBottom: 0 }}>
						<Input.TextArea
							value={formattedText}
							onChange={handleChange}
							onKeyDown={handleKeyDown}
							autoSize={{ minRows: 3 }}
							style={{
								border: "none",
								outline: "none",
								boxShadow: "none",
								padding: 0,
							}}
						/>
					</Form.Item>
				);
			},
		},

		{
			title: "Aksi",
			key: "aksi",
			width: 100,
			render: (_, record) => (
				<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
					<Popconfirm
						title="Yakin ingin menghapus baris ini?"
						onConfirm={() => handleDeleteRow(record.key)}
						okText="Ya"
						cancelText="Tidak">
						<Button type="primary" danger>
							<DeleteOutlined />
						</Button>
					</Popconfirm>
				</VisibleMenu>
			),
		},
	];

	return (
		<DefaultLayout title="Siap Kerja Siap Usaha">
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
			<div className="p-5 min-h-full bg-white overflow-x-auto">
				<div className="mb-4 grid grid-cols-2 gap-2 md:flex md:flex-wrap">
					<VisibleMenu allowedRoles={"Penyusun Kurikulum"}>
						<Button
							icon={<DownloadOutlined />}
							onClick={handleExportTemplateSksu}
							type="primary"
							className="text-sm p-2 w-full md:w-auto">
							Download Template SKSU
						</Button>

						<Button
							icon={<UploadOutlined />}
							onClick={() => setIsModalImportOpen(true)}
							type="default"
							className="text-sm p-2 w-full md:w-auto">
							Import SKSU
						</Button>

						<ImportModal
							isOpen={isModalImportOpen}
							setIsOpen={setIsModalImportOpen}
							handleImport={handleImportSksu}
							title="Import Materi Pembelajaran"
						/>

						<Button
							icon={<PlusOutlined />}
							onClick={handleAddRow}
							type="primary"
							className="text-sm p-2 w-full md:w-auto">
							Tambah Baris
						</Button>

						<Button
							icon={<SaveOutlined />}
							style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
							onClick={handleSaveData}
							type="primary"
							loading={saving}
							className="text-sm p-2 w-full md:w-auto">
							Simpan Data
						</Button>

						<Tooltip title="Undo">
							<Button
								onClick={handleUndo}
								type="default"
								icon={<UndoOutlined />}
								className="text-sm p-2 w-full md:w-auto"
							/>
						</Tooltip>
					</VisibleMenu>

					{selectedRowKeys.length > 0 && (
						<Button
							onClick={handleDeleteSksus}
							type="primary"
							danger
							loading={loading}
							className="text-sm p-2 w-full md:w-auto">
							Hapus SKSU Terpilih
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
					<div className="w-full overflow-x-auto">
						<Table
							dataSource={dataSource}
							rowSelection={rowSelection}
							columns={columns}
							pagination={{ pageSize: 5 }}
							bordered
						/>
					</div>
				)}
			</div>
		</DefaultLayout>
	);
};

export default SKSU;
