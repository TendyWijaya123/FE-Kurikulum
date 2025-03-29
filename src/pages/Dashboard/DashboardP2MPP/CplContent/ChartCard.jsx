import React from "react";
import { Card, Typography, Empty } from "antd";
import ReactApexChart from "react-apexcharts";

const { Title } = Typography;

const ChartCard = ({ prodi, dataChart, title, dataKey }) => {
    let totalNilai = 0;
    let totalProdiDenganData = 0;
    let totalProdiKosong = 0;

    const data = prodi.map((item, index) => {
        const i = index + 1;
        const prodiName = item.name;
        const prodiKode = item.kode;
        const chartData = dataChart[i] && dataChart[i][prodiName] ? dataChart[i][prodiName][dataKey] : [];
        const value = chartData?.length || 0;

        if (value > 0) {
            totalNilai += value;
            totalProdiDenganData++;
        } else {
            totalProdiKosong++;
        }

        return {
            kode: prodiKode,
            name: prodiName,
            value: value,
        };
    });

    const rataRata = totalProdiDenganData > 0 ? totalNilai / totalProdiDenganData : 0;

    const chartOptions = {
        chart: {
            type: "bar",
            height: 450,
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "100%",
                borderRadius: 5,
            },
        },
        xaxis: {
            categories: data.map((item) => item.kode),
            labels: {
                rotate: -45,
                style: { fontSize: "10px", colors: "#ffffff" },
            },
            tickAmount: data.length > 20 ? 20 : data.length,
            scrollbar: { enabled: data.length > 30 },
        },
            
        yaxis: {
            min: 0,
            title: { text: "Jumlah", style: { color: "#ffffff" } },
            labels: { style: { colors: "#ffffff" } },
        },
        grid: {
            borderColor: "rgba(255, 255, 255, 0.9)", // Warna grid transparan putih
            strokeDashArray: 5,
        },
        tooltip: {
            theme: "dark",
            y: {
                formatter: (val, { dataPointIndex }) => `${val} - ${data[dataPointIndex].name}`,
            },
        },
        colors: ["rgba(255,255,255,0.9)"], // Warna bar putih transparan
    };

    return (
        <Card hoverable style={{ flex: 1 }}>
            <Title level={4} style={{ color: "#000000" }}>Progres {title}</Title>
            {data.every((item) => item.value === 0) ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={`Tidak ada data untuk ${title}`} />
            ) : (
                <div style={{ maxWidth: 700, overflowX: "auto", overflowY: "hidden" }}>
                    <Card hoverable style={{ background: "linear-gradient(to right, #0052D4, #2166fe, #9a8bff)", padding: 5 }}>
                        <ReactApexChart options={chartOptions} series={[{ name: title, data: data.map((item) => item.value) }]} type="bar" height={300} />
                    </Card>
                </div>
            )}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">Progres {title}</h2>
                <p className="text-gray-500 mt-2">
                    Menunjukkan jumlah {title} tiap prodi dan menampilkan informasi program studi yang belum mengisi CPL.
                </p>
                <div className="flex gap-10 mt-4">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold"> {rataRata.toFixed(2)} </h3>
                        <p className="text-sm text-gray-500">Avg jumlah {title}</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-semibold"> {totalProdiKosong} </h3>
                        <p className="text-sm text-gray-500">Empty Prodi</p>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ChartCard;
