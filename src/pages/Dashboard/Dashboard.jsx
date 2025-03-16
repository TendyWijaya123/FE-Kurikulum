import React, { useState }  from 'react';
import { Card, Tabs, Progress, Typography, Table, Row, Col, Radio} from 'antd';
import DefaultLayout from "../../layouts/DefaultLayout";
import { DollarCircleOutlined, UserOutlined, HeartOutlined, ShoppingOutlined } from "@ant-design/icons";
import DashboardComponent from './DashboardComponent';

const { Text, Title } = Typography;
const { Meta } = Card;

const stats = [
  { title: "Today's Sales", value: "$53,000", percent: "+30%", icon: <DollarCircleOutlined />, color: "#1890ff", percentColor: "green" },
  { title: "Today's Users", value: "3,200", percent: "+20%", icon: <UserOutlined />, color: "#1890ff", percentColor: "green" },
  { title: "New Clients", value: "+1,200", percent: "-20%", icon: <HeartOutlined />, color: "#1890ff", percentColor: "red" }
];

const PPMTab = () => <Card title="PPM Information">Detail PPM di sini</Card>;
const PTab = () => <Card title="P Information">Detail P di sini</Card>;
const VisiTab = () => <Card title="Visi Program">Detail visi di sini</Card>;
const MPTab = () => <Card title="MP Information">Detail MP di sini</Card>;

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("1");
  
  const tabItems = [
    { key: "1", label: "CPL", content: <DashboardComponent /> },
    { key: "2", label: "PPM", content: <PPMTab /> },
    { key: "3", label: "P", content: <PTab /> },
    { key: "4", label: "Visi", content: <VisiTab /> },
    { key: "5", label: "MP", content: <MPTab /> },
  ];

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
        {/* Statistik Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
          {stats.map((stat, index) => (
            <Col xs={25} sm={12} md={12} lg={6} key={index}>
              <Card hoverable className="stat-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* Wrapper teks & ikon */}
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  {/* Kiri: Teks */}
                  <div>
                    <Text type="secondary">{stat.title}</Text>
                    <Title level={3} style={{ margin: 0 }}>
                      {stat.value}{" "}
                      <Text style={{ color: stat.percentColor, fontSize: 16 }}>{stat.percent}</Text>
                    </Title>
                  </div>
  
                  {/* Kanan: Icon */}
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
                      marginLeft: 35
                    }}
                  >
                    {stat.icon}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
  
        {/* Tabs Container */}
        <div className="dashboard-tabs">
          <div className="tab-container">
            <Title level={4} style={{ margin: 0 }}>
              Pilih Menu:
            </Title>
            <Radio.Group value={selectedTab} onChange={(e) => setSelectedTab(e.target.value)}>
              {tabItems.map((tab) => (
                <Radio.Button key={tab.key} value={tab.key}>
                  {tab.label}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
  
          {/* Render Content Sesuai Pilihan */}
          <div style={{ marginTop: 20, padding: 15 }}>
            {tabItems.find((tab) => tab.key === selectedTab)?.content}
          </div>
        </div>
      </DefaultLayout>
    </>
  );  
};

export default Dashboard;
