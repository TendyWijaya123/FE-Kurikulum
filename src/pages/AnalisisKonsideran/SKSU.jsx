import DefaultLayout from "../../layouts/DefaultLayout";
import {
	Table,
	Input,
	Button,
	Popconfirm,
	Select,
	Tooltip,
	Spin,
	Upload,
} from "antd";
import { UndoOutlined } from "@ant-design/icons";
import { useSKSUData } from "../../hooks/AnalisisKonsideran/useSKSUData";
import { useState } from "react";
import ImportModal from "../../components/Modal/ImportModal";

const SKSU = () => {
	const {
		props,
		prodiDropdown,
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

	// Kolom tabel
	const columns = [
		{
			title: "Profil Lulusan",
			dataIndex: "profilLulusan",
			key: "profilLulusan",
			render: (text, record) => (
				<Input
					value={text}
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
				// Tidak menampilkan nomor urut di dalam data yang disimpan
				const formattedSKSU = kompetensiKerja
					.map((text, index) => `${index + 1})  ${text}`) // Nomor urut hanya untuk tampilan
					.join("\n");
		
				// Tangani penghapusan baris
				const handleDelete = (index) => {
					const newCpl = [...kompetensiKerja];
					newCpl.splice(index, 1); // Hapus item pada index yang diberikan
					handleSave({ ...record, kompetensiKerja: newCpl });
				};
		
				// Tangani keydown untuk penambahan baris baru
				const handleKeyDown = (e) => {
					if (e.key === "Enter") {
						e.preventDefault(); // Hindari behavior default dari Enter
						const newValue = [...kompetensiKerja, ""]; // Tambahkan baris kosong
						handleSave({ ...record, kompetensiKerja: newValue });
					}
				};
		
				// Tangani perubahan teks
				const handleChange = (e) => {
					const newValue = e.target.value
						.split("\n")
						.map((line) => line.replace(/^\d+\.\s*/, "")) // Hapus nomor urut saat menyimpan
						.filter((line) => line.trim() !== ""); // Hindari menyimpan baris kosong
		
					handleSave({ ...record, kompetensiKerja: newValue });
				};
		
				return (
					<Input.TextArea
						value={formattedSKSU} // Hanya tampilan dengan numbering
						onChange={handleChange} // Tangani perubahan teks
						onKeyDown={handleKeyDown} // Tangani Enter
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
			render: (_, record) => (
				<Popconfirm
					title="Yakin ingin menghapus baris ini?"
					onConfirm={() => handleDeleteRow(record.key)}
					okText="Ya"
					cancelText="Tidak">
					<Button type="primary" danger>
						Hapus
					</Button>
				</Popconfirm>
			),
		},
	];

	return (
		<DefaultLayout title="Siap Kerja Siap Usaha">
			<div style={{ padding: "15px", background: "#fff9", minHeight: "100%" }}>
				<div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
					{prodiDropdown.length > 0 ? (
						// Jika `prodiDropdown` ada isinya, tampilkan dropdown
						<Select
							placeholder="Pilih Program Studi"
							options={prodiDropdown.map((prodi) => ({
								label: prodi.name,
								value: prodi.id,
							}))}
							value={selectedProdi}
							onChange={handleProdiChange}
							style={{ width: 200 }}
						/>
					) : (
						// Jika `prodiDropdown` kosong, tampilkan tombol
						<>
							<Button onClick={handleExportTemplateSksu} type="primary">
								Download Template SKSU
							</Button>
							<Button
								onClick={() => setIsModalImportOpen(true)}
								type="primary">
								Import SKSU
							</Button>
							<ImportModal
								isOpen={isModalImportOpen}
								setIsOpen={setIsModalImportOpen}
								handleImport={handleImportSksu}
								title="Import Materi Pembelajaran"
							/>
							<Button onClick={handleAddRow} type="primary">
								Tambah Baris
							</Button>
							<Button onClick={handleSaveData} type="primary" loading={saving}>
								Simpan Data
							</Button>
							<Upload {...props}>
								<Button>Unggah File Excel</Button>
							</Upload>
							<Tooltip title="Undo">
								<Button
									onClick={handleUndo}
									type="default"
									icon={<UndoOutlined />}
								/>
							</Tooltip>
						</>
					)}
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
