import React, { useMemo, useState, useEffect } from "react";
import { Modal, Select, Table, Radio, Button, message } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useDashboardData } from "../../../../hooks/Dashboard/useDashboardData";
import { WarningAmberOutlined } from "@mui/icons-material";

const ModalDetailCPL = ({ visible, onClose, curriculumData }) => {
    const { handleSendNotification } = useDashboardData();
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
    const [filterStatus, setFilterStatus] = useState("all");

    const columns = [
        {
            title: "Kode",
            dataIndex: "kode",
            key: "kode",
            width: 150,
        },
        {
            title: "Deskripsi CPL",
            dataIndex: "keterangan",
            key: "keterangan",
        },
        {
            title: "Issues",
            dataIndex: "issues",
            key: "issues",
        },
        {
            title: "saran Perbaikan",
            dataIndex: "saran_perbaikan",
            key: "saran_perbaikan",
            render: (text) => (
                <span>{text || "Tidak ada saran perbaikan."}</span>
            ),
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
                    <WarningAmberOutlined style={{ color: "orange", fontSize: "18px" }} />
                ),
        },
    ];

    const filteredData = useMemo(() => {
        if (!selectedProdi) return [];

        return prodiData[selectedProdi].filter((item) => {
            if (filterStatus === "sesuai") {
                return item.issues === "CPL sesuai dengan standar.";
            } else if (filterStatus === "warning") {
                return item.issues !== "CPL sesuai dengan standar.";
            }
            return true;
        });
    }, [selectedProdi, filterStatus, prodiData]);

    const SendNotification = () => {
        if (selectedProdi) {
            const cplPerluPerbaikan = prodiData[selectedProdi].filter(
                (item) => item.issues !== "CPL sesuai dengan standar."
            );

            if (cplPerluPerbaikan.length > 0) {
                const dataToSend = {
                    prodiName: selectedProdi,
                    cpl: cplPerluPerbaikan.map((item) => ({
                        kode: item.kode,
                        keterangan: item.keterangan,
                        issues: item.issues,
                    })),
                };

                handleSendNotification(dataToSend);
            } else {
                message.warning("Tidak ada CPL yang perlu perbaikan untuk dikirim pemberitahuannya.");
            }
        } else {
            message.error("Silakan pilih program studi terlebih dahulu.");
        }
    };

    return (
        <>
            <Modal
                title="Detail Evaluasi CPL"
                open={visible}
                onCancel={onClose}
                footer={null}
                width={1000}
                styles={{ body: { maxHeight: "100vh", overflow: "hidden" } }}
            >
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

                {selectedProdi && (
                    <div style={{ marginBottom: 20, textAlign: "center" }}>
                        <Radio.Group value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <Radio.Button value="all">Semua</Radio.Button>
                            <Radio.Button value="sesuai">Sesuai ✅</Radio.Button>
                            <Radio.Button value="warning">Warning ⚠️</Radio.Button>
                        </Radio.Group>
                    </div>
                )}

                {selectedProdi && (
                    <div style={{ marginBottom: 20, textAlign: "center" }}>
                        <Button type="primary" onClick={SendNotification}>
                            Kirim Pemberitahuan
                        </Button>
                    </div>
                )}

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
