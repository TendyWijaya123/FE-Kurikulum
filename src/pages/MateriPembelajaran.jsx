import DefaultLayout from "../layouts/DefaultLayout";
import { Table, Input, Button, Popconfirm, Select, Tooltip, Spin } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import { useMPData } from "../hooks/useMPData";
import { useState } from "react";
import ImportModal from "../components/Modal/ImportModal";

const MateriPembelajaran = ()=>{
    const {
        knowledgeDropdown,
        selectedProdi,
        prodiDropdown,
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

    // Kolom tabel
    const columns = [
        {
            title: 'Kode',
            dataIndex: 'code',
            key: 'code',
            render: (text) => (
                <span style={{ padding: 0 }}>{text}</span> // Hanya menampilkan teks tanpa input
            ),
        },
        {
            title: 'Deskripsi',
            dataIndex: 'description',
            key: 'description',
            render: (text, record) => (
                <Input.TextArea
                    value={text}
                    onChange={(e) => handleSave({ ...record, description: e.target.value })}
                    autoSize={{ minRows: 1, maxRows: 5 }} // Menentukan jumlah baris minimal dan maksimal
                    style={{
                        border: 'none',
                        outline: 'none',
                        boxShadow: 'none',
                        padding: 0,
                        resize: 'none', // Mencegah pengguna meresize secara manual
                    }}
                />
            ),
        },  
        {
            title: 'Cognitif Proses',
            dataIndex: 'cognitifProses',
            key: 'cognitifProses',
            render: (cognitifProses, record) => (
                <Select
                    value={cognitifProses}
                    style={{ width: '100%' }}
                    onChange={(value) => handleSave({ ...record, cognitifProses: value })}
                    options={[
                        { value: 'Remembering', label: 'Remembering' },
                        { value: 'Understanding', label: 'Understanding' },
                        { value: 'Applying', label: 'Applying' },
                        { value: 'Analyzing', label: 'Analyzing' },
                        { value: 'Evaluating', label: 'Evaluating' },
                        { value: 'Creating', label: 'Creating' },
                    ]}
                />
            ),
        },        
        {
            title: 'Knowledge Dimension',
            dataIndex: 'knowledgeDimension',
            key: 'knowledgeDimension',
            render: (knowledgeDimension, record) => (
                <Select
                    mode="multiple"
                    value={knowledgeDimension}
                    style={{ width: '100%' }}
                    onChange={(value) => handleSave({ ...record, knowledgeDimension: value })}
                    options={ knowledgeDropdown.map((knowledge) => ({
                        label : knowledge.name,
                        value : knowledge.code,
                    }))}
                />
            ),
        },
        {
            title: 'Aksi',
            key: 'aksi',
            render: (_, record) =>
                <Popconfirm
                    title="Yakin ingin menghapus baris ini?"
                    onConfirm={() => handleDeleteRow(record.key)}
                    okText="Ya"
                    cancelText="Tidak"
                >
                    <Button type="primary" danger>
                        Hapus
                    </Button>
                </Popconfirm>
        },
    ];

	return (
		<DefaultLayout title="Materi Pembelajaran">
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
							<Button
								onClick={handleExportTemplateMateriPembelajaran}
								type="primary">
								Download Template MP
							</Button>
							<Button
								onClick={() => setIsModalImportOpen(true)}
								
								type="primary">
								Import MP
							</Button>
							<ImportModal
								isOpen={isModalImportOpen}
								setIsOpen={setIsModalImportOpen}
								handleImport={handleImportMateriPembelajaran}
								title="Import Materi Pembelajaran"
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
