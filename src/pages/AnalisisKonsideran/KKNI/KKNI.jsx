import React, { useContext, useState } from "react";
import DefaultLayout from "../../../layouts/DefaultLayout";
import {
	Table,
	Input,
	Button,
	Popconfirm,
	Select,
	Tooltip,
	Spin,
	Form,
} from "antd";
import {
	UndoOutlined,
	EyeOutlined,
	DownloadOutlined,
	UploadOutlined,
	PlusOutlined,
	SaveOutlined,
} from "@ant-design/icons";
import { useKKNIData } from "../../../hooks/AnalisisKonsideran/useKKNIData";
import ImportModal from "../../../components/Modal/ImportModal";
import { DeleteOutlined, NightShelter } from "@mui/icons-material";
import ModalKkni from "./ModalKkni";
import { ProdiContext } from "../../../context/ProdiProvider";
import VisibleMenu from "../../../components/Menu/VisibleMenu";

const KKNI = () => {
	const { prodiDropdown, handleChangeSelectedProdiId, selectedProdiId } =
		useContext(ProdiContext);
	const {
		isAutoCpl,
		kemampuanKerjaKkni,
		pengetahuanKkni,
		selectedProdi,
		loading,
		dataSource,
		dataSourceCpl,
		saving,
		rowSelection,
		rowSelectionCpl,
		selectedRowKeys,
		selectedRowKeysCpl,
		selectedKemampuanKerja,
		selectedPengetahuan,
		kkni,
		errors,
		addToDataSource,
		handleautocpl,
		handleUndo,
		handleSave,
		handleAddRow,
		handleDeleteRow,
		handleSaveData,
		handleDeleteKknis,
		handleProdiChange,
		handleExportTemplateKkni,
		handleImportKkni,
		setSelectedPengetahuan,
		setSelectedKemampuanKerja,
	} = useKKNIData();
	const [isModalImportOpen, setIsModalImportOpen] = useState(false);

	const isDisabled = !selectedPengetahuan || !selectedKemampuanKerja;

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedType, setSelectedType] = useState("");

	const handleModalOpen = (type) => {
		setSelectedType(type);
		setIsModalVisible(true);
	};

	const handleModalClose = () => {
		setIsModalVisible(false);
	};

	// Kolom tabel
	const columns = [
		{
			title: "Code",
			dataIndex: "code",
			key: "code",
			width: 100,
			render: (text) => (
				<span style={{ padding: 0 }}>{text}</span> // Hanya menampilkan teks tanpa input
			),
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
			render: (text, record, index) => {
				const errorMsg = errors?.[`dataSource.${index}.description`]?.[0];

				return (
					<Form.Item
						validateStatus={errorMsg ? "error" : ""}
						help={errorMsg || ""}
						style={{ marginBottom: 0 }}>
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
						<Button type="primary" danger icon={<DeleteOutlined />}></Button>
					</Popconfirm>
				</VisibleMenu>
			),
		},
	];

	return (
		<DefaultLayout title="CPL KKNI">
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
			<div style={{ padding: "30px", background: "#fff9", minHeight: "100%" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
					<h1>
						<b>Rancangan CPL</b>
					</h1>
					<div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
						<VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
							<Button
								icon={<DownloadOutlined />}
								onClick={handleExportTemplateKkni}
								type="primary">
								Download Template KKNI
							</Button>
							<Button
								icon={<UploadOutlined />}
								onClick={() => setIsModalImportOpen(true)}
								type="default">
								Import KKNI
							</Button>
							<Button
								icon={<PlusOutlined />}
								onClick={handleAddRow}
								type="primary">
								Tambah Baris
							</Button>
							<ImportModal
								isOpen={isModalImportOpen}
								setIsOpen={setIsModalImportOpen}
								handleImport={handleImportKkni}
								title="Import KKNI"
							/>
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
							<VisibleMenu allowedRoles={"Penyusun Kurikulum"}>
								<Button
									onClick={handleDeleteKknis}
									type="primary"
									danger
									style={{ marginBottom: "16px" }}
									loading={loading}>
									Hapus CPL Terpilih
								</Button>
							</VisibleMenu>
						)}
					</div>
				</div>
				{loading ? (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							marginTop: "50px",
							marginBottom: "50px",
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

				<hr style={{ margin: "16px 0", border: "0.5px solid #ddd" }} />

				<div style={{ marginTop: "50px" }}>
					<h3 style={{ textAlign: "center", marginBottom: "16px" }}>
						<b>Rekomendasi Rancangan CPL</b>
						<br />
						<span style={{ fontWeight: "normal", fontSize: "18px" }}>
							Berdasarkan Analisis Konsideran
						</span>
					</h3>

					<div>
						<h2 style={{ marginBottom: "16px" }}>
							Pilih Level Pengetahuan dan Kemampuan Kerja KKNI
						</h2>

						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								marginBottom: "16px",
							}}>
							{/* Container Dropdown */}
							<div style={{ display: "flex", gap: "50px", flexGrow: 1 }}>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "4px",
									}}>
									<label>Pengetahuan KKNI:</label>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											gap: "2px",
										}}>
										<Tooltip title="Lihat Detail Pengetahuan KKNI">
											<Button
												type="link"
												icon={<EyeOutlined />}
												onClick={() => handleModalOpen("pengetahuan")}
											/>
										</Tooltip>
										<Select
											placeholder="Pilih Pengetahuan KKNI"
											options={pengetahuanKkni.map((item) => ({
												label: item.level,
												value: item.id,
											}))}
											value={selectedPengetahuan}
											onChange={setSelectedPengetahuan}
											style={{ width: 200 }}
										/>
									</div>
								</div>

								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "4px",
									}}>
									<label>Kemampuan Kerja KKNI:</label>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											gap: "2px",
										}}>
										<Tooltip title="Lihat Detail Kemampuan Kerja KKNI">
											<Button
												type="link"
												icon={<EyeOutlined />}
												onClick={() => handleModalOpen("kemampuanKerja")}
											/>
										</Tooltip>
										<Select
											placeholder="Pilih Kemampuan Kerja KKNI"
											options={kemampuanKerjaKkni.map((item) => ({
												label: item.level,
												value: item.id,
											}))}
											value={selectedKemampuanKerja}
											onChange={setSelectedKemampuanKerja}
											style={{ width: 200 }}
										/>
									</div>
								</div>
							</div>

							{/* Container untuk tombol */}
							<div
								style={{ display: "flex", gap: "10px", alignItems: "center" }}>
								{/* Tombol Tambah CPL tetap di tempatnya dengan visibility */}
								<Button
									onClick={addToDataSource}
									type="primary"
									disabled={isDisabled}
									style={{
										visibility:
											selectedRowKeysCpl.length > 0 ? "visible" : "hidden",
									}}>
									Tambah CPL
								</Button>

								<Button
									onClick={handleautocpl}
									type="primary"
									loading={isAutoCpl}
									disabled={isDisabled}>
									{dataSourceCpl.length > 0 ? "Refresh" : "Rekomendasi CPL"}
								</Button>
							</div>
						</div>

						{/* Tabel */}
						<Table
							dataSource={dataSourceCpl}
							rowSelection={rowSelectionCpl}
							columns={columns}
							pagination={{ pageSize: 5 }}
							bordered
						/>
					</div>
				</div>
				<ModalKkni
					modalType={selectedType}
					isModalVisible={isModalVisible}
					handleModalClose={handleModalClose}
					dataSource={
						selectedType === "pengetahuan"
							? pengetahuanKkni
							: kemampuanKerjaKkni
					}></ModalKkni>
			</div>
		</DefaultLayout>
	);
};

export default KKNI;
