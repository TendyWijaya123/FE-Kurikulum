import React, { useState, useContext, useRef, useEffect } from "react";
import { Table, Button, message, Popconfirm, Select, Spin, Form, Modal, Input } from "antd";
import { DeleteOutlined, PlusOutlined, ImportOutlined, DownloadOutlined } from "@ant-design/icons";
import DefaultLayout from "../layouts/DefaultLayout";
import { useIpteks } from "../hooks/useIpteks";
import { AuthContext } from "../context/AuthProvider";
import ImportModal from "../components/Modal/ImportModal";

const Ipteks = () => {
  const { user } = useContext(AuthContext);
  const [isModalImportOpen, setIsModalImportOpen] = useState(false);
  const [focusedRowId, setFocusedRowId] = useState(null);
  const tableRef = useRef(null);

  const {
    ipteksData,
    loading,
    saving,
    selectedRowKeys,
    rowSelection,
    handleSave,
    handleDelete,
    handleCreate,
    handleSaveData,
    handleExportTemplateIpteks,
    handleImportIpteks,
    handleMultiDelete,
  } = useIpteks();

  const handleCreateWithFocus = () => {
    const newId = handleCreate();
    setFocusedRowId(newId);
    
    setTimeout(() => {
      const row = document.querySelector(`[data-row-key="${newId}"]`);
      if (row) {
        row.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const deskripsiInput = row.querySelector('textarea');
        if (deskripsiInput) {
          deskripsiInput.focus();
        }
      }
    }, 100);
  };

  const columns = [
    {
      title: 'Kategori',
      dataIndex: 'kategori',
      key: 'kategori',
      width: '20%',
      render: (text, record) => (
        <Select
          value={text}
          onChange={(value) => handleSave({ ...record, kategori: value })}
          style={{ width: '100%' }}
        >
          <Select.Option value="ilmu_pengetahuan">Ilmu Pengetahuan</Select.Option>
          <Select.Option value="teknologi">Teknologi</Select.Option>
          <Select.Option value="seni">Seni</Select.Option>
        </Select>
      ),
    },
    {
      title: 'Deskripsi',
      dataIndex: 'deskripsi',
      key: 'deskripsi',
      width: '60%',
      render: (text, record) => (
        <Input.TextArea
          value={text}
          onChange={(e) => handleSave({ ...record, deskripsi: e.target.value })}
          autoSize={{ minRows: 3 }}
          style={{
            border: "none",
            outline: "none",
            boxShadow: "none",
            padding: 0,
          }}
          autoFocus={record.id === focusedRowId}
        />
      ),
    },
    {
      title: 'Link',
      dataIndex: 'link_sumber',
      key: 'link_sumber',
      width: '10%',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleSave({ ...record, link_sumber: e.target.value })}
          style={{
            border: "none",
            outline: "none",
            boxShadow: "none",
            padding: 0,
          }}
        />
      ),
    },
    {
      title: 'Aksi',
      key: 'action',
      width: '5%',
      render: (_, record) => (
        <Popconfirm
          title="Yakin ingin menghapus?"
          onConfirm={() => handleDelete(record)}
          okText="Ya"
          cancelText="Tidak"
        >
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
          />
        </Popconfirm>
      ),
    },
  ];

  return (
    <DefaultLayout title="IPTEKS">
      <div style={{ padding: '24px', background: '#fff', minHeight: '100%' }}>
        <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
          <Button 
            onClick={handleExportTemplateIpteks} 
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
            Import IPTEKS
          </Button>
          <Button 
            onClick={handleCreateWithFocus} 
            type="primary"
            icon={<PlusOutlined />}
          >
            Tambah Baris
          </Button>
          <Button 
            onClick={handleSaveData} 
            type="primary"
            loading={saving}
          >
            Simpan Data
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
          handleImport={handleImportIpteks}
          title="Import IPTEKS"
        />

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <Spin size="large" />
          </div>
        ) : (
          <Table
            ref={tableRef}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={ipteksData.map(item => ({ ...item, key: item.id }))}
            pagination={{ 
              pageSize: 5,
              onChange: () => setFocusedRowId(null)
            }}
            bordered
          />
        )}
      </div>
    </DefaultLayout>
  );
};

export default Ipteks;