import { useDosenData } from "../../hooks/Dosen/useDosenData";
import DefaultLayout from "../../layouts/DefaultLayout";
import { UndoOutlined } from '@ant-design/icons';
import { Table, Input, Button, Popconfirm, Select, Tooltip, Spin } from 'antd';

const Dosen = ()=>{
    const {
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
        handleDeleteDosens,
    } = useDosenData ();

    const colums = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
            render: (_, __, index) => index + 1,
        },
        {
            title: "NIP",
            dataIndex: "nip",
            key: "nip",
            render: (text, record) => (
                <Input
                    value={text}
                    onChange={(e) => handleSave({ ...record, nip: e.target.value })}
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
            title: "Nama",
            dataIndex: "nama",
            key: "nama",
            render: (text, record) => (
                <Input
                    value={text}
                    onChange={(e) => handleSave({ ...record, nama: e.target.value })}
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
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (text, record) => (
                <Input
                    type="email"
                    value={text}
                    onChange={(e) => handleSave({ ...record, email: e.target.value })}
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
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (text, record) => (
                <Select
                    value={text}
                    onChange={(value) => handleSave({ ...record, role: value })}
                    style={{ width: "100%" }}
                >
                    <Option value="1">Admin</Option>
                    <Option value="2">Dosen</Option>
                    <Option value="3">Mahasiswa</Option>
                </Select>
            ),
        },
        {
            title: "Aksi",
            key: "aksi",
            render: (_, record) => (
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
            ),
        },
    ];    

    return (
        <DefaultLayout title='Dosen'> 
            <div style={{ padding: '24px', background: '#fff', minHeight: '100%' }}>
                <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
                    <>
                        <Button onClick={handleAddRow} type="primary">
                            Tambah Baris
                        </Button>
                        <Button onClick={handleSaveData} type="primary" loading={saving}>
                            Simpan Data
                        </Button>
                        <Tooltip title="Undo">
                            <Button onClick={handleUndo} type="default" icon={<UndoOutlined />} />
                        </Tooltip>
                    </>
                    {selectedRowKeys.length > 0 && (
						<Button
							onClick={handleDeleteDosens}
							type="primary" danger
							style={{ marginBottom: '16px' }}
							loading={loading}
						>
							Hapus Dosen Terpilih
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

export default Dosen;