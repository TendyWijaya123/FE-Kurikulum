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
import {
	UndoOutlined,
	DeleteOutlined,
	DownloadOutlined,
	UploadOutlined,
	PlusOutlined,
	SaveOutlined,
} from "@ant-design/icons";
import { useBCData } from "../../hooks/AnalisisKonsideran/useBCData";
import { useContext, useState } from "react";
import ImportModal from "../../components/Modal/ImportModal";
import VisibleMenu from "../../components/Menu/VisibleMenu";
import { ProdiContext } from "../../context/ProdiProvider";

const BenchKurikulums = () => {
	const { prodiDropdown, handleChangeSelectedProdiId, selectedProdiId } =
		useContext(ProdiContext);
	const {
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
			width: 200,
			render: (text, record) => (
				<Input.TextArea
					value={text}
					autoSize={{ minRows: 1 }}
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
			filters: [
				{ text: "Dalam Negeri", value: "Dalam Negeri" },
				{ text: "Luar Negeri", value: "Luar Negeri" },
			],
			onFilter: (value, record) => record.kategori === value,
			width: 150,
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
				// Pastikan kompetensiKerja adalah string, lalu pecah berdasarkan newline
				const cplArray = cpl ? cpl.split("\n") : [];

				// Tambahkan numbering hanya untuk tampilan
				const formattedText = cplArray
					.map((text, index) => `${index + 1}. ${text}`)
					.join("\n");

				// Tangani Enter untuk menambahkan baris baru dengan numbering yang sesuai
				const handleKeyDown = (e) => {
					if (e.key === "Enter") {
						e.preventDefault(); // Hindari behavior default dari Enter

						// Tambahkan baris baru ke kompetensiArray
						const newCplArray = [...cplArray, ""]; // Gunakan spasi sebagai placeholder

						// Gabungkan kembali sebagai teks tanpa numbering
						const newValue = newCplArray.join("\n");

						handleSave({ ...record, cpl: newValue });
					}
				};

				// Tangani perubahan teks
				const handleChange = (e) => {
					const newValue = e.target.value
						.split("\n")
						.map((line) => line.replace(/^\d+\.\s*/, "")) // Hapus numbering sebelum menyimpan
						.filter((line) => line !== "")
						.join("\n"); // Gabungkan kembali menjadi teks

					handleSave({ ...record, cpl: newValue });
				};

				return (
					<Input.TextArea
						value={formattedText}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						autoSize={{ minRows: 1 }}
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
				const ppmArray = ppm ? ppm.split("\n") : [];
				const formattedText = ppmArray
					.map((text, index) => `${index + 1}. ${text}`)
					.join("\n");

				const handleKeyDown = (e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						const newPpmArray = [...ppmArray, ""];
						const newValue = newPpmArray.join("\n");
						handleSave({ ...record, ppm: newValue });
					}
				};

				const handleChange = (e) => {
					const newValue = e.target.value
						.split("\n")
						.map((line) => line.replace(/^\d+\.\s*/, ""))
						.filter((line) => line !== "")
						.join("\n");

					handleSave({ ...record, ppm: newValue });
				};

				return (
					<Input.TextArea
						value={formattedText}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						autoSize={{ minRows: 1, maxRows: 6 }}
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
		<DefaultLayout title="Bench Kurikulums">
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
			<div style={{ padding: "24px", background: "#fff", minHeight: "100%" }}>
				<div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
					<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
						<Button
							icon={<DownloadOutlined />}
							onClick={handleExportTemplateBenchKurikulum}
							type="primary">
							Download Template BK
						</Button>
						<Button
							icon={<UploadOutlined />}
							onClick={() => setIsModalImportOpen(true)}
							type="default">
							Import BK
						</Button>
						<ImportModal
							isOpen={isModalImportOpen}
							setIsOpen={setIsModalImportOpen}
							handleImport={handleImportBenchKurikulum}
							title="Import Bench  Kurikulum"
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
