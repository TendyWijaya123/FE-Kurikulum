import React, { useState }  from 'react';
import { Card, Tabs, Progress, Typography, Table, Row, Col, Radio} from 'antd';
import ReactApexChart from 'react-apexcharts';


const EvaluasiCPL = ({data, prodiData}) => {
    const cplData = prodiData.map((prodi, index) => {
        const hasil = [];
        const prodiName = prodi.name;
        const i = index + 1;
    
        if (!data[i] || !data[i][prodiName]) {
            return []; 
        }
    
        if (data[i][prodiName]?.cpls) {
            const cpls = data[i][prodiName].cpls;
    
            const jumlahBenar = cpls.filter(
                (cpl) => cpl.issues === "CPL sesuai dengan standar."
            ).length;
            const jumlahSalah = cpls.length - jumlahBenar;
    
            if (jumlahBenar > 0) {
                hasil.push({ prodi: prodiName, kategori: "Sesuai", jumlah: jumlahBenar });
            }
            if (jumlahSalah > 0) {
                hasil.push({ prodi: prodiName, kategori: "Salah", jumlah: jumlahSalah });
            }
        }
    
        return hasil;
    })
    .flat()
    .filter(Boolean); 
    
    const { Text, Title } = Typography;
    // Mengelompokkan data berdasarkan prodi
    const prodiList = [...new Set(cplData.map((item) => item.prodi))];
    
    const benarData = prodiList.map(
        (prodi) => cplData.find((d) => d.prodi === prodi && d.kategori === "Sesuai")?.jumlah || 0
    );
    const salahData = prodiList.map(
        (prodi) => cplData.find((d) => d.prodi === prodi && d.kategori === "Salah")?.jumlah || 0
    );

    const chartData = {
        series: [
          {
            name: "Sesuai",
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
            tickAmount: prodiList.length > 5 ? 5 : prodiList.length,
          },
          yaxis: {
            min : 0,
            title: { text: "Jumlah" },
          },
          tooltip: {
            y: {
              formatter: (val) => `${val} CPL`,
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