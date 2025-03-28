import React,{useState} from 'react';
import { Card, Button  } from 'antd';
import EvaluasiCPL from "./EvaluasiCPL";
import ModalDetailCPL from './ModalDetailCPL';
import ChartCard from './ChartCard';

const CplContentDashboard = ({ prodi, dataChart }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <div style={{ display: "flex", gap: 20, alignItems: "stretch", width: "100%", marginBottom: 50 }}>
                <ChartCard prodi={prodi} dataChart={dataChart} title={"CPL"} dataKey={"cpls"}/>
                <Card
                    hoverable
                    title={`Evaluasi CPL per Prodi`}
                    style={{ flex: 1, minHeight: 100 }}x
                    extra={
                        <Button type="primary" onClick={showModal}>
                            Lihat Detail
                        </Button>
                    }
                >
                    <EvaluasiCPL data={dataChart} prodiData={prodi} dataKey={"cpls"}/> 
                </Card>
            </div>
        <ChartCard prodi={prodi} dataChart={dataChart} title={"PPM"} dataKey={"ppms"}/>
        <ModalDetailCPL visible={isModalVisible} onClose={() => setIsModalVisible(false)} curriculumData={dataChart} />
        </>
        
    );
};

export default CplContentDashboard;
