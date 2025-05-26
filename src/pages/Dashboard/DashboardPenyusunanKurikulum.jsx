import {
  List,
  Typography,
  Card,
  Spin,
  Button,
  Modal,
  Checkbox,
  Row,
  Col,
  Tooltip,
  Popconfirm,
  Table,
  Select,
} from 'antd';
import DefaultLayout from "../../layouts/DefaultLayout";
import { useDashboardPenyusunKurikulumData } from '../../hooks/Dashboard/useDashboardPenyusunKurikulumData';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import ReactApexChart from 'react-apexcharts';

const { Title } = Typography;

const DashboardPenyusunanKurikulum = () => {
  const {
    notifikasi,
    selectedIds,
    loading,
    modalVisible,
    tableData,
    pieConfig,
    columns,
    statusFilter,
    selectedNotification,
    pieData,
    markAllAsRead,
    handleDelete,
    handleDeleteAll,
    handleSelect,
    openModal,
    closeModal,
    visitPage,
    setStatusFilter,
  } = useDashboardPenyusunKurikulumData();

  return (
    <DefaultLayout title="Dashboard Kurikulum">
      <Spin spinning={loading}>
        <Row gutter={[16, 16]} style={{ display: 'flex' }}>
          <Col span={10}>
            <Card
              title="Activity Breakdown"
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 300,
                }}
              >
                <ReactApexChart
                  options={pieConfig}
                  series={pieData}
                  type="donut"
                  height={300}
                />
              </div>
            </Card>
          </Col>
          <Col span={14}>
            <Card title="Daftar Progres Penyusunan Kurikulum" style={{ height: '100%' }}>
              <div style={{ marginBottom: 10 }}>
                <Select
                  value={statusFilter}
                  onChange={value => setStatusFilter(value)}
                  style={{ width: 200 }}
                  options={[
                    { value: 'all', label: 'Semua Status' },
                    { value: 'belum', label: 'Belum' },
                    { value: 'progres', label: 'Progres' },
                    { value: 'selesai', label: 'Selesai' },
                  ]}
                />
              </div>
              <Table
                size="small"
                columns={columns}
                dataSource={tableData}
                pagination={{ pageSize: 5 }}
                bordered
                scroll={{ y: 40 * 5 }}
              />
            </Card>
          </Col>
        </Row>

        <div
          style={{
            marginTop: 10,
            padding: 20,
            backgroundColor: '#fff',
            borderRadius: 8,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div style={{ marginBottom: 20 }}>
            <Title level={3}>Notifikasi</Title>
            <Button type="primary" onClick={markAllAsRead}>
              Tandai Semua Sebagai Telah Dibaca
            </Button>
            <Button danger onClick={handleDeleteAll} style={{ marginLeft: 10 }}>
              Hapus Terpilih
            </Button>
          </div>
          {notifikasi.length > 0 ? (
            <div style={{ maxHeight: 400, overflowY: 'auto' }}>
              <List
                itemLayout="horizontal"
                dataSource={notifikasi}
                renderItem={item => (
                  <List.Item
                    style={{
                      backgroundColor: item.status === "read" ? '#fafafa' : '#e6f7ff',
                      borderBottom: '1px solid #d9d9d9',
                      padding: '10px 15px',
                    }}
                    actions={[
                      <Tooltip title="Lihat" key="view">
                        <Button
                          type="link"
                          onClick={() => openModal(item)}
                          icon={<EyeOutlined />}
                        />
                      </Tooltip>,
                      <Tooltip title="Hapus" key="delete">
                        <Popconfirm
                          title="Yakin ingin menghapus notifikasi ini?"
                          onConfirm={() => handleDelete(item.id)}
                          okText="Ya"
                          cancelText="Tidak"
                        >
                          <Button type="link" danger icon={<DeleteOutlined />} />
                        </Popconfirm>
                      </Tooltip>,
                    ]}
                  >
                    <Row style={{ width: '100%' }}>
                      <Col flex="30px">
                        <Checkbox
                          checked={selectedIds.includes(item.id)}
                          onChange={e => handleSelect(item.id, e.target.checked)}
                        />
                      </Col>
                      <Col flex="auto">
                        <List.Item.Meta
                          title={
                            <Typography.Text
                              strong
                              style={{
                                color: item.status === "read" ? '#8c8c8c' : '#1890ff',
                              }}
                            >
                              {item.kode}
                            </Typography.Text>
                          }
                          description={
                            <Typography.Text
                              style={{
                                color: item.status === "read" ? '#8c8c8c' : '#000',
                              }}
                            >
                              {item.deskripsi}
                            </Typography.Text>
                          }
                        />
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 20 }}>
              <Typography.Text>Tidak ada notifikasi</Typography.Text>
            </div>
          )}

          <Modal
            title={selectedNotification?.kode}
            open={modalVisible}
            onCancel={closeModal}
            footer={[
              <Button type="primary" key="Check" onClick={visitPage}>
                Check
              </Button>,
              <Button key="close" onClick={closeModal}>
                Tutup
              </Button>,
            ]}
          >
            <Typography.Text>{selectedNotification?.deskripsi}</Typography.Text>
          </Modal>
        </div>
      </Spin>
    </DefaultLayout>
  );
};

export default DashboardPenyusunanKurikulum;
