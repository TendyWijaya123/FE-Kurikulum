import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, Typography } from 'antd';
import EvaluasiCPL from "./evaluasiCPL";
import { useDashboardData } from '../../hooks/Dashboard/useDashboardData';

const { Title } = Typography;

const DashboardComponent = ({ prodi, dataChart, title, dataKey }) => {
    const data = prodi
        .map((item, index) => {
            const i = index + 1;
            const prodiName = item.name;
            const chartData = dataChart[i] && dataChart[i][prodiName] ? dataChart[i][prodiName][dataKey] : [];
            return {
                name: prodiName,
                value: chartData?.length || 0,
            };
        })
        .filter(item => item.value > 0); 

    return (
        <>
            <div style={{ display: "flex", gap: 20, alignItems: "stretch", width: "100%" }}>
                <Card hoverable style={{ flex: 1, minHeight: 250, background: "linear-gradient(to right, #0052D4, #4364F7, #6FB1FC)" }}>
                    <Title level={4} style={{ color: "#ffffff" }}>{title}</Title>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                            <defs>
                                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="white" stopOpacity={0.8} />
                                    <stop offset="100%" stopColor="white" stopOpacity={0.2} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.3)" />
                            <XAxis 
                                dataKey="name" 
                                tick={{ fill: "white" }} 
                                interval={0}  
                                angle={-30}  
                                textAnchor="end" 
                            />
                            <YAxis tick={{ fill: "white" }} />
                            <Tooltip cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} />
                            <Bar dataKey="value" fill="url(#barGradient)" barSize={30} radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                <Card hoverable title={`Evaluasi ${title} per Prodi`} style={{ flex: 1, minHeight: 100 }}>
                    <EvaluasiCPL data={dataChart} prodiData={prodi} dataKey={dataKey} />
                </Card>
            </div>
        </>
    );
};

export default DashboardComponent;
