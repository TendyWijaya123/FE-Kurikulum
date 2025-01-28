import React, { useState } from "react";
import { Table, Button, Checkbox, Select } from "antd";
import DefaultLayout from "../../layouts/DefaultLayout";
import { useMatriksPengetahuanMpData } from "../../hooks/useMatrixPengetahuanMp";

const MatriksPHasMp = () => {
    const {
        selectedProdi,
        prodiDropdown,
        loading,
        dataSource, 
        pengetahuan,
        updating,
        handleCheckboxChange,
        handleUpdateMatrix,
        handleProdiChange
    } = useMatriksPengetahuanMpData();


    const columns = [
        {
            title: "MateriPembelajaran",
            dataIndex: "MateriPembelajaran",
            children : [
                {
                    title: "Kode",
                    dataIndex: "kode",
                    key: "kode",
                    fixed: "left",
                    align: "center",
                    width: 100, // Atur lebar kolom Kode
                },
                {
                    title: "Deskripsi",
                    dataIndex: "deskripsi",
                    key: "deskripsi",
                    fixed: "left",
                    align: "center",
                    width: 300, // Atur lebar kolom Deskripsi
                },
            ]
        },
        {
        
        title: "Pengetahuan (P)",
        children: pengetahuan.map((item, colIndex) => ({
            title: item.kode_pengetahuan,
            dataIndex: `col${colIndex + 1}`,
            key: `col${colIndex + 1}`,
            align: "center",
            render: (_, record) => (
            <Checkbox
                checked={record[`col${colIndex + 1}`]}
                onChange={(e) =>
                handleCheckboxChange(record.key - 1, colIndex, e.target.checked)
                }
            />
            ),
        })),
        },
    ];

    return (
        <DefaultLayout title="Matriks Materi Pembelajaran dan Pengetahuan">
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

export default MatriksPHasMp;
