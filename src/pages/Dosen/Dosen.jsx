import { useDosenData } from "../../hooks/Dosen/useDosenData";
import DefaultLayout from "../../layouts/DefaultLayout";
import { UndoOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Button, Tooltip, Spin } from 'antd';
import DosenCreateModal from "./DosenCreateModal";
import DosenEditModal from "./DosenEditModal";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const Dosen = ()=>{
    const {
        loading,
        dataSource,
        saving,
        rowSelection,
        selectedRowKeys,
        modalVisible,
        setModalVisible,
        handleUndo,
        handleDeleteDosens,
    } = useDosenData();

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedDosen, setSelectedDosen] = useState(null);

    const handleEdit = (record) => {
        setSelectedDosen({
            ...record,
            prodi: record.prodi || [], // Pastikan prodi tidak null atau undefined
        });
        setEditModalVisible(true);
    };

    const columns = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
            render: (_, __, index) => index + 1,
        },
        { title: "Kode", dataIndex: "kode", key: "kode" },
        { title: "NIP", dataIndex: "nip", key: "nip" },
        { title: "Nama", dataIndex: "nama", key: "nama" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Jenis Kelamin", dataIndex: "jenisKelamin", key: "jenisKelamin" },
        { title: "Jurusan", dataIndex: "jurusan", key: "jurusan" },
        {
            title: "Program Studi",
            dataIndex: "prodi",
            key: "prodi",
            render: (text) => (
                <div style={{ whiteSpace: "pre-line" }}>
                    {text}
                </div>
            ),
        },
        {
            title: "Aksi",
            key: "aksi",
            render: (_, record) => (
                <Tooltip title="Edit Dosen">
                    <Button 
                        icon={<EditOutlined />} 
                        onClick={() => handleEdit(record)} 
                        style={{ backgroundColor: "#FFC107", borderColor: "#FFC107", color: "white" }}
                    />
                </Tooltip>
            )            
        },
    ];    

    return (
        <DefaultLayout title='Dosen'> 
            <div style={{ padding: '24px', background: '#fff', minHeight: '100%' }}>
                <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
                    <Tooltip title="Tambah Dosen">
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setModalVisible(true)}
                        >
                            Tambah Dosen
                        </Button>
                    </Tooltip>
                    <Tooltip title="Undo">
                        <Button onClick={handleUndo} type="default" icon={<UndoOutlined />} />
                    </Tooltip>
                    {selectedRowKeys.length > 0 && (
                        <Button
                            onClick={handleDeleteDosens}
                            type="primary" danger
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
                        columns={columns}
                        pagination={{ pageSize: 5 }}
                        bordered
                    />
                )}

                <DosenCreateModal visible={modalVisible} onClose={() => setModalVisible(false)} />
                <DosenEditModal visible={editModalVisible} dosenData={selectedDosen} onClose={() => setEditModalVisible(false)} />
            </div>
        </DefaultLayout>
    );
};

export default Dosen;