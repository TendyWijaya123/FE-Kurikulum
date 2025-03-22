import React, {useMemo, useState } from "react";
import { Modal, Select, Table } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";


const ModalDetailCPL = ({ visible, onClose, curriculumData }) => {
    
    const prodiData = useMemo(() => {
        return curriculumData ? Object.keys(curriculumData).reduce((acc, key) => {
            const prodiObj = curriculumData[key];
            Object.keys(prodiObj).forEach(prodiName => {
                acc[prodiName] = prodiObj[prodiName].cpls || [];
            });
            return acc;
        }, {}) : {};
    }, [curriculumData]);

    console.log(prodiData)

    const [selectedProdi, setSelectedProdi] = useState(null);

    const columns = [
        {
            title: 'Kode',
            dataIndex: 'kode',
            key: 'kode',
            width: 150
        },
        {
            title: 'Keterangan',
            dataIndex: 'keterangan',
            key: 'keterangan',
        },
        {
            title: 'Issues',
            dataIndex: 'issues',
            key: 'issues',
        },
        {
            title: 'Status',
            key: 'status',
            align: 'center',
            width: 100,
            render: (record) => 
                record.issues === "CPL sesuai dengan standar." ? 
                <CheckCircleOutlined style={{ color: "green", fontSize: "18px" }} /> : 
                <CloseCircleOutlined style={{ color: "red", fontSize: "18px" }} />
        }
    ];

    const handleProdiChange = (value) => {
        setSelectedProdi(value);
    };

    return (
        <>
            <Modal 
                title="Detail Evaluasi CPL" 
                open={visible} 
                onCancel={onClose} 
                footer={null}
                width= {1000}
                bodyStyle={{ maxHeight: "70vh", overflow: "hidden" }}
            >
                <div style={{ marginBottom: 20 }}>
                    <Select
                        style={{ width: "100%" }}
                        placeholder="Pilih Program Studi"
                        onChange={handleProdiChange}
                        value={selectedProdi}
                        options={Object.keys(prodiData).map((prodiName) => ({
                            label: prodiName,
                            value: prodiName,
                        }))}
                    />
                </div>

                {selectedProdi && (
                    <Table
                        dataSource={prodiData[selectedProdi]}
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
