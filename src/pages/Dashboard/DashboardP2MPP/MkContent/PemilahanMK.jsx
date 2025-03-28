import React from "react";
import { Table, Typography } from "antd";
import Accordion from "../../../../components/Accordion/Accordion";

const { Title } = Typography;

const columns = [
    { title: "Kode", dataIndex: "kode", key: "kode" },
    { title: "Nama Mata Kuliah", dataIndex: "nama", key: "nama" },
    { title: "Semester", dataIndex: "semester", key: "semester" },
    { title: "SKS", dataIndex: "sks", key: "sks" },
    { title: "Teori", dataIndex: "total_teori", key: "total_teori" },
    { title: "Praktek", dataIndex: "total_praktek", key: "total_praktek" }
];

const PemilahanMK = ({ dataMatakuliah }) => {
    const categories = ["Prodi", "Nasional", "Institusi"];

    // Hitung jumlah data per kategori
    const categoryCounts = categories.map(category => ({
        category,
        count: dataMatakuliah.filter(item => item.kategori === category).length
    }));

    // Urutkan kategori berdasarkan jumlah data terkecil
    categoryCounts.sort((a, b) => a.count - b.count);

    return (
        <div>
            {categoryCounts.map(({ category }) => {
                const sortedData = dataMatakuliah
                    .filter((item) => item.kategori === category)
                    .sort((a, b) => a.sks - b.sks); // Urutkan berdasarkan SKS terkecil dulu

                return (
                    <div key={category} style={{ marginBottom: "20px" }}>
                        <Accordion title={`${category}`}>
                            <Table
                                dataSource={sortedData}
                                columns={columns}
                                rowKey="id"
                                pagination={false}
                                scroll={{ y: 400 }}
                            />
                        </Accordion>
                    </div>
                );
            })}
        </div>
    );
};

export default PemilahanMK;
