import DefaultLayout from "../layouts/DefaultLayout";
import { Table, Input, Button, message, Popconfirm, Select, Tooltip, Spin } from 'antd';
import { UndoOutlined } from '@ant-design/icons';
import { useBCData } from "../hooks/AnalisisKonsideran/useBCData";

const BenchKurikulums = ()=> {
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
		handleDeleteBenchKurikulums
    } = useBCData();

    const colums = [
        {
            title: 'Program Studi',
            dataIndex: 'programStudi',
            key: 'programStudi',
            render: (text, record) => (
                <Input
                    value={text}
                    onChange={(e) => handleSave({ ...record, programStudi: e.target.value })}
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
                        { value: 'Dalam Negeri', label: 'Dalam Negeri' },
                        { value: 'Luar Negeri', label: 'Luar Negeri' },
                    ]}
                />
            ),
        },
        {
            title: 'Daftar CPL',
            dataIndex: 'cpl',
            key: 'cpl',
            render: (cpl, record) => (
                <Input.TextArea
                    value={cpl.join('\n')}
                    onChange={(e) =>
                        handleSave({
                            ...record,
                            cpl: e.target.value.split('\n'),
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
            title: 'PPM (jika ada)',
            dataIndex: 'ppm',
            key: 'ppm',
            render: (ppm, record) => (
                <Input.TextArea
                    value={ppm.join('\n')}
                    onChange={(e) =>
                        handleSave({
                            ...record,
                            ppm: e.target.value.split('\n'),
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
    ]


    return (
        <DefaultLayout title='Bench Kurikulums'> 
            <div style={{ padding: '24px', background: '#fff', minHeight: '100%' }}>
                <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
                    <Button onClick={handleAddRow} type="primary">
                        Tambah Baris
                    </Button>
                    <Button onClick={handleSaveData} type="primary" loading={saving}>
                        Simpan Data
                    </Button>
                    <Tooltip title="Undo">
                        <Button onClick="#" type="default" icon={<UndoOutlined />} />
                    </Tooltip>
                    {selectedRowKeys.length > 0 && (
						<Button
							onClick={handleDeleteBenchKurikulums}
							type="primary" danger
							style={{ marginBottom: '16px' }}
							loading={loading}
						>
							Hapus benchKurikulums Terpilih
						</Button>
					)}
                </div>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
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
    )
}

export default BenchKurikulums;