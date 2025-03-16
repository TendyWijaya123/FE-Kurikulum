import React, { useState }  from 'react';
import { Card, Tabs, Progress, Typography, Table, Row, Col, Radio} from 'antd';
import ReactApexChart from 'react-apexcharts';

const cplData = [
    { prodi: "D4 Sistem Informasi", kategori: "Benar", jumlah: 2 },
    { prodi: "D4 Sistem Informasi", kategori: "Salah", jumlah: 4 },
    { prodi: "D3 Teknik Elektronika", kategori: "Benar", jumlah: 4 },
    { prodi: "D3 Teknik Elektronika", kategori: "Salah", jumlah: 2 },
    { prodi: "D3 Teknik Telekomunikasi", kategori: "Salah", jumlah: 4 },
    { prodi: "D3 Teknik Telekomunikasi", kategori: "Benar", jumlah: 6 },
  ];
  
const { Text, Title } = Typography;
  // Mengelompokkan data berdasarkan prodi
const prodiList = [...new Set(cplData.map((item) => item.prodi))];

const benarData = prodiList.map(
(prodi) => cplData.find((d) => d.prodi === prodi && d.kategori === "Benar")?.jumlah || 0
);
const salahData = prodiList.map(
(prodi) => cplData.find((d) => d.prodi === prodi && d.kategori === "Salah")?.jumlah || 0
);

const EvaluasiCPL = () => {
    const chartData = {
        series: [
          {
            name: "Benar",
            data: benarData,
            color: "#007bff", // Biru untuk benar
          },
          {
            name: "Perlu Perbaikan",
            data: salahData,
            color: "#ff4d4f", // Merah untuk salah
          },
        ],
        options: {
          chart: {
            type: "line",
            height: 100,
            toolbar: { show: false },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "50%",
            },
          },
          xaxis: {
            categories: prodiList,
            labels: { style: { fontSize: "12px" } },
          },
          yaxis: {
            title: { text: "Jumlah" },
          },
          tooltip: {
            y: {
              formatter: (val) => `${val} jawaban`,
            },
          },
          legend: {
            position: "top",
            horizontalAlign: "right",
          },
        },
      };
    
      return (
          <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={250} />
      );
  };

export default EvaluasiCPL;