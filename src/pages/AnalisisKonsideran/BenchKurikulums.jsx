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
import { useBCData } from "../../hooks/AnalisisKonsideran/useBCData";
import { useContext, useState } from "react";
import ImportModal from "../../components/Modal/ImportModal";
import VisibleMenu from "../../components/Menu/VisibleMenu";
import { AppDataContext } from "../../context/AppDataProvider";
import ProgresButton from "../../components/Button/ProgresButton";

const BenchKurikulums = () => {
	const { prodiDropdown, handleChangeSelectedProdiId, selectedProdiId,  currendKurikulum, handleTandaiSelesai } =
		useContext(AppDataContext);
	const {
		dataSource,
		loading,
		saving,
		rowSelection,
		selectedRowKeys,
		errors,
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
	const [statusBK, setStatusBK] = useState(`${currendKurikulum?.data.is_bk}`);
	const handleChangeStatusBK = (newStatus) => {
		setStatusBK(newStatus);
		handleTandaiSelesai("is_bk", newStatus);
	};

	const colums = [
		{
			title: "Program Studi",
			dataIndex: "programStudi",
			key: "programStudi",
			width: 200,
			render: (_, record, index) => {
				const errorMsg = errors?.[`${index}.programStudi`]?.[0];

				return (
					<Form.Item
						validateStatus={errorMsg ? "error" : ""}
						help={errorMsg || ""}
						style={{ marginBottom: 0 }}>
						<Input.TextArea
							value={record.programStudi}
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
					</Form.Item>
				);
			},
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
			render: (_, record, index) => {
				const errorMsg = errors?.[`${index}.kategori`]?.[0];

				// Warna berdasarkan kategori
				const kategoriColor = {
					"Dalam Negeri": "green",
					"Luar Negeri": "blue",
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
									value: "Dalam Negeri",
									label: <Tag color="green">Dalam Negeri</Tag>,
								},
								{
									value: "Luar Negeri",
									label: <Tag color="blue">Luar Negeri</Tag>,
								},
							]}
						/>
					</Form.Item>
				);
			},
		},
		{
			title: "Daftar CPL",
			dataIndex: "cpl",
			key: "cpl",
			render: (_, record, index) => {
				const errorMsg = errors?.[`${index}.cpl`]?.[0];

				const cplArray = record.cpl ? record.cpl.split("\n") : [];

				const formattedText = cplArray
					.map((text, i) => `${i + 1}. ${text}`)
					.join("\n");

				const handleKeyDown = (e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						const newCplArray = [...cplArray, ""];
						const newValue = newCplArray.join("\n");
						handleSave({ ...record, cpl: newValue });
					}
				};

				const handleChange = (e) => {
					const newValue = e.target.value
						.split("\n")
						.map((line) => line.replace(/^\d+\.\s*/, ""))
						.filter((line) => line !== "")
						.join("\n");

					handleSave({ ...record, cpl: newValue });
				};

				return (
					<Form.Item
						validateStatus={errorMsg ? "error" : ""}
						help={errorMsg || ""}
						style={{ marginBottom: 0 }}>
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
					</Form.Item>
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
					style={{ width: 250, marginBottom: 10 }}
					allowClear
					onClear={() => handleChangeSelectedProdiId(null)}
				/>
			</VisibleMenu>
			<div style={{ padding: "24px", background: "#fff", minHeight: "100%" }}>
				<div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
					<div className="flex flex-wrap gap-2">
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
						</VisibleMenu>
						{selectedRowKeys.length > 0 && (
							<VisibleMenu allowedRoles={"Penyusun Kurikulum"}>
								<Button
									onClick={handleDeleteBenchKurikulums}
									type="primary"
									danger
									style={{ marginBottom: "16px" }}
									loading={loading}>
									Hapus benchKurikulums Terpilih
								</Button>
							</VisibleMenu>
						)}
					</div>

					<div className="ml-auto">
						<VisibleMenu allowedRoles={"Penyusun Kurikulum"}>
							<ProgresButton status={statusBK} onChange={handleChangeStatusBK} />
						</VisibleMenu>
					</div>
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
