import React, { useState } from "react";
import { Table, Button, Checkbox } from "antd";
import DefaultLayout from "../../layouts/DefaultLayout";
import { useMatriksCplIeaData } from "../../hooks/useMatriksCplIeaData";

const MatriksCplHasIea = () => {
    const {
        dataSource, 
        iea,
        handleCheckboxChange,
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
                <Table
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
