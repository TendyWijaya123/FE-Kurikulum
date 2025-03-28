import React, { useMemo, useState } from "react";
import { Modal, Select, Table, Radio } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const ModalDetailCPL = ({ visible, onClose, curriculumData }) => {
    
    // Mengonversi data kurikulum ke format yang lebih mudah diakses
    const prodiData = useMemo(() => {
        return curriculumData
            ? Object.keys(curriculumData).reduce((acc, key) => {
                  const prodiObj = curriculumData[key];
                  Object.keys(prodiObj).forEach((prodiName) => {
                      acc[prodiName] = prodiObj[prodiName].cpls || [];
                  });
                  return acc;
              }, {})
            : {};
    }, [curriculumData]);

    const [selectedProdi, setSelectedProdi] = useState(null);
    const [filterStatus, setFilterStatus] = useState("all"); // Default: Semua

    const columns = [
        {
            title: "Kode",
            dataIndex: "kode",
            key: "kode",
            width: 150,
        },
        {
            title: "Keterangan",
            dataIndex: "keterangan",
            key: "keterangan",
        },
        {
            title: "Issues",
            dataIndex: "issues",
            key: "issues",
        },
        {
            title: "Status",
            key: "status",
            align: "center",
            width: 100,
            render: (record) =>
                record.issues === "CPL sesuai dengan standar." ? (
                    <CheckCircleOutlined style={{ color: "green", fontSize: "18px" }} />
                ) : (
                    <CloseCircleOutlined style={{ color: "red", fontSize: "18px" }} />
                ),
        },
    ];

    // Filter data berdasarkan status yang dipilih
    const filteredData = useMemo(() => {
        if (!selectedProdi) return [];

        return prodiData[selectedProdi].filter((item) => {
            if (filterStatus === "sesuai") {
                return item.issues === "CPL sesuai dengan standar.";
            } else if (filterStatus === "perluPerbaikan") {
                return item.issues !== "CPL sesuai dengan standar.";
            }
            return true; // Tampilkan semua jika "all"
        });
    }, [selectedProdi, filterStatus, prodiData]);

    return (
        <>
            <Modal
                title="Detail Evaluasi CPL"
                open={visible}
                onCancel={onClose}
                footer={null}
                width={1000}
                bodyStyle={{ maxHeight: "70vh", overflow: "hidden" }}
            >
                {/* Pilihan Program Studi */}
                <div style={{ marginBottom: 20 }}>
                    <Select
                        style={{ width: "100%" }}
                        placeholder="Pilih Program Studi"
                        onChange={setSelectedProdi}
                        value={selectedProdi}
                        options={Object.keys(prodiData).map((prodiName) => ({
                            label: prodiName,
                            value: prodiName,
                        }))}
                    />
                </div>

                {/* Filter Status */}
                {selectedProdi && (
                    <div style={{ marginBottom: 20, textAlign: "center" }}>
                        <Radio.Group value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <Radio.Button value="all">Semua</Radio.Button>
                            <Radio.Button value="sesuai">Sesuai ✅</Radio.Button>
                            <Radio.Button value="perluPerbaikan">Perlu Perbaikan ❌</Radio.Button>
                        </Radio.Group>
                    </div>
                )}

                {/* Tabel Data */}
                {selectedProdi && (
                    <Table
                        dataSource={filteredData}
                        columns={columns}
                        rowKey="id"
                        pagination={false}
                        scroll={{ y: 400 }}
                    />
                )}
            </Modal>
        </>
    );
};

export default ModalDetailCPL;
