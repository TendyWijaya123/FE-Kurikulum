import { useRoleData } from "../../hooks/Users/useRoleData";
import DefaultLayout from "../../layouts/DefaultLayout";
import { UndoOutlined } from '@ant-design/icons';
import { Table, Input, Button, Popconfirm, Select, Tooltip, Spin } from 'antd';

const Role = ()=>{
    const {
        role,
        loading,
        dataSource,
        saving,
        undoStack,
        rowSelection,
        selectedRowKeys,
        handleUndo,
        handleSave,
        handleAddRow,
        handleDeleteRow,
        handleSaveData,
        handleDeleteRoles,
    } = useRoleData ();

    const colums = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
            render: (_, __, index) => index + 1,
        },
        {
            title: 'Role',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Input
                    value={text}
                    onChange={(e) => handleSave({ ...record, name: e.target.value })}
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
        <DefaultLayout title='Role'> 
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
							onClick={handleDeleteRoles}
							type="primary" danger
							style={{ marginBottom: '16px' }}
							loading={loading}
						>
							Hapus Role Terpilih
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

export default Role;