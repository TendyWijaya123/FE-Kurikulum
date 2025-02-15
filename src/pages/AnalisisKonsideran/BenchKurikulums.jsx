import DefaultLayout from "../../layouts/DefaultLayout";
import {
	Table,
	Input,
	Button,
	message,
	Popconfirm,
	Select,
	Tooltip,
	Spin,
} from "antd";
import { UndoOutlined } from "@ant-design/icons";
import { useBCData } from "../../hooks/AnalisisKonsideran/useBCData";
import { useState } from "react";
import ImportModal from "../../components/Modal/ImportModal";

const BenchKurikulums = () => {
	const {
		selectedProdi,
		prodiDropdown,
		dataSource,
		loading,
		saving,
		rowSelection,
		selectedRowKeys,
		handleUndo,
		handleSave,
		handleAddRow,
		handleDeleteRow,
		handleSaveData,
		handleDeleteBenchKurikulums,
		handleProdiChange,
		handleImportBenchKurikulum,
		handleExportTemplateBenchKurikulum,
	} = useBCData();

	const [isModalImportOpen, setIsModalImportOpen] = useState(false);

	const colums = [
		{
			title: "Program Studi",
			dataIndex: "programStudi",
			key: "programStudi",
			render: (text, record) => (
				<Input
					value={text}
					onChange={(e) =>
						handleSave({ ...record, programStudi: e.target.value })
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
						{ value: "Dalam Negeri", label: "Dalam Negeri" },
						{ value: "Luar Negeri", label: "Luar Negeri" },
					]}
				/>
			),
		},
		{
			title: "Daftar CPL",
			dataIndex: "cpl",
			key: "cpl",
			render: (cpl, record) => {
				// Tidak menampilkan nomor urut di dalam data yang disimpan
				const formattedCPL = cpl
					.map((text, index) => `${index + 1})  ${text}`) // Nomor urut hanya untuk tampilan
					.join("\n");
		
				// Tangani penghapusan baris
				const handleDelete = (index) => {
					const newCpl = [...cpl];
					newCpl.splice(index, 1); // Hapus item pada index yang diberikan
					handleSave({ ...record, cpl: newCpl });
				};
		
				// Tangani keydown untuk penambahan baris baru
				const handleKeyDown = (e) => {
					if (e.key === "Enter") {
						e.preventDefault(); // Hindari behavior default dari Enter
						const newValue = [...cpl, ""]; // Tambahkan baris kosong
						handleSave({ ...record, cpl: newValue });
					}
				};
		
				// Tangani perubahan teks
				const handleChange = (e) => {
					const newValue = e.target.value
						.split("\n")
						.map((line) => line.replace(/^\d+\.\s*/, "")) // Hapus nomor urut saat menyimpan
						.filter((line) => line.trim() !== ""); // Hindari menyimpan baris kosong
		
					handleSave({ ...record, cpl: newValue });
				};
		
				return (
					<Input.TextArea
						value={formattedCPL} // Hanya tampilan dengan numbering
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
			title: "PPM (jika ada)",
			dataIndex: "ppm",
			key: "ppm",
			render: (ppm, record) => {
				const formattedPPM = ppm
					.map((text, index) => `${index + 1})  ${text}`)
					.join("\n");
		
				const handleDelete = (index) => {
					const newPpm = [...ppm];
					newPpm.splice(index, 1);
					handleSave({ ...record, ppm: newPpm });
				};
		
				const handleKeyDown = (e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						const newValue = [...ppm, ""];
						handleSave({ ...record, ppm: newValue });
					}
				};
		
				const handleChange = (e) => {
					const newValue = e.target.value
						.split("\n")
						.map((line) => line.replace(/^\d+\.\s*/, "")) // Hapus nomor urut saat menyimpan
						.filter((line) => line.trim() !== "");
		
					handleSave({ ...record, ppm: newValue });
				};
		
				return (
					<Input.TextArea
						value={formattedPPM}
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
		<DefaultLayout title="Bench Kurikulums">
			<div style={{ padding: "24px", background: "#fff", minHeight: "100%" }}>
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
							<Button
								onClick={handleExportTemplateBenchKurikulum}
								type="primary">
								Download Template BK
							</Button>
							<Button
								onClick={() => setIsModalImportOpen(true)}
								type="primary">
								Import BK
							</Button>
							<ImportModal
								isOpen={isModalImportOpen}
								setIsOpen={setIsModalImportOpen}
								handleImport={handleImportBenchKurikulum}
								title="Import Bench  Kurikulum"
							/>
							<Button onClick={handleAddRow} type="primary">
								Tambah Baris
							</Button>
							<Button onClick={handleSaveData} type="primary" loading={saving}>
								Simpan Data
							</Button>
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
							onClick={handleDeleteBenchKurikulums}
							type="primary"
							danger
							style={{ marginBottom: "16px" }}
							loading={loading}>
							Hapus benchKurikulums Terpilih
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
						rowSelection={rowSelection}
						dataSource={dataSource}
						columns={colums}
						pagination={{ pageSize: 5 }}
						bordered
					/>
				)}
			</div>
		</DefaultLayout>
	);
};

export default BenchKurikulums;
