import React, { useState } from "react";
import { Button, Dropdown, Menu, Row, Col, Empty, Spin } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useMatakuliahDashboard } from "../../../../hooks/Dashboard/useMatakuliahDashboard";
import LineChartMataKuliah from "./LineChartMataKuliah";

const ContentMataKuliahDashboard = ({ dataProdi, dataJurusan }) => {
    const {
        dataMatakuliah,
        loading,
        selectedJurusan,
        setSelectedJurusan,
        fetchMatakuliahFilter,
    } = useMatakuliahDashboard();

    const handleJurusanChange = (jurusanId) => {
        setSelectedJurusan(jurusanId);
        fetchMatakuliahFilter(jurusanId);
    };

    // Filter daftar prodi berdasarkan jurusan yang dipilih
    const filteredProdi = selectedJurusan
        ? dataProdi.filter((prodi) => prodi.jurusan_id === selectedJurusan)
        : dataProdi;

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                <Spin size="large" />
            </div>
        );
    }

    // Dropdown menu untuk memilih jurusan
    const menu = (
        <Menu>
            {dataJurusan.map((jurusan) => (
                <Menu.Item key={jurusan.id} onClick={() => handleJurusanChange(jurusan.id)}>
                    {jurusan.nama}
                </Menu.Item>
            ))}
            <Menu.Item key="reset" onClick={() => setSelectedJurusan(null)} style={{ color: "red" }}>
                Reset Filter
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <Row gutter={16} style={{ marginBottom: "20px" }} align="middle">
                <Col span={12}>
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <Button icon={<FilterOutlined />}>
                            {selectedJurusan
                                ? `Filter: ${dataJurusan.find((j) => j.id === selectedJurusan)?.nama}`
                                : "Filter Jurusan"}
                        </Button>
                    </Dropdown>
                </Col>
            </Row>

            <div>
                {dataMatakuliah && dataMatakuliah.data ? (
                    <LineChartMataKuliah prodiData={filteredProdi} data={dataMatakuliah} />
                ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            </div>
        </>
    );
};

export default ContentMataKuliahDashboard;
