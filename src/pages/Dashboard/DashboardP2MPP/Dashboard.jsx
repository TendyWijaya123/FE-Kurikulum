import React, { useState, useMemo  }  from 'react';
import { Card, Spin, Progress, Typography, Table, Alert, Row, Col, Radio } from 'antd';
import DefaultLayout from "../../../layouts/DefaultLayout";
import { BookOutlined, UserOutlined, HeartOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useDashboardData } from '../../../hooks/Dashboard/useDashboardData';
import CplContentDashboard from '../CplContent/CplContentDashboard';

const { Text, Title } = Typography;
const { Meta } = Card;

const Dashboard = () => {
  const {
    loading,
    curriculumData,
    isProcessing,
    progress,
    filteredProdi,
    jurusans,
    prodis,
    jurusanId,
    selectedProdi,
    setJurusanId,
    handleJurusanChange,
  } = useDashboardData();

  const [selectedTab, setSelectedTab] = useState("1");
  
  const stats = [
    { title: "Total Jurusan", value: jurusans.length, icon: <UserOutlined />, color: "#1890ff" },
    { title: "Total Prodi", value: prodis.length, icon: <BookOutlined />, color: "#52c41a" }
  ];
  
  
  const tabItems = useMemo(() => [
    ...(curriculumData && Object.keys(curriculumData).length > 0
      ? [
          { key: "1", label: "CPL", content: <CplContentDashboard prodi={filteredProdi} dataChart={curriculumData} title="Progres CPL" dataKey="cpls" /> },
          { key: "2", label: "PPM", content: <CplContentDashboard prodi={filteredProdi} dataChart={curriculumData} title="Progres PPM" dataKey="ppms" /> },
          { key: "3", label: "Mata Kuliah", content: <CplContentDashboard prodi={filteredProdi} dataChart={curriculumData} title="Progres Mata Kuliah" dataKey="cpl" /> },
      ]
      : []),
  ], [curriculumData, filteredProdi]);

  return (
    <>
      <style>
        {`
          .dashboard-container {
            background: #F4F6F9;
            min-height: 100vh;
            padding: 20px;
          }
  
          .dashboard-tabs {
            background-color: #FFFFFF !important;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
          }
  
          .stat-card {
            border-radius: 10px !important;
            box-shadow: 0px 4px 10px rgba(0,0,0,0.1) !important;
          }
  
          .tab-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 20px;
            margin-right: 20px;
          }
  
          .ant-radio-button-wrapper {
            border-radius: 8px !important;
            transition: all 0.3s;
          }
  
          .ant-radio-button-wrapper:hover {
            background: rgba(0, 0, 255, 0.1);
          }
        `}
      </style>
      
      <DefaultLayout title="Dashboard Kurikulum">
        {isProcessing && (
          <div style={{ marginBottom: 20 }}>
            <Alert message="Pemrosesan data sedang berjalan..." type="info" showIcon />
            <Progress percent={progress} status={progress === 100 ? "success" : "active"} />
          </div>
        )}

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
            <Spin size='large'  />
          </div>
        ) : (
          <>
        <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
          {stats.map((stat, index) => (
            <Col xs={25} sm={12} md={12} lg={6} key={index}>
              <Card hoverable className="stat-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div>
                    <Text type="secondary">{stat.title}</Text>
                    <Title level={3} style={{ margin: 0 }}>
                      {stat.value} {" "}
                      <Text style={{ color: stat.percentColor, fontSize: 16 }}>{stat.percent}</Text>
                    </Title>
                  </div>
  
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: stat.color,
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      fontSize: 24,
                      marginLeft: 60
                    }}
                  >
                    {stat.icon}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
  
        <div className="dashboard-tabs">
          <div className="tab-container">
            <Title level={4} style={{ marginLeft: 20 }}>
                {tabItems.find((tab) => tab.key === selectedTab)?.label || "Pilih Menu"}
            </Title>
            <Radio.Group value={selectedTab} onChange={(e) => setSelectedTab(e.target.value)}>
              {tabItems.map((tab) => (
                <Radio.Button key={tab.key} value={tab.key}>
                  {tab.label}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
  
          <div style={{ marginTop: 20, padding: 15 }}>
            {tabItems.find((tab) => tab.key === selectedTab)?.content}
          </div>
        </div>
        </>
        )}
      </DefaultLayout>
    </>
  );  
};

export default Dashboard;