import React from "react";
import useMatrixCplP from "../../../hooks/ModelKonstruksi/useMatrixCplP";
import VisibleMenu from "../../Menu/VisibleMenu";
import { Button, Table, Spin, Tooltip } from "antd";
import { SaveOutlined } from "@ant-design/icons";

const MatrixCplPTable = () => {
    const {
        cpls,
        ps,
        matrixData,
        loading,
        updateMatrix,
        handleCheckboxChange,
    } = useMatrixCplP();

    const columns = [
        {
            title: "Pengetahuan",
            children: [
                {
                    title: "Kode",
                    dataIndex: "kode",
                    key: "kode",
                    fixed: "left",
                    width: 100,
                },
                {
                    title: "Deskripsi",
                    dataIndex: "deskripsi",
                    key: "deskripsi",
                    fixed: "left",
                    width: 300,
                }
            ]
        },
        {
            title: "CPL",
            children: cpls.map((cpl) => ({
                title: (
                    <Tooltip title={cpl.keterangan}>
                        <div style={{ 
                            cursor: "pointer", 
                            whiteSpace: "nowrap", 
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            minWidth: 80
                        }}>
                            {cpl.kode}
                        </div>
                    </Tooltip>
                ),
                dataIndex: `cpl${cpl.id}`,
                key: `cpl${cpl.id}`,
                align: "center",
                width: 80,
                render: (_, record) => {
                    const isChecked = matrixData.some(
                        (item) =>
                            item.cpl_id === cpl.id &&
                            item.p_ids.includes(record.id)
                    );

                    return (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleCheckboxChange(cpl.id, record.id)}
                                style={{
                                    transform: "scale(1.5)",
                                }}
                            />
                        </div>
                    );
                }
            }))
        }
    ];

    const dataSource = ps.map(p => ({
        key: p.id,
        id: p.id,
        kode: p.kode,
        deskripsi: p.deskripsi,
    }));

    const scrollConfig = {
        x: cpls.length * 80 + 400, // Dynamic width based on number of CPL columns plus fixed columns
        y: 500,
    };

    return (
        <div className="w-full bg-white p-2">
            <div style={{ marginBottom: "10px", display: "flex", gap: "5px" }}>
                <VisibleMenu allowedRoles={["Penyusun Kurikulum"]}>
                    <Button
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={updateMatrix}
                        style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}>
                        Simpan Perubahan
                    </Button>
                </VisibleMenu>
            </div>
            <div className="matrix-table-container" style={{ overflow: "auto" }}>
                <Table
                    loading={loading}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    scroll={scrollConfig}
                    bordered
                    sticky
                    size="middle"
                />
            </div>
        </div>
    );
};

export default MatrixCplPTable;
