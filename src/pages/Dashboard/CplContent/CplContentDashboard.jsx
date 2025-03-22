import React,{useState} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, Typography, Button, Modal  } from 'antd';
import EvaluasiCPL from "./evaluasiCPL";
import { useDashboardData } from '../../../hooks/Dashboard/useDashboardData';
import ModalDetailCPL from './modalDetailCPL';

const { Title } = Typography;

const CplContentDashboard = ({ prodi, dataChart, title, dataKey }) => {
    let totalNilai = 0;
    let totalProdiDenganData = 0;
    let totalProdiKosong = 0;
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const data = prodi
        .map((item, index) => {
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
                value: chartData?.length || 0,
            };
        })
        .filter(item => item.value > 0); 

        const rataRata = totalProdiDenganData > 0 ? totalNilai / totalProdiDenganData : 0;

    return (
        <>
            <div style={{ display: "flex", gap: 20, alignItems: "stretch", width: "100%" }}>
                <Card hoverable style={{ flex: 1 }}>
                    <Title level={4} style={{ color: "#000000" }}>{title}</Title>
                    <Card hoverable style={{minHeight: 150, background: "linear-gradient(to right, #0052D4, #2166fe, #9a8bff)" }}>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={data} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="white" stopOpacity={1} />
                                        <stop offset="100%" stopColor="white" stopOpacity={0.7} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.9)" />
                                <XAxis 
                                    dataKey="kode" 
                                    tick={{ fill: "white" }} 
                                    interval={0}  
                                    angle={-5}  
                                    textAnchor="end" 
                                />
                                <YAxis tick={{ fill: "white" }} />
                                <Tooltip 
                                cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} 
                                formatter={(value, name, props) => [value, props.payload.name]} 
                            />
                                <Bar dataKey="value" fill="url(#barGradient)" barSize={30} radius={[10, 10, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold">Progres CPL</h2>
                        {/* <p className="text-sm text-gray-600">
                            than last week <span className="text-green-500 font-bold">+30%</span>
                        </p> */}
                        <p className="text-gray-500 mt-2">
                            Menunjukan data jumlah cpl tiap prodi dan menunjukan informasi program studi yang belum mengisi cpl 
                        </p>
                        
                        <div className="flex gap-10 mt-4">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold"> {rataRata.toFixed(2)} </h3>
                                <p className="text-sm text-gray-500">Avg Score</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-semibold"> {totalProdiKosong} </h3>
                                <p className="text-sm text-gray-500">Empty Prodi</p>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card
                    hoverable
                    title={`Evaluasi ${title} per Prodi`}
                    style={{ flex: 1, minHeight: 100 }}x
                    extra={
                        <Button type="primary" onClick={showModal}>
                            Lihat Detail
                        </Button>
                    }
                >
                    <EvaluasiCPL data={dataChart} prodiData={prodi} dataKey={dataKey}/> 
                </Card>
                <ModalDetailCPL visible={isModalVisible} onClose={() => setIsModalVisible(false)} curriculumData={dataChart} />
            </div>
        </>
        
    );
};

export default CplContentDashboard;
