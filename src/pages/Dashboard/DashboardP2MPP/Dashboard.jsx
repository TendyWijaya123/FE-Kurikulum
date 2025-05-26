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
  const stats = useMemo(() => {
    if (Array.isArray(jurusans) && Array.isArray(prodis)) {
      return [
        { title: "Total Jurusan", value: jurusans.length, icon: <UserOutlined />, color: "#1890ff" },
        { title: "Total Prodi", value: prodis.length, icon: <BookOutlined />, color: "#52c41a" }
      ];
    }
    return [];
  }, [jurusans, prodis]);



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
        `}
      </style>
      
      <DefaultLayout title="Dashboard Kurikulum">
  {loading ? (
    <div className="flex justify-center items-center h-[50vh]">
      <Spin size="large" />
    </div>
  ) : (
    <>
      {/* Header Stats + Refresh */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6 px-4">
        <Row gutter={[16, 16]} className="flex-1 w-full lg:w-auto">
          {stats.map((stat, index) => (
            <Col xs={24} sm={12} md={12} lg={6} key={index}>
              <Card hoverable className="stat-card">
                <div className="flex justify-between items-center gap-4">
                  <div>
                    <Text type="secondary">{stat.title}</Text>
                    <Title level={3} style={{ margin: 0 }}>
                      {stat.value}{" "}
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
                    }}
                  >
                    {stat.icon}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="flex-shrink-0">
          <Button
            type="primary"
            icon={!isProcessing && <ReloadOutlined />}
            onClick={handleRefresh}
            disabled={isProcessing}
            className="flex items-center justify-center h-10 w-32"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <Progress type="circle" percent={progress} size={22} />
                <span className="text-white">Processing</span>
              </div>
            ) : (
              "Refresh"
            )}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs px-4">
        <div className="tab-container mb-4">
          <Title level={4}>
            {tabItems.find((tab) => tab.key === selectedTab)?.label || "Pilih Menu"}
          </Title>
          <Radio.Group value={selectedTab} onChange={(e) => setSelectedTab(e.target.value)} wrap>
            {tabItems.map((tab) => (
              <Radio.Button key={tab.key} value={tab.key}>
                {tab.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>

        <div className="bg-white rounded shadow p-4">
          {curriculumData && Object.keys(curriculumData).length > 0 ? (
            tabItems.find((tab) => tab.key === selectedTab)?.content
          ) : (
            <div className="text-center py-8">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Tidak Ada Data" />
            </div>
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