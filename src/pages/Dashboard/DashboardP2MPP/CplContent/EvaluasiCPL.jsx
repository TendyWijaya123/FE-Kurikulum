import React, { useState }  from 'react';
import { Typography,Empty} from 'antd';
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

    if (cplData.length === 0) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Tidak ada data CPL" />;
    }   
    
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
            type: "bar",
            stacked: true,
            height: 100,
            toolbar: { show: true, tools: { pan: true, zoom: true } }, // Fitur scroll & zoom
            zoom: { enabled: true },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "50%",
            },
          },
          xaxis: {
            categories: prodiList,
            labels: {
              style: { fontSize: "10px" },
              rotate: -45, // Rotasi label agar tidak bertumpuk
              hideOverlappingLabels: true,
          },
            tickAmount: prodiList.length > 5 ? 5 : prodiList.length,
          },
          yaxis: {
            min: 0,
            title: { text: "Jumlah Mata Kuliah" },
        },
          tooltip: {
            y: {
              formatter: (val) => `${val} CPL`,
            },
          },
          legend: {
            position: "top",
            horizontalAlign: "left",
          },
          stroke: { width: 2, curve: "smooth" },
        },
      };
    
      return (
          <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
      );
  };

export default EvaluasiCPL;