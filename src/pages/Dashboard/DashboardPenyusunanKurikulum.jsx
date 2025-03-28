import React, { useState, useEffect } from 'react';
import { Card, Select, Row, Col, Typography, Divider, Table, Space, message, Spin, Tooltip, Empty, Popconfirm } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import DefaultLayout from "../../layouts/DefaultLayout";
import Accordion from '../../components/Accordion/Accordion';

const { Title, Text } = Typography;
const { Option } = Select;

const DashboardPenyusunanKurikulum = () => {
    

  return (
    <DefaultLayout title="Dashboard Kurikulum">
       <h1>pages/Dashboard</h1>
    </DefaultLayout>
  );
};

export default DashboardPenyusunanKurikulum;