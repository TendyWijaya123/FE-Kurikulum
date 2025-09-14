import { useState, useEffect, useContext } from "react";
import { message } from 'antd';
import {
  getIpteks,
  deleteIpteks,
  createIpteks,
  getIpteksTemplate,
  importIpteks,
} from "../service/api";
import { AuthContext } from "../context/AuthProvider";

export const useIpteks = () => {
  const [ipteksData, setIpteksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [previousData, setPreviousData] = useState(null);
  const { user } = useContext(AuthContext);

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const fetchIpteks = async () => {
    setLoading(true);
    try {
      const response = await getIpteks(user?.prodiId);
      setIpteksData(response.data);
      setPreviousData(response.data);
    } catch (error) {
      message.error("Gagal mengambil data: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (updatedRecord) => {
    const newData = ipteksData.map(item => 
      item.id === updatedRecord.id ? updatedRecord : item
    );
    setIpteksData(newData);
  };

  const handleSaveData = async () => {
    setSaving(true);
    try {
      await createIpteks(ipteksData);
      message.success("Data berhasil disimpan");
      await fetchIpteks();
    } catch (error) {
      message.error("Gagal menyimpan data: " + (error.response?.data?.message || error.message));
    } finally {
      setSaving(false);
    }
  };

  const handleCreate = () => {
    const newId = `new-${Date.now()}`;
    const newData = {
      id: newId,
      kategori: 'ilmu_pengetahuan',
      deskripsi: '',
      link_sumber: '',
      key: newId
    };
    setIpteksData([...ipteksData, newData]);
    return newId;
  };

  const handleDelete = async (record) => {
    try {
      if (record.id.toString().startsWith('new-')) {
        setIpteksData(ipteksData.filter(item => item.id !== record.id));
      } else {
        await deleteIpteks(record.id);
        await fetchIpteks();
      }
      message.success("Data berhasil dihapus");
    } catch (error) {
      message.error("Gagal menghapus data");
    }
  };

  const handleMultiDelete = async (ids) => {
    try {
      for (const id of ids) {
        if (!id.toString().startsWith('new-')) {
          await deleteIpteks(id);
        }
      }
      await fetchIpteks();
      setSelectedRowKeys([]);
      message.success(`${ids.length} data berhasil dihapus`);
    } catch (error) {
      message.error("Gagal menghapus data");
    }
  };

  const handleExportTemplateIpteks = async () => {
    try {
      await getIpteksTemplate();
      message.success("Template berhasil diunduh");
    } catch (error) {
      message.error(`Terjadi kesalahan: ${error.message || error}`);
    }
  };

  const handleImportIpteks = async (file) => {
    try {
      await importIpteks(file);
      message.success("Berhasil import data");
      await fetchIpteks();
    } catch (error) {
      message.error("Gagal mengunggah file. Coba lagi.");
    }
  };

  useEffect(() => {
    fetchIpteks();
  }, []);

  return {
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
    handleMultiDelete
  };
};