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
import { UndoOutlined, DeleteOutlined  } from "@ant-design/icons";
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
			  // Pastikan kompetensiKerja adalah string, lalu pecah berdasarkan newline
			  const kompetensiArray =kompetensiKerja ? kompetensiKerja.split("\n") : [];
		  
			  // Tambahkan numbering hanya untuk tampilan
			  const formattedText = kompetensiArray
				.map((text, index) => `${index + 1}. ${text}`)
				.join("\n");

			// Tangani Enter untuk menambahkan baris baru dengan numbering yang sesuai
				const handleKeyDown = (e) => {
					if (e.key === "Enter") {
					e.preventDefault(); // Hindari behavior default dari Enter

					// Tambahkan baris baru ke kompetensiArray
					const newKompetensiArray = [...kompetensiArray, ""]; // Gunakan spasi sebagai placeholder

					// Gabungkan kembali sebagai teks tanpa numbering
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
				<Popconfirm
					title="Yakin ingin menghapus baris ini?"
					onConfirm={() => handleDeleteRow(record.key)}
					okText="Ya"
					cancelText="Tidak">
					<Button type="primary" danger>
						<DeleteOutlined />
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
							{/* <Upload {...props}>
								<Button>Unggah File Excel</Button>
							</Upload> */}
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
