import React, { useState, useMemo  }  from 'react';
import { Card, Spin, Progress, Typography, Button, Empty, Row, Col, Radio } from 'antd';
import DefaultLayout from "../../../layouts/DefaultLayout";
import { BookOutlined, UserOutlined, ReloadOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useDashboardData } from '../../../hooks/Dashboard/useDashboardData';
import CplContentDashboard from './CplContent/CplContentDashboard';
import ContentMataKuliahDashboard from './MkContent/ContentMataKuliahDashboard';

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
    handleRefresh
  } = useDashboardData();

  const [selectedTab, setSelectedTab] = useState("1");
  
  const stats = [
    { title: "Total Jurusan", value: jurusans.length, icon: <UserOutlined />, color: "#1890ff" },
    { title: "Total Prodi", value: prodis.length, icon: <BookOutlined />, color: "#52c41a" }
  ];
  
  
  const tabItems = useMemo(() => [
    ...(curriculumData && Object.keys(curriculumData).length > 0
      ? [
          { key: "1", label: "CPL-PPM", content: <CplContentDashboard prodi={filteredProdi} dataChart={curriculumData} /> },
          { key: "3", label: "Mata Kuliah", content: <ContentMataKuliahDashboard dataProdi={ prodis } dataJurusan={ jurusans } /> },
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

          .loading-bar {
            width: 100px;
            height: 5px;
            background: linear-gradient(90deg, #1890ff, #52c41a);
            background-size: 200% 100%;
            animation: loading 1.5s infinite linear;
          }

          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}
      </style>
      
      <DefaultLayout title="Dashboard Kurikulum">
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
            <Spin size='large'  />
          </div>
        ) : (
          <>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <Row gutter={[16, 16]} style={{ flex: 1 }}>
            {stats.map((stat, index) => (
              <Col xs={24} sm={12} md={12} lg={6} key={index}>
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
                        marginLeft: 60,
                      }}
                    >
                      {stat.icon}
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <Button 
            type="primary" 
            icon={<ReloadOutlined />} 
            onClick={handleRefresh} 
            loading={isProcessing}
            disabled={isProcessing}
            style={{ marginRight: 30 }}
          >
            Refresh
          </Button>
        </div>
  
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
            {isProcessing ? (
                <div style={{ textAlign: "center" }}>
                  <Progress type="circle" percent={progress ?? 0} />
                  <div className="loading-bar" style={{ margin: "10px auto" }} />
                  <p style={{ marginTop: 10 }}>Memproses data, tunggu sebentar...</p>
                </div>
              ) : (
                curriculumData && Object.keys(curriculumData).length > 0 ? (
                  tabItems.find((tab) => tab.key === selectedTab)?.content
                ) : (
                  <div style={{ textAlign: "center", padding: 20 }}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Tidak Ada Data" />
                  </div>
                )
              )}
          </div>
        </div>
        </>
        )}
      </DefaultLayout>
    </>
  );  
};

export default Dashboard;