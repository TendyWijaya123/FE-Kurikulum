import DefaultLayout from "../../layouts/DefaultLayout";
import { Table, Input, Button, Popconfirm, Select, Tooltip, Spin } from "antd";
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
			render: (text, record) => (
				<Input.TextArea
					value={text}
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
			),
		},
		{
			title: "Kualifikasi",
			dataIndex: "kualifikasi",
			key: "kualifikasi",
			width: 150,
			render: (text, record) => (
				<Input
					value={text}
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
			),
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
			render: (kategori, record) => (
				<Select
					value={kategori}
					style={{ width: "100%" }}
					onChange={(value) => handleSave({ ...record, kategori: value })}
					options={[
						{ value: "Siap Kerja", label: "Siap Kerja" },
						{ value: "Siap Usaha", label: "Siap Usaha" },
					]}
				/>
			),
		},
		{
			title: "Kompetensi Kerja",
			dataIndex: "kompetensiKerja",
			key: "kompetensiKerja",
			render: (kompetensiKerja, record) => {
				const kompetensiArray = kompetensiKerja
					? kompetensiKerja.split("\n")
					: [];

				const formattedText = kompetensiArray
					.map((text, index) => `${index + 1}. ${text}`)
					.join("\n");

				const handleKeyDown = (e) => {
					if (e.key === "Enter") {
						e.preventDefault();

						const newKompetensiArray = [...kompetensiArray, ""];

						const newValue = newKompetensiArray.join("\n");

						handleSave({ ...record, kompetensiKerja: newValue });
					}
				};

				// Tangani perubahan teks
				const handleChange = (e) => {
					const newValue = e.target.value
						.split("\n")
						.map((line) => line.replace(/^\d+\.\s*/, "")) // Hapus numbering sebelum menyimpan
						.filter((line) => line !== "")
						.join("\n"); // Gabungkan kembali menjadi teks

					handleSave({ ...record, kompetensiKerja: newValue });
				};

				return (
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
			<div style={{ padding: "15px", background: "#fff9", minHeight: "100%" }}>
				<div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
					<VisibleMenu allowedRoles={"Penyusun Kurikulum"}>
						<Button
							icon={<DownloadOutlined />}
							onClick={handleExportTemplateSksu}
							type="primary">
							Download Template SKSU
						</Button>
						<Button
							icon={<UploadOutlined />}
							onClick={() => setIsModalImportOpen(true)}
							type="default">
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
							type="primary">
							Tambah Baris
						</Button>
						<Button
							icon={<SaveOutlined />}
							style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
							onClick={handleSaveData}
							type="primary"
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
							onClick={handleDeleteSksus}
							type="primary"
							danger
							style={{ marginBottom: "16px" }}
							loading={loading}>
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

export default SKSU;
