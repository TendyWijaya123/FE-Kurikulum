import React, { useState } from "react";
import { Table, Button, Checkbox, Select,  Tooltip, Popconfirm } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons';
import DefaultLayout from "../../layouts/DefaultLayout";
import { useMatriksMpPMkData } from "../../hooks/useMatriksMpPMkData";
import { useNavigate } from 'react-router-dom';

const MatriksMpPMk = () => {
    const {
        selectedProdi,
        prodiDropdown,
        updating,
        dataSource,
        loading,
        pengetahuan,
        mks,
        handleDropdownChange,
        handleUpdateMatrix,
        handleProdiChange
    } = useMatriksMpPMkData();

    const navigate = useNavigate();


    const columns = [
        {
            title: "Materi Pembelajaran",
            dataIndex: "materiPembelajaran",
            key : 'materiPembelajaran',
            width: 150,
            onCell: () => ({
                style: { backgroundColor: "#f1f1f1", wordBreak: "break-word" },
            }),
            fixed : 'left'
        },
        {
            title: "Cognitif Proses",
            dataIndex: "cognitifProses",
            key : 'cognitifProses',
            width: 150,
            fixed : 'left',
            onCell: () => ({
                style: { backgroundColor: "#f5f5f5", whiteSpace: "normal", wordBreak: "break-word" },
            }),
        },
        {
            title: "Knowledge Dimension",
            dataIndex: "knowledgeDimension",
            key : 'knowledgeDimension',
            width: 150,
            fixed : 'left',
            onCell: () => ({
                style: { backgroundColor: "#f5f5f5", whiteSpace: "normal", wordBreak: "break-word" },
            }),
        },
        {
        
        title: "Materi Pembelajaran yang Ditunjang Pengetahuan untuk mendukung CPL",
        children: pengetahuan.map((item, colIndex) => ({
            title: item.kode_pengetahuan,
            dataIndex: `col${colIndex + 1}`,
            key: `col${colIndex + 1}`,
            align: "center",
            width: 100,
            onCell: () => ({
                style: { whiteSpace: 'normal', wordBreak: 'break-word' }
            }),
            render: (cell, _, rowIndex) => {
                if (cell.enabled) {
                    const selectedIds = cell.mata_kuliahs.map((mk) => mk.id);
                    
                    // Filter opsi untuk dropdown
                    const filteredOptions = mks.filter((mk) => !selectedIds.includes(mk.id) || cell.mata_kuliahs.some((m) => m.id === mk.id));
                    return (
                        <Select
                            mode="multiple"
                            value={cell.mata_kuliahs.map((mk) => mk.id)}
                            style={{ width: 150 }}
                            onChange={(value) => handleDropdownChange(rowIndex, colIndex, value, cell.relationId)}
                        >
                            {filteredOptions.map((mk) => (
                                <Option key={mk.id} value={mk.id}>
                                    {mk.nama}
                                </Option>
                            ))}
                        </Select>
                    );
                } else {
                    return (
                        <span style={{ color: '#999', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Tidak Tersedia
                            <Tooltip title="Pada matriks pengetahuan dan materi pembelajaran untuk cell ini tidak aktif, klik untuk menambahkan!!">
                                <Popconfirm
                                    title="Tambahkan hubungan untuk pengetahuan dan materi pembelajaran terkait"
                                    onConfirm={() => {
                                        navigate('/matriks-p-mp');
                                    }}
                                    okText="Tambah"
                                    cancelText="Batal"
                                >
                                    <InfoCircleOutlined style={{ color: '#1890ff', cursor: 'pointer' }} />
                                </Popconfirm>
                            </Tooltip>
                        </span>
                    );
                }
            },
        })),
        },
    ];

    return (
        <DefaultLayout title="Matriks MP P MK">
            <div>
                <div style={{ marginBottom: '10px', display: 'flex', gap: '5px' }}>
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
                        <>
                          <Button
                                onClick={handleUpdateMatrix}
                                type="primary"
                                style={{ marginBottom: '10px' }}
                                loading={updating}
                            >
                                simpan perubahan
                            </Button>`
                            </>
                    )}
                </div>
                <Table
                    loading={loading}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    bordered
                    scroll={{ x: "max-content" }}
                />
            </div>
        </DefaultLayout>
    );
};

export default MatriksMpPMk;
