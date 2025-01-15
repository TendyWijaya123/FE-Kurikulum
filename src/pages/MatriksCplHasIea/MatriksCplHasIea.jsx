import React, { useState } from "react";
import { Table, Button, Checkbox, Select } from "antd";
import DefaultLayout from "../../layouts/DefaultLayout";
import { useMatriksCplIeaData } from "../../hooks/useMatriksCplIeaData";

const MatriksCplHasIea = () => {
    const {
        selectedProdi,
        prodiDropdown,
        loading,
        dataSource, 
        iea,
        updating,
        handleCheckboxChange,
        handleUpdateMatrix,
        handleProdiChange
    } = useMatriksCplIeaData();

    const columns = [
        {
            title: "CPL",
            dataIndex: "rowHeader",
            key: "rowHeader",
            fixed: "left",
            align: "center",
        },
        {
        
        title: "CPL Berdasarkan IEA",
        children: iea.map((item, colIndex) => ({
            title: item.code,
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
        <DefaultLayout title="Matriks CPL Berdasarkan IEA">
            <div>
                <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
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
                                style={{ marginBottom: '16px' }}
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

export default MatriksCplHasIea;
