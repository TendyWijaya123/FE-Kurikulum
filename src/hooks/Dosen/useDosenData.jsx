import { useState, useEffect, useContext } from "react";
import { getDosen, addDosen, deleteDosen, deleteDosens, getProdiDropdown } from "../../service/PengisianRps/dosen";
import { AuthContext } from "../../context/AuthProvider";
import { message } from 'antd';

export const  useDosenData = () => {
    const [dosen, setDosen] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const [dataSource, setDataSource] = useState([]);
    const [saving, setSaving] = useState(false);
    const [undoStack, setUndoStack] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [jurusanId, setJurusanId] = useState();
    const [prodiDropdown, setProdiDropdown] =  useState([]);
    const [jurusanDropdown, setJurusanDropdown] =  useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [filteredProdi, setFilteredProdi] = useState([]);

    const fetchDosen = async () => {
        setLoading(true);
        try {
            const data = await getDosen();
            setDosen(data.dosens);
            setJurusanDropdown(data.jurusans);
            setProdiDropdown(data.prodis);
        } catch (error) {
            console.error("Error fetching dosen:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data
    useEffect(() => {
        fetchDosen();
    }, [user]);

    useEffect(() => {
        if (dosen.length > 0) {
            setDataSource(
                dosen.map((item, index) => ({
                    key: 'dosen' + index + 1,
                    _id: item.id,
                    kode: item.kode,
                    nip: item.nip,
                    nama: item.nama,
                    email: item.email,
                    jenisKelamin: item.jenis_kelamin,
                    jurusan: item.jurusan.nama,
                    isActive: item.is_active,
                    prodi: item.prodi.map((data) => data.name),
                }))
            );
        }else {
            setDataSource([]);
        }
    }, [dosen]);

    useEffect(()=>{
        if(jurusanId){
            setFilteredProdi(prodiDropdown.filter(prodi => prodi.jurusan_id === jurusanId));
        }else {
            setFilteredProdi(prodiDropdown);
        }
    }, [jurusanId, prodiDropdown])

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

        const existingKeys = dataSource.map((item) => parseInt(item.key.replace('dosen', ''))).sort((a, b) => a - b);
        let newKeyNumber = 1;

        for (let i = 0; i < existingKeys.length; i++) {
            if (existingKeys[i] !== newKeyNumber) {
                break;
            }
            newKeyNumber++;
        }
    
        // Tambahkan baris baru
        const newRow = {
            key: 'dosen' + newKeyNumber, // Akan diperbarui nanti
            _id: null,
            name: '', // Akan diperbarui nanti
        };
    
        setDataSource([...dataSource, newRow]);
    };
    

    // Delete row
    const handleDeleteRow = async (key) => {
        saveToUndoStack([...dataSource]);

        const deleteData = dataSource.find((item) => item.key === key);

        if (deleteData?._id !== null) {
            try {
                await c(deleteData._id);
            } catch (error) {
                console.error("Error deleting delete:", error);
                return;
            }
        }

        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };
    
    

    // Save data to server
    const handleSaveAddData = async () => {
        setSaving(true);
        try {
            await addDosen(dataSource);
            message.success('Data berhasil disimpan!');
            await fetchDosen();
        } catch (error) {
            message.error('Gagal menyimpan data!');
            console.error("Error saving dosen:", error);
        } finally {
            setSaving(false);
        }
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys),
    };

    const handleDeleteDosens = async () => {
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
            // Perbarui ulang key dan code agar tetap terurut
            await deleteDosens(toDelete);
            message.success('Data berhasil dihapus!');

            setDataSource(toKeep);
            setSelectedRowKeys([]);
            await fetchDosen();
        } catch (error) {
            message.error('Gagal menghapus data!');
            console.error("Error hapus dosen:", error);
        } finally {
            setLoading(false);
        }
    };
         

    return {
        loading,
        dataSource,
        saving,
        undoStack,
        rowSelection,
        selectedRowKeys,
        filteredProdi,
        jurusanDropdown,
        prodiDropdown,
        modalVisible,
        editModalVisible,
        fetchDosen,
        setModalVisible,
        setEditModalVisible,
        setJurusanId,
        handleUndo,
        handleSave,
        handleAddRow,
        handleDeleteRow,
        handleSaveAddData,
        handleDeleteDosens,
    };
};
