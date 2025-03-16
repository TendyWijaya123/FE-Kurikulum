import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, Tabs, Progress, Typography, Table, Row, Col, Radio} from 'antd';
import EvaluasiCPL from "./evaluasiCPL";

const { Text, Title } = Typography;

const DashboardComponent = ()=>{
    const cplStatusData = {
        belum: [
          "D3 Teknik Informatika",
          "D4 Teknik Informatika"
        ],
        progres: [
          "D4 Sistem Informasi",
          "D3 Teknik Elektronika",
          "D4 Teknik Elektronika",
          "D3 Manajemen Informatika"
        ],
        selesai: [
          "D3 Teknik Telekomunikasi",
          "D4 Teknik Telekomunikasi",
          "D3 Teknik Mesin"
        ]
      };

    const belumCount = cplStatusData.belum.length;
    const progresCount = cplStatusData.progres.length;
    const selesaiCount = cplStatusData.selesai.length;
    const totalCount = belumCount + progresCount + selesaiCount;

    const series = [belumCount, progresCount, selesaiCount];

    const ProdiTable = ({ status }) => {
        const data = (cplStatusData[status] || []).map((prodi, index) => ({
          key: index,
          prodi,
        }));
      
        return (
          <Table
            dataSource={data}
            columns={[{title: "Nama Prodi", dataIndex: "prodi", key: "prodi" }]}
            pagination={false}
            scroll={{ y: 140 }}
            bordered
          />
        );
      };

    const data = [
        { name: "Feb", value: 450 },
        { name: "Mar", value: 200 },
        { name: "Apr", value: 100 },
        { name: "May", value: 220 },
        { name: "Jun", value: 500 },
        { name: "Jul", value: 100 },
        { name: "Aug", value: 380 },
        { name: "Sep", value: 200 },
        { name: "Oct", value: 500 },
      ];

    return (
    <>
        <div style={{ display: "flex", gap: 20, alignItems: "stretch", width: "100%" }}>
            <Card hoverable style={{ flex: 1, minHeight: 250, background: "linear-gradient(to right, #0052D4, #4364F7, #6FB1FC)" }}>
                <Title level={4} style={{ color: "#ffffff" }}>Progres Prodi</Title>
                <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                    <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="white" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="white" stopOpacity={0.2} />
                    </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.3)" />
                    <XAxis dataKey="name" tick={{ fill: "white" }} />
                    <YAxis tick={{ fill: "white" }} />
                    <Tooltip cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} />
                    <Bar dataKey="value" fill="url(#barGradient)" barSize={30} radius={[10, 10, 0, 0]} />
                </BarChart>
                </ResponsiveContainer>
            </Card>

            <Card hoverable title="Evaluasi CPL per Prodi" style={{ flex: 1, minHeight: 100 }}>
                <EvaluasiCPL />
            </Card>
        </div>

        {/* Card tambahan untuk Chart Evaluasi CPL per Prodi */}
        <Card hoverable style={{ marginTop: 20, minHeight: 250 }}>
            <Title level={4}>Daftar Prodi</Title>
            <Tabs>
            <Tabs.TabPane tab={<span style={{ color: "#FF5252" }} >Belum Dimulai</span>} key="1">
                <ProdiTable status="belum" />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<span style={{ color: "#faad14" }}>Sedang Dikerjakan</span>} key="2">
                <ProdiTable status="progres" />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<span style={{ color: "#52c41a" }}>Selesai</span>} key="3">
                <ProdiTable status="selesai" />
            </Tabs.TabPane>
            </Tabs>
        </Card>
        
    </>
    );
};

export default DashboardComponent;