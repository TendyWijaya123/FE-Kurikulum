import React from "react";
import { Modal, Table } from "antd";

const ModalKkni = ({ modalType, isModalVisible, handleModalClose, dataSource }) => {
    const modalColumns = [
        {
            title: "Level",
            dataIndex: "level",
            key: "level",
            width: 70
        },
        {
            title: modalType === "pengetahuan" ? "Pengetahuan KKNI" : "Kemampuan Kerja KKNI",
            dataIndex: modalType === "pengetahuan" ? "pengetahuan_kkni" : "kemampuan_kerja_kkni",
            key: modalType === "pengetahuan" ? "pengetahuan_kkni" : "kemampuan_kerja_kkni",
        },
        {
            title: "Jenjang",
            dataIndex: "jenjang",
            key: "jenjang",
            width: 150
        },
    ];

    return (
        <Modal
        title={modalType === "pengetahuan" ? "Pengetahuan KKNI" : "Kemampuan Kerja KKNI"}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
        style={{ top: 80 }} // Memberikan sedikit margin top untuk modal
    >
        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>  {/* Membatasi scroll container di dalam modal */}
            <Table
                dataSource={dataSource}
                columns={modalColumns}
                pagination={false}
                rowKey={(record) => record.id || record.key} // Pastikan setiap record memiliki key unik
                scroll={{ y: false }} // Menonaktifkan scroll internal Table
            />
        </div>
    </Modal>
    );
};

export default ModalKkni;
