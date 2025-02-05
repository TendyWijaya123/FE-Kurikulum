import React, { useState } from "react";
import { Table, Button, Checkbox, Select } from "antd";
import DefaultLayout from "../../layouts/DefaultLayout";
import { usePermissionRoleData } from "../../hooks/Users/usePermissionRoleData";

const PermissionRole = () => {
    const {
        loading,
        dataSource, 
        permission,
        updating,
        handleCheckboxChange,
        handleUpdateMatrix,
    } = usePermissionRoleData();

    const columns = [
        {
            title: "Role",
            dataIndex: "rowHeader",
            key: "rowHeader",
            fixed: "left",
            align: "center",
        },
        {
        
        title: "Role Permission",
        children: permission.map((item, colIndex) => ({
            title: item.name,
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
        <DefaultLayout title="Matriks Permission Role">
            <div>
                <div style={{ marginBottom: '10px', display: 'flex', gap: '5px' }}>
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

export default PermissionRole;
