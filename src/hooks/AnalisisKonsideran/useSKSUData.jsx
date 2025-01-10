import { useState, useEffect, useContext } from "react";
import { deleteSksu, getSksu, postSksu, deleteSksus } from "../../service/AnalisisKonsideran/sksu";
import { AuthContext } from "../../context/AuthProvider";
import { message } from 'antd';
import { data } from "react-router-dom";

export const useSKSUData = () => {
    const [sksu, setSksu] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const [dataSource, setDataSource] = useState([]);
    const [saving, setSaving] = useState(false);
    const [undoStack, setUndoStack] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    // Fetch data
    useEffect(() => {
        const fetchSKSU = async () => {
            setLoading(true);
            try {
                if (user?.prodiId) {
                    const data = await getSksu(user.prodiId);
                    setSksu(data);
                }
            } catch (error) {
                console.error("Error fetching SKSU:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSKSU();
    }, [user?.prodiId]);

    useEffect(() => {
        if (sksu.length > 0) {
            setDataSource(
                sksu.map((item, index) => ({
                    key: 'sksu' + index + 1,
                    _id: item.id,
                    profilLulusan: item.profil_lulusan,
                    kualifikasi: item.kualifikasi,
                    kategori: item.kategori,
                    prodiId: user.prodiId,
                    kompetensiKerja: item.kompetensi_kerja?.length
                        ? item.kompetensi_kerja.map((k) => k.kompetensi_kerja)
                        : [],
                }))
            );
        }
    }, [sksu]);

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
        saveToUndoStack([...dataSource]);
    
        // Cari key yang hilang dalam urutan
        const existingKeys = dataSource.map(item => parseInt(item.key.replace('sksu', ''))).sort((a, b) => a - b);
        let newKeyNumber = 1; // Mulai dari 1
    
        for (let i = 0; i < existingKeys.length; i++) {
            if (existingKeys[i] !== newKeyNumber) {
                break; // Key yang hilang ditemukan
            }
            newKeyNumber++;
        }
    
        const newRow = {
            key: 'sksu' + newKeyNumber,
            _id: null,
            profilLulusan: '',
            kualifikasi: '',
            kategori: '',
            kompetensiKerja: [],
            prodiId: user.prodiId,
        };
    
        setDataSource([...dataSource, newRow]);
    };
    

    // Delete row
    const handleDeleteRow = async (key) => {
        saveToUndoStack([...dataSource]);
    
        const deleteData = dataSource.find((item) => item.key === key); // Mengambil item yang ingin dihapus
    
        if (deleteData?._id !== null) {
            try {
                await deleteSksu(deleteData._id); // Menunggu hingga penghapusan selesai
                console.log(`Item dengan ID ${deleteData._id} berhasil dihapus dari server.`);
            } catch (error) {
                console.error(`Gagal menghapus item dengan ID ${deleteData._id}:`, error);
                return; // Berhenti di sini jika ada error
            }
        }
    
        const newData = dataSource.filter((item) => item.key !== key); // Memperbarui data lokal
        setDataSource(newData); // Mengatur ulang dataSource
    };
    

    // Save data to server
    const handleSaveData = async () => {
        setSaving(true);
        try {
            await postSksu(dataSource);
            message.success('Data berhasil disimpan!');
        } catch (error) {
            message.error('Gagal menyimpan data!');
            console.error("Error saving SKSU:", error);
        } finally {
            setSaving(false);
        }
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys),
    };

    const handleDeleteSksus = async () => {
        setLoading(true);
        try {
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
    
            await deleteSksus(toDelete); // Menghapus data ke server
            message.success('Data berhasil dihapus!');
    
            setDataSource(toKeep); // Memperbarui data tanpa data yang dihapus
            setSelectedRowKeys([]);
        } catch (error) {
            message.error('Gagal menghapus data!');
            console.error("Error hapus SKSU:", error);
        } finally {
            setLoading(false);
        }
    };       

    return {
        sksu,
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
        handleDeleteSksus
    };
};
