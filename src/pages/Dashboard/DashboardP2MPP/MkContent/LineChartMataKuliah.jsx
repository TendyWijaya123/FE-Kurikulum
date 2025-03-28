import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Typography, Empty, Spin } from "antd";
import Accordion from "../../../../components/Accordion/Accordion";
import SebaranMKTable from "./SebaranMKTable";
import PemilahanMK from "./PemilahanMK";
import { useMatakuliahDashboard } from "../../../../hooks/Dashboard/useMatakuliahDashboard";

const { Title } = Typography;

const LineChartMataKuliah = ({ prodiData, data}) => {
    const {fetchMatakuliahDetail, dataMatakuliahDetail, loadingDetail} = useMatakuliahDashboard();
    const [sksTeori, setSksTeori] = useState(0);
    const [sksPraktek, setSksPraktek] = useState(0);
    const [totalSks, setTotalSks] = useState(0);
    const [selectedProdi, setSelectedProdi] = useState(null)

    if (!data) return null;

    const categories = ["Institusi", "Nasional", "Prodi"];
    const prodiList = prodiData.map((prodi) => ({ id: prodi.id, name: prodi.name }));

    const seriesData = categories.map((category) => ({
        name: category,
        data: prodiList.map((prodi) => {
            const prodiData = data.data[prodi.name]; // Pastikan nama prodi cocok dengan key di data
            return prodiData ? prodiData[category] : 0;
        }),
    }));

    

    useEffect(() => {
        updateMataKuliah();
    }, [dataMatakuliahDetail]);

    const updateMataKuliah = () => {
        if (dataMatakuliahDetail) {
            const teori =dataMatakuliahDetail.reduce((acc, mk) => acc + mk.total_teori, 0);
            const praktek = dataMatakuliahDetail.reduce((acc, mk) => acc + mk.total_praktek, 0);
            setSksTeori(teori);
            setSksPraktek(praktek);
            setTotalSks(teori + praktek);

        } else {
            setSksTeori(0);
            setSksPraktek(0);
            setTotalSks(0);
        }
    };

    const handleChartClick = (dataPointIndex) => {
        const clickedProdi = prodiList[dataPointIndex];
        fetchMatakuliahDetail(clickedProdi.id);
        setSelectedProdi(clickedProdi.name);
    };

    const chartOptions = {
        chart: {
            type: "bar",
            height: 500,
            toolbar: { show: true },
            stacked: true,
            zoom: { enabled: true },
            events: {
                dataPointSelection: (event, chartContext, config) => {
                    const { dataPointIndex } = config;
                    handleChartClick(dataPointIndex);
                },
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 5,
                dataLabels: { position: "top" },
            },
        },
        xaxis: {
            categories: prodiList.map((prodi) => prodi.name), 
            labels: { rotate: -45 },
            tickAmount: prodiList.length > 10 ? 10 : prodiList.length,
        },
        yaxis: {
            min: 0,
            title: { text: "Jumlah Mata Kuliah" },
        },
        colors: ["#007bff", "#28a745", "#ff4d4f"],
        stroke: { width: 2, curve: "smooth" },
    };

    const donutChartOptions = {
        chart: { type: "donut" },
        labels: ["SKS Teori", "SKS Praktek"],
        colors: ["#007bff", "#ff4d4f"],
        legend: { position: "bottom" },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: "Total SKS",
                            formatter: () => totalSks,
                        },
                    },
                },
            },
        },
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "100%",
            overflow: "hidden",
        }}>
            {/* Chart Section */}
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                maxHeight: "500px",
                overflow: "hidden",
                padding: "10px",
                borderRadius: "8px",
                background: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}>
               <div style={{ flex: 3 }}>
                    <Title level={4}>Sebaran Mata Kuliah Berdasarkan Kategori</Title>
                    <p style={{ fontSize: "12px", color: "#888" }}>
                        *Klik pada batang grafik untuk melihat detail lebih lanjut.
                    </p>
                    <ReactApexChart options={chartOptions} series={seriesData} type="bar" height={400} />
                </div>
                <div style={{
                    flex: 1,
                    padding: "10px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                    <Title level={5}>{selectedProdi}</Title>
                    <ReactApexChart key={selectedProdi} options={donutChartOptions} series={[sksTeori, sksPraktek]} type="donut" height={180} />
                </div>
            </div>

            {/* Data Tables */}
            <div style={{
                maxHeight: "600px",
                overflowY: "auto",
                padding: "10px",
                borderRadius: "8px",
                background: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}>
                {loadingDetail ? (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                        <Spin size="large" />
                        <p>Memuat data...</p>
                    </div>
                ) : dataMatakuliahDetail.length > 0 ? (
                    <>
                        <Accordion title={"Sebaran Mata Kuliah"}>
                            <SebaranMKTable dataMatakuliah={dataMatakuliahDetail} />
                        </Accordion>
                        <Accordion title={"Pemilahan Mata Kuliah"}>
                            <PemilahanMK dataMatakuliah={dataMatakuliahDetail} />
                        </Accordion>
                    </>
                ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Tidak ada data mata kuliah" />
                )}
            </div>
        </div>
    );
};

export default LineChartMataKuliah;
