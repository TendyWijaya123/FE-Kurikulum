import React, { useState } from "react";
import DefaultLayout from "../../../layouts/DefaultLayout";
import { Table, Input, Button, Popconfirm, Select, Tooltip, Spin } from "antd";
import { UndoOutlined, EyeOutlined} from "@ant-design/icons";
import { useKKNIData } from "../../../hooks/AnalisisKonsideran/useKKNIData";
import ImportModal from "../../../components/Modal/ImportModal";
import { NightShelter } from "@mui/icons-material";
import ModalKkni from "./ModalKkni";

const KKNI = () => {
	const {
		isAutoCpl,
		kemampuanKerjaKkni,
		pengetahuanKkni,
		prodiDropdown,
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
		setSelectedKemampuanKerja
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
						Hapus
					</Button>
				</Popconfirm>
			),
		},
	];

	return (
		<DefaultLayout title="CPL KKNI">
			<div style={{ padding: "30px", background: "#fff9", minHeight: "100%" }}>
			<div>
				<h1><b> Pilih Level Pengetahuan dan Kemampuan Kerja KKNI</b></h1>
					<div style={{ marginBottom: "16px", display: "flex", gap: "50px" }}>
						<div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
							<label>Pengetahuan KKNI:</label>
							<div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
								<Tooltip title="Lihat Detail Pengetahuan KKNI">
								<Button type="link" icon={<EyeOutlined />} onClick={() => handleModalOpen("pengetahuan")} />
								</Tooltip>
								<Select
								placeholder="Pilih Pengetahuan KKNI"
								options={pengetahuanKkni.map((item) => ({ label: item.level, value: item.id }))}
								value={selectedPengetahuan}
								onChange={setSelectedPengetahuan}
								style={{ width: 200 }}
								/>
							</div>
						</div>

						<div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
							<label >Kemampuan Kerja KKNI:</label>
							<div style={{ display: "flex", alignItems: "center", gap: "2px", marginLeft: "5px" }}>
								<Tooltip title="Lihat Detail Kemampuan Kerja KKNI">
								<Button type="link" icon={<EyeOutlined />} onClick={() => handleModalOpen("kemampuanKerja")} />
								</Tooltip>
								<Select
								placeholder="Pilih Kemampuan Kerja KKNI"
								options={kemampuanKerjaKkni.map((item) => ({ label: item.level, value: item.id }))}
								value={selectedKemampuanKerja}
								onChange={setSelectedKemampuanKerja}
								style={{ width: 200 }}
								/>
							</div>
						</div>
					</div>
					<hr style={{ margin: "16px 0", border: "0.5px solid #ddd" }} />
				</div>
				
				<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
					<h1><b>Rancangan CPL</b></h1>
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
								<Button onClick={handleExportTemplateKkni} type="primary" disabled={isDisabled}>
									Download Template KKNI
								</Button>
								<Button onClick={() => setIsModalImportOpen(true)} type="primary" disabled={isDisabled}>
									Import KKNI
								</Button>
								<Button onClick={handleAddRow} type="primary" disabled={isDisabled}>
									Tambah Baris
								</Button>
								<ImportModal isOpen={isModalImportOpen} setIsOpen={setIsModalImportOpen} handleImport={handleImportKkni} title="Import KKNI" />
								<Button onClick={handleSaveData} type="primary" loading={saving} disabled={isDisabled}>
									Simpan Data
								</Button>
								<Tooltip title="Undo">
									<Button onClick={handleUndo} type="default" icon={<UndoOutlined />} disabled={isDisabled} />
								</Tooltip>
							</>
						)}
						{selectedRowKeys.length > 0 && (
							<Button
								onClick={handleDeleteKknis}
								type="primary"
								danger
								style={{ marginBottom: "16px" }}
								loading={loading}>
								Hapus CPL Terpilih
							</Button>
						)}
					</div>
				</div>
				{loading ? (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							marginTop: "50px",
							marginBottom: "50px"
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
					<h3><b>Rekomendasi Rancangan CPL Berdasarkan analisis konsideran</b></h3>
					<div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px', marginRight: "30px", gap:"10px" }}>
						<Button onClick={handleautocpl} type="primary" loading={isAutoCpl} disabled={isDisabled}>
							{dataSourceCpl.length > 0 ? 'Refresh' : 'Rekomendasi CPL'}
						</Button>
						{selectedRowKeysCpl.length > 0 && (
							<Button onClick={addToDataSource} type="primary" disabled={isDisabled}>
								Tambah CPL
							</Button>
						)
						}
					</div>
					<Table 
						dataSource={dataSourceCpl} 
						rowSelection={rowSelectionCpl} 
						columns={columns} 
						pagination={{ pageSize: 5 }} 
						bordered 
					/>
				</div>

			<ModalKkni modalType={selectedType} isModalVisible={isModalVisible} handleModalClose={handleModalClose} dataSource={selectedType==="pengetahuan" ? pengetahuanKkni : kemampuanKerjaKkni}></ModalKkni>
			</div>
		</DefaultLayout>
	);
};

export default KKNI;
