import React, { useState, useEffect } from 'react';
import { Card, Select, Row, Col, Typography, Divider, Table, Space, message, Spin, Button, Empty } from 'antd';
import { 
  BookOutlined, 
  AimOutlined, 
  EyeOutlined, 
  BulbOutlined, 
  ReadOutlined,
  ReloadOutlined 
} from '@ant-design/icons';
import DefaultLayout from "../layouts/DefaultLayout";
import { useDashboardData } from '../hooks/useDashboardData';
import Accordion from '../components/Accordion/Accordion';

const { Title, Text } = Typography;
const { Option } = Select;

const Dashboard = () => {
    const {
        loading,
        curriculumData,
        filteredProdi,
        jurusans,
        jurusanId,
        selectedProdi,
        handleJurusanChange,
        handleProdiChange,
    } = useDashboardData();

  const cplColumns = [
    { title: 'Kode', dataIndex: 'kode', key: 'kode', width: '30%' },
    { title: 'Keterangan', dataIndex: 'keterangan', key: 'keterangan', width: '70%' }
  ];

  const ppmColumns = [
    { title: 'Kode', dataIndex: 'kode', key: 'kode', width: '30%' },
    { title: 'Deskripsi', dataIndex: 'deskripsi', key: 'deskripsi', width: '70%' }
  ];

  const pengetahuanColumns = [
    { title: 'Kode', dataIndex: 'kode_pengetahuan', key: 'kode_pengetahuan', width: '30%' },
    { title: 'Deskripsi', dataIndex: 'deskripsi', key: 'deskripsi', width: '70%' }
  ];

  const materiColumns = [
    { title: 'Kode', dataIndex: 'code', key: 'code', width: '20%' },
    { title: 'Deskripsi', dataIndex: 'description', key: 'description', width: '50%' },
    { title: 'Proses Kognitif', dataIndex: 'cognitif_proses', key: 'cognitif_proses', width: '30%' },
    {
        title: 'Knowledge Dimension',
        dataIndex: 'knowledge_dimension',
        key: 'knowledge_dimension',
        width: '30%',
        render: (knowledge) => 
          knowledge && Array.isArray(knowledge)
            ? knowledge.map(item => item.code).join(', ') 
            : '-'
      }      
  ];

  return (
    <DefaultLayout title="Dashboard Kurikulum">
      <div style={{ padding: '24px', background: '#fff', minHeight: '100%' }}>
        <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
          <Select
            placeholder="Pilih Jurusan"
            style={{ width: 200 }}
            onChange={handleJurusanChange}
            allowClear
            value={jurusanId}
          >
            {Array.isArray(jurusans) && jurusans.map(jurusan => (
              <Option key={jurusan.id} value={jurusan.id}>
                {jurusan.nama_jurusan || jurusan.nama}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Pilih Program Studi"
            style={{ width: 200 }}
            onChange={handleProdiChange}
            allowClear
            disabled={!jurusanId}
            value={selectedProdi}
          >
            {Array.isArray(filteredProdi) && filteredProdi.map(prodi => (
              <Option key={prodi.id} value={prodi.id}>
                {prodi.name}
              </Option>
            ))}
          </Select>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <Spin size="large" />
          </div>
        ) : (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <Accordion title = 'Visi & Misi Program Studi'>
                    <Card
                        bordered
                    >
                    {curriculumData?.visi_misi ? (
                        <>
                        <Title level={4}>Visi</Title>
                        <Text>{curriculumData.visi_misi.visi_jurusan}</Text>
                        <Divider />
                        <Title level={4}>Visi Keilmuan</Title>
                        <Text>{curriculumData.visi_misi.visi_keilmuan_prodi}</Text>
                        <Divider />
                        <Title level={4}>Misi</Title>
                        <ul>
                            {Array.isArray(curriculumData.visi_misi.misiJurusans) && 
                            curriculumData.visi_misi.misiJurusans.map((misi, index) => (
                                <li key={misi.id}>{misi.deskripsi}</li>
                            ))}
                        </ul>
                        </>
                    ) : (
                        <div style={{
                            textAlign: "center",
                            padding: "20px",
                            borderRadius: "8px"
                        }}>
                            <Empty description="Data Visi & Misi Tidak Tersedia" />
                        </div>
                    )}
                    </Card>
                </Accordion>
              </Col>

              <Col xs={24} lg={12}>
                <Accordion title = 'Capaian Pembelajaran Lulusan (CPL)'>
                    <Card 
                    bordered
                    >
                    <Table 
                        columns={cplColumns}
                        dataSource={curriculumData?.cpls || []}
                        rowKey="id"
                        size="small"
                        pagination={{ pageSize: 5 }}
                        bordered
                    />
                    </Card>
                </Accordion>
              </Col>

              <Col xs={24} lg={12}>
                <Accordion title='Profil Peluang Mahasiswa (PPM)'> 
                    <Card 
                    bordered
                    >
                    <Table 
                        columns={ppmColumns}
                        dataSource={curriculumData?.ppms || []}
                        rowKey="id"
                        size="small"
                        pagination={{ pageSize: 5 }}
                        bordered
                    />
                    </Card>
                </Accordion>
              </Col>


              <Col xs={24} lg={12}>
                <Accordion title='Pengetahuan (P)' >
                    <Card 
                    bordered
                    >
                    <Table 
                        columns={pengetahuanColumns}
                        dataSource={curriculumData?.pengetahuan || []}
                        rowKey="id"
                        size="small"
                        pagination={{ pageSize: 5 }}
                        bordered
                    />
                    </Card>
                </Accordion>
              </Col>

              <Col xs={24} lg={12}>
                <Accordion title='Materi Pembelajaran (MP)'>
                    <Card 
                    bordered
                    >
                    <Table 
                        columns={materiColumns}
                        dataSource={curriculumData?.materi_pembelajaran || []}
                        rowKey="id"
                        size="small"
                        pagination={{ pageSize: 5 }}
                        bordered
                    />
                    </Card>
                </Accordion>
              </Col>
            </Row>
          </Space>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;