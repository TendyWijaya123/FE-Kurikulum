import { useState, useEffect, useContext } from "react";
import { getKkni, deleteKkni, postKkni,  deleteKknis } from "../../service/AnalisisKonsideran/kkni";
import { AuthContext } from "../../context/AuthProvider";
import { message } from 'antd';
import { data } from "react-router-dom";

export const useKKNIData = () => {
    const [kkni, setKkni] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const [dataSource, setDataSource] = useState([]);
    const [saving, setSaving] = useState(false);
    const [undoStack, setUndoStack] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    // Fetch data
    useEffect(() => {
        const fetchKkni = async () => {
            setLoading(true);
            try {
                if (user?.prodiId) {
                    const data = await getKkni(user.prodiId);
                    setKkni(data);
                }
            } catch (error) {
                console.error("Error fetching kkni:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchKkni();
    }, [user?.prodiId]);

    useEffect(() => {
        if (kkni.length > 0) {
            setDataSource(
                kkni.map((item, index) => ({
                    key: 'kkni' + index + 1,
                    _id: item.id,
                    code: item.code,
                    description: item.description,
                    prodiId: user.prodiId,
                }))
            );
            console.log(dataSource);
        }
    }, [kkni]);

    // Save undo state
    const saveToUndoStack = (data) => {
        setUndoStack((prevStack) => [...prevStack, data]);
    };

    // Handle Undo
    const handleUndo = () => {
        if (undoStack.length > 0) {
            const previousState = undoStack[undoStack.length - 1];
            setUndoStack(undoStack.slice(0, -1));
            setDataSource(previousState);
        }
    };

    // Handle save
    const handleSave = (row) => {
        saveToUndoStack([...dataSource]);
        const newData = [...dataSource];
        const index = newData.findIndex((item) => item.key === row.key);
        if (index > -1) {
            newData[index] = { ...newData[index], ...row };
            setDataSource(newData);
        }
    };

    // Add row
    const handleAddRow = () => {
        // Simpan kondisi sebelum perubahan untuk undo
        saveToUndoStack([...dataSource]);
    
        // Tambahkan baris baru
        const newRow = {
            key: '', // Akan diperbarui nanti
            _id: null,
            code: '', // Akan diperbarui nanti
            kategori: '',
            prodiId: user.prodiId,
        };
    
        // Gabungkan data baru ke dalam dataSource
        const updatedDataSource = [...dataSource, newRow];
    
        // Perbarui urutan key dan code berdasarkan posisi baru
        updatedDataSource.forEach((item, index) => {
            item.key = 'kkni' + (index + 1); // Key baru: kkni1, kkni2, dst.
            item.code = 'CPL-' + (index + 1); // Code baru: CPL1, CPL2, dst.
        });
    
        // Simpan kembali dataSource
        setDataSource(updatedDataSource);
    };
    

    // Delete row
    const handleDeleteRow = async (key) => {
        saveToUndoStack([...dataSource]);
    
        // Temukan data yang akan dihapus
        const deleteData = dataSource.find((item) => item.key === key);
    
        // Jika data memiliki `_id`, hapus dari server terlebih dahulu
        if (deleteData?._id !== null) {
            try {
                await deleteKkni(deleteData._id); // Tunggu hingga penghapusan selesai
                console.log(`Item dengan ID ${deleteData._id} berhasil dihapus dari server.`);
            } catch (error) {
                console.error(`Gagal menghapus item dengan ID ${deleteData._id}:`, error);
                return; // Keluar jika ada error
            }
        }
    
        // Hapus item dari data lokal
        const newData = dataSource.filter((item) => item.key !== key);
    
        // Perbarui ulang key dan code agar tetap urut
        const updatedDataSource = newData.map((item, index) => ({
            ...item,
            key: 'kkni' + (index + 1), // Update key: kkni1, kkni2, dst.
            code: 'CPL-' + (index + 1), // Update code: CPL1, CPL2, dst.
        }));
    
        // Simpan data baru ke state
        setDataSource(updatedDataSource);
    };
    
    

    // Save data to server
    const handleSaveData = async () => {
        setSaving(true);
        try {
            await postKkni(dataSource);
            message.success('Data berhasil disimpan!');
        } catch (error) {
            message.error('Gagal menyimpan data!');
            console.error("Error saving kkni:", error);
        } finally {
            setSaving(false);
        }
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys),
    };

    const handleDeleteKknis = async () => {
        setLoading(true);
        try {
            // Pisahkan data yang akan dihapus dan yang akan disimpan
            const { toDelete, toKeep } = dataSource.reduce(
                (acc, item) => {
                    if (selectedRowKeys.includes(item.key)) {
                        acc.toDelete.push(item);
                    } else {
                        acc.toKeep.push(item);
                    }
                    return acc;
                },
                { toDelete: [], toKeep: [] }
            );
    
            // Hapus data dari server
            if (toDelete.length > 0) {
                await deleteKknis(toDelete); // Pastikan fungsi ini menerima array
                message.success('Data berhasil dihapus!');
            }
    
            // Perbarui ulang key dan code agar tetap terurut
            const updatedDataSource = toKeep.map((item, index) => ({
                ...item,
                key: 'kkni' + (index + 1), // Update key: kkni1, kkni2, dst.
                code: 'CPL-' + (index + 1), // Update code: CPL1, CPL2, dst.
            }));
    
            // Simpan data baru ke state
            setDataSource(updatedDataSource);
            setSelectedRowKeys([]); // Hapus pilihan row
    
        } catch (error) {
            message.error('Gagal menghapus data!');
            console.error("Error hapus bench kurikulum:", error);
        } finally {
            setLoading(false);
        }
    };
         

    return {
        kkni,
        loading,
        dataSource,
        saving,
        undoStack,
        rowSelection,
        selectedRowKeys,
        handleUndo,
        handleSave,
        handleAddRow,
        handleDeleteRow,
        handleSaveData,
        handleDeleteKknis
    };
};
