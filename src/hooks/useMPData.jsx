import { useState, useEffect, useContext } from "react";
import { getMateriPembelajarans, postMateriPembelajaran, deleteMateriPembelajaran, deleteMateriPembelajarans } from "../service/materiPembelajaran";
import { AuthContext } from "../context/AuthProvider";
import { message } from 'antd';
import { data } from "react-router-dom";
import { getProdiDropdown } from "../service/api";

export const useMPData = () => {
    const [materiPembelajaran, setMateriPembelajaran] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const [dataSource, setDataSource] = useState([]);
    const [saving, setSaving] = useState(false);
    const [undoStack, setUndoStack] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [prodiDropdown, setProdiDropdown] = useState([]);
    const [knowledgeDropdown, setKnowledgeDropdown] = useState([]);
    const [selectedProdi, setSelectedProdi] = useState(null);

    // Fetch data
    useEffect(() => {
        const fetchMateriPembelajaran = async () => {
            setLoading(true);
            try {
                if (user?.prodiId) {
                    const {data, knowledge} = await getMateriPembelajarans(user.prodiId);
                    setKnowledgeDropdown(knowledge);
                    setMateriPembelajaran(data);
                }else {
                    const prodis = await getProdiDropdown();
                    setProdiDropdown(prodis);
                }
            } catch (error) {
                console.error("Error fetching materi pembelajaran:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMateriPembelajaran();
    }, [user?.prodiId]);

    useEffect(() => {
        if (materiPembelajaran.length > 0) {
            setDataSource(
                materiPembelajaran.map((item, index) => ({
                    key: 'MP-' + index + 1,
                    _id: item.id,
                    code: item.code,
                    description: item.description,
                    cognitifProses : item.cognitif_proses,
                    knowledgeDimension: item.knowledge_dimension?.length
                        ? item.knowledge_dimension.map((k) => k.code)
                        : [],
                    prodiId: user.prodiId,
                }))
            );
        }else {
            setDataSource([]);
        }
    }, [materiPembelajaran]);

    const handleProdiChange = async (value) => {
        setSelectedProdi(value);
        setLoading(true);
        try {
            const data = await getMateriPembelajarans(value); // Ambil data berdasarkan prodiId
            setMateriPembelajaran(data);
        } catch (error) {
            console.error("Error fetching SKSU for selected prodi:", error);
        } finally {
            setLoading(false);
        }
    };

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
            key: '', 
            _id: null,
            code: '', 
            description: '',
            cognitifProses : '',
            knowledgeDimension: [],
            prodiId: selectedProdi || user.prodiId,
        };
    
        // Gabungkan data baru ke dalam dataSource
        const updatedDataSource = [...dataSource, newRow];
    
        // Perbarui urutan key dan code berdasarkan posisi baru
        updatedDataSource.forEach((item, index) => {
            item.key = 'MP-' + (index + 1); // Key baru: kkni1, kkni2, dst.
            item.code = 'MP-' + (index + 1); // Code baru: CPL1, CPL2, dst.
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
                await deleteMateriPembelajaran(deleteData._id); // Tunggu hingga penghapusan selesai
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
            key: 'MP-' + (index + 1), // Update key: kkni1, kkni2, dst.
            code: 'MP-' + (index + 1), // Update code: CPL1, CPL2, dst.
        }));
    
        // Simpan data baru ke state
        setDataSource(updatedDataSource);
    };
    
    

    // Save data to server
    const handleSaveData = async () => {
        setSaving(true);
        try {
            await postMateriPembelajaran(dataSource);
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

    const handleDeleteMateriPembelajarans = async () => {
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
                await deleteMateriPembelajarans(toDelete); // Pastikan fungsi ini menerima array
                message.success('Data berhasil dihapus!');
            }
    
            // Perbarui ulang key dan code agar tetap terurut
            const updatedDataSource = toKeep.map((item, index) => ({
                ...item,
                key: 'MP-' + (index + 1), // Update key: kkni1, kkni2, dst.
                code: 'MP-' + (index + 1), // Update code: CPL1, CPL2, dst.
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
        knowledgeDropdown,
        selectedProdi,
        prodiDropdown,
        materiPembelajaran,
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
        handleDeleteMateriPembelajarans,
        handleProdiChange
    };
};
