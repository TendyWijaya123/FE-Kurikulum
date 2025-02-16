import React, { useState, useContext } from "react";
import { Table, Button, message, Popconfirm, Spin, Input, Form, Modal } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined, ImportOutlined, DownloadOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import DefaultLayout from "../layouts/DefaultLayout";
import { usePengetahuan } from "../hooks/usePengetahuan";
import { AuthContext } from "../context/AuthProvider";
import ImportModal from "../components/Modal/ImportModal";

const Pengetahuan = () => {
  const { user } = useContext(AuthContext);
  const [isModalImportOpen, setIsModalImportOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  
  const {
    pengetahuanData,
    loading,
    handleDelete,
    handleCreate,
    handleUpdate,
    handleExportTemplatePengetahuan,
    handleImportPengetahuan,
  } = usePengetahuan();

  const [editingKey, setEditingKey] = useState('');
  const [editForm, setEditForm] = useState({
    deskripsi: '',
    kode_pengetahuan: ''
  });

  const handleAddSubmit = async (values) => {
    const success = await handleCreate(values);
    if (success) {
      message.success("Data berhasil ditambahkan");
      setIsAddModalOpen(false);
      form.resetFields();
    } else {
      message.error("Gagal menambahkan data");
    }
  };

  const handleMultiDelete = async (keys) => {
    try {
      const deletePromises = keys.map(key => handleDelete(key));
      await Promise.all(deletePromises);
      message.success(`${keys.length} item berhasil dihapus`);
      setSelectedRowKeys([]);
    } catch (error) {
      message.error("Gagal menghapus beberapa item");
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    setEditForm({
      deskripsi: record.deskripsi,
      kode_pengetahuan: record.kode_pengetahuan
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id) => {
    try {
      const success = await handleUpdate(id, editForm);
      if (success) {
        message.success("Data berhasil diperbarui");
        setEditingKey('');
      } else {
        message.error("Gagal memperbarui data");
      }
    } catch (errInfo) {
      message.error("Terjadi kesalahan dalam menyimpan data");
    }
  };

  const columns = [
    {
      title: 'Kode',
      dataIndex: 'kode_pengetahuan',
      key: 'kode_pengetahuan',
      width: '10%',
    },
    {
      title: 'Deskripsi',
      dataIndex: 'deskripsi',
      key: 'deskripsi',
      width: '80%',
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Input.TextArea
            value={editForm.deskripsi}
            onChange={(e) => setEditForm({ ...editForm, deskripsi: e.target.value })}
            autoSize={{ minRows: 3 }}
          />
        ) : (
          text
        );
      },
    },
    {
      title: 'Aksi',
      key: 'action',
      width: '10%',
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          <div style={{ display: 'flex', gap: '8px' }}>
            {editable ? (
              <>
                <Button 
                  type="primary" 
                  icon={<CheckOutlined/>}
                  onClick={() => save(record.id)}
                />
                <Button 
                  icon={<CloseOutlined/>} 
                  onClick={cancel}
                />
              </>
            ) : (
              <>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => edit(record)}
                />
                <Popconfirm
                  title="Yakin ingin menghapus?"
                  onConfirm={async () => {
                    try {
                      const success = await handleDelete(record.id);
                      if (success) {
                        message.success("Data berhasil dihapus");
                      } else {
                        message.error("Gagal menghapus data");
                      }
                    } catch (error) {
                      message.error("Terjadi kesalahan saat menghapus data");
                    }
                  }}
                  okText="Ya"
                  cancelText="Tidak"
                >
                  <Button type="primary" danger icon={<DeleteOutlined />} />
                </Popconfirm>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <DefaultLayout title="Pengetahuan">
      <div style={{ padding: '24px', background: '#fff', minHeight: '100%' }}>
        <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
          <Button 
            onClick={handleExportTemplatePengetahuan} 
            type="primary"
            icon={<DownloadOutlined />}
          >
            Download Template
          </Button>
          <Button 
            onClick={() => setIsModalImportOpen(true)} 
            type="primary"
            icon={<ImportOutlined />}
          >
            Import Pengetahuan
          </Button>
          <Button 
            onClick={() => setIsAddModalOpen(true)} 
            type="primary"
            icon={<PlusOutlined />}
          >
            Tambah Data
          </Button>
          {selectedRowKeys.length > 0 && (
            <Button
              onClick={() => handleMultiDelete(selectedRowKeys)}
              type="primary"
              danger
              icon={<DeleteOutlined />}
            >
              Hapus {selectedRowKeys.length} Item
            </Button>
          )}
        </div>

        <ImportModal
          isOpen={isModalImportOpen}
          setIsOpen={setIsModalImportOpen}
          handleImport={handleImportPengetahuan}
          title="Import Pengetahuan"
        />

        <Modal
          title="Tambah Data Pengetahuan"
          open={isAddModalOpen}
          onCancel={() => {
            setIsAddModalOpen(false);
            form.resetFields();
          }}
          footer={null}
        >
          <Form
            form={form}
            onFinish={handleAddSubmit}
            layout="vertical"
          >
            <Form.Item
              name="deskripsi"
              label="Deskripsi"
              rules={[{ required: true, message: 'Masukkan deskripsi' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <Button type="primary" htmlType="submit">Simpan</Button>
                <Button onClick={() => {
                  setIsAddModalOpen(false);
                  form.resetFields();
                }}>Batal</Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <Spin size="large" />
          </div>
        ) : (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={pengetahuanData.map(item => ({ ...item, key: item.id }))}
            pagination={{ pageSize: 5 }}
            bordered
          />
        )}
      </div>
    </DefaultLayout>
  );
};

export default Pengetahuan;