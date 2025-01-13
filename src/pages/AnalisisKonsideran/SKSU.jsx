import DefaultLayout from "../../layouts/DefaultLayout";
import { Table, Input, Button, Popconfirm, Select, Tooltip, Spin } from 'antd';
import { UndoOutlined } from '@ant-design/icons';
import { useSKSUData } from "../../hooks/AnalisisKonsideran/useSKSUData";

const SKSU = () => {
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
		handleDeleteSksus
    } = useSKSUData();

    // Kolom tabel
    const columns = [
        {
            title: 'Profil Lulusan',
            dataIndex: 'profilLulusan',
            key: 'profilLulusan',
            render: (text, record) => (
                <Input
                    value={text}
                    onChange={(e) => handleSave({ ...record, profilLulusan: e.target.value })}
                    style={{
                        border: 'none',
                        outline: 'none',
                        boxShadow: 'none',
                        padding: 0,
                    }}
                />
            ),
        },
        {
            title: 'Kualifikasi',
            dataIndex: 'kualifikasi',
            key: 'kualifikasi',
            render: (text, record) => (
                <Input
                    value={text}
                    onChange={(e) => handleSave({ ...record, kualifikasi: e.target.value })}
                    style={{
                        border: 'none',
                        outline: 'none',
                        boxShadow: 'none',
                        padding: 0,
                    }}
                />
            ),
        },
        {
            title: 'Kategori',
            dataIndex: 'kategori',
            key: 'kategori',
            render: (kategori, record) => (
                <Select
                    value={kategori}
                    style={{ width: '100%' }}
                    onChange={(value) => handleSave({ ...record, kategori: value })}
                    options={[
                        { value: 'Siap Kerja', label: 'Siap Kerja' },
                        { value: 'Siap Usaha', label: 'Siap Usaha' },
                    ]}
                />
            ),
        },
        {
            title: 'Kompetensi Kerja',
            dataIndex: 'kompetensiKerja',
            key: 'kompetensiKerja',
            render: (kompetensiKerja, record) => (
                <Input.TextArea
                    value={kompetensiKerja.join('\n')}
                    onChange={(e) =>
                        handleSave({
                            ...record,
                            kompetensiKerja: e.target.value.split('\n'),
                        })
                    }
                    autoSize={{ minRows: 3 }}
                    style={{
                        border: 'none',
                        outline: 'none',
                        boxShadow: 'none',
                        padding: 0,
                    }}
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
        <DefaultLayout title='Siap Kerja Siap Usaha'>
            <div style={{ padding: '15px', background: '#fff9', minHeight: '100%' }}>
                <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
                    <Button onClick={handleAddRow} type="primary">
                        Tambah Baris
                    </Button>
                    <Button onClick={handleSaveData} type="primary" loading={saving}>
                        Simpan Data
                    </Button>
                    <Tooltip title="Undo">
                        <Button onClick={handleUndo} type="default" icon={<UndoOutlined />} />
                    </Tooltip>
					{selectedRowKeys.length > 0 && (
						<Button
							onClick={handleDeleteSksus}
							type="primary" danger
							style={{ marginBottom: '16px' }}
							loading={loading}
						>
							Hapus SKSU Terpilih
						</Button>
					)}
                </div>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
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
